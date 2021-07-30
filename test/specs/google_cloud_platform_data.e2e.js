const googleCloudPlatform = require('../pageobjects/googleCloudPlatform')



describe('open calc page, set params and check them', () => {
  before(async () => {
    await googleCloudPlatform.open()
    await googleCloudPlatform.searchForPricingCalculator()
    await googleCloudPlatform.openPricingCalculator()
    await googleCloudPlatform.switchToNecessaryFrame()
    await googleCloudPlatform.setNumberOfInstances('4')
    await googleCloudPlatform.setDropDownMenyParam(
      googleCloudPlatform.series, googleCloudPlatform.seriesOption)
    await googleCloudPlatform.setDropDownMenyParam(
      googleCloudPlatform.machineType, googleCloudPlatform.machineTypeOption)
    await googleCloudPlatform.addNecessaryGpu();
    await googleCloudPlatform.setDropDownMenyParam(
      googleCloudPlatform.addGpuNumberField, googleCloudPlatform.addGpuNumber)
    await googleCloudPlatform.setDropDownMenyParam(
      googleCloudPlatform.addGpuTypeField, googleCloudPlatform.addGpuType)
    await googleCloudPlatform.setDropDownMenyParam(
      googleCloudPlatform.localSSDField, googleCloudPlatform.localSSDValue)
    await googleCloudPlatform.setDropDownMenyParam(
      googleCloudPlatform.location, googleCloudPlatform.locationValue)
    await googleCloudPlatform.setDropDownMenyParam(
      googleCloudPlatform.commitedUsage, googleCloudPlatform.commitedUsageValue)
    await googleCloudPlatform.clickOnButton(googleCloudPlatform.addToEstimate)
  });

  it('VM class is regular', async () => {
    await expect(googleCloudPlatform.estimateTableVMclas).toHaveText('VM class: regular');
  });

  it('Instance type is n1-standard-8', async () => {
    await expect(googleCloudPlatform.estimateTableInstanceType).toHaveText('Instance type: n1-standard-8');
  });

  it('Region is Frankfurt', async () => {
    await expect(googleCloudPlatform.estimateTableRegion).toHaveText('Region: Frankfurt');
  });

  it('Total available local SSD space is 2x375 GiB', async () => {
    await expect(googleCloudPlatform.estimateTableSSDspace).toHaveText('Total available local SSD space 2x375 GiB');
  });

  it('Commitment term is 1 Year', async () => {
    await expect(googleCloudPlatform.estimateTableCommitmentTerm).toHaveText('Commitment term: 1 Year');
  });

  it('estimated cost is the same with manual entered', async () => {
    await expect(googleCloudPlatform.estimateTableCost).toHaveTextContaining('1,083.33');
  });

});