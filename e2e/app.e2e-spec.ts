import { AssessmentsSearchPage } from './app.po';

describe('assessments-search App', () => {
  let page: AssessmentsSearchPage;

  beforeEach(() => {
    page = new AssessmentsSearchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
