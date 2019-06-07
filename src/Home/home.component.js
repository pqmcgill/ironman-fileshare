import React, { useState } from 'react';
import useDat from '../useDat';
import ArchiveBrowser from '../Archive-Browser/archive-browser.component';

function HomeComponent() {
  const [archiveId, setArchiveId] = useState('');

  const dat = useDat();

  function archiveIdChanged(event) {
    setArchiveId(event.target.value);
  }

  function openSharedDirectory() {
    dat.read(archiveId);
  }

  function selectFile(e) {
    const file = e.target.files[0];
    dat.write(file);
  }

  console.log('incoming', dat.incomingFiles);

  return (
    <div>
      <div>
        {
          !dat.connectedUrl
          ?
            <div className="bg-light">
              <div className="container text-left py-5 text-center">
                <h2>Open a Shared Directory</h2>
                <p className="text-muted">Use the form below to connect to a shared directory.</p>
                <div className="row">
                  <input className="form-control col" 
                    type="text" 
                    placeholder="Enter a Shared ID" 
                    value={archiveId}
                    onChange={archiveIdChanged} />
                  <a href="#" className="btn btn-primary d-flex ml-3" onClick={openSharedDirectory}>Connect</a>
                </div>
                
              </div>
            </div>
          :
          <div className="bg-info text-light py-5">
            <div className="container">
              <ArchiveBrowser name="Shared Directory" datUrl={''} files={dat.incomingFiles} />
            </div>
          </div>
        }
      </div> 
      <div className="album py-5">
        <div className="container">
          <input type="file" onChange={selectFile} />
          <ArchiveBrowser name="Your Local Directory" datUrl={dat.url} files={dat.myFiles} />
        </div>
      </div>
    </div>
  );
}

export default HomeComponent;
