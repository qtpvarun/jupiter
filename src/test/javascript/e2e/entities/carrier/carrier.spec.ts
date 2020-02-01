import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CarrierComponentsPage, { CarrierDeleteDialog } from './carrier.page-object';
import CarrierUpdatePage from './carrier-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Carrier e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let carrierComponentsPage: CarrierComponentsPage;
  let carrierUpdatePage: CarrierUpdatePage;
  let carrierDeleteDialog: CarrierDeleteDialog;

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

  it('should load Carriers', async () => {
    await navBarPage.getEntityPage('carrier');
    carrierComponentsPage = new CarrierComponentsPage();
    expect(await carrierComponentsPage.getTitle().getText()).to.match(/Carriers/);
  });

  it('should load create Carrier page', async () => {
    await carrierComponentsPage.clickOnCreateButton();
    carrierUpdatePage = new CarrierUpdatePage();
    expect(await carrierUpdatePage.getPageTitle().getAttribute('id')).to.match(/proTrackApp.carrier.home.createOrEditLabel/);
    await carrierUpdatePage.cancel();
  });

  it('should create and save Carriers', async () => {
    async function createCarrier() {
      await carrierComponentsPage.clickOnCreateButton();
      await carrierUpdatePage.setNameInput('name');
      expect(await carrierUpdatePage.getNameInput()).to.match(/name/);
      await carrierUpdatePage.setDescriptionInput('description');
      expect(await carrierUpdatePage.getDescriptionInput()).to.match(/description/);
      await waitUntilDisplayed(carrierUpdatePage.getSaveButton());
      await carrierUpdatePage.save();
      await waitUntilHidden(carrierUpdatePage.getSaveButton());
      expect(await carrierUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createCarrier();
    await carrierComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await carrierComponentsPage.countDeleteButtons();
    await createCarrier();
    await carrierComponentsPage.waitUntilLoaded();

    await carrierComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await carrierComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Carrier', async () => {
    await carrierComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await carrierComponentsPage.countDeleteButtons();
    await carrierComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    carrierDeleteDialog = new CarrierDeleteDialog();
    expect(await carrierDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/proTrackApp.carrier.delete.question/);
    await carrierDeleteDialog.clickOnConfirmButton();

    await carrierComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await carrierComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
