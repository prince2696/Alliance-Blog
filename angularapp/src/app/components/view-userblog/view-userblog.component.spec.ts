import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserblogComponent } from './view-userblog.component';

describe('ViewUserblogComponent', () => {
  let component: ViewUserblogComponent;
  let fixture: ComponentFixture<ViewUserblogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUserblogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
