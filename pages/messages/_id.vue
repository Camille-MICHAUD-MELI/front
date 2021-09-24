<template>
  <v-app>
    <v-system-bar class="primary" app>
      <v-spacer />

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-dialog
      v-model="dialogb"
      persistent
      max-width="600px"
    >
      <template #activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        />
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title class="text-h5">
            Comment Form
          </v-toolbar-title>
        </v-toolbar>
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
          <v-btn icon>
            <v-icon color="red" @click="dialogb = !dialogb">
              mdi-close
            </v-icon>
          </v-btn>
          <v-btn color="primary white--text" :loading="loading" :disabled="loading" @click="commentHandler()">
            SEND
          </v-btn>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template #activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        />
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title class="text-h5">
            Modification Form
          </v-toolbar-title>
        </v-toolbar>
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
          <v-btn icon>
            <v-icon color="red" @click="dialog = !dialog">
              mdi-close
            </v-icon>
          </v-btn>
          <v-btn color="primary white--text" :loading="loading" :disabled="loading" @click="patchpostHandler()">
            EDIT
          </v-btn>
        </v-container>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      color="white black--text"
    >
      Success !
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
      <v-sheet
        v-if="loading"
        color="white"
        class="pa-3"
      >
        <v-skeleton-loader
          v-bind="attrs"
          type="card-avatar, article, actions"
        />

        <v-skeleton-loader
          v-bind="attrs"
          type="date-picker"
        />
      </v-sheet>
      <v-container v-else fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12" shaped>
              <v-toolbar
                dark
                src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg"
                shaped
              >
                <v-toolbar-title>
                  "{{ message.title }}" par "<v-btn color="primary" depressed>
                    <nuxt-link style="text-decoration: none; color: #FFFFFF" :to="'/user/' + message.user.id">
                      {{ message.user.username }}
                    </nuxt-link>
                  </v-btn>"
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text text-h5 font-weight-bold>
                {{ message.corpse }}
              </v-card-text>
              <v-spacer />
              <v-col
                cols="12"
                sm="3"
              >
                <v-btn
                  icon
                  class="flex-row-reverse"
                >
                  <v-icon
                    :color="like_color ? 'red' : 'grey'"
                    @click="like_color = !like_color; setFav()"
                  >
                    mdi-heart
                  </v-icon>
                </v-btn>
                <v-btn
                  icon
                >
                  <v-icon @click="dialogb = !dialogb">
                    mdi-message-text
                  </v-icon>
                </v-btn>
                <v-flex align-self-center>
                  <v-btn v-if="$auth.user.id === message.user.id" color="primary" @click="dialog = !dialog">
                    <v-icon left>
                      mdi-pencil
                    </v-icon>Edit
                  </v-btn>
                </v-flex>
              </v-col>
            </v-card>
            <v-container>
              <v-row>
                <template v-for="n in comment">
                  <v-col
                    :key="n.id + 'comment'"
                    class="mt-2"
                    cols="12"
                  >
                    <v-card class="elevation-12" shaped>
                      <v-toolbar dark color="primary" shaped>
                        <v-toolbar-title>{{ n.title }}</v-toolbar-title>
                      </v-toolbar>
                      <v-card-text text-h5 font-weight-bold>
                        {{ n.corpse }}
                      </v-card-text>
                    </v-card>
                  </v-col>
                </template>
              </v-row>
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    loading: true,
    loader: null,
    message: null,
    comment: null,
    title: null,
    corpse: null,
    snackbar: false,
    snackbarE: false,
    dialog: false,
    dialogb: false,
    click: null,
    attrs: null,
    like_color: null,
    comment_color: null
  }),
  watch: {
  },
  created () {
    this.postHandler()
  },
  methods: {
    setFav () {
      this.$axios.post('http://127.0.0.1:8000/fav/message/' + this.$route.params.id + '/' + this.$auth.user.id).then((result) => {
      })
    },
    patchpostHandler () {
      const data = {
        title: this.title,
        corpse: this.corpse
      }
      if (data.title === null) {
        data.title = this.message.title
      }
      if (data.corpse === null) {
        data.corpse = this.message.corpse
      }
      this.loading = true
      this.$axios.patch('http://127.0.0.1:8000/message/' + this.$route.params.id, data).then((result) => {
        this.snackbar = true
        this.dialog = false
        this.loading = false
        this.message = result.data
      })
        .catch(() => {
          this.snackbarE = true
          this.loading = false
        })
    },
    commentHandler () {
      const data = {
        title: this.title,
        corpse: this.corpse
      }
      this.loading = true
      this.$axios.post('http://127.0.0.1:8000/commentpost/' + this.$route.params.id, data).then((result) => {
        this.snackbar = true
        this.loading = false
        this.dialogb = false
        setTimeout(() => {
          location.reload()
        }, 2000)
      })
        .catch(() => {
          this.snackbarE = true
          this.loading = false
        })
    },
    postHandler () {
      this.$axios.get('http://127.0.0.1:8000/message-comment/' + this.$route.params.id).then((result) => {
        this.message = result.data.message
        this.comment = result.data.comment
        this.loading = false
      })
        .catch(() => {
          this.$router.push('/error')
        })
    }
  }
}
</script>
