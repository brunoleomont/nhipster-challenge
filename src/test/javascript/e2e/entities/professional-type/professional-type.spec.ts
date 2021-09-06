import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ProfessionalTypeComponentsPage from './professional-type.page-object';
import ProfessionalTypeUpdatePage from './professional-type-update.page-object';
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

describe('ProfessionalType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let professionalTypeComponentsPage: ProfessionalTypeComponentsPage;
  let professionalTypeUpdatePage: ProfessionalTypeUpdatePage;
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
    professionalTypeComponentsPage = new ProfessionalTypeComponentsPage();
    professionalTypeComponentsPage = await professionalTypeComponentsPage.goToPage(navBarPage);
  });

  it('should load ProfessionalTypes', async () => {
    expect(await professionalTypeComponentsPage.title.getText()).to.match(/Professional Types/);
    expect(await professionalTypeComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete ProfessionalTypes', async () => {
    const beforeRecordsCount = (await isVisible(professionalTypeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(professionalTypeComponentsPage.table);
    professionalTypeUpdatePage = await professionalTypeComponentsPage.goToCreateProfessionalType();
    await professionalTypeUpdatePage.enterData();

    expect(await professionalTypeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(professionalTypeComponentsPage.table);
    await waitUntilCount(professionalTypeComponentsPage.records, beforeRecordsCount + 1);
    expect(await professionalTypeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await professionalTypeComponentsPage.deleteProfessionalType();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(professionalTypeComponentsPage.records, beforeRecordsCount);
      expect(await professionalTypeComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(professionalTypeComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
