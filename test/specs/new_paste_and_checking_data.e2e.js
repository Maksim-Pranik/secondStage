const SecondLevelPastebinPage = require('../pageobjects/secondLevelPastebinPage');


describe('Creating New Paste', () => {
  let ourCode = `git config --global user.name  "New Sheriff in Town"
  git reset $(git commit-tree HEAD^{tree} -m "Legacy code")
  git push origin master --force`

  let title = 'how to gain dominance among developers'

  it('filling page ', async () => {
    await SecondLevelPastebinPage.open();

    await SecondLevelPastebinPage.setDatas(ourCode, title);

  });

  it('text is correct', async () => {
    await expect(SecondLevelPastebinPage.TextArea).toHaveText(ourCode);
  })

  it('title is correct', async () => {
    await expect(browser).toHaveTitleContaining(title);
  })

  it('syntax highlighting is correct', async () => {
    await expect(SecondLevelPastebinPage.SyntaxBash).toHaveText('Bash');
  })

});
