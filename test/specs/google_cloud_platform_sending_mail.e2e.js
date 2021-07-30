const googleCloudPlatform = require('../pageobjects/googleCloudPlatform')


describe('open calc page, set params, send estimate at 10minutemail and check cost', () => {
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
    await googleCloudPlatform.clickOnButton(googleCloudPlatform.emailEstimateBut)
    browser.newWindow('https://10minutemail.net')
    await googleCloudPlatform.clickOnButton(googleCloudPlatform.emailCopyButton)
    browser.switchWindow('cloud.google.com/products/')
    await googleCloudPlatform.switchToNecessaryFrame()
    await googleCloudPlatform.pasteMailAddress()
    await googleCloudPlatform.clickOnButton(googleCloudPlatform.sendEmailBtn)
    await googleCloudPlatform.waitingForMail()
  });

  it('wait and read email (confirm correct cost)', async () => {
    await expect(googleCloudPlatform.costIntoLetter).toHaveTextContaining('1,083.33');
  });

});