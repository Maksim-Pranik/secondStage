const Page = require('./page');
class GoogleCloudPlatform extends Page {

  get searchField() { return $(`[name ='q']`) }
  get searchNecessaryResult() { return $(`//*[text()= 'Google Cloud Platform Pricing Calculator']`) }
  get numberOfInstances() { return $(`[ng-model="listingCtrl.computeServer.quantity"]`) }
  get series() { return $(`//md-select[@name='series']/parent::md-input-container`) }
  get seriesOption() { return $(`//md-option[@value='n1']`) }
  get machineType() { return $(`//label[text()='Machine type']/parent::md-input-container`) }
  get machineTypeOption() { return $(`[value="CP-COMPUTEENGINE-VMIMAGE-N1-STANDARD-8"]`) }
  get addGpu() { return $(`[aria-label="Add GPUs"]`) }
  get addGpuNumberField() { return $(`//md-select[@placeholder='Number of GPUs']`) }
  get addGpuNumber() { return $(`md-option[value='1'][ng-disabled="item.value != 0 && item.value < listingCtrl.minGPU"]`) }
  get addGpuTypeField() { return $(`//md-select[@placeholder='GPU type']`) }
  get addGpuType() { return $(`[value='NVIDIA_TESLA_P4']`) }
  get localSSDField() { return $(`[placeholder='Local SSD']`) }
  get localSSDValue() { return $(`md-option[value='2'][ng-repeat="item in listingCtrl.dynamicSsd.computeServer"]`) }
  get location() { return $(`//md-select[@placeholder='Datacenter location']`) }
  get locationValue() {
    return $("md-select-menu[class='md-overflow']" +
      " md-option[value='europe-west3'][ng-repeat*='fullRegionList']")
  }
  get commitedUsage() { return $(`//md-select[@placeholder='Committed usage']`) }
  get commitedUsageValue() {
    return $("div[class='md-select-menu-container md-active md-clickable']" +
      " md-option[value='1'][class='md-ink-ripple']")
  }
  get addToEstimate() { return $(`[aria-label="Add to Estimate"]`) }
  get estimateTableVMclas() { return $('//*[@id="compute"]/md-list/md-list-item[2]/div') }
  get estimateTableInstanceType() { return $('//*[@id="compute"]/md-list/md-list-item[3]/div') }
  get estimateTableRegion() { return $('//*[@id="compute"]/md-list/md-list-item[4]/div') }
  get estimateTableSSDspace() { return $('//*[@id="compute"]/md-list/md-list-item[5]/div') }
  get estimateTableCommitmentTerm() { return $('//*[@id="compute"]/md-list/md-list-item[6]/div') }
  get estimateTableCost() { return $('//*[@id="compute"]/md-list/md-list-item[7]/div/b') }
  get emailEstimateBut() { return $('#email_quote') }
  get mailArea() { return $('//*[@ng-model="emailQuote.user.email"]') }
  get sendEmailBtn() { return $('[aria-label="Send Email"]') }
  get linkToEmail() { return $(`//a[text() = 'Google Cloud Sales <noreply@google.com>']`) }
  get costIntoLetter() { return $(`//*[@id="tab1"]/div[1]/div/table/tbody/tr[2]/td/h2`) }
  get emailCopyButton() { return $('#copy-button') }
  get mainContent() { return $('//*[@id="gc-wrapper"]/main') }

  open() {
    return super.open('https://cloud.google.com');
  }

  async searchForPricingCalculator() {
    await (await this.searchField).waitForExist()
    await (await this.searchField).setValue('Google Cloud Platform Pricing Calculator');
    browser.keys('Enter')
  }

  async openPricingCalculator() {
    await (await this.searchNecessaryResult).waitForClickable()
    await (await this.searchNecessaryResult).click()
  }

  async switchToNecessaryFrame() {
    await (await this.mainContent).waitForExist()
    browser.switchToFrame(0)
    browser.switchToFrame(0)
  }
  
  async setNumberOfInstances(numberOfInstances) {
    await (await this.numberOfInstances).waitForExist()
    await (await this.numberOfInstances).setValue(numberOfInstances)
  }

  async setDropDownMenyParam(openDropDown, changeItem) {
    await (await openDropDown).waitForClickable()
    await (await openDropDown).click()
    await (await changeItem).waitForClickable()
    await (await changeItem).click()
  }

  async addNecessaryGpu() {
    await (await this.addGpu).waitForClickable()
    await (await this.addGpu).click()
  }

  async clickOnButton(button) {
    await (await button).waitForClickable()
    await (await button).click()
  }

  async pasteMailAddress() {
    await (await this.mailArea).waitForExist()
    await (await this.mailArea).addValue(['Control', 'v'])
  }

  async waitingForMail() {
    await browser.switchWindow('10minutemail.net')
    await (await this.linkToEmail).waitForExist({ timeout: 150000, interval: 10000 })
    await (await this.linkToEmail).click()
    await browser.refresh()
    await (await this.linkToEmail).click()
    await (await this.costIntoLetter).waitForExist()
  }

}

module.exports = new GoogleCloudPlatform();
