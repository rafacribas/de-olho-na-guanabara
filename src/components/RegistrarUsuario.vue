<template>
  <v-container fluid>
    <v-snackbar
      :color="snackColor"
      top
      multi-line
      v-model="snackbar"
      :timeout="timeout"
      bottom
      content-class="text--center"
      >
      <span class="d-flex justify-center">
      {{ textoUsuarioRegistrado }}
      </span>

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
    <v-row justify="center" >
      <v-col cols="12" md="8" lg="6">
        <v-card elevation="0">
          <v-card-title class="headline pl-0">Registrar Usuário</v-card-title>
          <v-form @submit.prevent="registrarUsuario" v-model="valid">
            <v-text-field
              v-model="username"
              outlined
              label="Usuário"
              :rules="userRules"
              required
            ></v-text-field>
            <v-text-field
              class="login"
              outlined
              v-model="email"
              label="E-mail"
              type="email"
              :rules="emailRules"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Senha"
              outlined
              type="password"
              required
              :rules="passwordRules"
            ></v-text-field>
            <v-text-field
              v-model="confirmPassword"
              label="Confirmar Senha"
              outlined
              type="password"
              required
              :rules="passwordConfirmRules"
            ></v-text-field>
            <v-row justify="center">
              <v-btn type="submit" color="primary" :disabled="!valid">Registrar</v-btn>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import request from '../router/requests'
export default {
  data() {
    return {
      valid: false,
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      textoUsuarioRegistrado: '',
      snackColor: 'green',
      snackbar: false,
      timeout: 4000,
      emailRules: [ 
        v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail precisa ser válido',
        v => !!v || ''
      ],
      userRules: [ 
        v => !v || /.{3,}/.test(v) || 'Usuário deve conter pelo menos 3 caracteres',
        v => !!v || ''
      ],
      passwordRules: [ 
        v => !v || /.{6,}/.test(v) || 'Senha deve conter pelo menos 6 caracteres',
        v => !!v || ''
      ],
      passwordConfirmRules: [ 
        v => !v || /.{6,}/.test(v) || 'Senha deve conter pelo menos 6 caracteres',
        (this.password === this.confirmPassword) || 'Password must match',
        v => !!v || ''
      ],
    };
  },
  computed:{
    confirmarSenha(){
      return (value) => {
        if (value !== this.password) {
          return "Senhas não condizem";
        } else {
          return true;
        }
      };
    }
  },
  methods: {
    async registrarUsuario() {
      let email = this.email;
      let username = this.username;
      let password = this.password;
      const res = await request('POST', 'auth/local/register', {
        email,
        username,
        password
      })
      console.log(res)

      if (res.error){
        this.textoUsuarioRegistrado = 'Erro ao registrar usuário. Mensagem de erro:  \n' + res.error.message
        this.snackColor = 'red'
        this.snackbar = true
        console.log(`deu ruimmm`)
      }else{
        this.snackColor = 'green'
        this.textoUsuarioRegistrado = 'Usuário registrado com sucesso'
        this.snackbar = true

        this.username = ''
        this.email = ''
        this.password = ''
        this.confirmPassword = ''
      }
    },
  },
};
</script>

<style scoped>
</style>