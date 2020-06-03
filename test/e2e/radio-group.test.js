const {assert, driver} = require('vl-ui-core').Test.Setup;
const VlRadioGroupPage = require('./pages/vl-radio-group.page');

describe('vl-radio-group', async () => {
  const vlRadioGroupPage = new VlRadioGroupPage(driver);

  before(() => {
    return vlRadioGroupPage.load();
  });

  it('als gebruiker kan ik maar 1 radio tegelijkertijd aanvinken', async () => {
    const radio1 = await vlRadioGroupPage.getRadio(1);
    const radio2 = await vlRadioGroupPage.getRadio(2);

    await assert.eventually.isFalse(radio1.isChecked());
    await assert.eventually.isFalse(radio2.isChecked());
    await radio1.click();
    await assert.eventually.isTrue(radio1.isChecked());
    await assert.eventually.isFalse(radio2.isChecked());
    await radio2.click();
    await assert.eventually.isFalse(radio1.isChecked());
    await assert.eventually.isTrue(radio2.isChecked());
  });
});
