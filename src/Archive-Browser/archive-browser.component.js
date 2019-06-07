import React from 'react';

function ArchiveBrowser(props) {
  return (
    <div className="row">
      {
        props.files.map((file, index) => {
          return  <div className="col-4" key={index}>
            <div className="card">
              <div className="card-body">
                <h3>{file.name}</h3>
              </div>
            </div>
          </div>
        })
      }
    </div>
  );
}

export default ArchiveBrowser;
