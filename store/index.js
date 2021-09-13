export const state = () => ({
  counter: 0,
  token: null
})

export const mutations = {
  increment (state) {
    state.counter++
  },
  setToken (state, token) {
    state.token = token
  }
}
