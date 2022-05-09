import { Component, Input, EventEmitter, Output, OnInit } from "@angular/core";


import * as Survey from "survey-angular";



import "survey-angular/modern.css";

Survey.StylesManager.applyTheme("modern");

@Component({
    // tslint:disable-next-line:component-selector
    selector: "survey1",
    template: `<div class="survey-container contentcontainer codecontainer">
    <div id="surveyElement"></div>
  </div>`
})
export class FirstsurveyComponent implements OnInit {
    @Output() submitSurvey = new EventEmitter<any>();
    @Input()
    result: any;

    ngOnInit() {
        
        

        const json = {
  "elements": [
    {
      "name": "name",
      "type": "text",
      "title": "Please enter your name:",
      "placeHolder": "Jon Snow",
      "isRequired": true,
      "autoComplete": "name"
    },
    {
      "name": "birthdate",
      "type": "text",
      "inputType": "date",
      "title": "Your birthdate:",
      "isRequired": true,
      "autoComplete": "bdate"
    },
    {
      "name": "color",
      "type": "text",
      "inputType": "color",
      "title": "Your favorite color:"
    },
    {
      "name": "email",
      "type": "text",
      "inputType": "email",
      "title": "Your e-mail:",
      "placeHolder": "jon.snow@nightwatch.org",
      "isRequired": true,
      "autoComplete": "email",
      "validators": [ { "type": "email" } ]
    }
  ]
};
const survey = new Survey.Model(json);

        

        

        Survey.SurveyNG.render("surveyElement", { model: survey });
    }
}
