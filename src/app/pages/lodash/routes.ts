export const LODASH_ROUTES = [{
  path: '',
  pathMatch: 'prefix',
  children: [
    {
      path: 'basic',
      loadComponent: () => import('./lodash-test/lodash-test.component').then(c => c.LodashTestComponent)
    },
    {
      path: 'es',
      loadComponent: () => import('./lodash-es-test/lodash-es-test.component').then(c => c.LodashEsTestComponent)
    },
  ],
}];
