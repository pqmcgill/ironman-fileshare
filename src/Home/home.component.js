import React, { useState } from 'react';
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
    //dat.read(state.archiveId);
    //const sharedFiles = state.sharedFiles.push(dat.read);
    const sharedFiles = state.sharedFiles.push({ name: 'shared file name'});
    setState({ ...state, sharedFiles: sharedFiles });
  }


  console.log('incoming', dat.incomingFiles);

  return (
    <div>
      <div>
        {
          state.sharedFiles.length === 0
          ?
            <div className="bg-light">
              <div className="container text-left py-5 text-center">
                <h2>Open a Shared Directory</h2>
                <p className="text-muted">Use the form below to connect to a shared directory.</p>
                <div className="row">
                  <input className="form-control col" 
                    type="text" 
                    placeholder="Enter a Shared ID" 
                    value={state.archiveId}
                    onChange={archiveIdChanged} />
                  <a className="btn btn-primary d-flex ml-3" onClick={openSharedDirectory}>Connect</a>
                </div>
                
              </div>
            </div>
          :
          <div class="bg-info text-light py-5">
            <div className="container">
              <ArchiveBrowser name="Shared Directory" datUrl={state.archiveId} files={state.sharedFiles} />
            </div>
          </div>
        }
      </div> 
      <div className="album py-5">
        <div className="container">
          <ArchiveBrowser name="Your Local Directory" datUrl={dat.url} files={state.personalFiles} />
        </div>
      </div>
    </div>
  );
}

export default HomeComponent;
