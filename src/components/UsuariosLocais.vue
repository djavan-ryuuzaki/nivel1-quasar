<template>

  <div v-if="usuarios && usuarios.length"> Nenhum usuário encontrado</div>

  <q-pagination
        v-model="page"
        :max="usuarios.total_pages"
      />

    <UsuarioCard
      v-for="usuario in usuarios.data" :key="usuario.id"
      :email="usuario.email"
      :first_name="usuario.first_name"
      :last_name="usuario.last_name"
      :avatar="usuario.avatar"
      :id="usuario.id"
      :username="usuario.username"
      :job="usuario.job"
    />



</template >


<script>
import {toRef, ref, onErrorCaptured, onMounted, watch } from "vue"
import UsuarioCard from "src/components/UsuarioCard.vue"
import { useRouter } from 'vue-router'
import useUsuarios  from 'src/modules/usuarios'

export default {
  name: 'UsuariosLocais',
  components: {UsuarioCard},
  props: {
  },

  async setup(){
    const {usuarios, page, erro, load, getAll, getById, loadLocal} = useUsuarios()
    const router = useRouter()

    watch([page], loadLocal, { deep: true })

    await loadLocal()

    return { usuarios, router, page, erro }
  }
}

</script>

<style>
  div.pagination {
    width: 100%;
    height: 100px;
    position: relative;
    bottom: 0;
  }
</style>
