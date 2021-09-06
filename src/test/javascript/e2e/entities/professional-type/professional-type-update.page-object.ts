import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ProfessionalTypeUpdatePage {
  pageTitle: ElementFinder = element(by.id('ProfessionalType.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  descriptionInput: ElementFinder = element(by.css('input#professional-type-description'));
  activatedInput: ElementFinder = element(by.css('input#professional-type-activated'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  getActivatedInput() {
    return this.activatedInput;
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
    await this.setDescriptionInput('description');
    expect(await this.getDescriptionInput()).to.match(/description/);
    await waitUntilDisplayed(this.saveButton);
    const selectedActivated = await this.getActivatedInput().isSelected();
    if (selectedActivated) {
      await this.getActivatedInput().click();
      expect(await this.getActivatedInput().isSelected()).to.be.false;
    } else {
      await this.getActivatedInput().click();
      expect(await this.getActivatedInput().isSelected()).to.be.true;
    }
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
