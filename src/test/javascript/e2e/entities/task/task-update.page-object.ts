import { element, by, ElementFinder } from 'protractor';

export default class TaskUpdatePage {
  pageTitle: ElementFinder = element(by.id('proTrackApp.task.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#task-name'));
  descriptionInput: ElementFinder = element(by.css('input#task-description'));
  erpProjectIDInput: ElementFinder = element(by.css('input#task-erpProjectID'));
  erpProjectSequenceInput: ElementFinder = element(by.css('input#task-erpProjectSequence'));
  erpProjectTypeInput: ElementFinder = element(by.css('input#task-erpProjectType'));
  erpStatusInput: ElementFinder = element(by.css('input#task-erpStatus'));
  statusSelect: ElementFinder = element(by.css('select#task-status'));
  assignedDateInput: ElementFinder = element(by.css('input#task-assignedDate'));
  estimatedCompletionDateInput: ElementFinder = element(by.css('input#task-estimatedCompletionDate'));
  completedDateInput: ElementFinder = element(by.css('input#task-completedDate'));
  draftDueDateInput: ElementFinder = element(by.css('input#task-draftDueDate'));
  internalDueDateInput: ElementFinder = element(by.css('input#task-internalDueDate'));
  prioritySelect: ElementFinder = element(by.css('select#task-priority'));
  isOverdueInput: ElementFinder = element(by.css('input#task-isOverdue'));
  inProgressInput: ElementFinder = element(by.css('input#task-inProgress'));
  gradeSelect: ElementFinder = element(by.css('select#task-grade'));
  assignedToSelect: ElementFinder = element(by.css('select#task-assignedTo'));
  assignedBySelect: ElementFinder = element(by.css('select#task-assignedBy'));
  assignedQCSelect: ElementFinder = element(by.css('select#task-assignedQC'));
  parentProjectSelect: ElementFinder = element(by.css('select#task-parentProject'));

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

  async setErpProjectIDInput(erpProjectID) {
    await this.erpProjectIDInput.sendKeys(erpProjectID);
  }

  async getErpProjectIDInput() {
    return this.erpProjectIDInput.getAttribute('value');
  }

  async setErpProjectSequenceInput(erpProjectSequence) {
    await this.erpProjectSequenceInput.sendKeys(erpProjectSequence);
  }

  async getErpProjectSequenceInput() {
    return this.erpProjectSequenceInput.getAttribute('value');
  }

  async setErpProjectTypeInput(erpProjectType) {
    await this.erpProjectTypeInput.sendKeys(erpProjectType);
  }

  async getErpProjectTypeInput() {
    return this.erpProjectTypeInput.getAttribute('value');
  }

  async setErpStatusInput(erpStatus) {
    await this.erpStatusInput.sendKeys(erpStatus);
  }

  async getErpStatusInput() {
    return this.erpStatusInput.getAttribute('value');
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

  async setCompletedDateInput(completedDate) {
    await this.completedDateInput.sendKeys(completedDate);
  }

  async getCompletedDateInput() {
    return this.completedDateInput.getAttribute('value');
  }

  async setDraftDueDateInput(draftDueDate) {
    await this.draftDueDateInput.sendKeys(draftDueDate);
  }

  async getDraftDueDateInput() {
    return this.draftDueDateInput.getAttribute('value');
  }

  async setInternalDueDateInput(internalDueDate) {
    await this.internalDueDateInput.sendKeys(internalDueDate);
  }

  async getInternalDueDateInput() {
    return this.internalDueDateInput.getAttribute('value');
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
  async setGradeSelect(grade) {
    await this.gradeSelect.sendKeys(grade);
  }

  async getGradeSelect() {
    return this.gradeSelect.element(by.css('option:checked')).getText();
  }

  async gradeSelectLastOption() {
    await this.gradeSelect
      .all(by.tagName('option'))
      .last()
      .click();
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

  async assignedQCSelectLastOption() {
    await this.assignedQCSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async assignedQCSelectOption(option) {
    await this.assignedQCSelect.sendKeys(option);
  }

  getAssignedQCSelect() {
    return this.assignedQCSelect;
  }

  async getAssignedQCSelectedOption() {
    return this.assignedQCSelect.element(by.css('option:checked')).getText();
  }

  async parentProjectSelectLastOption() {
    await this.parentProjectSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async parentProjectSelectOption(option) {
    await this.parentProjectSelect.sendKeys(option);
  }

  getParentProjectSelect() {
    return this.parentProjectSelect;
  }

  async getParentProjectSelectedOption() {
    return this.parentProjectSelect.element(by.css('option:checked')).getText();
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
