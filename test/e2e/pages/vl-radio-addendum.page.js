const VlRadio = require('../components/vl-radio');
const {Page, Config, VlElement} = require('vl-ui-core').Test;
const vlRadioPage = require('./vl-radio-mixin.page');

class VlRadioAddendumPage extends vlRadioPage(Page) {
  async getCheckedRadio(number) {
    return this._getRadioByType('checked', number);
  }

  async getSlotLabelRadio(number) {
    return this._getRadioByType('slot-label', number);
  }

  async getShadowDOMRadioElement() {
    return new VlElement(this.driver, 'vl-radio-test');
  }

  async getShadowDOMRadio(number) {
    const element = await this.getShadowDOMRadioElement();
    const radio = await this.driver.executeScript(`return arguments[0].shadowRoot.querySelector('#radio-${number}')`, element);
    return new VlRadio(this.driver, radio);
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-radio.html');
  }
}

module.exports = VlRadioAddendumPage;
