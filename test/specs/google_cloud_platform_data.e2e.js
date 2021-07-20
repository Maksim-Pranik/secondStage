const GoogleCloudPlatform = require('../pageobjects/googleCloudPlatform')


describe('open calc page set params and check them', () => {
  it('should open calc page', async () => {
    await GoogleCloudPlatform.open()
    await GoogleCloudPlatform.openSearchedPage()
  });

  it('setting all necessery params', async () => {
    await GoogleCloudPlatform.setParams('4')

  });

  it('params in estimate table is equal to setted ', async () => {
    await expect(GoogleCloudPlatform.EstimateTableVMclas).toHaveText('VM class: regular');
    await expect(GoogleCloudPlatform.EstimateTableInstanceType).toHaveText('Instance type: n1-standard-8');
    await expect(GoogleCloudPlatform.EstimateTableRegion).toHaveText('Region: Frankfurt');
    await expect(GoogleCloudPlatform.EstimateTableSSDspace).toHaveText('Total available local SSD space 2x375 GiB');
    await expect(GoogleCloudPlatform.EstimateTableCommitmentTerm).toHaveText('Commitment term: 1 Year');
  });

  it('estimated cost is the same with manual entered', async () => {
    await expect(GoogleCloudPlatform.EstimateTableCost).toHaveTextContaining('1,082.77');
  });

  it('push email btn', async () => {
    await GoogleCloudPlatform.MailEstimate()
  });

  it('new wind', async () => {
    browser.newWindow('https://10minutemail.net')

    await GoogleCloudPlatform.CopyMail();

    browser.switchWindow('cloud.google.com/products/')
    await browser.pause(1000)
    await browser.switchToFrame(0)
    await browser.switchToFrame(0)

  });

  it('paste mail', async () => {
    await GoogleCloudPlatform.SentMail();

  });

  it('waiting and reading email', async () => {

    await GoogleCloudPlatform.WaitingForMail();
    ///избавиться от рекламы
    await expect(GoogleCloudPlatform.CostIntoLetter).toHaveTextContaining('1,082.77');
  });

});