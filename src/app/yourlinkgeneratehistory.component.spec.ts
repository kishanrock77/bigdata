import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourlinkgeneratehistoryComponent } from './yourlinkgeneratehistory.component';

describe('YourlinkgeneratehistoryComponent', () => {
  let component: YourlinkgeneratehistoryComponent;
  let fixture: ComponentFixture<YourlinkgeneratehistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourlinkgeneratehistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourlinkgeneratehistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
