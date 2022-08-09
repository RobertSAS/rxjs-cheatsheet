import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes = [
  {
    path: 'lodash',
    loadChildren: () => import('./pages/lodash/routes').then(r => r.LODASH_ROUTES)
  },

  {
    path: 'fromPromise',
    loadComponent: () => import('./pages/from-promise-test/from-promise-test.component').then(c => c.FromPromiseTestComponent)
  },

  {
    path: 'forkJoin',
    loadComponent: () => import('./pages/fork-join-test/fork-join-test.component').then(c => c.ForkJoinTestComponent)
  }
] as Routes;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
