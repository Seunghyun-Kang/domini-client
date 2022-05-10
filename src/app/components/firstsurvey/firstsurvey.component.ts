import { Component, Input, OnInit } from "@angular/core";
import {ErrorStateMatcher} from '@angular/material/core';
import { FormBuilder, FormGroup, Validators,FormControl, FormGroupDirective, NgForm, } from '@angular/forms';
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
  public emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  public NumberFormControl = new FormControl('', [Validators.required, Validators.min(1)]);
  public IS_MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  constructor(private _formBuilder: FormBuilder) {
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
    console.log("name: " + this.userFormGroup.controls['nameCtrl'].value)
    console.log("birth: " + this.userFormGroup.controls['birthCtrl'].value)
    console.log("email: " + this.userFormGroup.controls['emailCtrl'].value)

    console.log("samsung_card: " + this.payFormGroup.controls['samsung_card'].value)
    console.log("shinhan_card: " + this.payFormGroup.controls['shinhan_card'].value)
    console.log("hyundai_card: " + this.payFormGroup.controls['hyundai_card'].value)

    console.log("skt_mc: " + this.payFormGroup.controls['skt_mc'].value)
    console.log("kt_mc: " + this.payFormGroup.controls['kt_mc'].value)
    console.log("lg_mc: " + this.payFormGroup.controls['lg_mc'].value)
    console.log("extra_mc: " + this.payFormGroup.controls['extra_mc'].value)
    console.log("vip_mc: " + this.payFormGroup.controls['vip_mc'].value)
    
    console.log("kakao_pay: " + this.payFormGroup.controls['kakao_pay'].value)
    console.log("payco_pay: " + this.payFormGroup.controls['payco_pay'].value)
    console.log("smile_pay: " + this.payFormGroup.controls['smile_pay'].value)
    console.log("naver_pay: " + this.payFormGroup.controls['naver_pay'].value)
    
    console.log("passenger num: " + this.flightFormGroup.controls['passengerCtrl'].value)
    console.log("travel start date: " + this.flightFormGroup.controls['travelstartdateCtrl'].value)
    console.log("travel end date: " + this.flightFormGroup.controls['travelenddateCtrl'].value)

  }
}
