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
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    hover: false,
    is_focus: false,
    items: [
      { title: 'Post', icon: 'mdi-view-dashboard', route: '/post' },
      { title: 'Comment', icon: 'mdi-message-text', route: '/comment' },
      { title: 'Account', icon: 'mdi-account-box', route: '/account' }
    ]
  })
}
</script>
