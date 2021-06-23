<template>

  <form @submit="submit">

    <q-input class="q-mt-sm" outlined v-model="usuario.username" label="Username"   />

    <q-input class="q-mt-sm" outlined v-model="usuario.first_name" label="Nome"   />

    <q-input class="q-mt-sm" outlined v-model="usuario.last_name" label="Sobrenome"  />

    <q-input class="q-mt-sm" outlined v-model="usuario.email" label="Email"  />

    <q-select class="q-mt-sm" outlined v-model="usuario.job" :options="jobs" label="Função"  />

    <div class="q-mt-md">
      <q-btn color="grey" to="/" type="reset">Voltar</q-btn>
      <q-btn class="q-ml-sm" color="positive" type="submit"> Salvar </q-btn>
    </div>
  </form>

</template>
<script>

import { defineComponent, reactive, ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useUsuarios  from 'src/modules/usuarios'
import { useQuasar } from 'quasar'

export default defineComponent({
  components: {  },
  name: 'NovoUsuario',
  async setup() {
    const $q = useQuasar()
    const router = useRouter()
    const route = useRoute()
    const jobs = ['Lider', 'Programador', 'Administrador', 'Usuário']
    const userID = computed(() => parseInt(route.params.id))
    let edit = true;
    const {usuarios, usuario, page, erro, load, getAll, getById, update, create} = useUsuarios()
    
     onMounted(async() => {
       if( route.params.id >= null  ){
         edit = true
         await getById(userID.value)
       }else{
         edit = false
       }
    })

    const submit = async () => {
      if( edit == true){
        const data = await update()
        $q.notify({
          message: 'Atualizado com Sucesso.' + JSON.stringify(data),
          color: 'green'
        })
      }else{
        const data = await create()
        $q.notify({
          message: 'Usuário criado com Sucesso.' + JSON.stringify(data),
          color: 'green'
        })
      }


    }

    return { usuario, submit, jobs }
  }
})
</script>
