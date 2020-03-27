const { VlElement } = require('vl-ui-core').Test;
const { By } = require('vl-ui-core').Test.Setup;

class VlRadio extends VlElement {
  async click() {
    const label = await this._getLabel();
    await label.click();
  }

  async isChecked() {
    const input = await this._getInput();
    return this.driver.executeScript('return arguments[0].checked', input);
  }

  async isBlock() {
    return this.hasAttribute('data-vl-block');
  }

  async isDisabled() {
    return this.hasAttribute('data-vl-disabled');
  }

  async isSingle() {
    return this.hasAttribute('data-vl-single');
  }

  async hasError() {
    return this.hasAttribute('data-vl-error');
  }

  async _getInput() {
    return this.shadowRoot.findElement(By.css("input[type='radio']"));
  }

  async _getLabel() {
    return this.shadowRoot.findElement(By.css('.vl-radio__label'));
  }
}

module.exports = VlRadio;
