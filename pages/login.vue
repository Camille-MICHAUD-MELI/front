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
      class="black--text"
      >
        <v-text-field
        v-model="click"
        prepend-inner-icon="mdi-magnify"
        @blur="is_focus = false"
        @focus="is_focus = true"
        :background-color="is_focus ? 'black' :'white'"
        color="primary black--text"
        class="mt-12 red--text"
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
      src="https://images6.alphacoders.com/316/316600.png"
      width=""
      fixed
      dark
      temporary
      right
    >
    <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list rounded>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        ><v-btn
          rounded
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

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

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
                              type="password"
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
    drawer: null,
    hover: false,
    is_focus: false,
    email: null,
    password: null,
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/test' },
      { title: 'Account', icon: 'mdi-account-box', route: '/test' }
    ]
  }),
  methods: {
    async loginHandler () {
      const data = { email: this.email, password: this.password }
      console.log(data)
      try {
        const response = await this.$auth.loginWith('local', data)
        console.log(response)
        this.$auth.$storage.setUniversal('email', response.data.email)
        await this.$auth.setUserToken(response.data.access_token, response.data.refresh_token)
      } catch (e) {
        console.log(e.message)
      }
    }
  }
}
</script>
