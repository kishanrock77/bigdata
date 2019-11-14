import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YouremailhistoryComponent } from './youremailhistory.component';

describe('YouremailhistoryComponent', () => {
  let component: YouremailhistoryComponent;
  let fixture: ComponentFixture<YouremailhistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YouremailhistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YouremailhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
