import { Component, Input, OnInit } from "@angular/core";
import { MatTabChangeEvent } from '@angular/material/tabs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: "survey1",
  templateUrl: './firstsurvey.component.html',
  styleUrls: ['./firstsurvey.component.scss'],
})

export class FirstsurveyComponent implements OnInit {
  @Input()
  result: any;

  public selectedIndex = 0
  userFormGroup: FormGroup;
  payFormGroup: FormGroup;
  flightFormGroup: FormGroup;


  nameFormGroup: FormGroup;
  birthFormGroup: FormGroup;
  cardFormGroup: FormGroup;
  applicationFormGroup: FormGroup;
  emailFormGroup: FormGroup;
  mobilecarrierFormGroup: FormGroup;
  // emailFormGroup: FormGroup;

  passengerNumFormGroup: FormGroup;
  travelDateFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.userFormGroup = this._formBuilder.group({
      nameCtrl: ['', Validators.required],
      birthCtrl: [''],
    });

    // this.nameFormGroup = this._formBuilder.group({
    //   nameCtrl: ['', Validators.required],

    // });
    // this.birthFormGroup = this._formBuilder.group({
    //   birthCtrl: [''],
    // });
    this.payFormGroup = this._formBuilder.group({
      samsung_card: false,
      shinhan_card: false,
      hyundai_card: false,
      
      skt_mc: false,
      kt_mc: false,
      lg_mc: false,
      extra_mc: false,
      vip_mc: false,

      kakao_pay: false,
      payco_pay: false,
      smile_pay: false,
      naver_pay: false,
        });

    // this.cardFormGroup = this._formBuilder.group({
    //   samsung: false,
    //   shinhan: false,
    //   hyundai: false,
    //   cardCtrl: [''],
    // });
    // this.applicationFormGroup = this._formBuilder.group({
    //   kakao: false,
    //   payco: false,
    //   smile: false,
    //   naver: false,
    //   applicationCtrl: [''],
    // });
    // this.mobilecarrierFormGroup = this._formBuilder.group({
    //   skt: false,
    //   kt: false,
    //   lg_uplus: false,
    //   extra: false,
    //   vip: false,
    //   mobilecarrierCtrl: [''],
    // });

    this.emailFormGroup = this._formBuilder.group({
      emailCtrl: [''],
    });
    this.flightFormGroup = this._formBuilder.group({
      passengerCtrl: ['', Validators.required],
      travelstartdateCtrl: ['', Validators.required],
      travelenddateCtrl: ['', Validators.required],
    });

    // this.passengerNumFormGroup = this._formBuilder.group({
    //   passengerCtrl: ['', Validators.required],
    // });
    // this.travelDateFormGroup = this._formBuilder.group({
    //   travelstartdateCtrl: ['', Validators.required],
    //   travelenddateCtrl: ['', Validators.required],
    // });
    
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedIndex = tabChangeEvent.index;
  }
}
