const {Config} = require('vl-ui-core').Test;
const {assert, getDriver, By, Key} = require('vl-ui-core').Test.Setup;
const VlRadioPage = require('./pages/vl-radio.page');

describe('vl-radio', async () => {
  let driver;
  let vlRadioPage;

  beforeEach(() => {
    driver = getDriver();
    vlRadioPage = new VlRadioPage(driver);
    return vlRadioPage.load();
  });

  it('WCAG', async () => {
    await assert.eventually.isFalse(vlRadioPage.hasWcagIssues());
  });

  it('als gebruiker kan ik het radio label zien', async () => {
    const radio = await vlRadioPage.getRadio(1);
    await assert.eventually.equal(radio.getText(), 'Ja');
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

  it('als gebruiker kan ik een radio aanvinken door gebruik te maken van de pijl toetsen', async () => {
    if (Config.browserName == 'chrome') {
      const html = await driver.findElement(By.css('html'));
      const radio1 = await vlRadioPage.getRadio(1);
      const radio2 = await vlRadioPage.getRadio(2);
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
    if (Config.browserName == 'chrome') {
      const html = await driver.findElement(By.css('html'));
      const radio1 = await vlRadioPage.getRadio(1);
      const radio2 = await vlRadioPage.getRadio(2);
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

  it('als gebruiker zie ik dat het reeds geselecteerde radio element focus krijgt bij het tabben', async () => {
    if (Config.browserName == 'chrome') {
      const html = await driver.findElement(By.css('html'));
      const radio1 = await vlRadioPage.getRadio(1);
      const radio2 = await vlRadioPage.getRadio(2);

      await radio2.click();

      if (Config.browserName == 'chrome') {
        await html.sendKeys(Key.SHIFT + Key.TAB);
      } else {
        await radio2.sendKeys(Key.SHIFT + Key.TAB);
      }

      await html.sendKeys(Key.TAB);
      await assert.eventually.isFalse(radio1.hasFocus());
      await assert.eventually.isTrue(radio2.hasFocus());
    }
  });
});
