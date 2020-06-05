const VlRadio = require('../components/vl-radio');
const {Page, Config} = require('vl-ui-core').Test;
const {VlHeader} = require('vl-ui-header').Test;
const {VlFooter} = require('vl-ui-footer').Test;

class VlRadioPage extends Page {
  async _getRadio(selector) {
    return new VlRadio(this.driver, selector);
  }

  async getRadio(number) {
    return this._getRadio(`#radio-${number}`);
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-radio-group.html');
    const header = await new VlHeader(this.driver);
    const footer = await new VlFooter(this.driver);
    await header.remove();
    await footer.remove();
  }
}

module.exports = VlRadioPage;
