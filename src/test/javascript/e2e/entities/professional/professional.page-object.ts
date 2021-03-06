import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ProfessionalUpdatePage from './professional-update.page-object';

const expect = chai.expect;
export class ProfessionalDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('Professional.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-professional'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ProfessionalComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('professional-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('professional');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateProfessional() {
    await this.createButton.click();
    return new ProfessionalUpdatePage();
  }

  async deleteProfessional() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const professionalDeleteDialog = new ProfessionalDeleteDialog();
    await waitUntilDisplayed(professionalDeleteDialog.deleteModal);
    expect(await professionalDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/Professional.delete.question/);
    await professionalDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(professionalDeleteDialog.deleteModal);

    expect(await isVisible(professionalDeleteDialog.deleteModal)).to.be.false;
  }
}
