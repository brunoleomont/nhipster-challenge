import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ProfessionalComponentsPage from './professional.page-object';
import ProfessionalUpdatePage from './professional-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('Professional e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let professionalComponentsPage: ProfessionalComponentsPage;
  let professionalUpdatePage: ProfessionalUpdatePage;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();
    await signInPage.username.sendKeys(username);
    await signInPage.password.sendKeys(password);
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    professionalComponentsPage = new ProfessionalComponentsPage();
    professionalComponentsPage = await professionalComponentsPage.goToPage(navBarPage);
  });

  it('should load Professionals', async () => {
    expect(await professionalComponentsPage.title.getText()).to.match(/Professionals/);
    expect(await professionalComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Professionals', async () => {
    const beforeRecordsCount = (await isVisible(professionalComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(professionalComponentsPage.table);
    professionalUpdatePage = await professionalComponentsPage.goToCreateProfessional();
    await professionalUpdatePage.enterData();

    expect(await professionalComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(professionalComponentsPage.table);
    await waitUntilCount(professionalComponentsPage.records, beforeRecordsCount + 1);
    expect(await professionalComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await professionalComponentsPage.deleteProfessional();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(professionalComponentsPage.records, beforeRecordsCount);
      expect(await professionalComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(professionalComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
