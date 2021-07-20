const Page = require('./page');

class MainPastebinPage extends Page {

    get CodeArea() { return $('#postform-text') }
    get PasteExpirationList() { return $('#select2-postform-expiration-container') }
    get NecessoryExpiration() { return $('#select2-postform-expiration-results li:nth-child(3)') }
    get TitleArea() { return $('#postform-name') }
    get btnSubmit() { return $('button[type="submit"]') }


    async setDatas(ourCode, title) {
        await (await this.CodeArea).setValue(ourCode);
        await (await this.PasteExpirationList).click();
        await (await this.NecessoryExpiration).click;
        await (await this.TitleArea).setValue(title);
        await (await this.btnSubmit).click();
    }

    open() {
        return super.open('https://pastebin.com');
    }
}

module.exports = new MainPastebinPage();
