import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TaskHistoryComponentsPage, { TaskHistoryDeleteDialog } from './task-history.page-object';
import TaskHistoryUpdatePage from './task-history-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('TaskHistory e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let taskHistoryComponentsPage: TaskHistoryComponentsPage;
  let taskHistoryUpdatePage: TaskHistoryUpdatePage;
  let taskHistoryDeleteDialog: TaskHistoryDeleteDialog;

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

  it('should load TaskHistories', async () => {
    await navBarPage.getEntityPage('task-history');
    taskHistoryComponentsPage = new TaskHistoryComponentsPage();
    expect(await taskHistoryComponentsPage.getTitle().getText()).to.match(/Task Histories/);
  });

  it('should load create TaskHistory page', async () => {
    await taskHistoryComponentsPage.clickOnCreateButton();
    taskHistoryUpdatePage = new TaskHistoryUpdatePage();
    expect(await taskHistoryUpdatePage.getPageTitle().getAttribute('id')).to.match(/proTrackApp.taskHistory.home.createOrEditLabel/);
    await taskHistoryUpdatePage.cancel();
  });

  it('should create and save TaskHistories', async () => {
    async function createTaskHistory() {
      await taskHistoryComponentsPage.clickOnCreateButton();
      await taskHistoryUpdatePage.setEventDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await taskHistoryUpdatePage.getEventDateInput()).to.contain('2001-01-01T02:30');
      await taskHistoryUpdatePage.eventTypeSelectLastOption();
      await taskHistoryUpdatePage.setEventTopicInput('eventTopic');
      expect(await taskHistoryUpdatePage.getEventTopicInput()).to.match(/eventTopic/);
      await taskHistoryUpdatePage.setEventDetailInput('eventDetail');
      expect(await taskHistoryUpdatePage.getEventDetailInput()).to.match(/eventDetail/);
      await taskHistoryUpdatePage.setRedlineInput('redline');
      expect(await taskHistoryUpdatePage.getRedlineInput()).to.match(/redline/);
      await taskHistoryUpdatePage.parentTaskSelectLastOption();
      await taskHistoryUpdatePage.parentSubTaskSelectLastOption();
      await waitUntilDisplayed(taskHistoryUpdatePage.getSaveButton());
      await taskHistoryUpdatePage.save();
      await waitUntilHidden(taskHistoryUpdatePage.getSaveButton());
      expect(await taskHistoryUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createTaskHistory();
    await taskHistoryComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await taskHistoryComponentsPage.countDeleteButtons();
    await createTaskHistory();
    await taskHistoryComponentsPage.waitUntilLoaded();

    await taskHistoryComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await taskHistoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last TaskHistory', async () => {
    await taskHistoryComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await taskHistoryComponentsPage.countDeleteButtons();
    await taskHistoryComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    taskHistoryDeleteDialog = new TaskHistoryDeleteDialog();
    expect(await taskHistoryDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/proTrackApp.taskHistory.delete.question/);
    await taskHistoryDeleteDialog.clickOnConfirmButton();

    await taskHistoryComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await taskHistoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
