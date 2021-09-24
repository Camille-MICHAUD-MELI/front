<template>
  <v-app>
    <v-system-bar class="primary" app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

  <v-snackbar
      v-model="snackbar"
      color="white black--text"
    >
    Login success
      <template v-slot:action="{ attrs }">
        <v-btn
          color="primary"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar
      v-model="snackbarE"
      color="red white--text"
    >
    An Error as occured
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarE = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-main>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Login form</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                           <v-text-field
                              name="username"
                              label="Username"
                              type="text"
                              v-model="username"
                           ></v-text-field>
                           <v-text-field
                              id="password"
                              name="password"
                              label="Password"
                              :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                              @click:append="() => (value = !value)"
                              :type="value ? 'text' : 'password'"
                              v-model="password"
                           ></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <nuxt-link to="/register"><v-btn color="primary">New ?</v-btn></nuxt-link>
                        <v-spacer></v-spacer>
                        <v-btn
                        color="primary"
                        :loading="loading"
                        :disabled="loading"
                        @click="loginHandler(); loader = 'loading'"
                        >LOGIN</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    loader: null,
    loading: false,
    snackbarE: false,
    snackbar: false,
    attrs: null,
    drawer: null,
    hover: false,
    is_focus: false,
    value: null,
    email: null,
    username: null,
    token: '',
    password: null,
    items: [
      { title: 'Post', icon: 'mdi-view-dashboard', route: '/post' },
      { title: 'Comment', icon: 'mdi-message-text', route: '/comment' },
      { title: 'Account', icon: 'mdi-account-box', route: '/account' }
    ]
  }),
  mounted () {
    if (this.$store.state.reload === 1) {
      this.$store.commit('reload', 0)
      location.reload()
    }
    if (localStorage.name) {
      this.token = localStorage.token
    }
  },
  watch: {
    name (newToken) {
      localStorage.token = newToken
    },
    loader () {
      const l = this.loader
      this[l] = !this[l]
    }
  },

  methods: {
    loginHandler () {
      const data = {
        username: this.username,
        password: this.password
      }
      this.logreq = true
      this.$auth.loginWith('local', { data }).then((result) => {
        this.snackbar = true
        this.$store.commit('setToken', result.data.token)
        this.$router.push('/')
      })
        .catch((error) => {
          console.log(error)
          this.loading = null
          this.snackbarE = true
        })
    }
  }
}
</script>
