const Page = require('./page');

class MainPastebinPage extends Page {

    get codeArea() { return $('#postform-text') }
    get pasteExpirationList() { return $('#select2-postform-expiration-container') }
    get necessoryExpiration() { return $('#select2-postform-expiration-results li:nth-child(3)') }
    get titleArea() { return $('#postform-name') }
    get textArea() { return $('textarea') }
    get btnSubmit() { return $('button[type="submit"]') }

    open() {
        return super.open('https://pastebin.com');
    }
    
    async fillTextArea(textArea, textForFill) {
        await (await textArea).waitForExist()
        await (await textArea).setValue(textForFill);
    }

    async setDropDownMenyParam(openDropDown, changeItem) {
        await (await openDropDown).waitForClickable()
        await (await openDropDown).click()
        await (await changeItem).waitForClickable()
        await (await changeItem).click()
    }

    async clickOnButton(button) {
        await (await button).waitForClickable()
        await (await button).click()
      }

}

module.exports = new MainPastebinPage();
