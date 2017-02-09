import { ChefLabClientPage } from './app.po';

describe('chef-lab-client App', function() {
  let page: ChefLabClientPage;

  beforeEach(() => {
    page = new ChefLabClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
