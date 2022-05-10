import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { FirstsurveyComponent } from './components/firstsurvey/firstsurvey.component';
import { SecondsurveyComponent } from './components/secondsurvey/secondsurvey.component';
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field'
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    FirstsurveyComponent,
    SecondsurveyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatStepperModule,MatFormFieldModule,
    FormsModule,ReactiveFormsModule,
    MatInputModule,
    MatNativeDateModule,
    MatIconModule,
    MatDatepickerModule,
    MatCheckboxModule,
    HttpClientModule
  ],
  providers: [ {
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: {showError: true},
  },{
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: {displayDefaultIndicatorType: false},
  },],

  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
