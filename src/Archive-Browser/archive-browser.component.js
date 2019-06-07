import React from 'react';

function ArchiveBrowser(props) {
  function copyUrl() {
    console.log('copy the url')
  }
  
  return (
    <div className="py-3">
      <h2>{props.name}</h2>
      <p>
        <small>URL: {props.datUrl}</small>
        <a href="#" onClick={copyUrl}>
          <i className="fas fa-copy pl-2"></i>
        </a>
      </p>
      { 
        props.files && props.files.length
        ? 
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
        :
        <h3 className="text-center">No files in directory</h3>
      }
    </div>
    
  );
}

export default ArchiveBrowser;
