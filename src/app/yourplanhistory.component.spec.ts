import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourplanhistoryComponent } from './yourplanhistory.component';

describe('YourplanhistoryComponent', () => {
  let component: YourplanhistoryComponent;
  let fixture: ComponentFixture<YourplanhistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourplanhistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourplanhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
