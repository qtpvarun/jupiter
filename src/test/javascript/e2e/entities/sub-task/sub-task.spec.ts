import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SubTaskComponentsPage, { SubTaskDeleteDialog } from './sub-task.page-object';
import SubTaskUpdatePage from './sub-task-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('SubTask e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let subTaskComponentsPage: SubTaskComponentsPage;
  let subTaskUpdatePage: SubTaskUpdatePage;
  let subTaskDeleteDialog: SubTaskDeleteDialog;

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

  it('should load SubTasks', async () => {
    await navBarPage.getEntityPage('sub-task');
    subTaskComponentsPage = new SubTaskComponentsPage();
    expect(await subTaskComponentsPage.getTitle().getText()).to.match(/Sub Tasks/);
  });

  it('should load create SubTask page', async () => {
    await subTaskComponentsPage.clickOnCreateButton();
    subTaskUpdatePage = new SubTaskUpdatePage();
    expect(await subTaskUpdatePage.getPageTitle().getAttribute('id')).to.match(/proTrackApp.subTask.home.createOrEditLabel/);
    await subTaskUpdatePage.cancel();
  });

  it('should create and save SubTasks', async () => {
    async function createSubTask() {
      await subTaskComponentsPage.clickOnCreateButton();
      await subTaskUpdatePage.setNameInput('name');
      expect(await subTaskUpdatePage.getNameInput()).to.match(/name/);
      await subTaskUpdatePage.setDescriptionInput('description');
      expect(await subTaskUpdatePage.getDescriptionInput()).to.match(/description/);
      await subTaskUpdatePage.statusSelectLastOption();
      await subTaskUpdatePage.setAssignedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await subTaskUpdatePage.getAssignedDateInput()).to.contain('2001-01-01T02:30');
      await subTaskUpdatePage.setEstimatedCompletionDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await subTaskUpdatePage.getEstimatedCompletionDateInput()).to.contain('2001-01-01T02:30');
      await subTaskUpdatePage.setClosedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await subTaskUpdatePage.getClosedDateInput()).to.contain('2001-01-01T02:30');
      await subTaskUpdatePage.prioritySelectLastOption();
      const selectedIsOverdue = await subTaskUpdatePage.getIsOverdueInput().isSelected();
      if (selectedIsOverdue) {
        await subTaskUpdatePage.getIsOverdueInput().click();
        expect(await subTaskUpdatePage.getIsOverdueInput().isSelected()).to.be.false;
      } else {
        await subTaskUpdatePage.getIsOverdueInput().click();
        expect(await subTaskUpdatePage.getIsOverdueInput().isSelected()).to.be.true;
      }
      const selectedInProgress = await subTaskUpdatePage.getInProgressInput().isSelected();
      if (selectedInProgress) {
        await subTaskUpdatePage.getInProgressInput().click();
        expect(await subTaskUpdatePage.getInProgressInput().isSelected()).to.be.false;
      } else {
        await subTaskUpdatePage.getInProgressInput().click();
        expect(await subTaskUpdatePage.getInProgressInput().isSelected()).to.be.true;
      }
      await subTaskUpdatePage.assignedToSelectLastOption();
      await subTaskUpdatePage.assignedBySelectLastOption();
      await subTaskUpdatePage.sourceUserSelectLastOption();
      await subTaskUpdatePage.targetUserSelectLastOption();
      await subTaskUpdatePage.parentTaskSelectLastOption();
      await waitUntilDisplayed(subTaskUpdatePage.getSaveButton());
      await subTaskUpdatePage.save();
      await waitUntilHidden(subTaskUpdatePage.getSaveButton());
      expect(await subTaskUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createSubTask();
    await subTaskComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await subTaskComponentsPage.countDeleteButtons();
    await createSubTask();
    await subTaskComponentsPage.waitUntilLoaded();

    await subTaskComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await subTaskComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last SubTask', async () => {
    await subTaskComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await subTaskComponentsPage.countDeleteButtons();
    await subTaskComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    subTaskDeleteDialog = new SubTaskDeleteDialog();
    expect(await subTaskDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/proTrackApp.subTask.delete.question/);
    await subTaskDeleteDialog.clickOnConfirmButton();

    await subTaskComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await subTaskComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
