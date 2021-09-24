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
                <v-toolbar-title>Comment Form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="post_title"
                    name="title_origine"
                    label="Title of the Original Post"
                    type="text"
                  />
                  <v-text-field
                    v-model="title"
                    name="title"
                    label="Title"
                    type="text"
                  />
                  <v-container fluid>
                    <v-textarea
                      v-model="corpse"
                      name="corpse"
                      filled
                      label="Message"
                      auto-grow
                      class="pa-0 ma-0"
                    />
                  </v-container>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="commentHandler">
                  POST
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
  data: () => ({
    drawer: null,
    hover: false,
    is_focus: false,
    items: [
      { title: 'Post', icon: 'mdi-view-dashboard', route: '/post' },
      { title: 'Comment', icon: 'mdi-message-text', route: '/comment' },
      { title: 'Account', icon: 'mdi-account-box', route: '/account' }
    ]
  }),
  methods: {
    commentHandler () {
      const data = {
        title: this.title,
        post_title: this.post_title,
        corpse: this.corpse
      }
      this.$axios.post('http://127.0.0.1:8000/commentpost', data).then((result) => {
        this.snackbar = true
        setTimeout(() => {
          this.$router.push('/')
        }, 2000)
      })
        .catch(() => {
          this.snackbarE = true
        })
    }
  }
}
</script>
