import React, {Component} from 'react';

class App extends Component {
  render() {
    return (
      <div>
        <h1>TibetDoc to unicode converter</h1>
        <input type="file" id="fileInput" accept=".dct" />
        <div id="downBar">
          <a id="downLink" /><span id="reload">X</span>
        </div>
        <div className="divLine" />
        <pre_><font id="a" /></pre_>
      </div>
    );
  }
}

export default App;
