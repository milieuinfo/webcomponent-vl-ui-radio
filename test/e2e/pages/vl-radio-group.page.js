const {Page, Config} = require('vl-ui-core').Test;
const VlRadioGroup = require('../components/vl-radio-group');

class VlRadioPage extends Page {
  async getRadioGroup(number) {
    return this._getRadioGroup(`#radio-group-${number}`);
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-radio-group.html');
  }

  async _getRadioGroup(selector) {
    return new VlRadioGroup(this.driver, selector);
  }
}

module.exports = VlRadioPage;
