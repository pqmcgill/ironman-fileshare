import { useState, useEffect } from 'react';
import Dat from 'dat-js';
import { copy, readFile, readdir, mkdir, writeFile, download, watch } from 'pats-dat-api';

const _dat = new Dat();
const _ownArchive = _dat.create();
let sharedArchive;

export default function useDat() {
  const [dat, setDat] = useState(_dat);
  const [ownArchive, setOwnArchive] = useState(_ownArchive); 
  const [url, setUrl] = useState(ownArchive.url);
  const [myFiles, setMyFiles] = useState([]);
  const [incomingFiles, setIncomingFiles] = useState([]);
  const [outgoingFiles, setOutgoingFiles] = useState([]);
  const [connectedUrl, setConnectedUrl] = useState('');

  useEffect(() => {
    ownArchive.ready(function() {
      mkdir(ownArchive, '/own')
      mkdir(ownArchive, '/shared')

      const outgoingStream = watch(ownArchive, '/shared/**');

      outgoingStream.on('data', ([event, args]) => {
        if (event === 'invalidated') {
          getFiles('outgoing', ownArchive, '/shared');
        }
      });

      const myStream = watch(ownArchive, '/own/**');

      myStream.on('data', ([event, args]) => {
        if (event === 'invalidated') {
          getFiles('mine', ownArchive, '/own');
        }
      })

      let flag = false;
      dat.swarm.on('connection', (connection) => {
        console.log('connected!', connection);
        if (!flag) {
          const connectionKey = connection.discoveryKey.toString('hex');
          setConnectedUrl(connectionKey);
          read(connectionKey)
          flag = true;
        }
      });
    });
  }, []);

  async function downloadFile(file) {
    const { type, dir, name } = file;
    const archive = file.type === 'incoming' ? sharedArchive : ownArchive;
    const data = await readFile(archive, `${dir}/${name}`, 'binary')
    const blob = new Blob([data], { type: 'octet/stream' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");    
    link.href = url;
    link.style = "visibility:hidden";
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async function getFiles(type, archive, dir) {
    try {
      const here = await download(archive, dir)
      const list = await readdir(archive, dir);
      const files = list.map(name => ({
        name,
        type,
        dir
      }));
      if (type === 'incoming') {
        setIncomingFiles(files);
      } else if (type === 'outgoing') {
        setOutgoingFiles(files);
      } else {
        setMyFiles(files);
      }
    } catch(e) {
      console.log('whoops', e);
    }
  }

  function read(url) {
    const _sharedArchive = dat.get(url);
    sharedArchive = _sharedArchive;
    _sharedArchive.ready(function() {
      setTimeout(() => {
        download(_sharedArchive, '/shared', function(err) {
          const incomingStream = watch(_sharedArchive, '/shared/**');
          incomingStream.on('data', ([event, args]) => {
            if (event === 'invalidated') {
              getFiles('incoming', _sharedArchive, '/shared');
            }
          })
        })
      }, 1000); // timeout due to network latecy. TODO: determine how to be sure a connection has been made
    })
  }

  function write(file) {
    const { name } = file;
    const reader = new FileReader();
    reader.onload = () => {
      ownArchive.ready(function() {
        ownArchive.writeFile(`/own/${name}`, reader.result, 'binary', function(err) {
          if (err) throw new Error('error writing file to own archive: ' + err);
          console.log('successfully wrote to own archive');
        })
      });
    };
    reader.readAsBinaryString(file);
  }

  async function share(file) {
    try {
      await copy(ownArchive, `own/${file.name}`, `/shared/${file.name}`)
      console.log('copied');
    } catch(err) {
      throw new Error('error sharing file:', err);
    }
  }

  return {
    dat,
    url,
    ready: !!ownArchive, 
    read,
    write,
    share,
    incomingFiles,
    outgoingFiles,
    myFiles,
    downloadFile,
    sharedArchive,
    connectedUrl
  };
}
