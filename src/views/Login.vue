<template>
 <div id="container" >
    <div class="login-box">
      <div class="css-typing">
         <p>
            De olho 👁
         </p>
         <p>
            na
         </p>
         <p>
            Guanabara!
         </p>
      </div>
      <form @submit.prevent="submitForm" class="login" method="POST">
         <div>
           <h1>Login</h1>
           <input v-model="inputEmail" type="email" placeholder="Email"  name="user">
         </div>
				<div>
               <input v-model="inputPassword" type="password" placeholder="Senha" name="password">
            </div>
				<div>
            <span v-if="error" class="red--text">Login ou senha incorretos!</span>
               <input type="submit" value="Entrar">
            </div>
      </form>
    </div>
  </div>

</template>

<script>
export default {
    data() {
        return { 
          error: false,
          emails:['admin@guanabara.com','livia@guanabara.com','alexandre@guanabara.com'],
          senhas:['admin123','admin'],
            user: {
                email: 'admin@guanabara.com',
                password: 'admin',
                name: 'John Doe',
            },
            options: {
                isLoggingIn: true,
                shouldStayLoggedIn: true,
            },
            inputEmail: '',
            inputPassword: ''
        }
    },
    methods: {
      submitForm() {
        if (this.emails.includes(this.inputEmail) && this.senhas.includes(this.inputPassword)){ 
          window.sessionStorage.setItem('auth', true)
          window.location.assign('/app')
          
        } else {
          window.sessionStorage.setItem('auth', false)
          this.error = true
        }
          
      }
    }
}
</script>

<style scoped>

body{
  margin:0;
}

h1 {
  font-family: "Courier";
  font-size: 50px;
  white-space: nowrap;
  overflow: hidden;
  text-align: left;
}


/*Login*/
#container{
  overflow: hidden;
  width:90%;
  margin-left:auto;
  margin-right:auto;
  margin-top:10%;
}


.login-box{
  width:860px;
  margin-left:auto;
  margin-right:auto;
  margin-top:40px;
  
}
.regist{
  display:none;
}
.ForgotPassword{
  display:none;
}
.first{
  width:48.5%;
  display:inline-block;
  
}
.login-box form{
  float: right;
  width:33%;
  margin-top: 15px;
  margin-left:auto;
  padding-left:10px;
  margin-right:auto;
  border-radius: 5px;
  height:100%;
  
}
.login-box > div{
    float: left;
    color:  black;
    font-size: 3.1875em;
    font-weight: 200;
    margin-left:auto;
    margin-right:auto;
    margin-bottom:30px;
    text-align:center;
    display:table;
    page-break-inside: avoid;
    break-inside: avoid-column;
    -webkit-column-break-inside: avoid;
}
.login-box form > div{
  padding: 3px; 
  
}
.login-box a{  
  text-decoration:none;
  background: transparent;
  font-size: 1em;
  margin-top:7px;
  margin-left:5px;
  display:block;
  transition: all 0.4s ease 0s;
}
.login-box input{
  display:block;
  width: 100%;
  padding-left:1.6%;
  transition:0.6s;
  outline: none;
}

.login-box input[type=email]{
  height: 30px;
  width:97.9%;
  background: transparent;
  border: 1px solid black;
  border-radius: 3px;
  color: black;
  font-size: 1em;
  margin-top:10px;
  font-weight: 400;
}
.login-box input[type=password]{
  height: 30px;
  width:97.9%;
  background: transparent;
  border: 1px solid black;
  border-radius: 3px;
  color:black;
  font-size: 1em;
  margin-top:10px;
  font-weight: 400;
  
}
.login-box input[type=submit]{
  transition: all 0.6s ease 0s;
  height: 35px;
  background:black;
  border: 1px solid black;
  cursor: pointer;
  border-radius: 3px;
  color:white;
  font-size: 1em;
  font-weight: 400;
  margin-top:10px;
  width:100%;
  
}
.login-box input[type=submit]:hover{
  background:transparent;
  color:black;
 }
.login-box a:hover{
  color: black;
}
.login-box a:active{
  color:black;
  
}

.login-box input[type=text]:active,.login-box input[type=password]:active{
  outline: none;
  transition: all 0.6s ease 0s;
  border: 1px solid black;
}
.login-box input[type=submit]:active{
  outline: none;
  border: 1px solid #00000f;
  background:#00000f;
  color:white;
  transition: all 0.2s ease; 
}
::-webkit-input-placeholder{
   color:grey;
}
::-moz-input-placeholder{
   color:grey;
  
}
@media(max-width:920px){
  .first{
    width:99%;
    display:block;
  }
  
  .login-box,.login-box > div,.login-box form{
    width:100%;
     
  }
  .login-box input[type=submit]{
    width:100%;
    height:45px;
  }
  .login-box{
    font-size:1.3em;
  }
  .login-box input[type=email], .login-box input[type=password]{
    height:45px;
    width:100%;
  }
  
}
.css-typing p {
  border-right: .15em solid black;
  font-family: "Courier";
  font-size: 50px;
  font-style: bold;
  white-space: nowrap;
  overflow: hidden;
  text-align: left;
}
.css-typing p:nth-child(1) {
  width: 7.3em;
  -webkit-animation: type 2s steps(40, end);
  animation: type 2s steps(40, end);
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}

.css-typing p:nth-child(2) {
  width: 11.5em;
  opacity: 0;
  -webkit-animation: type2 2s steps(40, end);
  animation: type2 2s steps(40, end);
  -webkit-animation-delay: 2s;
  animation-delay: 2s;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}

.css-typing p:nth-child(3) {
  width: 7.3em;
  opacity: 0;
  -webkit-animation: type3 5s steps(20, end), blink .5s step-end infinite alternate;
  animation: type3 5s steps(20, end), blink .5s step-end infinite alternate;
  -webkit-animation-delay: 4s;
  animation-delay: 4s;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}

@keyframes type {
  0% {
    width: 0;
  }
  99.9% {
    border-right: .15em solid grey;
  }
  100% {
    border: none;
  }
}

@-webkit-keyframes type {
  0% {
    width: 0;
  }
  99.9% {
    border-right: .15em solid grey;
  }
  100% {
    border: none;
  }
}

@keyframes type2 {
  0% {
    width: 0;
  }
  1% {
    opacity: 1;
  }
  99.9% {
    border-right: .15em solid grey;
  }
  100% {
    opacity: 1;
    border: none;
  }
}

@-webkit-keyframes type2 {
  0% {
    width: 0;
  }
  1% {
    opacity: 1;
  }
  99.9% {
    border-right: .15em solid grey;
  }
  100% {
    opacity: 1;
    border: none;
  }
}

@keyframes type3 {
  0% {
    width: 0;
  }
  1% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes type3 {
  0% {
    width: 0;
  }
  1% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}
@-webkit-keyframes blink {
  50% {
    border-color: tranparent;
  }
}
</style>