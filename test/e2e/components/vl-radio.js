const {VlElement} = require('vl-ui-core').Test;
const {By} = require('vl-ui-core').Test.Setup;

class VlRadio extends VlElement {
  constructor(driver, selector) {
    super(driver, selector);
  }

  async isChecked() {
    const input = await this._getInput();
    return this.driver.executeScript('return arguments[0].checked', input);
  }

  async toggle() {
    return this.driver.executeScript('arguments[0].toggle()', this);
  }

  async _getInput() {
    return this.shadowRoot.findElement(By.css("input[type='radio']"));
  }
}

module.exports = VlRadio;
