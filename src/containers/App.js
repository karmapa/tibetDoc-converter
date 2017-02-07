import React, {Component} from 'react';
import tibetDoc from 'tibetdoc-parser';
import {DropdownButton, MenuItem, Nav, Navbar} from 'react-bootstrap';

const footerLogoImage = require('./footer-logo.png');

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      output: '',
      downLoadOptions: {
        href: '',
        target: '',
        download: ''
      }
    };
  }

  fileReader = new FileReader();

  converter = event => {
    const file = event.target.files[0];
    if (undefined === file) {
      this.setState({
        input: '',
        output: '',
        downLoadOptions:{
          href: '',
          target: '',
          download: ''
        }
      });
      return;
    }
    const fileReader = this.fileReader;
    fileReader.onload = () => {
      let data = fileReader.result;
      data = tibetDoc.parse(data.toString());
      data = tibetDoc.JSONToHTML(data);
      data = tibetDoc.HTMLtoText(data);
      var downLoad = new Blob([data], {encoding: 'utf8', type: 'text/html'});
      var url = URL.createObjectURL(downLoad);
      this.setState({
        input: file.name,
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
    const options = this.state.downLoadOptions;
    let result = 'result';
    let clickButton = (
      <div className="upLoadButton">
        <div className="fileLoad btn-primary">
          <span className="glyphicon glyphicon-open-file">upload</span>
          <input type="file" id="fileInput" onChange={this.converter} accept=".dct" />
        </div>
      </div>
    );
    if (this.state.output) {
      result = 'result render';
      clickButton = (
        <div className="upAndDownButton">
          <div className="fileLoad anti btn-primary">
            <span className="glyphicon glyphicon-open-file" aria-hidden="true">upload</span>
            <input type="file" id="fileInput" onChange={this.converter} accept=".dct" />
          </div>
          <a {...options}>
            <div className="fileDownload btn-primary">
              <span className="glyphicon glyphicon-save-file" aria-hidden="true">down</span>
            </div>
          </a>
        </div>
      );
    }

    let fileInfo = (
      <div className="fileType">
      Upload a file, type: docx, txt
      </div>
    );
    if (this.state.output) {
      let fileName = 'File name: ' + this.state.input;
      fileInfo = (
        <div>
          <div className="fileName">{fileName}</div>
          <div className="divLine" />
        </div>
      );
    }

    const dataInnerHTML = this.state.output.split('\n').map((str, idx) => {
      if (!str) {
        return;
      } else {
        return <div key={idx}>{str}</div>;
      }
    });

    return (
      <div className="app">
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <span className="brand" />
              <span className="brandText">Dharma Treasure</span>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>

        <div className="appContent">
          <div className="intruduction">
            <span className="intruImg" />
            <a href="https://drive.google.com//uc?export=download&id=0B9GraSYa0W12YjJUVFlHU09wMFU" target="_blank">
            <button className="downLoadButton">
              <i className="fa fa-cloud-download" aria-hidden="true"></i> Mac
            </button>
            </a>
            <button className="downLoadButton">
              <i className="fa fa-cloud-download" aria-hidden="true"></i> PC
            </button>
            <div className="intruTitle">TibetDoc to unicode converter</div>
            <div className="intruText">TibetDoc is a Tibetan document editing software that was developed by Padma Karpa Translation Committee. This software has been widely used by monasteries and monastic universities across the Himalayan region. We have developed a function to enable switching between TibetDoc format and the more common Unicode format for the convenience of users that have previously organized information using the TibetDoc format.</div>
          </div>
          {clickButton}
          {fileInfo}
          <div className={result}>{dataInnerHTML}</div>
        </div>

        <footer>
          <section>
            <div className="footerSection">
              <div className="footerContent container clearfix">
                <div className="row">
                  <div className="footerLogo col-sm-6">
                    <img src={footerLogoImage} alt="footer logo image" />
                  </div>
                  <div className="footerContact col-sm-6">
                    <h2>
                      Contact us
                    </h2>
                    <ul>
                      <li>
                        Email
                        <span>: dharma.treasure.corp@gmail.com</span>
                      </li>
                      <li>
                        Phone
                        <span>: 02-27586828</span>
                      </li>
                      <li>
                        Address
                        <span id="address-content">: 9F., No.401, Sec. 4, Xinyi Rd., Xinyi Dist., Taipei City 11051, Taiwan</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="footerCompany">
                  <i className="fa fa-fw fa-at" />
                  <span>@2016 Dharma Treasure Corp. All right reserved.</span>
                </div>
              </div>
            </div>
          </section>
        </footer>
      </div>
    );
  }
}

export default App;
