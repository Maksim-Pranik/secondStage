const Page = require('./page');

class SecondLevelPastebinPage extends Page {

    get CodeArea() { return $('#postform-text') }
    get PasteExpirationList() { return $('#select2-postform-expiration-container') }
    get NecessoryExpiration() { return $('#select2-postform-expiration-results li:nth-child(3)') }
    get SyntaxHighlighting() { return $(`span[title = 'None']`) }
    get SyntaxHighlightingTextArea() { return $(`input[class = 'select2-search__field']`) }
    get TitleArea() { return $('#postform-name') }
    get btnSubmit() { return $('button[type="submit"]') }
    get TextArea() { return $('textarea') }

    get SyntaxBash() { return $(`a[class='btn -small h_800']:nth-child(1)`) }

    async setDatas(ourCode, title) {
        await (await this.CodeArea).setValue(ourCode);
        await (await this.SyntaxHighlighting).click();
        await (await this.SyntaxHighlightingTextArea).setValue('Bash');
        browser.keys('Enter')
        await (await this.PasteExpirationList).click();
        await (await this.NecessoryExpiration).click();
        await (await this.TitleArea).setValue(title);
        await (await this.btnSubmit).click();

    }


    open() {
        return super.open('https://pastebin.com');
    }
}

module.exports = new SecondLevelPastebinPage();
