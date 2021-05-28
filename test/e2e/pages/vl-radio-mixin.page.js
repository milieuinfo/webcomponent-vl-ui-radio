const VlRadio = require('../components/vl-radio');

const vlRadioPage = (SuperClass) => {
  return class extends SuperClass {
    async _getRadio(selector) {
      return new VlRadio(this.driver, selector);
    }

    async _getRadioByType(type, number) {
      return this._getRadio(`#radio-${type}-${number}`);
    }
  };
};

module.exports = vlRadioPage;
