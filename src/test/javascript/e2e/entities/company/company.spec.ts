import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CompanyComponentsPage, { CompanyDeleteDialog } from './company.page-object';
import CompanyUpdatePage from './company-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Company e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let companyComponentsPage: CompanyComponentsPage;
  let companyUpdatePage: CompanyUpdatePage;
  let companyDeleteDialog: CompanyDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  it('should load Companies', async () => {
    await navBarPage.getEntityPage('company');
    companyComponentsPage = new CompanyComponentsPage();
    expect(await companyComponentsPage.getTitle().getText()).to.match(/Companies/);
  });

  it('should load create Company page', async () => {
    await companyComponentsPage.clickOnCreateButton();
    companyUpdatePage = new CompanyUpdatePage();
    expect(await companyUpdatePage.getPageTitle().getAttribute('id')).to.match(/proTrackApp.company.home.createOrEditLabel/);
    await companyUpdatePage.cancel();
  });

  it('should create and save Companies', async () => {
    async function createCompany() {
      await companyComponentsPage.clickOnCreateButton();
      await companyUpdatePage.setNameInput('name');
      expect(await companyUpdatePage.getNameInput()).to.match(/name/);
      await companyUpdatePage.setDescriptionInput('description');
      expect(await companyUpdatePage.getDescriptionInput()).to.match(/description/);
      await waitUntilDisplayed(companyUpdatePage.getSaveButton());
      await companyUpdatePage.save();
      await waitUntilHidden(companyUpdatePage.getSaveButton());
      expect(await companyUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createCompany();
    await companyComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await companyComponentsPage.countDeleteButtons();
    await createCompany();
    await companyComponentsPage.waitUntilLoaded();

    await companyComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await companyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Company', async () => {
    await companyComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await companyComponentsPage.countDeleteButtons();
    await companyComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    companyDeleteDialog = new CompanyDeleteDialog();
    expect(await companyDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/proTrackApp.company.delete.question/);
    await companyDeleteDialog.clickOnConfirmButton();

    await companyComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await companyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
