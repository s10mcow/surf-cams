importScripts('workbox-sw.prod.v2.1.3.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "adc63a38b608df1e5a26.js",
    "revision": "71ce51f128149ae8b93d6cc7a998c345"
  },
  {
    "url": "index.html",
    "revision": "70a3ad5dc8f9e2e02d58ead698a8ab04"
  },
  {
    "url": "style.css",
    "revision": "dc73b3a4eb1d47f9a377c164084b49ad"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
