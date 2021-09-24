<template>
  <v-app>
    <v-system-bar class="primary" app>
      <v-spacer />

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-snackbar
      v-model="snackbar"
      color="white black--text"
    >
      Your account has been registered
      <template #action="{ attrs }">
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
      <template #action="{ attrs }">
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
                <v-toolbar-title>Signup form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="username"
                    :rules="usernameRules"
                    name="pseudo"
                    label="Pseudo"
                    type="text"
                    :counter="25"
                    required
                  />
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    name="email"
                    label="Email"
                    type="text"
                    required
                  />
                  <v-container fluid>
                    <v-textarea
                      v-model="bio"
                      name="bio"
                      label="Bio *"
                      type="text"
                    />
                  </v-container>
                  <span class="material-icons">
                    <v-text-field
                      id="password"
                      v-model="password"
                      name="password"
                      :rules="passwordRules"
                      label="Password"
                      :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="value ? 'text' : 'password'"
                      @click:append="() => (value = !value)"
                    />
                  </span>
                  <v-text-field
                    v-model="phone"
                    name="phone"
                    label="Phone *"
                    type="number"
                  />
                  <v-text-field
                    v-model="city"
                    name="city"
                    label="City *"
                    type="text"
                  />
                  <v-text-field
                    v-model="address"
                    name="address"
                    label="Address *"
                    type="text"
                  />
                  <v-text-field
                    v-model="zipcode"
                    name="zipcode"
                    label="Zipcode *"
                    type="number"
                  />
                  <v-text-field
                    v-model="country"
                    name="country"
                    label="Country *"
                    type="letters"
                  />
                  * = Optional
                </v-form>
              </v-card-text>
              <v-card-actions>
                <nuxt-link to="/login">
                  <v-btn color="primary">
                    Already Registered ?
                  </v-btn>
                </nuxt-link>
                <v-spacer />
                <v-btn
                  color="primary"
                  :loading="loading"
                  :disabled="loading || !valid"
                  @click="signupHandler()"
                >
                  Signup
                </v-btn>
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
  auth: false,
  name: 'Register',
  data: () => ({
    valid: true,
    loading: false,
    loader: null,
    snackbar: false,
    snackbarE: false,
    drawer: null,
    hover: false,
    is_focus: false,
    username: '',
    zipcode: null,
    city: null,
    country: null,
    address: null,
    phone: null,
    password: null,
    bio: null,
    email: null,
    value: null,
    items: [
      { title: 'Post', icon: 'mdi-view-dashboard', route: '/post' },
      { title: 'Comment', icon: 'mdi-message-text', route: '/comment' },
      { title: 'Account', icon: 'mdi-account-box', route: '/account' }
    ],
    usernameRules: [
      v => !!v || 'Username is required',
      v => (v && v.length <= 10) || 'Username must be less than 10 characters'
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: [
      v => !!v || 'Password Required',
      v => (v && v.length >= 5) || 'Password must have at least 5 chars'
    ]
  }),
  watch: {
  },
  methods: {
    signupHandler () {
      const data = {
        email: this.email,
        password: this.password,
        zipcode: this.zipcode,
        city: this.city,
        phone: this.phone,
        username: this.username,
        bio: this.bio,
        country: this.country,
        address: this.address
      }
      this.$refs.form.validate()
      this.loading = true
      this.$axios.post('http://127.0.0.1:8000/register', data).then((result) => {
        this.loading = false
        this.snackbar = true
        setTimeout(() => {
          this.$router.push('/login')
        }, 2000)
      })
        .catch(() => {
          this.loading = false
          this.snackbarE = true
        })
    }
  }
}
</script>
