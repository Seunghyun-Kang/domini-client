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
      samsung_card: [false],
      shinhan_card: [false],
      hyundai_card: [false],

      skt_mc: [false],
      kt_mc:  [false],
      lg_mc:  [false],
      extra_mc:  [false],
      vip_mc:  [false],

      kakao_pay: [false],
      payco_pay: [false],
      smile_pay:  [false],
      naver_pay:  [false],
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
          "samsung_card": this.payFormGroup.controls['samsung_card'].value ? 'Y' : 'N',
          "hyundai_card": this.payFormGroup.controls['hyundai_card'].value ? 'Y' : 'N',
          "shinhan_card": this.payFormGroup.controls['shinhan_card'].value ? 'Y' : 'N',

          "skt_mc": this.payFormGroup.controls['skt_mc'].value ? 'Y' : 'N',
          "kt_mc": this.payFormGroup.controls['kt_mc'].value ? 'Y' : 'N',
          "lg_mc": this.payFormGroup.controls['lg_mc'].value ? 'Y' : 'N',
          "extra_mc": this.payFormGroup.controls['extra_mc'].value ? 'Y' : 'N',
          "vip_mc": this.payFormGroup.controls['vip_mc'].value ? 'Y' : 'N',

          "kakao_pay": this.payFormGroup.controls['kakao_pay'].value ? 'Y' : 'N',
          "payco_pay": this.payFormGroup.controls['payco_pay'].value ? 'Y' : 'N',
          "smile_pay": this.payFormGroup.controls['smile_pay'].value ? 'Y' : 'N',
          "naver_pay": this.payFormGroup.controls['naver_pay'].value ? 'Y' : 'N'

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
          this.matchEventList = Object(v.body)['match']
          this.oneStepEventList = Object(v.body)['onestep']
        },
        error: (e: any) => console.log("ERROR OCCURED :: " + JSON.stringify(e))
      });
    }
  }
}
