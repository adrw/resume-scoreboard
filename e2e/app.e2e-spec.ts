import { ResumeScoreboardPage } from './app.po';

describe('resume-scoreboard App', function() {
  let page: ResumeScoreboardPage;

  beforeEach(() => {
    page = new ResumeScoreboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
