import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LodashTestRoutingModule } from './lodash-test-routing.module';
import { LodashTestComponent } from './lodash-test/lodash-test.component';


@NgModule({
  declarations: [
    LodashTestComponent
  ],
  imports: [
    CommonModule,
    LodashTestRoutingModule
  ]
})
export class LodashTestModule { }
