import { useState, useEffect } from 'react';
import Dat from 'dat-js';
import { readdir, mkdir, writeFile, download, watch } from 'pats-dat-api';

export default function useDat() {
  const [dat, setDat] = useState(new Dat());
  const [ownArchive, setOwnArchive] = useState(dat.create()); 
  const [sharedArchive, setSharedArchive] = useState(null);
  const [url, setUrl] = useState(ownArchive.url);
  const [myFiles, setMyFiles] = useState([]);
  const [incomingFiles, setIncomingFiles] = useState([]);
  const [outgoingFiles, setOutgoingFiles] = useState([]);

  useEffect(() => {
    ownArchive.ready(function() {
      mkdir(ownArchive, '/own')
      mkdir(ownArchive, '/shared')

      const outgoingStream = watch(ownArchive, '/shared/**');

      outgoingStream.on('data', ([event, args]) => {
        if (event === 'invalidated') {
          console.log(args.path, 'has been invalidated')
        } else if (event === 'changed') {
          console.log(args.path, 'has changed')
        }
      })
    });
  }, []);


  function read(url) {
    const _sharedArchive = dat.get(url);
    _sharedArchive.ready(function() {
      console.log('archive', _sharedArchive);
      setTimeout(() => {
        download(_sharedArchive, '/shared', function(err) {
          if (err) throw new Error('error downloading shared folder: ' + err);
          console.log('here', arguments);
          _sharedArchive.readdir('/shared', function(err, list) {
            if (err) throw new Error('error reading from shared folder: ' + err);
            console.log('contents of shared folder: ', list);
          });
        })
      }, 1000); // timeout due to network latecy. TODO: determine how to be sure a connection has been made
    })
    setSharedArchive(_sharedArchive);
  }

  function write(file) {
    const { name } = file;
    ownArchive.ready(function() {
      ownArchive.writeFile(`/own/${name}`, file, function(err) {
        if (err) throw new Error('error writing file to own archive: ' + err);
        console.log('successfully wrote to own archive');
      })
    });
  }

  function share(file) {
    const { name } = file
    ownArchive.ready(function() {
      ownArchive.writeFile(`/shared/${name}`, file, function(err) {
        if (err) throw new Error('error writing file to shared archive: ' + err);
        console.log('successfully wrote to shared archive');
      })
    });
  }

  return {
    dat,
    url,
    ready: !!ownArchive, 
    read,
    write,
    share
  };
}
