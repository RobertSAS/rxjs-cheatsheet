import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LodashTestComponent } from './lodash-test.component';

describe('LodashTestComponent', () => {
  let component: LodashTestComponent;
  let fixture: ComponentFixture<LodashTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LodashTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LodashTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
