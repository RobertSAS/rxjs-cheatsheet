import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'lodash',
    loadChildren: () => import('./lodash-test/lodash-test.module').then(m => m.LodashTestModule)
  },

  {
    path: 'lodash-es',
    loadChildren: () => import('./lodash-es-test/lodash-es-test.module').then(m => m.LodashEsTestModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
