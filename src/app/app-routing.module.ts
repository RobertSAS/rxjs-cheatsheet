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
  },
  {
    path: 'concat',
    loadComponent: () => import('./pages/concat-test/concat-test.component').then(c => c.ConcatTestComponent)
  },
  {
    path: 'merge',
    loadComponent: () => import('./pages/merge-test/merge-test.component').then(c => c.MergeTestComponent)
  },
  {
    path: 'combineLatest',
    loadComponent: () => import('./pages/combine-latest-test/combine-latest-test.component').then(c => c.CombineLatestTest)
  },
  {
    path: 'catchError',
    loadComponent: () => import('./pages/catch-error-test/catch-error-test.component').then(c => c.CatchErrorTestComponent)
  },
  {
    path: 'retryWhen',
    loadComponent: () => import('./pages/retry-test/retry-test.component').then(c => c.RetryTestComponent)
  },
  {
    path: 'hotCold',
    loadComponent: () => import('./pages/hot-cold-test/hot-cold-test.component').then(c => c.HotColdTestComponent)
  },

] as Routes;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
