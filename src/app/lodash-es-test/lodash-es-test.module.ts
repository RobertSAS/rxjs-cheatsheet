import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LodashEsTestRoutingModule } from './lodash-es-test-routing.module';
import { LodashEsTestComponent } from './lodash-es-test/lodash-es-test.component';


@NgModule({
  declarations: [
    LodashEsTestComponent
  ],
  imports: [
    CommonModule,
    LodashEsTestRoutingModule
  ]
})
export class LodashEsTestModule { }
