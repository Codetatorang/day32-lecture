import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  fb: FormBuilder
  form!: FormGroup
  //private/public constructor params will auto inject, therefore not needed to declare variable
  constructor(fb: FormBuilder) { //more injections are added with ,
    this.fb = fb
  }

  ngOnInit(): void {
    //this method is called when the component is created
    //for initialization
    this.form = this.createForm()
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: this.fb.control<string>(''),
      address: this.fb.control<string>(''),
      email: this.fb.control<string>(''),
      deliveryDate: this.fb.control<string>(''),
      comments: this.fb.control<string>('')

    })
  }

  processDelivery(){
    const delivery = this.form.value
    console.info(">>> delivery: ", delivery)
  }
}
