<template>
  <v-app>
    <v-system-bar class="primary" app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

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
                  v-model="username"
                  counter="25"
                  :placeholder="$auth.user ? $auth.user.username : ''"
                  value="For example, flowers or used cars"
                  required
              ></v-text-field>
              <v-text-field
                  name="email"
                  label="Email"
                  type="text"
                  v-model="email"
                  :placeholder="$auth.user ? $auth.user.email : ''"
                  required
              ></v-text-field>
              <v-container fluid>
              <v-textarea
                name="bio"
                label="Bio"
                type="text"
                clearable="true"
                autocomplete="test"
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
                @click:append="() => (value = !value)"
                :type="value ? 'text' : 'password'"
              >
              </v-text-field>
                </span>
              <v-text-field
                  name="phone"
                  label="Phone"
                  type="text"
                  :placeholder="$auth.user ? $auth.user.phone : ''"
                  v-model="phone"
              ></v-text-field>
              <v-text-field
                  name="city"
                  label="City"
                  type="text"
                  :placeholder="$auth.user ? $auth.user.city : ''"
                  v-model="city"
              ></v-text-field>
              <v-text-field
                  name="address"
                  label="Address"
                  type="text"
                  :placeholder="$auth.user ? $auth.user.address : ''"
                  v-model="address"
              ></v-text-field>
              <v-text-field
                  name="zipcode"
                  label="Zipcode"
                  :placeholder="$auth.user ? $auth.user.zipcode : ''"
                  type="text"
                  v-model="zipcode"
              ></v-text-field>
              <v-text-field
                name="country"
                label="Country"
                type="text"
                :placeholder="$auth.user ? $auth.user.country : ''"
                v-model="country"
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
                @click="account"
              ><v-icon>mdi-close</v-icon>
              </v-btn></nuxt-link>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="account_change">Change modifications</v-btn>
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
    items: [
      { title: 'Post', icon: 'mdi-view-dashboard', route: '/post' },
      { title: 'Comment', icon: 'mdi-message-text', route: '/comment' },
      { title: 'Account', icon: 'mdi-account-box', route: '/account' }
    ],
    computed: {
      progress () {
        return Math.min(100, this.value.length * 10)
      },
      color () {
        return ['error', 'warning', 'success'][Math.floor(this.progress / 40)]
      }
    }
  })
}
</script>
