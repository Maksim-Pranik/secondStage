const GoogleCloudPlatform = require('../pageobjects/googleCloudPlatform')


describe('open calc page, set params, send estimate at 10minutemail and check cost', () => {
  it('open calc page', async () => {
    await GoogleCloudPlatform.open()
    await GoogleCloudPlatform.openSearchedPage()
  });

  it('sett all necessery params', async () => {
    await GoogleCloudPlatform.setParams('4')

  });

  it('push email btn', async () => {
    await GoogleCloudPlatform.MailEstimate()
  });

  it('copy email address at 10minutemail', async () => {
    browser.newWindow('https://10minutemail.net')

    await GoogleCloudPlatform.CopyMail();

  });

  it('paste mail at cloud.google page', async () => {
    browser.switchWindow('cloud.google.com/products/')
    await browser.pause(1000)
    await browser.switchToFrame(0)
    await browser.switchToFrame(0)

    await GoogleCloudPlatform.SentMail();

  });

  it('wait and read email (confirm correct cost)', async () => {

    await GoogleCloudPlatform.WaitingForMail();

    await expect(GoogleCloudPlatform.CostIntoLetter).toHaveTextContaining('1,083.33');

  });

});