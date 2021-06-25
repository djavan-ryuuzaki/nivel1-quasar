import {reactive, toRefs,  watch, ref} from "vue"
import {BaseConfig} from 'src/modules/BaseConfig'

export default function useLogin() {

  const state = reactive({
    erro_login: null,
    token: '',
    isLogado: false,
    user: {
      email: '',
      password: '',
    }
  })

  const deslogar = () => {
    state.isLogado = false
    state.token = ''
    window.localStorage.removeItem('is_logado')
    window.localStorage.removeItem('token')

    return "Usuário Deslogado com Sucesso!"
  }
  const isLogged = () =>{
    const v = window.localStorage.getItem('is_logado')

    if( v != null){
      return true
    }else{
      return false
    }
  }
  const login = async () => {

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: state.user.email, password: state.user.password })
    };
    try {
      const response = await fetch(BaseConfig.API_BASE_URL+BaseConfig.API_LOGIN, requestOptions);

      const data = await response.json();

      switch (response.status) {
        case 400:
          state.isLogado = false
          state.token = ''
          window.localStorage.removeItem('is_logado')
          window.localStorage.removeItem('token')
          break;
        case 200:
          state.isLogado = true
          state.token = data.token
          window.localStorage.setItem('is_logado', JSON.stringify(state.isLogado))
          window.localStorage.setItem('token', JSON.stringify(state.token))
          break;
        default:
          state.isLogado = false
          state.token = ''
          window.localStorage.removeItem('is_logado')
          window.localStorage.removeItem('token')
      }
      console.log(state.token)
      return data;
    }catch(e){
      state.isLogado = false
      state.token = ''
    }



  }



  return { ...toRefs(state), login, isLogged, deslogar }

}
