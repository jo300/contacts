import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public contacts: any = [];
  public btnvalue: any = 'Create';
  public sendContact: any;
  public info: any = '';
  contactForm: FormGroup;
  public selectedData: any;
  public updateStatus: boolean | undefined = false;
  public updateId: any;
  public testData: any | undefined;
  Session: any;
  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      phone: [''],
    });
  }

  ngOnInit(): void {
    let testData = JSON.parse(localStorage.getItem('my_data') || '{}');
    if (testData) this.contacts = Array.from(testData).slice();
    console.log(this.contacts);
  }

  add() {
    if (this.contactForm.touched) {
      if (this.updateStatus) {
        this.contacts[this.updateId] = this.contactForm.value;
        localStorage.setItem('my_data', JSON.stringify(this.contacts));
        this.updateStatus = false;
        this.reset();
        this.setButtonValue('Create');
      } else {
        this.sendContact = this.contactForm.value;
        this.reset();
        this.contacts.push(this.sendContact);
        localStorage.setItem('my_data', JSON.stringify(this.contacts));
        this.testData = JSON.parse(localStorage.getItem('my_data') || '{}');
        this.contacts = this.testData.slice();
        this.reset();
      }
    }
  }
  deleteData(index: any) {
    this.contacts.splice(index, 1);
    localStorage.setItem('my_data', JSON.stringify(this.contacts));
  }
  updateData(index: any) {
    this.updateStatus = true;
    this.updateId = index;
    this.setButtonValue('Update');
    this.contactForm.patchValue({
      first_name: this.contacts[index].first_name,
      last_name: this.contacts[index].last_name,
      phone: this.contacts[index].phone,
    });
  }
  setButtonValue(value: string) {
    this.btnvalue = value;
  }
  reset() {
    this.contactForm.reset();
  }
  resetAll() {
    localStorage.removeItem('my_data');
  }
  ngOnDestroy() {
    this.reset();
  }
}
