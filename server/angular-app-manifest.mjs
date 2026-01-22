
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 12127, hash: 'fce529e6e2345f8c0656556250362be6ee4abfd352d1246dcd13079b7027d46d', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 11877, hash: 'd5414e78091a64b496ab10939ddea8006d09550810add35ffcd495fcfe287355', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 53068, hash: '956305e0daf74461402f4c48d1d1bfb8d706f07fac31913f6b30606caa6f7cc6', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-U2TQF2TA.css': {size: 669, hash: 'Vqgk6AycFTI', text: () => import('./assets-chunks/styles-U2TQF2TA_css.mjs').then(m => m.default)}
  },
};
