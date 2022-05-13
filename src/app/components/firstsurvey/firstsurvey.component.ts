import { Component, Input, OnInit } from "@angular/core";
import {ErrorStateMatcher} from '@angular/material/core';
import { FormBuilder, FormGroup, Validators,FormControl, FormGroupDirective, NgForm, } from '@angular/forms';
import { RequestService } from 'src/app/services/request.service';

export interface IEvent {
    airline: string,
    discount: number,
    credit_card: string,
    pay_application: string,
    min_cost: number,
    start_date: string,
    end_date: string,
    need_category: string,
    need_value: string
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: "survey1",
  templateUrl: './firstsurvey.component.html',
  styleUrls: ['./firstsurvey.component.scss'],
})

export class FirstsurveyComponent implements OnInit {
  result: any;
  userFormGroup: FormGroup;
  payFormGroup: FormGroup;
  flightFormGroup: FormGroup;
  matcher = new MyErrorStateMatcher();
  public getData = false
  public matchEventList: Array<IEvent> = []
  public oneStepEventList: Array<IEvent> = []
  public emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  public NumberFormControl = new FormControl('', [Validators.required, Validators.min(1)]);
  public IS_MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  constructor(private _formBuilder: FormBuilder,
    private requestService: RequestService,) {
  }

  ngOnInit() {
    this.userFormGroup = this._formBuilder.group({
      nameCtrl: ['', Validators.required],
      birthCtrl: [''],
      emailCtrl: ['', [Validators.required, Validators.email]],
    });

    this.payFormGroup = this._formBuilder.group({
      card_samsung: [false],
      card_shinhan: [false],
      card_kb: [false],
      card_bc: [false],
      card_hyundai: [false],
      card_nh: [false],
      card_lotte: [false],
      card_woori: [false],

      mc_skt: [false],
      mc_kt:  [false],
      mc_lgu:  [false],
      mc_vip:  [false],

      pay_kakao: [false],
      pay_naver: [false],
      pay_payco:  [false],
      pay_smile:  [false],
    });

    this.flightFormGroup = this._formBuilder.group({
      passengerCtrl: [null, [Validators.required,Validators.min(1), Validators.max(100),]],
      travelstartdateCtrl: ['', Validators.required],
      travelenddateCtrl: ['', Validators.required],
    });
  }
  valuechange(event: any, type: string) {
    switch(type){
      case 'name':
        console.log(event)
        // this.user_name = event.value
    }
  }

  onClickComplete() {
    if(this.flightFormGroup.controls['passengerCtrl'].value !== undefined &&
    this.flightFormGroup.controls['travelstartdateCtrl'].value !== undefined &&
    this.flightFormGroup.controls['travelenddateCtrl'].value !== undefined) {
      console.log("REQUEST SEND")
      this.requestService.getEvent({
        "user_info": {
          "name": this.userFormGroup.controls['nameCtrl'].value,
          "birthday": this.userFormGroup.controls['birthCtrl'].value,
          "email": this.userFormGroup.controls['emailCtrl'].value
        },
        "pay_info": {
          "card_samsung": this.payFormGroup.controls['card_samsung'].value ? 'Y' : 'N',
          "card_shinhan": this.payFormGroup.controls['card_shinhan'].value ? 'Y' : 'N',
          "card_kb": this.payFormGroup.controls['card_kb'].value ? 'Y' : 'N',
          "card_bc": this.payFormGroup.controls['card_bc'].value ? 'Y' : 'N',
          "card_hyundai": this.payFormGroup.controls['card_hyundai'].value ? 'Y' : 'N',
          "card_nh": this.payFormGroup.controls['card_nh'].value ? 'Y' : 'N',
          "card_lotte": this.payFormGroup.controls['card_lotte'].value ? 'Y' : 'N',
          "card_woori": this.payFormGroup.controls['card_woori'].value ? 'Y' : 'N',

          "mc_skt": this.payFormGroup.controls['mc_skt'].value ? 'Y' : 'N',
          "mc_kt": this.payFormGroup.controls['mc_kt'].value ? 'Y' : 'N',
          "mc_lgu": this.payFormGroup.controls['mc_lgu'].value ? 'Y' : 'N',
          "mc_vip": this.payFormGroup.controls['mc_vip'].value ? 'Y' : 'N',

          "pay_kakao": this.payFormGroup.controls['pay_kakao'].value ? 'Y' : 'N',
          "pay_naver": this.payFormGroup.controls['pay_naver'].value ? 'Y' : 'N',
          "pay_payco": this.payFormGroup.controls['pay_payco'].value ? 'Y' : 'N',
          "pay_smile": this.payFormGroup.controls['pay_smile'].value ? 'Y' : 'N'

        },
        "flight_info": {
          "passenger_num": this.flightFormGroup.controls['passengerCtrl'].value,
          "start_date": this.flightFormGroup.controls['travelstartdateCtrl'].value,
          "end_date": this.flightFormGroup.controls['travelenddateCtrl'].value,
        }
      }, "airline").subscribe({
        next: (v: any) => {
          this.getData = true
          console.log("RESPONSE CAME")
          console.log(Object(v.body))
          this.matchEventList = Object(v.body)
          this.oneStepEventList = Object(v.body)['onestep']
        },
        error: (e: any) => console.log("ERROR OCCURED :: " + JSON.stringify(e))
      });
    }
  }

  onClickLink(url: string){
    window.open(url, "_blank");
  }
}
