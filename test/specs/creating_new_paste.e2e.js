const mainPastebinPage = require('../pageobjects/mainPastebinPage');

describe('Creating New Paste', () => {
  before(async () => {
    await mainPastebinPage.open();
    await mainPastebinPage.fillTextArea(mainPastebinPage.codeArea, 'Hello from WebDriver');
    await mainPastebinPage.setDropDownMenyParam(mainPastebinPage.pasteExpirationList, mainPastebinPage.necessoryExpiration)
    await mainPastebinPage.fillTextArea(mainPastebinPage.titleArea, 'Helloweb')
    await mainPastebinPage.clickOnButton(mainPastebinPage.btnSubmit);
  });

  it('pasted data is correct', async () => {
    await expect(mainPastebinPage.codeArea).toHaveText(
      'Hello from WebDriver');
  })

  it('title is correct', async () => {
    await expect(browser).toHaveTitleContaining(
      'Helloweb');
  })

});
