const VLRadio = require('../components/vl-radio');
const { Page, Config } = require('vl-ui-core');

class VLRadioPage extends Page {
    async _getRadio(selector) {
        return new VlRadio(this.driver, selector);
    }

  async getRadio1() {
    return await this._getRadio('#radio-1');
  }

  async getRadio2() {
    return await this._getRadio('#radio-2');
  }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-checkbox.html');
    }
}

module.exports = VLRadioPage;
