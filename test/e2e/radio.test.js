
const { assert, driver } = require('vl-ui-core').Test;
const VlRadioPage = require('./pages/vl-radio.page');

describe('vl-radio', async () => {
    const vLRadioPage = new VLRadioPage(driver);

    before(() => {
        return vLRadioPage.load();
    });

    it('als gebruiker kan ik maar 1 radio tegelijkertijd aanvinken', async () => {
      // const checkbox1 = await vlRadioPage.getRadio1(); //todo
      // const checkbox2 = await vlRadioPage.getRadio2();
      //
      // await assert.eventually.isFalse(checkbox1.isChecked());
      // await assert.eventually.isTrue(checkbox2.isChecked());
      // await checkbox1.click();
      // await checkbox2.click();
      // await assert.eventually.isTrue(checkbox1.isChecked());
      // await assert.eventually.isFalse(checkbox2.isChecked());
    });

    // after(() => driver && driver.quit()); // todo nodig? checkbox heeft dit ook niet...
});
