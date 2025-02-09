import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { GupshupService } from '../../../../../../core/services/gushup/gupshup.service';
import { LoaderService } from '../../../../../../core/services/loader/loader.service';
import { LocalStorageService } from '../../../../../../core/services/localStorage/local-storage.service';
import { localStorageConstant } from '../../../../../../core/constant/util.constant';
declare var Razorpay: any;

@Component({
  selector: 'app-add-credit-popup',
  templateUrl: './add-credit-popup.component.html',
  styleUrls: ['./add-credit-popup.component.scss']
})
export class AddCreditPopupComponent implements OnInit, OnDestroy {
  private _unsubscribeAll = new Subject<void>();
  addCreditForm!: FormGroup;
  statusArr: any = [
    { value: 'Paid', label: 'Paid' },
    { value: 'Not Paid', label: 'Not Paid' },
  ];
  hotelInfo: any;

  constructor(
    private _loader: LoaderService,
    private _lc: LocalStorageService,
    private _gupshupService: GupshupService,
    public dialog: MatDialog,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.hotelInfo = this.getHotelInfo();
    this.initForm();
  }

  // Initialize FormGroup
  initForm() {
    this.addCreditForm = this._fb.group({
      creditAmount: ['', Validators.required],
      description: ['', Validators.required],
      status: [''],
      currencyRupees: [{ value: 'Rupees', disabled: true }], // Pre-filled, disabled
      rupeesPlan: [''],
      rupeesPerMessageCost: [''],
      rupeesMinRechargeCost: ['100', Validators.required],
      rupeesMinAlertCost: ['10', Validators.required],
      currencyDollars: [{ value: 'Dollars', disabled: true }], // Pre-filled, disabled
      dollarsPlan: [''],
      dollarsPerMessageCost: [''],
      dollarsMinRechargeCost: ['100', Validators.required],
      dollarsMinAlertCost: ['10', Validators.required],
    });
  }

  // Retrieve hotel information
  getHotelInfo() {
    return JSON.parse(this._lc.getKey(localStorageConstant.hotelDetails!)!);
  }

  // Add credit using Stripe
  addCredit() {
    if (this.addCreditForm.valid) {
      let formValue = this.addCreditForm.value;
      this._loader.showLoader();
      let payloadStripAmount = {
        hotelName: this.hotelInfo?.hotelName,
        hotelId: this.hotelInfo.hotelId,
        amount: formValue?.creditAmount,
        paymentMethodType: 'card',
      };
      this._gupshupService.addCreditInGupshub(payloadStripAmount).subscribe({
        next: (res: any) => {
          if (res?.url) {
            const newTab = window.open(res.url, '_blank');
            newTab?.focus();
          }
          this._loader.hideLoader();
        },
        error: () => {
          this._loader.hideLoader();
        },
      });
    } else {
      alert('Form is invalid. Please fill in all required fields.');
    }
  }

  // Add credit using Razorpay
  addCreditRozopay() {
    const formValue = this.addCreditForm.value;

    if (!formValue?.creditAmount || formValue.creditAmount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    this._loader.showLoader();
    const payload = {
      hotelName: this.hotelInfo?.hotelName,
      hotelId: this.hotelInfo?.hotelId,
      amount: formValue.creditAmount, // Amount in paise
      paymentMethodType: 'card',
    };

    this._gupshupService.createRazorpayOrder(payload).subscribe({
      next: (response: any) => {
        this._loader.hideLoader();

        if (response?.orderId) {
          this.initiateRazorpayPayment(response);
        } else {
          alert('Failed to create Razorpay order.');
        }
      },
      error: () => {
        this._loader.hideLoader();
        alert('Error initiating payment.');
      },
    });
  }

  // Razorpay payment handler
  initiateRazorpayPayment(orderData: any) {
    const options = {
      key: orderData.key,
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'DistributeLive',
      description: 'Hotel Credit Payment',
      order_id: orderData.orderId,
      handler: (response: any) => {
        this.finalizeRazorpayPayment({ ...response, orderId: orderData.orderId });
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp = new Razorpay(options);

    rzp.on('payment.failed', (response: any) => {
      alert('Payment failed. Please try again.');
    });

    rzp.open();
  }

  // Finalize Razorpay payment
  finalizeRazorpayPayment(paymentResponse: any) {
    this._gupshupService.finalizePayment(paymentResponse).subscribe({
      next: (result: any) => {
        if (result.success) {
          alert('Payment successfully verified.');
        } else {
          alert('Payment verification failed.');
        }
      },
      error: () => {
        alert('Error finalizing payment.');
      },
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
