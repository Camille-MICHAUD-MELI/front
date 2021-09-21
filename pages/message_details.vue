<template>
  <v-app>
    <v-system-bar class="primary" app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

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
            <v-btn icon><v-icon color="red" @click="dialog = !dialog">mdi-close</v-icon></v-btn>
            <v-btn color="primary white--text" @click="commentHandler">SEND</v-btn>
        </v-container>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      color="white black--text"
    >
    Your comment has been posted
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
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12" shaped>
                        <v-toolbar
                        dark
                        color="primary"
                        shaped
                        >
                        <v-toolbar-title>"Test de titre" par "tes"</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text text-h5 font-weight-bold>
                        blablalba bla bla BLA BLA
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
                        @click="like_color = !like_color"
                        >
                            mdi-heart
                        </v-icon>
                        {{ test }}
                     </v-btn>
                     <v-btn
                     icon
                     >
                         <v-icon @click="dialog = !dialog">mdi-message-text</v-icon>
                     </v-btn>
                     </v-col>
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
    title: null,
    corpse: null,
    snackbar: false,
    snackbarE: false,
    dialog: false,
    click: null,
    test: 6,
    like_color: null,
    comment_color: null
  }),
  methods: {
    commentHandler () {
      const data = {
        title: this.title,
        corpse: this.corpse
      }
      console.log(data)
      this.$axios.post('http://127.0.0.1:8000/commentpost', data).then((result) => {
        console.log(result)
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
