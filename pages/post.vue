<template>
  <v-app>
    <v-system-bar class="primary" app>
      <v-spacer />

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-snackbar
      v-model="snackbar"
      color="white black--text"
    >
      Your message has been posted
      <template #action="{ attrs }">
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
      <template #action="{ attrs }">
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
                <v-toolbar-title>Post Form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-container fluid>
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
                  </v-container>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" :loading="loading" :disabled="loading" @click="postHandler">
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
    snackbar: false,
    snackbarE: false,
    corpse: null,
    title: null,
    drawer: null,
    loading: false,
    hover: false,
    value: null,
    is_focus: false,
    items: [
      { title: 'Post', icon: 'mdi-view-dashboard', route: '/post' },
      { title: 'Comment', icon: 'mdi-message-text', route: '/comment' },
      { title: 'Account', icon: 'mdi-account-box', route: '/account' }
    ]
  }),
  methods: {
    postHandler () {
      const data = {
        title: this.title,
        corpse: this.corpse
      }
      this.loading = true
      this.$axios.post('http://127.0.0.1:8000/messagepost', data).then((result) => {
        this.snackbar = true
        this.loading = false
        setTimeout(() => {
          this.$router.push('/')
        }, 2000)
      })
        .catch(() => {
          this.loading = false
          this.snackbarE = true
        })
    }
  }
}
</script>
