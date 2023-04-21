import { Component, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeliveryOrder } from './models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
  form!: FormGroup

  @Output()
  onNewDeliveryOrder = new Subject<DeliveryOrder>()

  fb: FormBuilder
  itemArray!: FormArray
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
    this.itemArray = this.fb.array([])
    return this.fb.group({
      name: this.fb.control<string>('', [Validators.required, Validators.minLength(3)]),
      address: this.fb.control<string>('1 bedrock', [Validators.required]),
      email: this.fb.control<string>('fred@gmail.com', [Validators.required, Validators.email]),
      session: this.fb.control<string>('PM', [Validators.required]),
      deliveryDate: this.fb.control<string>('', [Validators.required]),
      priority: this.fb.control<Boolean>(false),
      insurance: this.fb.control<Boolean>(false),
      comments: this.fb.control<string>('no comments'),
      orderItems: this.itemArray
    })
  }

  private createOrderItem(): FormGroup {
    return this.fb.group({
      item: this.fb.control<string>('', [Validators.required]),
      quantity: this.fb.control<number>(1, [Validators.required, Validators.min(1)])
    })
  }

  processDelivery() {
    const delivery = this.form.value as DeliveryOrder
    this.onNewDeliveryOrder.next(delivery)
    console.info(">>> delivery: ", delivery)
    this.ngOnInit()
    this.form.reset()
  }

  addItem() {
    const orderItem = this.createOrderItem()
    this.itemArray.push(orderItem)
  }
  hasError(cn: string): boolean {
    return !!(this.form.get(cn)?.invalid && this.form.get(cn)?.dirty)
  }
  deleteItem(idx: number) {
    this.itemArray.removeAt(idx)
  }
  isFormInvalid(): boolean {
    const dd = this.form.get('deliveryDate')?.value
    if (!dd)
      return true
    const deliveryDate = new Date(dd)
    const today = new Date()
    return this.form.invalid && (deliveryDate < today)
  }
}
