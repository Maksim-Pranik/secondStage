const MainPastebinPage = require('../pageobjects/mainPastebinPage');

describe('Creating New Paste', () => {
  it('filling page ', async () => {
    await MainPastebinPage.open();
    await MainPastebinPage.setDatas('Hello from WebDriver4', 'Helloweb');

  });

  it('checking if text is correct', async () => {
    await expect(await browser.$('textarea')).toHaveText(
      'Hello from WebDriver');
  })

  it('checking if title is correct', async () => {
    await expect(browser).toHaveTitleContaining(
      'Helloweb');
  })

});
