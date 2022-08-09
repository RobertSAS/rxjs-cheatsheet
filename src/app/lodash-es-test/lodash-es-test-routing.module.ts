import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LodashEsTestComponent } from "./lodash-es-test/lodash-es-test.component";

const routes: Routes = [
  {
    path: '',
    component: LodashEsTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LodashEsTestRoutingModule {
}
