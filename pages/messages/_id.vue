<template>
  <v-app>
    <v-system-bar class="primary" app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-dialog
      v-model="dialogb"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
        </v-btn>
      </template>
      <v-card>
          <v-toolbar dark color="primary">
              <v-toolbar-title class="text-h5">Comment Form</v-toolbar-title>
          </v-toolbar>
          <v-container fluid>
            <v-text-field
            name="title"
            label="Title"
            type="text"
            v-model="title"
            ></v-text-field>
            <v-container fluid>
                <v-textarea
                name="corpse"
                filled
                label="Message"
                auto-grow
                class="pa-0 ma-0"
                v-model="corpse"
                ></v-textarea>
            </v-container>
            <v-btn icon><v-icon color="red" @click="dialogb = !dialogb">mdi-close</v-icon></v-btn>
            <v-btn color="primary white--text" :loading="loading" :disabled="loading" @click="commentHandler(); loader = 'loading'">SEND</v-btn>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
        </v-btn>
      </template>
      <v-card>
          <v-toolbar dark color="primary">
              <v-toolbar-title class="text-h5">Modification Form</v-toolbar-title>
          </v-toolbar>
          <v-container fluid>
            <v-text-field
            name="title"
            label="Title"
            v-model="title"
            type="text"
            ></v-text-field>
            <v-container fluid>
                <v-textarea
                name="corpse"
                filled
                label="Message"
                auto-grow
                class="pa-0 ma-0"
                v-model="corpse"
                ></v-textarea>
            </v-container>
            <v-btn icon><v-icon color="red" @click="dialog = !dialog">mdi-close</v-icon></v-btn>
            <v-btn color="primary white--text" :loading="loading" :disabled="loading" @click="patchpostHandler(); loader='loading'">EDIT</v-btn>
        </v-container>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      color="white black--text"
    >
    Your modification has been done
      <template v-slot:action="{ attrs }">
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
      <template v-slot:action="{ attrs }">
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
                        >
                        <v-toolbar-title>"{{ message.title }}" par "<nuxt-link style="text-decoration: none; color: #FFFFFF" :to="'/user/' + message.user.id">{{ message.user.username }}</nuxt-link>"</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text text-h5 font-weight-bold>
                        {{ message.corpse }}
                     </v-card-text>
                     <v-spacer></v-spacer>
                     <v-col
                        cols="12"
                        sm="3"
                     ><v-btn
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
                         <v-icon @click="dialogb = !dialogb">mdi-message-text</v-icon>
                     </v-btn>
                     <v-flex align-self-center><v-btn @click="dialog = !dialog" v-if="$auth.user.id === message.user.id" color="primary"><v-icon left>mdi-pencil</v-icon>Edit</v-btn></v-flex>
                     </v-col>
                    </v-card>
                    <v-container>
                      <v-row>
                        <template v-for="n in comment">
                          <v-col
                            :key="n"
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
  created () {
    this.postHandler()
  },
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
    test: 6,
    like_color: null,
    comment_color: null
  }),
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]
    }
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
      this.$axios.patch('http://127.0.0.1:8000/message/' + this.$route.params.id, data).then((result) => {
        this.snackbar = true
        this.dialog = false
        this.loading = null
        setTimeout(() => {
          location.reload()
        }, 2000)
      })
        .catch((error) => {
          console.log(error)
          this.snackbarE = true
          this.loading = null
        })
    },
    commentHandler () {
      const data = {
        title: this.title,
        corpse: this.corpse
      }
      this.$axios.post('http://127.0.0.1:8000/commentpost/' + this.$route.params.id, data).then((result) => {
        this.snackbar = true
        this.loading = false
        this.loading = null
        setTimeout(() => {
          location.reload()
        }, 2000)
      })
        .catch((error) => {
          console.log(error)
          this.snackbarE = true
          this.loading = null
        })
    },
    postHandler () {
      this.$axios.get('http://127.0.0.1:8000/message-comment/' + this.$route.params.id).then((result) => {
        this.message = result.data.message
        this.comment = result.data.comment
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
