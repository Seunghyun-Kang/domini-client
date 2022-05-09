import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondsurveyComponent } from './secondsurvey.component';

describe('SecondsurveyComponent', () => {
  let component: SecondsurveyComponent;
  let fixture: ComponentFixture<SecondsurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondsurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondsurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
