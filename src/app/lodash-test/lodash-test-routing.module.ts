import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LodashTestComponent } from "./lodash-test/lodash-test.component";

const routes: Routes = [
  {
    path: '',
    component: LodashTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LodashTestRoutingModule { }
