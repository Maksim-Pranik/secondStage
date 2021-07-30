const Page = require('./page');

class SecondLevelPastebinPage extends Page {

    get codeArea() { return $('#postform-text') }
    get pasteExpirationList() { return $('#select2-postform-expiration-container') }
    get necessoryExpiration() { return $('#select2-postform-expiration-results li:nth-child(3)') }
    get syntaxHighlighting() { return $(`span[title = 'None']`) }
    get syntaxHighlightingTextArea() { return $(`input[class = 'select2-search__field']`) }
    get titleArea() { return $('#postform-name') }
    get btnSubmit() { return $('button[type="submit"]') }
    get textArea() { return $('textarea') }
    get syntaxBash() { return $(`a[class='btn -small h_800']:nth-child(1)`) }

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

    async setSyntaxHighlighting(syntax) {
        await (await this.syntaxHighlighting).click();
        await (await this.syntaxHighlightingTextArea).setValue(syntax);
        browser.keys('Enter')
    }

    async clickOnButton(button) {
        await (await button).waitForClickable()
        await (await button).click()
    }
    
}

module.exports = new SecondLevelPastebinPage();
