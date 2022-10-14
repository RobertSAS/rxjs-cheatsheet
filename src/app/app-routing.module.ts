import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes = [
  {
    path: 'fromPromise',
    loadComponent: () => import('./pages/rxjs/function-examples/from-promise-test/from-promise-test.component').then(c => c.FromPromiseTestComponent)
  },
  {
    path: 'makeCold',
    loadComponent: () => import('./pages/rxjs/use-cases/make-cold/make-cold.component').then(c => c.MakeColdComponent)
  },
  {
    path: 'makeSuperHot',
    loadComponent: () => import('./pages/rxjs/use-cases/make-superhot/make-super-hot.component').then(c => c.MakeSuperHotComponent)
  },

  {
    path: 'forkJoin',
    loadComponent: () => import('./pages/rxjs/function-examples/fork-join-test/fork-join-test.component').then(c => c.ForkJoinTestComponent)
  },
  {
    path: 'concat',
    loadComponent: () => import('./pages/rxjs/function-examples/concat-test/concat-test.component').then(c => c.ConcatTestComponent)
  },
  {
    path: 'merge',
    loadComponent: () => import('./pages/rxjs/function-examples/merge-test/merge-test.component').then(c => c.MergeTestComponent)
  },
  {
    path: 'combineLatest',
    loadComponent: () => import('./pages/rxjs/function-examples/combine-latest-test/combine-latest-test.component').then(c => c.CombineLatestTest)
  },
  {
    path: 'catchError',
    loadComponent: () => import('./pages/rxjs/pipe-examples/catch-error-test/catch-error-test.component').then(c => c.CatchErrorTestComponent)
  },
  {
    path: 'retryWhen',
    loadComponent: () => import('./pages/rxjs/pipe-examples/retry-test/retry-test.component').then(c => c.RetryTestComponent)
  },
  {
    path: 'hotCold',
    loadComponent: () => import('./pages/rxjs/use-cases/hot-cold-test/share-cold-test.component').then(c => c.ShareColdTestComponent)
  },

] as Routes;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
