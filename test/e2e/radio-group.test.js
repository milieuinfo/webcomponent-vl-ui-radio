const {Config} = require('vl-ui-core').Test;
const {assert, getDriver, By, Key} = require('vl-ui-core').Test.Setup;
const VlRadioGroupPage = require('./pages/vl-radio-group.page');

describe('vl-radio-group', async () => {
  let vlRadioGroupPage;

  beforeEach(() => {
    vlRadioGroupPage = new VlRadioGroupPage(getDriver());
    return vlRadioGroupPage.load();
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

  it('als gebruiker kan ik een radio aanvinken en zien dat deze focus gekregen heeft', async () => {
    const radioGroup = await vlRadioGroupPage.getRadioGroup(1);
    const radio1 = await radioGroup.getRadio(1);
    const radio2 = await radioGroup.getRadio(2);
    await assert.eventually.isFalse(radio1.isChecked());
    await assert.eventually.isFalse(radio2.isChecked());

    await radio2.click();
    await assert.eventually.isFalse(radio1.isChecked());
    await assert.eventually.isFalse(radio1.hasFocus());
    await assert.eventually.isTrue(radio2.isChecked());
    await assert.eventually.isTrue(radio2.hasFocus());
  });

  it('als gebruiker kan ik de radio group elementen bereiken via de tab toets en krijgt het eerste of reeds geselecteerde radio element focus', async () => {
    if (Config.browserName == 'chrome') { // TODO fix docker issues
      const html = await driver.findElement(By.css('html'));
      const radioGroup1 = await vlRadioGroupPage.getRadioGroup(1);
      const radioGroup2 = await vlRadioGroupPage.getRadioGroup(2);
      const radioGroup3 = await vlRadioGroupPage.getRadioGroup(3);
      const radioGroup1Radio1 = await radioGroup1.getRadio(1);
      const radioGroup1Radio2 = await radioGroup1.getRadio(2);
      const radioGroup2Radio1 = await radioGroup2.getRadio(1);
      const radioGroup2Radio2 = await radioGroup2.getRadio(2);
      const radioGroup3Radio1 = await radioGroup3.getRadio(1);
      const radioGroup3Radio2 = await radioGroup3.getRadio(2);

      await assert.eventually.isFalse(radioGroup1Radio1.hasFocus());
      await assert.eventually.isFalse(radioGroup1Radio2.hasFocus());
      await assert.eventually.isFalse(radioGroup2Radio1.hasFocus());
      await assert.eventually.isFalse(radioGroup2Radio2.hasFocus());
      await assert.eventually.isFalse(radioGroup3Radio1.hasFocus());
      await assert.eventually.isFalse(radioGroup3Radio2.hasFocus());

      if (Config.browserName == 'chrome') {
        await html.sendKeys(Key.TAB);
        await html.sendKeys(Key.TAB);
        await html.sendKeys(Key.TAB);
        await html.sendKeys(Key.TAB);
      } else {
        await html.sendKeys(Key.TAB);
      }

      await assert.eventually.isTrue(radioGroup1Radio1.hasFocus());
      await assert.eventually.isFalse(radioGroup1Radio2.hasFocus());
      await assert.eventually.isFalse(radioGroup2Radio1.hasFocus());
      await assert.eventually.isFalse(radioGroup2Radio2.hasFocus());
      await assert.eventually.isFalse(radioGroup3Radio1.hasFocus());
      await assert.eventually.isFalse(radioGroup3Radio2.hasFocus());

      if (Config.browserName == 'chrome') {
        await radioGroup1Radio1.sendKeys(Key.TAB);
      } else {
        await radioGroup1Radio1.sendKeys(Key.TAB);
        await radioGroup1Radio2.sendKeys(Key.TAB);
      }

      await assert.eventually.isFalse(radioGroup1Radio1.hasFocus());
      await assert.eventually.isFalse(radioGroup1Radio2.hasFocus());
      await assert.eventually.isTrue(radioGroup2Radio1.hasFocus());
      await assert.eventually.isFalse(radioGroup2Radio2.hasFocus());
      await assert.eventually.isFalse(radioGroup3Radio1.hasFocus());
      await assert.eventually.isFalse(radioGroup3Radio2.hasFocus());

      if (Config.browserName == 'chrome') {
        await radioGroup2Radio1.sendKeys(Key.TAB);
      } else {
        await radioGroup2Radio1.sendKeys(Key.TAB);
        await radioGroup2Radio2.sendKeys(Key.TAB);
      }

      await assert.eventually.isFalse(radioGroup1Radio1.hasFocus());
      await assert.eventually.isFalse(radioGroup1Radio2.hasFocus());
      await assert.eventually.isFalse(radioGroup2Radio1.hasFocus());
      await assert.eventually.isFalse(radioGroup2Radio2.hasFocus());
      await assert.eventually.isFalse(radioGroup3Radio1.hasFocus());
      await assert.eventually.isTrue(radioGroup3Radio2.hasFocus());
    }
  });

  it('als gebruiker kan ik de radio group elementen bereiken via de shift tab toets', async () => {
    if (Config.browserName == 'chrome') { // TODO fix docker issues
      const html = await driver.findElement(By.css('html'));
      const radioGroup1 = await vlRadioGroupPage.getRadioGroup(1);
      const radioGroup2 = await vlRadioGroupPage.getRadioGroup(2);
      const radioGroup3 = await vlRadioGroupPage.getRadioGroup(3);
      const radioGroup4 = await vlRadioGroupPage.getRadioGroup(4);
      const radioGroup1Radio1 = await radioGroup1.getRadio(1);
      const radioGroup1Radio2 = await radioGroup1.getRadio(2);
      const radioGroup2Radio1 = await radioGroup2.getRadio(1);
      const radioGroup2Radio2 = await radioGroup2.getRadio(2);
      const radioGroup3Radio1 = await radioGroup3.getRadio(1);
      const radioGroup3Radio2 = await radioGroup3.getRadio(2);
      const radioGroup4Radio1 = await radioGroup4.getRadio(1);
      const radioGroup4Radio2 = await radioGroup4.getRadio(2);
      const radioGroup4Radio3 = await radioGroup4.getRadio(3);

      await assert.eventually.isFalse(radioGroup1Radio1.hasFocus());
      await assert.eventually.isFalse(radioGroup1Radio2.hasFocus());
      await assert.eventually.isFalse(radioGroup2Radio1.hasFocus());
      await assert.eventually.isFalse(radioGroup2Radio2.hasFocus());
      await assert.eventually.isFalse(radioGroup3Radio1.hasFocus());
      await assert.eventually.isFalse(radioGroup3Radio2.hasFocus());
      await assert.eventually.isFalse(radioGroup4Radio1.hasFocus());
      await assert.eventually.isFalse(radioGroup4Radio2.hasFocus());
      await assert.eventually.isFalse(radioGroup4Radio3.hasFocus());

      if (Config.browserName == 'chrome') {
        await html.sendKeys(Key.TAB);
        await html.sendKeys(Key.TAB);
        await html.sendKeys(Key.TAB);
        await html.sendKeys(Key.TAB);
        await radioGroup1Radio1.sendKeys(Key.TAB);
        await radioGroup2Radio1.sendKeys(Key.TAB);
        await radioGroup3Radio2.sendKeys(Key.TAB);
        await radioGroup4Radio1.sendKeys(Key.TAB);
        await assert.eventually.isFalse(radioGroup1Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup1Radio2.hasFocus());
        await assert.eventually.isFalse(radioGroup2Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup2Radio2.hasFocus());
        await assert.eventually.isFalse(radioGroup3Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup3Radio2.hasFocus());
        await assert.eventually.isFalse(radioGroup4Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup4Radio2.hasFocus());
        await assert.eventually.isFalse(radioGroup4Radio3.hasFocus());

        await html.sendKeys(Key.SHIFT + Key.TAB);
        await assert.eventually.isFalse(radioGroup1Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup1Radio2.hasFocus());
        await assert.eventually.isFalse(radioGroup2Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup2Radio2.hasFocus());
        await assert.eventually.isFalse(radioGroup3Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup3Radio2.hasFocus());
        await assert.eventually.isFalse(radioGroup4Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup4Radio2.hasFocus());
        await assert.eventually.isTrue(radioGroup4Radio3.hasFocus());

        await radioGroup4Radio3.sendKeys(Key.SHIFT + Key.TAB);
        await assert.eventually.isFalse(radioGroup1Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup1Radio2.hasFocus());
        await assert.eventually.isFalse(radioGroup2Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup2Radio2.hasFocus());
        await assert.eventually.isFalse(radioGroup3Radio1.hasFocus());
        await assert.eventually.isTrue(radioGroup3Radio2.hasFocus());
        await assert.eventually.isFalse(radioGroup4Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup4Radio2.hasFocus());
        await assert.eventually.isFalse(radioGroup4Radio3.hasFocus());

        await radioGroup3Radio2.sendKeys(Key.SHIFT + Key.TAB);
        await assert.eventually.isFalse(radioGroup1Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup1Radio2.hasFocus());
        await assert.eventually.isFalse(radioGroup2Radio1.hasFocus());
        await assert.eventually.isTrue(radioGroup2Radio2.hasFocus());
        await assert.eventually.isFalse(radioGroup3Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup3Radio2.hasFocus());

        await radioGroup2Radio2.sendKeys(Key.SHIFT + Key.TAB);
        await assert.eventually.isFalse(radioGroup1Radio1.hasFocus());
        await assert.eventually.isTrue(radioGroup1Radio2.hasFocus());
        await assert.eventually.isFalse(radioGroup2Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup2Radio2.hasFocus());
        await assert.eventually.isFalse(radioGroup3Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup3Radio2.hasFocus());

        await radioGroup1Radio2.sendKeys(Key.SHIFT + Key.TAB);
        await assert.eventually.isFalse(radioGroup1Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup1Radio2.hasFocus());
        await assert.eventually.isFalse(radioGroup2Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup2Radio2.hasFocus());
        await assert.eventually.isFalse(radioGroup3Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup3Radio2.hasFocus());
      } else {
        await html.sendKeys(Key.TAB);
        await radioGroup1Radio1.sendKeys(Key.TAB);
        await radioGroup1Radio2.sendKeys(Key.TAB);
        await radioGroup2Radio1.sendKeys(Key.TAB);
        await radioGroup2Radio2.sendKeys(Key.TAB);
        await assert.eventually.isFalse(radioGroup1Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup1Radio2.hasFocus());
        await assert.eventually.isFalse(radioGroup2Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup2Radio2.hasFocus());
        await assert.eventually.isFalse(radioGroup3Radio1.hasFocus());
        await assert.eventually.isTrue(radioGroup3Radio2.hasFocus());

        await radioGroup3Radio2.sendKeys(Key.SHIFT + Key.TAB);
        await assert.eventually.isFalse(radioGroup1Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup1Radio2.hasFocus());
        await assert.eventually.isFalse(radioGroup2Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup2Radio2.hasFocus());
        await assert.eventually.isTrue(radioGroup3Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup3Radio2.hasFocus());

        await radioGroup3Radio1.sendKeys(Key.SHIFT + Key.TAB);
        await assert.eventually.isFalse(radioGroup1Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup1Radio2.hasFocus());
        await assert.eventually.isFalse(radioGroup2Radio1.hasFocus());
        await assert.eventually.isTrue(radioGroup2Radio2.hasFocus());
        await assert.eventually.isFalse(radioGroup3Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup3Radio2.hasFocus());

        await radioGroup2Radio2.sendKeys(Key.SHIFT + Key.TAB);
        await assert.eventually.isFalse(radioGroup1Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup1Radio2.hasFocus());
        await assert.eventually.isTrue(radioGroup2Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup2Radio2.hasFocus());
        await assert.eventually.isFalse(radioGroup3Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup3Radio2.hasFocus());

        await radioGroup2Radio1.sendKeys(Key.SHIFT + Key.TAB);
        await assert.eventually.isFalse(radioGroup1Radio1.hasFocus());
        await assert.eventually.isTrue(radioGroup1Radio2.hasFocus());
        await assert.eventually.isFalse(radioGroup2Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup2Radio2.hasFocus());
        await assert.eventually.isFalse(radioGroup3Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup3Radio2.hasFocus());

        await radioGroup1Radio2.sendKeys(Key.SHIFT + Key.TAB);
        await assert.eventually.isTrue(radioGroup1Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup1Radio2.hasFocus());
        await assert.eventually.isFalse(radioGroup2Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup2Radio2.hasFocus());
        await assert.eventually.isFalse(radioGroup3Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup3Radio2.hasFocus());

        await radioGroup1Radio1.sendKeys(Key.SHIFT + Key.TAB);
        await assert.eventually.isFalse(radioGroup1Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup1Radio2.hasFocus());
        await assert.eventually.isFalse(radioGroup2Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup2Radio2.hasFocus());
        await assert.eventually.isFalse(radioGroup3Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup3Radio2.hasFocus());
      }
    }
  });

  it('als gebruiker kan ik een radio aanvinken door gebruik te maken van de pijl toetsen', async () => {
    if (Config.browserName == 'chrome') { // TODO fix docker issues
      const html = await driver.findElement(By.css('html'));
      const radioGroup = await vlRadioGroupPage.getRadioGroup(1);
      const radio1 = await radioGroup.getRadio(1);
      const radio2 = await radioGroup.getRadio(2);
      await assert.eventually.isFalse(radio1.isChecked());
      await assert.eventually.isFalse(radio2.isChecked());

      if (Config.browserName == 'chrome') {
        await html.sendKeys(Key.TAB);
        await html.sendKeys(Key.TAB);
        await html.sendKeys(Key.TAB);
        await html.sendKeys(Key.TAB);
      } else {
        await html.sendKeys(Key.TAB);
      }

      await radio1.sendKeys(Key.RIGHT);
      await assert.eventually.isFalse(radio1.isChecked());
      await assert.eventually.isTrue(radio2.isChecked());

      await radio2.sendKeys(Key.LEFT);
      await assert.eventually.isTrue(radio1.isChecked());
      await assert.eventually.isFalse(radio2.isChecked());

      await radio1.sendKeys(Key.UP);
      await assert.eventually.isFalse(radio1.isChecked());
      await assert.eventually.isTrue(radio2.isChecked());

      await radio2.sendKeys(Key.DOWN);
      await assert.eventually.isTrue(radio1.isChecked());
      await assert.eventually.isFalse(radio2.isChecked());
    }
  });

  it('als gebruiker kan ik door gebruik te maken van de pijl toetsen van de laatste radio naar de eerste gaan en omgekeerd', async () => {
    if (Config.browserName == 'chrome') { // TODO fix docker issues
      const html = await driver.findElement(By.css('html'));
      const radioGroup = await vlRadioGroupPage.getRadioGroup(1);
      const radio1 = await radioGroup.getRadio(1);
      const radio2 = await radioGroup.getRadio(2);
      await assert.eventually.isFalse(radio1.isChecked());
      await assert.eventually.isFalse(radio2.isChecked());

      if (Config.browserName == 'chrome') {
        await html.sendKeys(Key.TAB);
        await html.sendKeys(Key.TAB);
        await html.sendKeys(Key.TAB);
        await html.sendKeys(Key.TAB);
      } else {
        await html.sendKeys(Key.TAB);
      }

      await radio1.sendKeys(Key.RIGHT);
      await assert.eventually.isFalse(radio1.isChecked());
      await assert.eventually.isTrue(radio2.isChecked());

      await radio2.sendKeys(Key.RIGHT);
      await assert.eventually.isTrue(radio1.isChecked());
      await assert.eventually.isFalse(radio2.isChecked());

      await radio1.sendKeys(Key.UP);
      await assert.eventually.isFalse(radio1.isChecked());
      await assert.eventually.isTrue(radio2.isChecked());

      await radio2.sendKeys(Key.UP);
      await assert.eventually.isTrue(radio1.isChecked());
      await assert.eventually.isFalse(radio2.isChecked());
    }
  });

  it('als gebruiker kan ik een radio aanvinken door gebruik te maken van de pijl toetsen en zal een disabled radio genegeerd worden', async () => {
    if (Config.browserName == 'chrome') { // TODO fix docker issues
      const html = await driver.findElement(By.css('html'));
      const radioGroup1 = await vlRadioGroupPage.getRadioGroup(1);
      const radioGroup2 = await vlRadioGroupPage.getRadioGroup(2);
      const radioGroup3 = await vlRadioGroupPage.getRadioGroup(3);
      const radioGroup4 = await vlRadioGroupPage.getRadioGroup(4);
      const radioGroup1Radio1 = await radioGroup1.getRadio(1);
      const radioGroup1Radio2 = await radioGroup1.getRadio(2);
      const radioGroup2Radio1 = await radioGroup2.getRadio(1);
      const radioGroup2Radio2 = await radioGroup2.getRadio(2);
      const radioGroup3Radio2 = await radioGroup3.getRadio(2);
      const radio1 = await radioGroup4.getRadio(1);
      const radio2 = await radioGroup4.getRadio(2);
      const radio3 = await radioGroup4.getRadio(3);
      await assert.eventually.isFalse(radio1.isChecked());
      await assert.eventually.isFalse(radio2.isChecked());
      await assert.eventually.isFalse(radio3.isChecked());

      if (Config.browserName == 'chrome') {
        await html.sendKeys(Key.TAB);
        await html.sendKeys(Key.TAB);
        await html.sendKeys(Key.TAB);
        await html.sendKeys(Key.TAB);
        await html.sendKeys(Key.TAB);
        await html.sendKeys(Key.TAB);
        await html.sendKeys(Key.TAB);
      } else {
        await html.sendKeys(Key.TAB);
        await radioGroup1Radio1.sendKeys(Key.TAB);
        await radioGroup1Radio2.sendKeys(Key.TAB);
        await radioGroup2Radio1.sendKeys(Key.TAB);
        await radioGroup2Radio2.sendKeys(Key.TAB);
        await radioGroup3Radio2.sendKeys(Key.TAB);
      }

      await radio1.sendKeys(Key.RIGHT);
      await assert.eventually.isFalse(radio1.isChecked());
      await assert.eventually.isFalse(radio2.isChecked());
      await assert.eventually.isTrue(radio3.isChecked());
    }
  });

  it('als gebruiker kan ik de radio group elementen bereiken via de tab toets', async () => {
    if (Config.browserName == 'chrome') { // TODO fix docker issues
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
        await html.sendKeys(Key.TAB);
        await assert.eventually.isTrue(radioGroup1Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup1Radio2.hasFocus());
        await assert.eventually.isFalse(radioGroup2Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup2Radio2.hasFocus());

        await radioGroup1Radio1.sendKeys(Key.TAB);
        await radioGroup1Radio2.sendKeys(Key.TAB);
        await assert.eventually.isFalse(radioGroup1Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup1Radio2.hasFocus());
        await assert.eventually.isTrue(radioGroup2Radio1.hasFocus());
        await assert.eventually.isFalse(radioGroup2Radio2.hasFocus());
      }
    }
  });
});
