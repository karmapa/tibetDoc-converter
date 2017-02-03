import React, {Component} from 'react';
import tibetDoc from 'tibetdoc-parser';
import {DropdownButton, MenuItem, Nav, Navbar} from 'react-bootstrap';

const footerLogoImage = require('./footer-logo.png');

class App extends Component {
  constructor() {
    super();
    this.state = {
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
            <span className="intruText">TibetDoc is a Tibetan document editing software that was developed by Padma Karpa Translation Committee. This software has been widely used by monasteries and monastic universities across the Himalayan region. We have developed a function to enable switching between TibetDoc format and the more common Unicode format for the convenience of users that have previously organized information using the TibetDoc format.</span>
          </div>
          <div className="fileLoad">上傳檔案
            <input type="file" id="fileInput" onChange={this.converter} accept=".dct" />
          </div>
          <div id="downBar">
            {downLink}
          </div>
          <div className="divLine" />
          <pre_><font id="result">{dataInnerHTML}</font></pre_>
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
