// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import { UniformOptimizePlugin } from '@uniformdev/optimize-tracker-vue';
import { componentResolver } from '@/components/componentResolver.js';
import '~/assets/css/main.css';
import DefaultLayout from '@/layouts/Default.vue';
import Cookies from 'js-cookie';
import localTracker from '@/lib/local-tracker';

export default function(Vue, { router, head, isClient, context }) {
  head.htmlAttrs = {
    lang: 'en',
  };
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout);
  // register vue plugins
  // setup tracker and register vue plugins for optimize
  const trackerInstance = localTracker({
    // analytics: Vue.$ga,
    cookiePlugin: Cookies,
    server: !isClient
  });

  Vue.use(UniformOptimizePlugin, {
    trackerInstance,
    componentResolver,
  });
}
