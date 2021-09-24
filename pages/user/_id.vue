<template>
  <v-app>
    <v-system-bar class="primary" app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-main>
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
        <v-container fluid fill-height v-else>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12" shaped>
                        <v-toolbar
                        dark
                        color="primary"
                        shaped
                        ><v-toolbar-title>Profile of {{ user.username }}</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                    <v-text-field
                    :value="user.username"
                    label="Username"
                    outlined
                    readonly
                ></v-text-field>
                <v-container fluid>
                <v-textarea
                    :value="user.bio"
                    label="Bio"
                    outlined
                    readonly
                ></v-textarea>
                </v-container>
                <v-text-field
                    :value="user.city"
                    label="City"
                    outlined
                    readonly
                ></v-text-field>
                <v-text-field
                  :value="user.country"
                    label="Country"
                    outlined
                    readonly
                ></v-text-field>
                <v-text-field
                    :value="user.created"
                    label="Created"
                    outlined
                    readonly
                ></v-text-field>
                <nuxt-link to="/account_modification"><v-btn v-if="$auth.user.id === user.id" color="primary">Wanna change something ?</v-btn></nuxt-link>
                        </v-form>
                     </v-card-text>
                     </v-card>
               </v-flex>
            </v-layout>
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
    loading: true,
    user: null,
    title: null,
    corpse: null,
    snackbar: false,
    snackbarE: false,
    attrs: null,
    dialog: false,
    click: null,
    test: 6,
    like_color: null,
    comment_color: null
  }),
  methods: {
    postHandler () {
      this.$axios.get('http://127.0.0.1:8000/user/' + this.$route.params.id).then((result) => {
        this.user = result.data
        this.loading = false
      })
        .catch((error) => {
          console.log(error)
          this.$router.push('/error')
        })
    },
    commentHandler () {
      const data = {
        title: this.title,
        corpse: this.corpse
      }
      this.$axios.post('http://127.0.0.1:8000/commentpost', data).then((result) => {
        this.snackbar = true
        setTimeout(() => {
          location.reload()
        }, 2000)
      })
        .catch((error) => {
          console.log(error)
          this.snackbarE = true
        })
    }
  }
}
</script>
