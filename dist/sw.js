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
    "url": "b95a51b3a7fa91d02bea.js",
    "revision": "aca277492d5e667437e8c7a03703a504"
  },
  {
    "url": "index.html",
    "revision": "5d7efcf433800fbbc16d48972f312db4"
  },
  {
    "url": "style.css",
    "revision": "dc73b3a4eb1d47f9a377c164084b49ad"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
