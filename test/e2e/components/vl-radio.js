const VlElement = require('./vl-element');

class VLRadio extends VlElement {  
    constructor(driver, selector) {
        super(driver, selector);
    }

  async _getRadio() {
    return this.shadowRoot;
  }

}

module.exports = VLRadio;
