/*
 Stub for `pdf.js/src/core/internal_viewer_utils.js`, which only exists for
 the Mozilla internal viewer (`INTERNAL_VIEWER` builds) and throws when
 loaded in a GENERIC build. The real module is only reached through a
 dynamic import that is never executed at runtime, but it would still be
 inlined in the worker bundle, where its module-level `throw` runs at
 startup.
 */
const InternalViewerUtils = null

export { InternalViewerUtils }
