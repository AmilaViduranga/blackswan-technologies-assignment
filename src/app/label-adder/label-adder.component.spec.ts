import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelAdderComponent } from './label-adder.component';

describe('LabelAdderComponent', () => {
  let component: LabelAdderComponent;
  let fixture: ComponentFixture<LabelAdderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelAdderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
