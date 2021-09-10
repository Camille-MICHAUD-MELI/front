<template>
  <v-app>
    <v-system-bar class="thirdary" app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-app-bar
      class="white black--text"
      dark
      dense
      app
    >
      <v-btn icon>
        <nuxt-link class="white--" to="/"><v-icon color="black">mdi-home</v-icon></nuxt-link>
      </v-btn>

      <v-toolbar-title>Grade Hub</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-input
      mx-4
      >
        <v-text-field
        v-model="click"
        prepend-inner-icon="mdi-magnify"
        @blur="is_focus = false"
        @focus="is_focus = true"
        :background-color="is_focus ? 'black' :'white'"
        color="primary"
        class="mt-12"
        light
        enclosed
        outlined
        filled
        label="Que cherchez-vous ?"
        dense
        app
        >
        </v-text-field>
      </v-input>

      <v-hover v-model="hover">
        <v-btn
          class="ma-2"
          outlined
          :color="hover ? 'primary' :'black'"
        >
          <nuxt-link class="white--" to="/login">CONNEXION</nuxt-link>
        </v-btn>
      </v-hover>

      <v-app-bar-nav-icon class="black--text" @click="drawer = !drawer"></v-app-bar-nav-icon>

    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      class="white black--text"
      width=""
      fixed
      light
      temporary
      right
    >
    <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Menu
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-container>
        <v-divider class="thirdary"></v-divider>
      </v-container>
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        ><v-btn
          block
          color="primary"
          dark
          :to='item.route'>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>

        </v-btn></v-list-item>
      </v-list>
      <v-container>
        <v-divider
        class="thirdary"
        >
        </v-divider>
      </v-container>

      <template v-slot:append>
        <div class="pa-2">
          <v-hover
          class="pr-2 ma-0"
          v-model="hover"
          >
            <v-btn
            :color="hover ? 'primary' :'white'"
            block
            >
              Logout
            </v-btn>
          </v-hover>
        </div>
      </template>
    </v-navigation-drawer>

    <v-snackbar
      v-model="snackbar"
      color="red white--text"
    >
    Wrong Email or password, please try again.
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar = false"
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
                              name="email"
                              label="Email"
                              type="text"
                              v-model="email"
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
                        <v-btn color="primary" @click="loginHandler">Login</v-btn>
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
    password: null,
    items: [
      { title: 'Post', icon: 'mdi-view-dashboard', route: '/post' },
      { title: 'Comment', icon: 'mdi-message-text', route: '/comment' },
      { title: 'Account', icon: 'mdi-account-box', route: '/account' }
    ]
  }),
  methods: {
    loginHandler () {
      const data = {
        email: this.email,
        password: this.password
      }
      console.log(data)
      console.log(data)
      this.$axios.post('http://127.0.0.1:8000/login_check', data).then((result) => {
        console.log(result)
        this.$router.push('/')
      })
        .catch((error) => {
          console.log(error)
          this.snackbar = true
        })
    }
  }
}
</script>
