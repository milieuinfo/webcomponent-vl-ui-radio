const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlRadioPage = require('./pages/vl-radio.page');

describe('vl-radio', async () => {
    const vlRadioPage = new VlRadioPage(driver);

    before(() => {
        return vlRadioPage.load();
    });

    it('als gebruiker kan ik maar 1 radio tegelijkertijd aanvinken', async () => {
      const radio1 = await vlRadioPage.getRadio1();
      const radio2 = await vlRadioPage.getRadio2();

      await assert.eventually.isFalse(radio1.isChecked());
      await assert.eventually.isFalse(radio2.isChecked());
      await radio1.toggle();
      await assert.eventually.isTrue(radio1.isChecked());
      await assert.eventually.isFalse(radio2.isChecked());
      await radio2.toggle();
      await assert.eventually.isFalse(radio1.isChecked());
      await assert.eventually.isTrue(radio2.isChecked());
    });
});
