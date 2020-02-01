import { element, by, ElementFinder } from 'protractor';

export default class ProjectUpdatePage {
  pageTitle: ElementFinder = element(by.id('proTrackApp.project.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#project-name'));
  isSite360Input: ElementFinder = element(by.css('input#project-isSite360'));
  siteNumberInput: ElementFinder = element(by.css('input#project-siteNumber'));
  internalDueInput: ElementFinder = element(by.css('input#project-internalDue'));
  towerTypeInput: ElementFinder = element(by.css('input#project-towerType'));
  pONumberInput: ElementFinder = element(by.css('input#project-pONumber'));
  towerLatitudeInput: ElementFinder = element(by.css('input#project-towerLatitude'));
  towerLongitudeInput: ElementFinder = element(by.css('input#project-towerLongitude'));
  memoInput: ElementFinder = element(by.css('input#project-memo'));
  programManagerSelect: ElementFinder = element(by.css('select#project-programManager'));
  projectManagerSelect: ElementFinder = element(by.css('select#project-projectManager'));
  carrierSelect: ElementFinder = element(by.css('select#project-carrier'));
  billingCompanySelect: ElementFinder = element(by.css('select#project-billingCompany'));
  siteCompanySelect: ElementFinder = element(by.css('select#project-siteCompany'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  getIsSite360Input() {
    return this.isSite360Input;
  }
  async setSiteNumberInput(siteNumber) {
    await this.siteNumberInput.sendKeys(siteNumber);
  }

  async getSiteNumberInput() {
    return this.siteNumberInput.getAttribute('value');
  }

  async setInternalDueInput(internalDue) {
    await this.internalDueInput.sendKeys(internalDue);
  }

  async getInternalDueInput() {
    return this.internalDueInput.getAttribute('value');
  }

  async setTowerTypeInput(towerType) {
    await this.towerTypeInput.sendKeys(towerType);
  }

  async getTowerTypeInput() {
    return this.towerTypeInput.getAttribute('value');
  }

  async setPONumberInput(pONumber) {
    await this.pONumberInput.sendKeys(pONumber);
  }

  async getPONumberInput() {
    return this.pONumberInput.getAttribute('value');
  }

  async setTowerLatitudeInput(towerLatitude) {
    await this.towerLatitudeInput.sendKeys(towerLatitude);
  }

  async getTowerLatitudeInput() {
    return this.towerLatitudeInput.getAttribute('value');
  }

  async setTowerLongitudeInput(towerLongitude) {
    await this.towerLongitudeInput.sendKeys(towerLongitude);
  }

  async getTowerLongitudeInput() {
    return this.towerLongitudeInput.getAttribute('value');
  }

  async setMemoInput(memo) {
    await this.memoInput.sendKeys(memo);
  }

  async getMemoInput() {
    return this.memoInput.getAttribute('value');
  }

  async programManagerSelectLastOption() {
    await this.programManagerSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async programManagerSelectOption(option) {
    await this.programManagerSelect.sendKeys(option);
  }

  getProgramManagerSelect() {
    return this.programManagerSelect;
  }

  async getProgramManagerSelectedOption() {
    return this.programManagerSelect.element(by.css('option:checked')).getText();
  }

  async projectManagerSelectLastOption() {
    await this.projectManagerSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async projectManagerSelectOption(option) {
    await this.projectManagerSelect.sendKeys(option);
  }

  getProjectManagerSelect() {
    return this.projectManagerSelect;
  }

  async getProjectManagerSelectedOption() {
    return this.projectManagerSelect.element(by.css('option:checked')).getText();
  }

  async carrierSelectLastOption() {
    await this.carrierSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async carrierSelectOption(option) {
    await this.carrierSelect.sendKeys(option);
  }

  getCarrierSelect() {
    return this.carrierSelect;
  }

  async getCarrierSelectedOption() {
    return this.carrierSelect.element(by.css('option:checked')).getText();
  }

  async billingCompanySelectLastOption() {
    await this.billingCompanySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async billingCompanySelectOption(option) {
    await this.billingCompanySelect.sendKeys(option);
  }

  getBillingCompanySelect() {
    return this.billingCompanySelect;
  }

  async getBillingCompanySelectedOption() {
    return this.billingCompanySelect.element(by.css('option:checked')).getText();
  }

  async siteCompanySelectLastOption() {
    await this.siteCompanySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async siteCompanySelectOption(option) {
    await this.siteCompanySelect.sendKeys(option);
  }

  getSiteCompanySelect() {
    return this.siteCompanySelect;
  }

  async getSiteCompanySelectedOption() {
    return this.siteCompanySelect.element(by.css('option:checked')).getText();
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
