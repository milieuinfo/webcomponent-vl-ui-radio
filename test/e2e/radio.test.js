const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlRadioPage = require('./pages/vl-radio.page');

describe('vl-radio', async () => {
  const vlRadioPage = new VlRadioPage(driver);

  before(() => {
    return vlRadioPage.load();
  });

  it('als gebruiker kan ik maar 1 radio tegelijkertijd aanvinken', async () => {
    const radio1 = await vlRadioPage.getRadio(1);
    const radio2 = await vlRadioPage.getRadio(2);

    await assert.eventually.isFalse(radio1.isChecked());
    await assert.eventually.isFalse(radio2.isChecked());
    await radio1.click();
    await assert.eventually.isTrue(radio1.isChecked());
    await assert.eventually.isFalse(radio2.isChecked());
    await radio2.click();
    await assert.eventually.isFalse(radio1.isChecked());
    await assert.eventually.isTrue(radio2.isChecked());
  });

  it('als gebruiker kan ik het verschil zien tussen een block en een gewone radio', async () => {
    const radio = await vlRadioPage.getRadio(1);
    const blockRadio = await vlRadioPage.getBlockRadio(1);
    await assert.eventually.isFalse(radio.isBlock());
    await assert.eventually.isTrue(blockRadio.isBlock());
  });

  it('als gebruiker kan ik het verschil zien tussen een error en een gewone radio', async () => {
    const radio = await vlRadioPage.getRadio(1);
    const errorRadio = await vlRadioPage.getErrorRadio(1);
    await assert.eventually.isFalse(radio.hasError());
    await assert.eventually.isTrue(errorRadio.hasError());
  });

  it('als gebruiker kan ik een disabled radio niet selecteren', async () => {
    const radio = await vlRadioPage.getRadio(1);
    const disabledRadio = await vlRadioPage.getDisabledRadio(1);
    await assert.eventually.isFalse(radio.isDisabled());
    await assert.eventually.isTrue(disabledRadio.isDisabled());
    await radio.click();
    await assert.eventually.isFalse(radio.isDisabled());
    await assert.eventually.isTrue(disabledRadio.isDisabled());
    await disabledRadio.click();
    await assert.eventually.isFalse(radio.isDisabled());
    await assert.eventually.isTrue(disabledRadio.isDisabled());
  });

  it('als gebruiker kan ik het verschil zien tussen een single en een gewone radio', async () => {
    const radio = await vlRadioPage.getRadio(1);
    const singleRadio = await vlRadioPage.getSingleRadio(1);
    await assert.eventually.isFalse(radio.isSingle());
    await assert.eventually.isTrue(singleRadio.isSingle());
  });

  it('als gebruiker kan ik zien dat een radio standaard aangevinkt staat', async () => {
    const radio1 = await vlRadioPage.getCheckedRadio(1);
    const radio2 = await vlRadioPage.getCheckedRadio(2);
    await assert.eventually.isFalse(radio1.isChecked());
    await assert.eventually.isTrue(radio2.isChecked());
  });
});
