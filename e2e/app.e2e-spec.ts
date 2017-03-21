import { Material2StartPage } from './app.po';

describe('material2-start App', () => {
  let page: Material2StartPage;

  beforeEach(() => {
    page = new Material2StartPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
