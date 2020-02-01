import { element, by, ElementFinder } from 'protractor';

export default class SubTaskUpdatePage {
  pageTitle: ElementFinder = element(by.id('proTrackApp.subTask.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#sub-task-name'));
  descriptionInput: ElementFinder = element(by.css('input#sub-task-description'));
  statusSelect: ElementFinder = element(by.css('select#sub-task-status'));
  assignedDateInput: ElementFinder = element(by.css('input#sub-task-assignedDate'));
  estimatedCompletionDateInput: ElementFinder = element(by.css('input#sub-task-estimatedCompletionDate'));
  closedDateInput: ElementFinder = element(by.css('input#sub-task-closedDate'));
  prioritySelect: ElementFinder = element(by.css('select#sub-task-priority'));
  isOverdueInput: ElementFinder = element(by.css('input#sub-task-isOverdue'));
  inProgressInput: ElementFinder = element(by.css('input#sub-task-inProgress'));
  assignedToSelect: ElementFinder = element(by.css('select#sub-task-assignedTo'));
  assignedBySelect: ElementFinder = element(by.css('select#sub-task-assignedBy'));
  sourceUserSelect: ElementFinder = element(by.css('select#sub-task-sourceUser'));
  targetUserSelect: ElementFinder = element(by.css('select#sub-task-targetUser'));
  parentTaskSelect: ElementFinder = element(by.css('select#sub-task-parentTask'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setStatusSelect(status) {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect() {
    return this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption() {
    await this.statusSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setAssignedDateInput(assignedDate) {
    await this.assignedDateInput.sendKeys(assignedDate);
  }

  async getAssignedDateInput() {
    return this.assignedDateInput.getAttribute('value');
  }

  async setEstimatedCompletionDateInput(estimatedCompletionDate) {
    await this.estimatedCompletionDateInput.sendKeys(estimatedCompletionDate);
  }

  async getEstimatedCompletionDateInput() {
    return this.estimatedCompletionDateInput.getAttribute('value');
  }

  async setClosedDateInput(closedDate) {
    await this.closedDateInput.sendKeys(closedDate);
  }

  async getClosedDateInput() {
    return this.closedDateInput.getAttribute('value');
  }

  async setPrioritySelect(priority) {
    await this.prioritySelect.sendKeys(priority);
  }

  async getPrioritySelect() {
    return this.prioritySelect.element(by.css('option:checked')).getText();
  }

  async prioritySelectLastOption() {
    await this.prioritySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  getIsOverdueInput() {
    return this.isOverdueInput;
  }
  getInProgressInput() {
    return this.inProgressInput;
  }
  async assignedToSelectLastOption() {
    await this.assignedToSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async assignedToSelectOption(option) {
    await this.assignedToSelect.sendKeys(option);
  }

  getAssignedToSelect() {
    return this.assignedToSelect;
  }

  async getAssignedToSelectedOption() {
    return this.assignedToSelect.element(by.css('option:checked')).getText();
  }

  async assignedBySelectLastOption() {
    await this.assignedBySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async assignedBySelectOption(option) {
    await this.assignedBySelect.sendKeys(option);
  }

  getAssignedBySelect() {
    return this.assignedBySelect;
  }

  async getAssignedBySelectedOption() {
    return this.assignedBySelect.element(by.css('option:checked')).getText();
  }

  async sourceUserSelectLastOption() {
    await this.sourceUserSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async sourceUserSelectOption(option) {
    await this.sourceUserSelect.sendKeys(option);
  }

  getSourceUserSelect() {
    return this.sourceUserSelect;
  }

  async getSourceUserSelectedOption() {
    return this.sourceUserSelect.element(by.css('option:checked')).getText();
  }

  async targetUserSelectLastOption() {
    await this.targetUserSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async targetUserSelectOption(option) {
    await this.targetUserSelect.sendKeys(option);
  }

  getTargetUserSelect() {
    return this.targetUserSelect;
  }

  async getTargetUserSelectedOption() {
    return this.targetUserSelect.element(by.css('option:checked')).getText();
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
