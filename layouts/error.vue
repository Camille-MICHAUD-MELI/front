<template>
  <v-app>
    <v-system-bar class="primary" app>
      <v-spacer />

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
                <v-toolbar-title>Error: Page not found</v-toolbar-title>
                <v-spacer />
                <v-btn icon>
                  <nuxt-link class="white--" to="/">
                    <v-icon color="white">
                      mdi-home
                    </v-icon>
                  </nuxt-link>
                </v-btn>
              </v-toolbar>
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
    items: [
      { title: 'Post', icon: 'mdi-view-dashboard', route: '/post' },
      { title: 'Account', icon: 'mdi-account-box', route: '/account' }
    ]
  })
}
</script>
