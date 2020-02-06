const VlRadio = require('../components/vl-radio');
const { Page, Config } = require('vl-ui-core').Test;

class VlRadioPage extends Page {
    async _getRadio(selector) {
        return new VlRadio(this.driver, selector);
    }

  async getRadio1() {
    return await this._getRadio('#radio-1');
  }

  async getRadio2() {
    return await this._getRadio('#radio-2');
  }

  async getRadio3() {
    return await this._getRadio('#radio-3');
  }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-radio.html');
    }
}

module.exports = VlRadioPage;
