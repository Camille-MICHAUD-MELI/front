<template>
  <v-app>
    <v-system-bar class="primary" app>
      <v-spacer />

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
        <nuxt-link class="white--" to="/">
          <v-icon color="black">
            mdi-home
          </v-icon>
        </nuxt-link>
      </v-btn>

      <v-toolbar-title>Grade Hub</v-toolbar-title>

      <v-spacer />

      <v-input
        mx-4
      >
        <v-text-field
          v-model="click"
          prepend-inner-icon="mdi-magnify"
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
          @blur="is_focus = false"
          @focus="is_focus = true"
        />
      </v-input>

      <v-hover v-model="hover">
        <v-btn
          class="ma-2"
          outlined
          :color="hover ? 'primary' :'black'"
          :disabled="$auth.user ? true : false"
        >
          <nuxt-link
            class="white--"
            to="/login"
            style="text-decoration: none"
          >
            {{ $auth.user ? 'CONNECTÉ' :'CONNEXION' }}
          </nuxt-link>
        </v-btn>
      </v-hover>

      <v-app-bar-nav-icon class="black--text" @click="drawer = !drawer" />
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
          <v-list-item-subtitle>
            {{ $auth.user ? "Bienvenue " + $auth.user.username :'' }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-container>
        <v-divider class="thirdary" />
      </v-container>
      <v-list>
        <v-list-item
          v-for="n in items"
          :key="n.title + 'items'"
          link
        >
          <v-btn
            block
            color="primary"
            dark
            :to="n.route"
          >
            <v-list-item-icon>
              <v-icon>{{ n.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ n.title }}</v-list-item-title>
            </v-list-item-content>
          </v-btn>
        </v-list-item>
      </v-list>
      <v-container>
        <v-divider
          class="thirdary"
        />
      </v-container>

      <template #append>
        <div class="pa-2">
          <v-hover
            v-model="hover"
            class="pr-2 ma-0"
          >
            <v-btn
              :color="hover ? 'primary' :'white'"
              block
              @click="logout"
            >
              Logout
            </v-btn>
          </v-hover>
        </div>
      </template>
    </v-navigation-drawer>
    <Nuxt />
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    click: true,
    hover: false,
    is_focus: false,
    items: [
      { title: 'Post', icon: 'mdi-view-dashboard', route: '/post' },
      { title: 'Account', icon: 'mdi-account-box', route: '/account' }
    ]
  }),
  methods: {
    async logout () {
      await this.$auth.logout().then(() => {
        this.$store.commit('reload', 1)
        this.$router.push('/login')
      })
    }
  }
}
</script>
