import React from 'react';
import logo from '../ironman.png';
import { Link } from "react-router-dom";
import ArchiveBrowser from '../Archive-Browser/archive-browser.component';

class HomeComponent extends React.Component {
  state = {
    archiveId: '',
    personalFiles: [
      {
        name: 'File Name 1'
      },
      {
        name: 'File Name 2'
      }
    ],
    sharedFiles: []
  };

  constructor(props) {
    super(props);

    this.archiveIdChanged = this.archiveIdChanged.bind(this);
    this.openSharedDirectory = this.openSharedDirectory.bind(this);
  }

  archiveIdChanged = (event) => {
    this.setState({ archiveId: event.target.value });
  }

  openSharedDirectory = () => {
    const sharedFiles = this.state.sharedFiles.push(this.state.value);
    this.setState({ sharedFiles: sharedFiles });
  }

  render() {
    return (
      <div>
        
        {
          this.state.sharedFiles.length === 0 && 
          <div className="bg-light">
            <div className="container text-left py-5 text-center">
              <h2>Open a Shared Directory</h2>
              <input className="form-control mb-3" 
                type="text" 
                placeholder="Enter a Shared ID" 
                value={this.state.archiveId}
                onChange={this.archiveIdChanged} />
              <a href="#" className="btn btn-primary" onClick={this.openSharedDirectory}>Open</a>
            </div>
          </div>
        }
        <div className="album py-5">
          <div className="container">
            <h2>Your Local Directory</h2>
            <ArchiveBrowser files={this.state.personalFiles} />
          </div>
          
        </div>
      </div>
    );
  }

  // render() {
  //   return (
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Welcome to Ironman File-Sharing
  //       </p>
  //       <div className="form-group">
          
  //       </div>
  //       <Link to="/archive">View Archive</Link>
  //     </header>
  //   );
  // }

}
export default HomeComponent;