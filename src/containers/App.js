import React, {Component} from 'react';
import tibetDoc from 'tibetdoc-parser';

class App extends Component {
  constructor() {
    super();
    this.state = {
      output: '',
      downLoadOptions: {
        href: ''
      }
    };
  }

  fileReader = new FileReader();

  converter = event => {
    const file = event.target.files[0];
    const fileReader = this.fileReader;
    fileReader.onload = () => {
      let data = fileReader.result;
      data = tibetDoc.parse(data.toString());
      data = tibetDoc.JSONToHTML(data);
      data = data.replace(/<p.+?>/g, '\n').replace(/&nbsp;/g, ' ').replace(/<.+?>/g, '').replace(/^\r?\n/g, '');
      var downLoad = new Blob([data], {encoding: 'utf8', type: 'text/html'});
      var url = URL.createObjectURL(downLoad);
      this.setState({
        output: data,
        downLoadOptions:{
          href: url,
          target: '_blank',
          download: 'convertedDocument.txt'
        }
      });
    };
    fileReader.readAsBinaryString(file);
  }

  render() {
    const dataInnerHTML = this.state.output.split('\n').map((str, idx) => {
      if (!str) {
        return;
      } else {
        return <div className="lineBreak" key={idx}>{str}</div>;
      }
    });
    const options = this.state.downLoadOptions;
    let downLink = '';
    if (this.state.downLoadOptions.href !== '') {
      downLink = <span><a id="downLink" {...options}>Download</a><span id="reload">X</span></span>;
    } else {
      downLink = '';
    }
    return (
      <div>
        <h1>TibetDoc to unicode converter</h1>
        <input type="file" id="fileInput" onChange={this.converter} accept=".dct" />
        <div id="downBar">
          {downLink}
        </div>
        <div className="divLine" />
        <pre_><font id="result" />{dataInnerHTML}</pre_>
      </div>
    );
  }
}

export default App;
