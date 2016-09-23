import React, {Component} from 'react';
import Parser from 'tibetdoc-parser';

class App extends Component {
  render() {
    return (
      <div>
        <h1>TibetDoc to unicode converter</h1>
        <input type="file" id="fileInput" accept=".dct"></input>
        <div id="downBar">
          <a id=downLink></a><span id="reload">X</span>
        </div>
        <hr>
          <pre_><font id="a"><pre_>
        </hr>
      </div>
    );
  }
}

export default App;
