import { MixideaPage } from './app.po';

describe('mixidea App', function() {
  let page: MixideaPage;

  beforeEach(() => {
    page = new MixideaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
