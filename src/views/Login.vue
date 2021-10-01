<template>
    <v-content>
         <v-container fill-height class="pa-0" style="background-color:rgba(163, 221, 255)">
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card outlined flat class="ma-2">
                     <v-toolbar outlined flat dark color="primary">
                        <v-toolbar-title>Entrar</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                           <v-text-field
                              prepend-icon="mdi-account"
                              name="login"
                              label="Usuário"
                              type="text"
                           ></v-text-field>
                           <v-text-field
                              id="password"
                              prepend-icon="mdi-lock"
                              name="password"
                              label="Senha"
                              type="password"
                           ></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" to="/app">ENVIAR</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
      </v-content>
</template>

<script>
export default {
    data() {
        return { 
            user: {
                email: 'admin@example.com',
                password: 'admin',
                name: 'John Doe',
            },
            options: {
                isLoggingIn: true,
                shouldStayLoggedIn: true,
            },
        }
    }
}
</script>