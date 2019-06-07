import React, { useState, useEffect } from 'react';
import useDat from './useDat';

export default function TestDat() {
  const [connectUrl, setConnectUrl] = useState('');
  const dat = useDat();

  function handleChange(e) {
    setConnectUrl(e.target.value);
  }

  function handleConnect() {
    dat.read(connectUrl);
  }

  function uploadFile(e) {
    const file = e.target.files[0];
    dat.share(file);
  }

  return (
    <div>
      <p>{ dat.url ? <div>{dat.url}</div> : 'loading...' }</p>
      <p><input type="text" onChange={ handleChange } /><button onClick={ handleConnect }>Connect</button></p>
      <p><input type="file" onChange={ uploadFile } /></p>
    </div>
  )
}
