const GoogleCloudPlatform = require('../pageobjects/googleCloudPlatform')


describe('open calc page, set params and check them', () => {
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
    await expect(GoogleCloudPlatform.EstimateTableCost).toHaveTextContaining('1,083.33');
  });

});