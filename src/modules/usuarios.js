import {reactive, toRefs,  watch, ref} from "vue"
import {BaseConfig} from 'src/modules/BaseConfig'
import {useLocalUsuarios} from 'src/localHelper'

export default function useUsuarios() {

  const page = ref(1)
  const daoLocal = useLocalUsuarios()
  const state = reactive({
    erro: null,
    usuarios: null,
    lastId: 0,
    usuario: {
      id: 0,
      email: '',
      first_name: '',
      last_name: '',
      avatar:'',
      job:'',
      username:''
    }
  })

  const load = async() => {
      try{
        state.usuarios = await fetch(BaseConfig.API_BASE_URL+BaseConfig.API_LIST+page.value).then((a) => a.json())
      }catch(e){
        state.usuarios = null;
      }

     state.usuarios.data = state.usuarios.data.map(user => {
        var userSalvar = Object.assign({}, user);

        if ( daoLocal.value[ userSalvar.id ] == null ){
          userSalvar.job="Usuário"
          daoLocal.value[ userSalvar.id ] = userSalvar
        }else{
          userSalvar = daoLocal.value[ userSalvar.id ]
        }
        return userSalvar;
      });

  }

  const loadLocal = async () => {
    var vetorLimpo =  daoLocal.value.filter(function (el) {
      return el != null;
    });

    state.usuarios = {
      data: vetorLimpo
    }
  }

  const update = async () => {
    if ( state.usuario.username == null || state.usuario.username == ""  ){
      const username = state.usuario.first_name.toLowerCase().trim() + "_" + state.usuario.last_name.toLowerCase().trim()
      state.usuario.username = username
    }
    const userSalvar = state.usuario

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: state.usuario.username, job: state.usuario.job })
    };
    const response = await fetch(BaseConfig.API_BASE_URL+BaseConfig.API_UPDATE+state.usuario.id, requestOptions);

    const data = await response.json();

    daoLocal.value[ userSalvar.id ] = userSalvar

    return data;
  }

  const create = async () => {

    if ( state.usuario.username == null || state.usuario.username == ""  ){
      const username = state.usuario.first_name.toLowerCase().trim() + "_" + state.usuario.last_name.toLowerCase().trim()
      state.usuario.username = username
    }

    const username = state.usuario.first_name.toLowerCase().trim() + "_" + state.usuario.last_name.toLowerCase().trim()

    state.usuario.avatar = BaseConfig.DEFAULT_PROFILE;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: state.usuario.username, job: state.usuario.job })
    };

    const response = await fetch(BaseConfig.API_BASE_URL+BaseConfig.API_CREATE, requestOptions);

    const data = await response.json();

    state.usuario.id = data.id

    const userSalvar = state.usuario

    daoLocal.value[ userSalvar.id ] = userSalvar

    return data;
  }

  const getById = async (id) => {

    if ( daoLocal.value[ id ] == null ){

      const response = await fetch(BaseConfig.API_BASE_URL+BaseConfig.API_GET+id)

      const data = await response.json();

      state.usuario.id = data.data.id
      state.usuario.email = data.data.email
      state.usuario.first_name = data.data.first_name
      state.usuario.last_name = data.data.last_name
      state.usuario.avatar = data.data.avatar
      state.usuario.job = 'Usuário'

      return data
    } else {

      state.usuario.id = daoLocal.value[ id ].id
      state.usuario.email = daoLocal.value[ id ].email
      state.usuario.first_name = daoLocal.value[ id ].first_name
      state.usuario.last_name = daoLocal.value[ id ].last_name
      state.usuario.avatar = daoLocal.value[ id ].avatar
      state.usuario.job = daoLocal.value[ id ].job
      state.usuario.username = daoLocal.value[ id ].username

      return daoLocal.value[ id ]
    }

  }

  const deletar = async (id) => {

    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },

    };

    const response = await fetch(BaseConfig.API_BASE_URL+BaseConfig.API_DELETE+id, requestOptions)
    daoLocal.value[ id ] = null
    await loadLocal()
    return response.status
  }

  return { ...toRefs(state), page, load, loadLocal, update, getById, deletar, create, daoLocal }

}
