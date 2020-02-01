import { element, by, ElementFinder } from 'protractor';

export default class TaskHistoryUpdatePage {
  pageTitle: ElementFinder = element(by.id('proTrackApp.taskHistory.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  eventDateInput: ElementFinder = element(by.css('input#task-history-eventDate'));
  eventTypeSelect: ElementFinder = element(by.css('select#task-history-eventType'));
  eventTopicInput: ElementFinder = element(by.css('input#task-history-eventTopic'));
  eventDetailInput: ElementFinder = element(by.css('input#task-history-eventDetail'));
  redlineInput: ElementFinder = element(by.css('input#task-history-redline'));
  parentTaskSelect: ElementFinder = element(by.css('select#task-history-parentTask'));
  parentSubTaskSelect: ElementFinder = element(by.css('select#task-history-parentSubTask'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setEventDateInput(eventDate) {
    await this.eventDateInput.sendKeys(eventDate);
  }

  async getEventDateInput() {
    return this.eventDateInput.getAttribute('value');
  }

  async setEventTypeSelect(eventType) {
    await this.eventTypeSelect.sendKeys(eventType);
  }

  async getEventTypeSelect() {
    return this.eventTypeSelect.element(by.css('option:checked')).getText();
  }

  async eventTypeSelectLastOption() {
    await this.eventTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setEventTopicInput(eventTopic) {
    await this.eventTopicInput.sendKeys(eventTopic);
  }

  async getEventTopicInput() {
    return this.eventTopicInput.getAttribute('value');
  }

  async setEventDetailInput(eventDetail) {
    await this.eventDetailInput.sendKeys(eventDetail);
  }

  async getEventDetailInput() {
    return this.eventDetailInput.getAttribute('value');
  }

  async setRedlineInput(redline) {
    await this.redlineInput.sendKeys(redline);
  }

  async getRedlineInput() {
    return this.redlineInput.getAttribute('value');
  }

  async parentTaskSelectLastOption() {
    await this.parentTaskSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async parentTaskSelectOption(option) {
    await this.parentTaskSelect.sendKeys(option);
  }

  getParentTaskSelect() {
    return this.parentTaskSelect;
  }

  async getParentTaskSelectedOption() {
    return this.parentTaskSelect.element(by.css('option:checked')).getText();
  }

  async parentSubTaskSelectLastOption() {
    await this.parentSubTaskSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async parentSubTaskSelectOption(option) {
    await this.parentSubTaskSelect.sendKeys(option);
  }

  getParentSubTaskSelect() {
    return this.parentSubTaskSelect;
  }

  async getParentSubTaskSelectedOption() {
    return this.parentSubTaskSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
