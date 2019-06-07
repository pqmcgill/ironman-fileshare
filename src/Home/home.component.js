import React, { useState } from 'react';
import logo from '../ironman.png';
import { Link } from "react-router-dom";
import useDat from '../useDat';
import ArchiveBrowser from '../Archive-Browser/archive-browser.component';

function HomeComponent() {
  const [state, setState] = useState({
    archiveId: '',
    sharedFiles: []
  });

  const dat = useDat();

  function archiveIdChanged(event) {
    setState({ ...state, archiveId: event.target.value });
  }

  function openSharedDirectory() {
    const sharedFiles = state.sharedFiles.push(state.value);
    setState({ ...state, sharedFiles: sharedFiles });
    dat.read(state.archiveId);
  }


  console.log('incoming', dat.incomingFiles);

  return (
    <div>

      {
        state.sharedFiles.length === 0 && 
          <div className="bg-light">
            <div className="container text-left py-5 text-center">
              <h2>Open a Shared Directory</h2>
              <input className="form-control mb-3" 
                type="text" 
                placeholder="Enter a Shared ID" 
                value={state.archiveId}
                onChange={archiveIdChanged} />
              <a href="#" className="btn btn-primary" onClick={openSharedDirectory}>Open</a>
            </div>
          </div>
      }
      <div className="album py-5">
        <div className="container">
          <h2>Your Local Directory: {dat.url}</h2>
          <ArchiveBrowser files={dat.incomingFiles} />
        </div>

      </div>
    </div>
  );
}

export default HomeComponent;
