import { VpdcsTestAppPage } from './app.po';

describe('vpdcs-test-app App', () => {
  let page: VpdcsTestAppPage;

  beforeEach(() => {
    page = new VpdcsTestAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
