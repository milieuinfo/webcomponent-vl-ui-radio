const {Config} = require('vl-ui-core').Test;
const {assert, driver, By, Key} = require('vl-ui-core').Test.Setup;
const VlRadioGroupPage = require('./pages/vl-radio-group.page');

describe('vl-radio-group', async () => {
  const vlRadioGroupPage = new VlRadioGroupPage(driver);

  beforeEach(async () => {
    await vlRadioGroupPage.load();
  });

  it('als gebruiker kan ik maar 1 radio tegelijkertijd aanvinken', async () => {
    const radioGroup = await vlRadioGroupPage.getRadioGroup(1);
    const radio1 = await radioGroup.getRadio(1);
    const radio2 = await radioGroup.getRadio(2);

    await assert.eventually.isFalse(radio1.isChecked());
    await assert.eventually.isFalse(radio2.isChecked());
    await radio1.click();
    await assert.eventually.isTrue(radio1.isChecked());
    await assert.eventually.isFalse(radio2.isChecked());
    await radio2.click();
    await assert.eventually.isFalse(radio1.isChecked());
    await assert.eventually.isTrue(radio2.isChecked());
  });

  it('als gebruiker kan ik de radio group elementen bereiken via de tab toets', async () => {
    const html = await driver.findElement(By.css('html'));
    const radioGroup1 = await vlRadioGroupPage.getRadioGroup(1);
    const radioGroup2 = await vlRadioGroupPage.getRadioGroup(2);
    const radioGroup1Radio1 = await radioGroup1.getRadio(1);
    const radioGroup1Radio2 = await radioGroup1.getRadio(2);
    const radioGroup2Radio1 = await radioGroup2.getRadio(1);
    const radioGroup2Radio2 = await radioGroup2.getRadio(2);

    await assert.eventually.isFalse(radioGroup1Radio1.hasFocus());
    await assert.eventually.isFalse(radioGroup1Radio2.hasFocus());
    await assert.eventually.isFalse(radioGroup2Radio1.hasFocus());
    await assert.eventually.isFalse(radioGroup2Radio2.hasFocus());

    if (Config.browserName == 'chrome') {
      await html.sendKeys(Key.TAB);
      await html.sendKeys(Key.TAB);
      await html.sendKeys(Key.TAB);
      await html.sendKeys(Key.TAB);
      await assert.eventually.isTrue(radioGroup1Radio1.hasFocus());
      await assert.eventually.isFalse(radioGroup1Radio2.hasFocus());
      await assert.eventually.isFalse(radioGroup2Radio1.hasFocus());
      await assert.eventually.isFalse(radioGroup2Radio2.hasFocus());

      await radioGroup1Radio1.sendKeys(Key.TAB);
      await assert.eventually.isFalse(radioGroup1Radio1.hasFocus());
      await assert.eventually.isFalse(radioGroup1Radio2.hasFocus());
      await assert.eventually.isTrue(radioGroup2Radio1.hasFocus());
      await assert.eventually.isFalse(radioGroup2Radio2.hasFocus());
    } else {
      // TODO fix docker issues
      // await html.sendKeys(Key.TAB);
      // await assert.eventually.isTrue(radioGroup1Radio1.hasFocus());
      // await assert.eventually.isFalse(radioGroup1Radio2.hasFocus());
      // await assert.eventually.isFalse(radioGroup2Radio1.hasFocus());
      // await assert.eventually.isFalse(radioGroup2Radio2.hasFocus());

      // await radioGroup1Radio1.sendKeys(Key.TAB);
      // await radioGroup1Radio2.sendKeys(Key.TAB);
      // await assert.eventually.isFalse(radioGroup1Radio1.hasFocus());
      // await assert.eventually.isFalse(radioGroup1Radio2.hasFocus());
      // await assert.eventually.isTrue(radioGroup2Radio1.hasFocus());
      // await assert.eventually.isFalse(radioGroup2Radio2.hasFocus());
    }
  });

  it('als gebruiker kan ik de radio group elementen bereiken via de shift tab toets', async () => {
    const html = await driver.findElement(By.css('html'));
    const radioGroup1 = await vlRadioGroupPage.getRadioGroup(1);
    const radioGroup2 = await vlRadioGroupPage.getRadioGroup(2);
    const radioGroup1Radio1 = await radioGroup1.getRadio(1);
    const radioGroup1Radio2 = await radioGroup1.getRadio(2);
    const radioGroup2Radio1 = await radioGroup2.getRadio(1);
    const radioGroup2Radio2 = await radioGroup2.getRadio(2);

    await assert.eventually.isFalse(radioGroup1Radio1.hasFocus());
    await assert.eventually.isFalse(radioGroup1Radio2.hasFocus());
    await assert.eventually.isFalse(radioGroup2Radio1.hasFocus());
    await assert.eventually.isFalse(radioGroup2Radio2.hasFocus());

    if (Config.browserName == 'chrome') {
      await html.sendKeys(Key.TAB);
      await html.sendKeys(Key.TAB);
      await html.sendKeys(Key.TAB);
      await html.sendKeys(Key.TAB);
      await html.sendKeys(Key.TAB);
      await radioGroup1Radio1.sendKeys(Key.TAB);
      await radioGroup2Radio1.sendKeys(Key.TAB);
      await assert.eventually.isFalse(radioGroup1Radio1.hasFocus());
      await assert.eventually.isFalse(radioGroup1Radio2.hasFocus());
      await assert.eventually.isFalse(radioGroup2Radio1.hasFocus());
      await assert.eventually.isFalse(radioGroup2Radio2.hasFocus());

      await html.sendKeys(Key.SHIFT + Key.TAB);
      await assert.eventually.isFalse(radioGroup1Radio1.hasFocus());
      await assert.eventually.isFalse(radioGroup1Radio2.hasFocus());
      await assert.eventually.isFalse(radioGroup2Radio1.hasFocus());
      await assert.eventually.isTrue(radioGroup2Radio2.hasFocus());

      await radioGroup2Radio2.sendKeys(Key.SHIFT + Key.TAB);
      await assert.eventually.isFalse(radioGroup1Radio1.hasFocus());
      await assert.eventually.isTrue(radioGroup1Radio2.hasFocus());
      await assert.eventually.isFalse(radioGroup2Radio1.hasFocus());
      await assert.eventually.isFalse(radioGroup2Radio2.hasFocus());

      await radioGroup1Radio2.sendKeys(Key.SHIFT + Key.TAB);
      await assert.eventually.isFalse(radioGroup1Radio1.hasFocus());
      await assert.eventually.isFalse(radioGroup1Radio2.hasFocus());
      await assert.eventually.isFalse(radioGroup2Radio1.hasFocus());
      await assert.eventually.isFalse(radioGroup2Radio2.hasFocus());
    } else {
      // TODO fix docker issues
      // await html.sendKeys(Key.TAB);
      // await radioGroup1Radio1.sendKeys(Key.TAB);
      // await radioGroup1Radio2.sendKeys(Key.TAB);
      // await radioGroup2Radio1.sendKeys(Key.TAB);
      // await assert.eventually.isFalse(radioGroup1Radio1.hasFocus());
      // await assert.eventually.isFalse(radioGroup1Radio2.hasFocus());
      // await assert.eventually.isFalse(radioGroup2Radio1.hasFocus());
      // await assert.eventually.isTrue(radioGroup2Radio2.hasFocus());

      // await radioGroup2Radio2.sendKeys(Key.SHIFT + Key.TAB);
      // await assert.eventually.isFalse(radioGroup1Radio1.hasFocus());
      // await assert.eventually.isFalse(radioGroup1Radio2.hasFocus());
      // await assert.eventually.isTrue(radioGroup2Radio1.hasFocus());
      // await assert.eventually.isFalse(radioGroup2Radio2.hasFocus());

      // await radioGroup2Radio1.sendKeys(Key.SHIFT + Key.TAB);
      // await assert.eventually.isFalse(radioGroup1Radio1.hasFocus());
      // await assert.eventually.isTrue(radioGroup1Radio2.hasFocus());
      // await assert.eventually.isFalse(radioGroup2Radio1.hasFocus());
      // await assert.eventually.isFalse(radioGroup2Radio2.hasFocus());

      // await radioGroup1Radio2.sendKeys(Key.SHIFT + Key.TAB);
      // await assert.eventually.isTrue(radioGroup1Radio1.hasFocus());
      // await assert.eventually.isFalse(radioGroup1Radio2.hasFocus());
      // await assert.eventually.isFalse(radioGroup2Radio1.hasFocus());
      // await assert.eventually.isFalse(radioGroup2Radio2.hasFocus());

      // await radioGroup1Radio1.sendKeys(Key.SHIFT + Key.TAB);
      // await assert.eventually.isFalse(radioGroup1Radio1.hasFocus());
      // await assert.eventually.isFalse(radioGroup1Radio2.hasFocus());
      // await assert.eventually.isFalse(radioGroup2Radio1.hasFocus());
      // await assert.eventually.isFalse(radioGroup2Radio2.hasFocus());
    }
  });
});
