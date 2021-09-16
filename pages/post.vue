<template>
  <v-app>
    <v-system-bar class="thirdary" app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

   <v-snackbar
      v-model="snackbar"
      color="white black--text"
    >
    Your message has been posted
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
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Post Form</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
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
                           <v-text-field
                              id="password"
                              name="password"
                              label="Password"
                              v-model="password"
                              :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                              @click:append="() => (value = !value)"
                              :type="value ? 'password' : 'text'"
                           ></v-text-field>
                          </v-container>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="postHandler">POST</v-btn>
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
    drawer: null,
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
    signupHandler () {
      const data = {
        title: this.title,
        corpse: this.corpse,
        password: this.password
      }
      console.log(data)
      this.$axios.post('http://127.0.0.1:8000/post', data).then((result) => {
        console.log(result)
        this.snackbar = true
        setTimeout(() => {
          this.$router.push('/')
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
