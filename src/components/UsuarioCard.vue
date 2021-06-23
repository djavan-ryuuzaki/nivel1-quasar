<template>

  <q-card flat bordered class="q-mb cursor-pointer" @click="$emit('click', $event)">
    <q-item>
        <q-item-section avatar>
          <q-avatar size="80px">
            <img :src="avatar">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label v-if="username != null" caption><q-badge outline color="secondary">{{username}}</q-badge></q-item-label>
          <q-item-label>{{first_name}} {{last_name}} <q-badge color="orange" text-color="white">{{id}}</q-badge></q-item-label>

          <q-item-label caption>{{email}} - {{job}}</q-item-label>

        </q-item-section>

      </q-item>

      <q-card-actions>
        <q-btn flat @click="confirm = true">Excluir</q-btn>
        <q-btn flat @click="router.push({ name: 'editar', params: { id: id } })">Editar</q-btn>
      </q-card-actions>

      <q-dialog v-model="confirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="warning" color="red" text-color="white" />
            <span class="q-ml-sm">Confirma a exclusão?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="primary" v-close-popup />
            <q-btn flat label="Deletar" color="red" v-close-popup @click="deletarUsuario(id)" />
          </q-card-actions>
        </q-card>
      </q-dialog>
  </q-card>

</template>
<script>
import { useRouter, useRoute } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import useUsuarios  from 'src/modules/usuarios'
import { useQuasar } from 'quasar'
export default {
  props:{
    id: Number,
    email: String,
    first_name: String,
    last_name: String,
    avatar: String,
    username:String,
    job:String
  },

  async setup(){
    const {usuarios, usuario, page, erro, load, getAll, getById, update, deletar, loadLocal} = useUsuarios()
    const router = useRouter()
    const route = useRoute()
    const confirm = ref(false)
    const $q = useQuasar()

    const deletarUsuario = async (id) => {
      const data = await deletar(id)
      $q.notify({
        message: 'Usuário Removido.' + JSON.stringify(data),
        color: 'orange'
      })      
    }

    return { router, confirm, deletarUsuario }
  }
}
</script>
