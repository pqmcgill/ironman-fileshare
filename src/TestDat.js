import React, { useState, useEffect } from 'react';
import useDat from './useDat';

export default function TestDat() {
  const [connectUrl, setConnectUrl] = useState('');
  const dat = useDat();

  useEffect(() => {
    dat.share(new File(["foobar"], "filename.txt"));
  }, []);

  function handleChange(e) {
    setConnectUrl(e.target.value);
  }

  function handleConnect() {
    dat.read(connectUrl);
  }

  return (
    <div>
      <p>{ dat.url ? <div>{dat.url}</div> : 'loading...' }</p>
      <p><input type="text" onChange={ handleChange } /><button onClick={ handleConnect }>Connect</button></p>
    </div>
  )
}
