<template>
  <v-app>
    <v-system-bar class="primary" app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-main
    class="white"
    >
    <v-sheet
        color="white"
        class="pa-3"
        v-if="loading"
      >
        <v-skeleton-loader
          v-bind="attrs"
          type="card-avatar, article, actions"
        ></v-skeleton-loader>

        <v-skeleton-loader
          v-bind="attrs"
          type="date-picker"
        ></v-skeleton-loader>
    </v-sheet>
       <v-container
       class="white"
       v-else
       > <!--contrainer > vraw -->
        <v-row>
          <template v-for="n in message">
            <v-col
              :key="n"
              class="mt-2"
              cols="12"
            >
              <v-card class="elevation-12" shaped>
                <v-toolbar dark color="primary" shaped>
                  <v-toolbar-title>"<nuxt-link style="text-decoration: none; color: #FFFFFF" :to="'/messages/' + n.id">{{ n.title }}</nuxt-link>" par "<nuxt-link style="text-decoration: none; color: #FFFFFF" :to="'/user/' + n.user.id">{{ n.user.username }}</nuxt-link>"</v-toolbar-title>
                </v-toolbar>
                  <v-card-text text-h5 font-weight-bold>
                      {{ n.corpse }}
                  </v-card-text>
              </v-card>
            </v-col>
          </template>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  created () {
    this.postHandler()
  },
  data: () => ({
    message: null,
    attrs: null,
    loading: true
  }),
  methods: {
    postHandler () {
      this.$axios.get('http://127.0.0.1:8000/message').then((result) => {
        this.message = result.data
        this.loading = false
      })
        .catch((error) => {
          console.log(error)
          this.$router.push('/error')
        })
    }
  }
}
</script>
