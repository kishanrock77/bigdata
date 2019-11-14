import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewplanComponent } from './renewplan.component';

describe('RenewplanComponent', () => {
  let component: RenewplanComponent;
  let fixture: ComponentFixture<RenewplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
