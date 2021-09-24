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
    Modification has been done
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
              <v-toolbar-title>Modification du Profil</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  name="pseudo"
                  label="Pseudo"
                  type="text"
                  counter="25"
                  :value="$auth.user ? $auth.user.username :''"
                  :placeholder="$auth.user ? $auth.user.username : ''"
                  required
                  v-model="username"
              ></v-text-field>
              <v-text-field
                  name="email"
                  label="Email"
                  type="text"
                  :value="$auth.user ? $auth.user.email :''"
                  :placeholder="$auth.user ? $auth.user.email : ''"
                  v-model="email"
                  required
              ></v-text-field>
              <v-container fluid>
              <v-textarea
                name="bio"
                label="Bio"
                type="text"
                clearable
                autocomplete="test"
                :value="$auth.user ? $auth.user.bio :''"
                :placeholder="$auth.user ? $auth.user.bio : ''"
                v-model="bio"
              ></v-textarea>
              </v-container>
              <span class="material-icons">
              <v-text-field
                id="password"
                name="password"
                label="Password"
                v-model="password"
                required
                :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="value = !value"
                :type="value ? 'text' : 'password'"
              >
              </v-text-field>
                </span>
              <v-text-field
                  name="phone"
                  label="Phone"
                  type="text"
                  :value="$auth.user ? $auth.user.phone :''"
                  :placeholder="$auth.user ? $auth.user.phone : ''"
                  v-model="phone"
              ></v-text-field>
              <v-text-field
                  name="city"
                  label="City"
                  type="text"
                  :placeholder="$auth.user ? $auth.user.city : ''"
                  :value="$auth.user ? $auth.user.city :''"
                  v-model="city"
              ></v-text-field>
              <v-text-field
                  name="address"
                  label="Address"
                  type="text"
                  :placeholder="$auth.user ? $auth.user.address : ''"
                  :value="$auth.user ? $auth.user.address :''"
                  v-model="address"
              ></v-text-field>
              <v-text-field
                  name="zipcode"
                  label="Zipcode"
                  :placeholder="$auth.user ? $auth.user.zipcode : ''"
                  type="text"
                  :value="$auth.user ? $auth.user.zipcode :''"
              ></v-text-field>
              <v-text-field
                name="country"
                label="Country"
                type="text"
                :placeholder="$auth.user ? $auth.user.country : ''"
                :value="$auth.user ? $auth.user.country :''"
              ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <nuxt-link
              to="/account"
              style="text-decoration: none"
              ><v-btn
                icon
                color="red white--text"
              ><v-icon>mdi-close</v-icon>
              </v-btn></nuxt-link>
              <v-spacer></v-spacer>
              <v-btn
              color="primary"
              @click="accountChange"
              id="$auth.user.id"
              >Change modifications</v-btn>
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
    snackbar: false,
    snackbarE: false,
    account: null,
    drawer: null,
    hover: false,
    is_focus: false,
    value: null,
    email: null,
    username: null,
    token: '',
    password: null,
    valuee: '',
    custom: true,
    click: true,
    items: [
      { title: 'Post', icon: 'mdi-view-dashboard', route: '/post' },
      { title: 'Comment', icon: 'mdi-message-text', route: '/comment' },
      { title: 'Account', icon: 'mdi-account-box', route: '/account' }
    ]
  }),
  methods: {
    accountChange () {
      const data = {
        username: this.username,
        email: this.email,
        bio: this.bio,
        password: this.password,
        phone: this.phone,
        city: this.city,
        address: this.address,
        zipcode: this.zipcode,
        country: this.country
      }
      if (data.username === null) {
        data.username = this.$auth.user.username
      }
      if (data.email === null) {
        data.email = this.$auth.user.email
      }
      if (data.bio === null) {
        data.bio = this.$auth.user.bio
      }
      if (data.password === null) {
        data.password = this.$auth.user.password
      }
      if (data.phone === null) {
        data.phone = this.$auth.user.phone
      }
      if (data.city === null) {
        data.city = this.$auth.user.city
      }
      if (data.address === null) {
        data.address = this.$auth.user.address
      }
      if (data.zipcode === null) {
        data.zipcode = this.$auth.user.zipcode
      }
      if (data.country === null) {
        data.country = this.$auth.user.country
      }
      this.$axios.patch('http://127.0.0.1:8000/users/' + this.$auth.user.id, data).then((result) => {
        this.snackbar = true
        setTimeout(() => {
          this.$router.push('/account')
        }, 3000)
      })
        .catch((error) => {
          console.log(error)
          this.snackbarE = true
        })
    }
  }
}
</script>
