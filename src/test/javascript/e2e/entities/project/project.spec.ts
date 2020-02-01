import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ProjectComponentsPage, { ProjectDeleteDialog } from './project.page-object';
import ProjectUpdatePage from './project-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Project e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let projectComponentsPage: ProjectComponentsPage;
  let projectUpdatePage: ProjectUpdatePage;
  let projectDeleteDialog: ProjectDeleteDialog;

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

  it('should load Projects', async () => {
    await navBarPage.getEntityPage('project');
    projectComponentsPage = new ProjectComponentsPage();
    expect(await projectComponentsPage.getTitle().getText()).to.match(/Projects/);
  });

  it('should load create Project page', async () => {
    await projectComponentsPage.clickOnCreateButton();
    projectUpdatePage = new ProjectUpdatePage();
    expect(await projectUpdatePage.getPageTitle().getAttribute('id')).to.match(/proTrackApp.project.home.createOrEditLabel/);
    await projectUpdatePage.cancel();
  });

  it('should create and save Projects', async () => {
    async function createProject() {
      await projectComponentsPage.clickOnCreateButton();
      await projectUpdatePage.setNameInput('name');
      expect(await projectUpdatePage.getNameInput()).to.match(/name/);
      const selectedIsSite360 = await projectUpdatePage.getIsSite360Input().isSelected();
      if (selectedIsSite360) {
        await projectUpdatePage.getIsSite360Input().click();
        expect(await projectUpdatePage.getIsSite360Input().isSelected()).to.be.false;
      } else {
        await projectUpdatePage.getIsSite360Input().click();
        expect(await projectUpdatePage.getIsSite360Input().isSelected()).to.be.true;
      }
      await projectUpdatePage.setSiteNumberInput('5');
      expect(await projectUpdatePage.getSiteNumberInput()).to.eq('5');
      await projectUpdatePage.setInternalDueInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await projectUpdatePage.getInternalDueInput()).to.contain('2001-01-01T02:30');
      await projectUpdatePage.setTowerTypeInput('towerType');
      expect(await projectUpdatePage.getTowerTypeInput()).to.match(/towerType/);
      await projectUpdatePage.setPONumberInput('pONumber');
      expect(await projectUpdatePage.getPONumberInput()).to.match(/pONumber/);
      await projectUpdatePage.setTowerLatitudeInput('5');
      expect(await projectUpdatePage.getTowerLatitudeInput()).to.eq('5');
      await projectUpdatePage.setTowerLongitudeInput('5');
      expect(await projectUpdatePage.getTowerLongitudeInput()).to.eq('5');
      await projectUpdatePage.setMemoInput('memo');
      expect(await projectUpdatePage.getMemoInput()).to.match(/memo/);
      await projectUpdatePage.programManagerSelectLastOption();
      await projectUpdatePage.projectManagerSelectLastOption();
      await projectUpdatePage.carrierSelectLastOption();
      await projectUpdatePage.billingCompanySelectLastOption();
      await projectUpdatePage.siteCompanySelectLastOption();
      await waitUntilDisplayed(projectUpdatePage.getSaveButton());
      await projectUpdatePage.save();
      await waitUntilHidden(projectUpdatePage.getSaveButton());
      expect(await projectUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createProject();
    await projectComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await projectComponentsPage.countDeleteButtons();
    await createProject();
    await projectComponentsPage.waitUntilLoaded();

    await projectComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await projectComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Project', async () => {
    await projectComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await projectComponentsPage.countDeleteButtons();
    await projectComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    projectDeleteDialog = new ProjectDeleteDialog();
    expect(await projectDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/proTrackApp.project.delete.question/);
    await projectDeleteDialog.clickOnConfirmButton();

    await projectComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await projectComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
