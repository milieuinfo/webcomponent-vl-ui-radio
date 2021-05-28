const {assert, getDriver, Key} = require('vl-ui-core').Test.Setup;
const VlRadioAddendumPage = require('./pages/vl-radio-addendum.page');

describe('vl-radio addendum', async () => {
  let driver;
  let vlRadioPage;

  beforeEach(() => {
    driver = getDriver();
    vlRadioPage = new VlRadioAddendumPage(driver);
    return vlRadioPage.load();
  });

  it('WCAG', async () => {
    await assert.eventually.isFalse(vlRadioPage.hasWcagIssues());
  });

  it('als gebruiker kan ik het radio label zien', async () => {
    const radio = await vlRadioPage.getSlotLabelRadio(1);
    const slotLabels = await radio.labelSlotElements();
    await assert.eventually.equal(slotLabels[0].getText(), 'Ja');
  });

  it('als gebruiker kan ik zien dat een radio standaard aangevinkt staat', async () => {
    const radio1 = await vlRadioPage.getCheckedRadio(1);
    const radio2 = await vlRadioPage.getCheckedRadio(2);
    await assert.eventually.isFalse(radio1.isChecked());
    await assert.eventually.isTrue(radio2.isChecked());
  });

  it('als gebruiker kan ik een radio met een shadow DOM parent aanvinken door gebruik te maken van de pijl toetsen', async () => {
    const radios = await vlRadioPage.getShadowDOMRadioElement();
    const radio1 = await vlRadioPage.getShadowDOMRadio(1);
    const radio2 = await vlRadioPage.getShadowDOMRadio(2);
    await assert.eventually.isFalse(radio1.isChecked());
    await assert.eventually.isFalse(radio2.isChecked());

    await radio1.click();
    await assert.eventually.isTrue(radio1.isChecked());
    await assert.eventually.isFalse(radio2.isChecked());

    await radios.sendKeys(Key.RIGHT);
    await assert.eventually.isFalse(radio1.isChecked());
    await assert.eventually.isTrue(radio2.isChecked());
  });
});
