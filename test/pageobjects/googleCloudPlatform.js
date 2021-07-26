const Page = require('./page');
class GoogleCloudPlatform extends Page {

  get SearchField() { return $(`[name ='q']`) }
  get SearchNecessaryResult() { return $(`//*[text()= 'Google Cloud Platform Pricing Calculator']`) }
  get NumberOfInstances() { return $(`[ng-model="listingCtrl.computeServer.quantity"]`) }
  get Series() { return $(`//md-select[@name='series']/parent::md-input-container`) }
  get SeriesOption() { return $(`//md-option[@value='n1']`) }
  get MachineType() { return $(`//label[text()='Machine type']/parent::md-input-container`) }
  get MachineTypeOption() { return $(`[value="CP-COMPUTEENGINE-VMIMAGE-N1-STANDARD-8"]`) }
  get AddGpu() { return $(`[aria-label="Add GPUs"]`) }
  get AddGpuNumberField() { return $(`//md-select[@placeholder='Number of GPUs']`) }
  get AddGpuNumber() { return $(`md-option[value='1'][ng-disabled="item.value != 0 && item.value < listingCtrl.minGPU"]`) }
  get AddGpuTypeField() { return $(`//md-select[@placeholder='GPU type']`) }
  get AddGpuType() { return $(`[value='NVIDIA_TESLA_P4']`) }
  get LocalSSDField() { return $(`[placeholder='Local SSD']`) }
  get LocalSSDValue() { return $(`md-option[value='2'][ng-repeat="item in listingCtrl.dynamicSsd.computeServer"]`) }
  get Location() { return $(`//md-select[@placeholder='Datacenter location']`) }
  get LocationValue() { return $(`/html/body/div[8]/md-select-menu/md-content/md-option[10]`) }
  get CommitedUsage() { return $(`//md-select[@placeholder='Committed usage']`) }
  get CommitedUsageValue() { return $("div[class='md-select-menu-container md-active md-clickable']" +
  " md-option[value='1'][class='md-ink-ripple']") }
  get AddToEstimate() { return $(`[aria-label="Add to Estimate"]`) }
  get EstimateTableVMclas() { return $('//*[@id="compute"]/md-list/md-list-item[2]/div') }
  get EstimateTableInstanceType() { return $('//*[@id="compute"]/md-list/md-list-item[3]/div') }
  get EstimateTableRegion() { return $('//*[@id="compute"]/md-list/md-list-item[4]/div') }
  get EstimateTableSSDspace() { return $('//*[@id="compute"]/md-list/md-list-item[5]/div') }
  get EstimateTableCommitmentTerm() { return $('//*[@id="compute"]/md-list/md-list-item[6]/div') }
  get EstimateTableCost() { return $('//*[@id="compute"]/md-list/md-list-item[7]/div/b') }
  get EmailEstimateBut() { return $('#email_quote') }
  get MailArea() { return $('//*[@ng-model="emailQuote.user.email"]') }
  get SendEmailBtn() { return $('[aria-label="Send Email"]') }
  get LinkToEmail() { return $(`//a[text() = 'Google Cloud Sales <noreply@google.com>']`) }
  get CostIntoLetter() { return $(`//*[@id="tab1"]/div[1]/div/table/tbody/tr[2]/td/h2`) }
  get EmailCopyButton() { return $('#copy-button') }

  open() {
    return super.open('https://cloud.google.com');
  }

  async openSearchedPage() {
    await (await this.SearchField).setValue('Google Cloud Platform Pricing Calculator');
    browser.keys('Enter')
    await (await this.SearchNecessaryResult).click()
  }
  async setParams(NumberOfInstances) {
    await browser.pause(1000)
    browser.switchToFrame(0)
    browser.switchToFrame(0)

    await (await this.NumberOfInstances).setValue(NumberOfInstances)

    await (await this.Series).click()
    await (await this.SeriesOption).click()

    await (await this.MachineType).click()
    await (await this.MachineTypeOption).click()

    await (await this.AddGpu).click()

    await (await this.AddGpuNumberField).click()
    await (await this.AddGpuNumber).click()

    await (await this.AddGpuTypeField).click()
    await (await this.AddGpuType).click()

    await (await this.LocalSSDField).click()
    await (await this.LocalSSDValue).click()

    await (await this.Location).click()
    await (await this.LocationValue).click()

    await (await this.CommitedUsage).click()
    await (await this.CommitedUsageValue).click()

    await (await this.AddToEstimate).click()

  }
  async MailEstimate() {
    await (await this.EmailEstimateBut).click()

  }

  async CopyMail() {

    await (await this.EmailCopyButton).click()
  }
  async SentMail() {

    await (await this.MailArea).addValue(['Control', 'v'])
    await (await this.SendEmailBtn).click()

  }

  async WaitingForMail() {
    await browser.switchWindow('10minutemail.net')
    await (await this.LinkToEmail).waitForExist({ timeout: 150000, reverse: false, timeoutMsg: 'Something went wrong', interval: 10000 })
    await (await this.LinkToEmail).click()
    await browser.refresh()
    await (await this.LinkToEmail).click()

  }

}

module.exports = new GoogleCloudPlatform();
