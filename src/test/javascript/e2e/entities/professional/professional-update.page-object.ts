import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ProfessionalUpdatePage {
  pageTitle: ElementFinder = element(by.id('Professional.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#professional-name'));
  phoneInput: ElementFinder = element(by.css('input#professional-phone'));
  emailInput: ElementFinder = element(by.css('input#professional-email'));
  activatedInput: ElementFinder = element(by.css('input#professional-activated'));
  professionalTypeSelect: ElementFinder = element(by.css('select#professional-professionalType'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setPhoneInput(phone) {
    await this.phoneInput.sendKeys(phone);
  }

  async getPhoneInput() {
    return this.phoneInput.getAttribute('value');
  }

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return this.emailInput.getAttribute('value');
  }

  getActivatedInput() {
    return this.activatedInput;
  }
  async professionalTypeSelectLastOption() {
    await this.professionalTypeSelect.all(by.tagName('option')).last().click();
  }

  async professionalTypeSelectOption(option) {
    await this.professionalTypeSelect.sendKeys(option);
  }

  getProfessionalTypeSelect() {
    return this.professionalTypeSelect;
  }

  async getProfessionalTypeSelectedOption() {
    return this.professionalTypeSelect.element(by.css('option:checked')).getText();
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

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setNameInput('name');
    expect(await this.getNameInput()).to.match(/name/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPhoneInput('phone');
    expect(await this.getPhoneInput()).to.match(/phone/);
    await waitUntilDisplayed(this.saveButton);
    await this.setEmailInput('email');
    expect(await this.getEmailInput()).to.match(/email/);
    await waitUntilDisplayed(this.saveButton);
    const selectedActivated = await this.getActivatedInput().isSelected();
    if (selectedActivated) {
      await this.getActivatedInput().click();
      expect(await this.getActivatedInput().isSelected()).to.be.false;
    } else {
      await this.getActivatedInput().click();
      expect(await this.getActivatedInput().isSelected()).to.be.true;
    }
    await this.professionalTypeSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
