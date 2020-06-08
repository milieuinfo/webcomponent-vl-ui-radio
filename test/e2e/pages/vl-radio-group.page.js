const VlRadio = require('../components/vl-radio');
const {Page, Config} = require('vl-ui-core').Test;

class VlRadioPage extends Page {
  async _getRadio(selector) {
    return new VlRadio(this.driver, selector);
  }

  async getRadio(number) {
    return this._getRadio(`#radio-${number}`);
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-radio-group.html?no-header=true&no-footer=true');
  }
}

module.exports = VlRadioPage;
