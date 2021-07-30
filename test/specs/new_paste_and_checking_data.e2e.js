const secondLevelPastebinPage = require('../pageobjects/secondLevelPastebinPage');


describe('Creating New Paste', () => {
  const codeForDispatch = `git config --global user.name  "New Sheriff in Town"
  git reset $(git commit-tree HEAD^{tree} -m "Legacy code")
  git push origin master --force`

  const title = 'how to gain dominance among developers'

  before(async () => {
    await secondLevelPastebinPage.open();
    await secondLevelPastebinPage.fillTextArea(secondLevelPastebinPage.codeArea, codeForDispatch);
    await secondLevelPastebinPage.setSyntaxHighlighting('Bash');
    await secondLevelPastebinPage.setDropDownMenyParam(secondLevelPastebinPage.pasteExpirationList, secondLevelPastebinPage.necessoryExpiration)
    await secondLevelPastebinPage.fillTextArea(secondLevelPastebinPage.titleArea, title)
    await secondLevelPastebinPage.clickOnButton(secondLevelPastebinPage.btnSubmit);
  });

  it('pasted data is correct', async () => {
    await expect(secondLevelPastebinPage.textArea).toHaveText(codeForDispatch);
  })

  it('title is correct', async () => {
    await expect(browser).toHaveTitleContaining(title);
  })

  it('syntax highlighting is correct', async () => {
    await expect(secondLevelPastebinPage.syntaxBash).toHaveText('Bash');
  })

});
