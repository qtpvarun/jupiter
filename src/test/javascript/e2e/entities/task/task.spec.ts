import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TaskComponentsPage, { TaskDeleteDialog } from './task.page-object';
import TaskUpdatePage from './task-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Task e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let taskComponentsPage: TaskComponentsPage;
  let taskUpdatePage: TaskUpdatePage;
  let taskDeleteDialog: TaskDeleteDialog;

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

  it('should load Tasks', async () => {
    await navBarPage.getEntityPage('task');
    taskComponentsPage = new TaskComponentsPage();
    expect(await taskComponentsPage.getTitle().getText()).to.match(/Tasks/);
  });

  it('should load create Task page', async () => {
    await taskComponentsPage.clickOnCreateButton();
    taskUpdatePage = new TaskUpdatePage();
    expect(await taskUpdatePage.getPageTitle().getAttribute('id')).to.match(/proTrackApp.task.home.createOrEditLabel/);
    await taskUpdatePage.cancel();
  });

  it('should create and save Tasks', async () => {
    async function createTask() {
      await taskComponentsPage.clickOnCreateButton();
      await taskUpdatePage.setNameInput('name');
      expect(await taskUpdatePage.getNameInput()).to.match(/name/);
      await taskUpdatePage.setDescriptionInput('description');
      expect(await taskUpdatePage.getDescriptionInput()).to.match(/description/);
      await taskUpdatePage.setErpProjectIDInput('erpProjectID');
      expect(await taskUpdatePage.getErpProjectIDInput()).to.match(/erpProjectID/);
      await taskUpdatePage.setErpProjectSequenceInput('erpProjectSequence');
      expect(await taskUpdatePage.getErpProjectSequenceInput()).to.match(/erpProjectSequence/);
      await taskUpdatePage.setErpProjectTypeInput('erpProjectType');
      expect(await taskUpdatePage.getErpProjectTypeInput()).to.match(/erpProjectType/);
      await taskUpdatePage.setErpStatusInput('erpStatus');
      expect(await taskUpdatePage.getErpStatusInput()).to.match(/erpStatus/);
      await taskUpdatePage.statusSelectLastOption();
      await taskUpdatePage.setAssignedDateInput('assignedDate');
      expect(await taskUpdatePage.getAssignedDateInput()).to.match(/assignedDate/);
      await taskUpdatePage.setEstimatedCompletionDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await taskUpdatePage.getEstimatedCompletionDateInput()).to.contain('2001-01-01T02:30');
      await taskUpdatePage.setCompletedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await taskUpdatePage.getCompletedDateInput()).to.contain('2001-01-01T02:30');
      await taskUpdatePage.setDraftDueDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await taskUpdatePage.getDraftDueDateInput()).to.contain('2001-01-01T02:30');
      await taskUpdatePage.setInternalDueDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await taskUpdatePage.getInternalDueDateInput()).to.contain('2001-01-01T02:30');
      await taskUpdatePage.prioritySelectLastOption();
      const selectedIsOverdue = await taskUpdatePage.getIsOverdueInput().isSelected();
      if (selectedIsOverdue) {
        await taskUpdatePage.getIsOverdueInput().click();
        expect(await taskUpdatePage.getIsOverdueInput().isSelected()).to.be.false;
      } else {
        await taskUpdatePage.getIsOverdueInput().click();
        expect(await taskUpdatePage.getIsOverdueInput().isSelected()).to.be.true;
      }
      const selectedInProgress = await taskUpdatePage.getInProgressInput().isSelected();
      if (selectedInProgress) {
        await taskUpdatePage.getInProgressInput().click();
        expect(await taskUpdatePage.getInProgressInput().isSelected()).to.be.false;
      } else {
        await taskUpdatePage.getInProgressInput().click();
        expect(await taskUpdatePage.getInProgressInput().isSelected()).to.be.true;
      }
      await taskUpdatePage.gradeSelectLastOption();
      await taskUpdatePage.assignedToSelectLastOption();
      await taskUpdatePage.assignedBySelectLastOption();
      await taskUpdatePage.assignedQCSelectLastOption();
      await taskUpdatePage.parentProjectSelectLastOption();
      await waitUntilDisplayed(taskUpdatePage.getSaveButton());
      await taskUpdatePage.save();
      await waitUntilHidden(taskUpdatePage.getSaveButton());
      expect(await taskUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createTask();
    await taskComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await taskComponentsPage.countDeleteButtons();
    await createTask();
    await taskComponentsPage.waitUntilLoaded();

    await taskComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await taskComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Task', async () => {
    await taskComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await taskComponentsPage.countDeleteButtons();
    await taskComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    taskDeleteDialog = new TaskDeleteDialog();
    expect(await taskDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/proTrackApp.task.delete.question/);
    await taskDeleteDialog.clickOnConfirmButton();

    await taskComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await taskComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
