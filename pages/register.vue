<template>
  <v-app>
    <v-system-bar class="thirdary" app>
      <v-spacer></v-spacer>

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
                        <v-toolbar-title>Signup form</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                <v-text-field
                    name="pseudo"
                    label="Pseudo"
                    type="text"
                    v-model="username"
                    required
                ></v-text-field>
                <v-text-field
                    name="email"
                    label="Email"
                    type="text"
                    v-model="email"
                    required
                ></v-text-field>
                <v-container fluid>
                <v-textarea
                    name="bio"
                    label="Bio *"
                    type="text"
                    v-model="bio"
                ></v-textarea>
                </v-container>
                <span class="material-icons">
                <v-text-field
                    id="password"
                    name="password"
                    label="Password"
                    v-model="password"
                    :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="() => (value = !value)"
                    :type="value ? 'text' : 'password'"
                ></v-text-field>
                  </span>
                <v-text-field
                    name="phone"
                    label="Phone *"
                    type="text"
                    v-model="phone"
                ></v-text-field>
                <v-text-field
                    name="city"
                    label="City *"
                    type="text"
                    v-model="city"
                ></v-text-field>
                <v-text-field
                    name="address"
                    label="Address *"
                    type="text"
                    v-model="address"
                ></v-text-field>
                <v-text-field
                    name="zipcode"
                    label="Zipcode *"
                    type="text"
                    v-model="zipcode"
                ></v-text-field>
                <v-text-field
                  name="country"
                  label="Country *"
                  type="text"
                  v-model="country"
                ></v-text-field>
                            * = Optional
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <nuxt-link to="/login"><v-btn color="primary">Already Registered ?</v-btn></nuxt-link>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="signupHandler">Signup</v-btn>
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
  name: 'Register',
  data: () => ({
    snackbar: false,
    snackbarE: false,
    drawer: null,
    hover: false,
    is_focus: false,
    value: null,
    items: [
      { title: 'Post', icon: 'mdi-view-dashboard', route: '/post' },
      { title: 'Comment', icon: 'mdi-message-text', route: '/comment' },
      { title: 'Account', icon: 'mdi-account-box', route: '/account' }
    ]
  }),
  methods: {
    signupHandler () {
      const data = {
        email: this.email,
        password: this.password,
        zipcode: this.zipcode,
        city: this.city,
        phone: this.phone,
        username: this.username,
        bio: this.bio,
        country: this.country,
        address: this.address
      }
      console.log(data)
      this.$axios.post('http://127.0.0.1:8000/register', data).then((result) => {
        console.log(result)
        this.snackbar = true
        setTimeout(() => {
          this.$router.push('/login')
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
