const VlRadio = require('../components/vl-radio');
const {Page, Config} = require('vl-ui-core').Test;

class VlRadioPage extends Page {
  async _getRadio(selector) {
    return new VlRadio(this.driver, selector);
  }

  async _getRadioByType(type, number) {
    return this._getRadio(`#radio-${type}-${number}`);
  }

  async getRadio(number) {
    return this._getRadio(`#radio-${number}`);
  }

  async getBlockRadio(number) {
    return this._getRadioByType('block', number);
  }

  async getErrorRadio(number) {
    return this._getRadioByType('error', number);
  }

  async getDisabledRadio(number) {
    return this._getRadioByType('disabled', number);
  }

  async getSingleRadio(number) {
    return this._getRadioByType('single', number);
  }

  async getCheckedRadio(number) {
    return this._getRadioByType('checked', number);
  }

  async getSlotLabelRadio(number) {
    return this._getRadioByType('slot-label', number);
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-radio.html?no-header=true&no-footer=true');
  }
}

module.exports = VlRadioPage;
