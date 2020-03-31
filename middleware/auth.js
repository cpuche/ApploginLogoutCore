export default async function({ store, req }) {
  if (process.server) {
    const refererInfo = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?]+)/gi.exec(
      req.headers.referer
    )
    const payload = {
      host: refererInfo[0],
      token: req.body.token || null,
      apiConnectionEstatus: req.session.apiConnectionEstatus || false
    }
    const success = await store.dispatch('checkApiConnection', payload)
    if (success) {
      req.session.apiConnectionEstatus = true
    } else {
      req.session.apiConnectionEstatus = false
    }
  }
}
