import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LodashEsTestComponent } from './lodash-es-test.component';

describe('LodashEsTestComponent', () => {
  let component: LodashEsTestComponent;
  let fixture: ComponentFixture<LodashEsTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LodashEsTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LodashEsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
