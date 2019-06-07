import React from 'react';

class ArchiveBrowser extends React.Component {
  render() {
    return (
      <div className="row">
          {
            this.props.files.map((file, index) => {
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

}
export default ArchiveBrowser;