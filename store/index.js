export const state = () => ({
  apiConnectionEstatus: false
})

export const mutations = {
  setConnectionStatus(state, payload) {
    state.apiConnectionEstatus = payload
  }
}

export const actions = {
  async checkApiConnection({ state, commit }, payload) {
    if (payload.token && !payload.apiConnectionEstatus) {
      this.$axios.setToken(payload.token, 'Bearer')

      const { success } = await this.$axios.$post(
        `${payload.host}/core-tenerife-team/api/en/wSystem/testConnection`
      )

      if (success) {
        commit('setConnectionStatus', true)
        return true
      }
    } else if (payload.apiConnectionEstatus) {
      commit('setConnectionStatus', true)
      return true
    }

    commit('setConnectionStatus', false)
    return false
  }
}
