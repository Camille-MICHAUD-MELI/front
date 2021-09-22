export const state = () => ({
  counter: 0,
  idMessage: null,
  token: null
})

export const mutations = {
  increment (state) {
    state.counter++
  },
  setToken (state, token) {
    state.token = token
  },
  setIdmessage (state, idMessage) {
    state.id_message = idMessage
  }
}
