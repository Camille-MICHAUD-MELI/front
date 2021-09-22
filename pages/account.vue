<template>
  <v-app>
    <v-system-bar class="primary" app>
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
                        <v-toolbar-title>Profile</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                    <v-text-field
                    :value="$auth.user ? $auth.user.username :''"
                    label="Username"
                    outlined
                    readonly
                ></v-text-field>
                <v-text-field
                    :value="$auth.user ? $auth.user.email :''"
                    label="Email"
                    outlined
                    readonly
                ></v-text-field>
                <v-container fluid>
                <v-textarea
                    :value="$auth.user ? $auth.user.bio :''"
                    label="Bio"
                    outlined
                    readonly
                ></v-textarea>
                </v-container>
                <v-text-field
                    :value="$auth.user ? $auth.user.phone :''"
                    label="Phone"
                    outlined
                    readonly
                ></v-text-field>
                <v-text-field
                    :value="$auth.user ? $auth.user.city :''"
                    label="City"
                    outlined
                    readonly
                ></v-text-field>
                <v-text-field
                    :value="$auth.user ? $auth.user.address :''"
                    label="Address"
                    outlined
                    readonly
                ></v-text-field>
                <v-text-field
                    :value="$auth.user ? $auth.user.zipcode :''"
                    label="Zipcode"
                    outlined
                    readonly
                ></v-text-field>
                <v-text-field
                  :value="$auth.user ? $auth.user.country :''"
                    label="Country"
                    outlined
                    readonly
                ></v-text-field>
                <v-text-field
                    :value="$auth.user && $auth.user.created !== null ? $auth.user.created :''"
                    label="Created"
                    outlined
                    readonly
                ></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <nuxt-link to="/account_modification"><v-btn color="primary">Wanna change something ?</v-btn></nuxt-link>
                        <v-spacer></v-spacer>
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
      </v-main>
  </v-app>
</template>
