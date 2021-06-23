<template>
  <q-btn unelevated color="orange" size="lg" class="full-width" label="Sair" @click="deslogarUser"/>
</template>

<script>
import useLogin  from 'src/modules/login'
import { useRouter, useRoute } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
export default {
  props:{

  },
  setup(){
    const {erro_login, user, token, isLogado, login, isLogged, deslogar} = useLogin()
    const router = useRouter()
    const route = useRoute()
    const confirm = ref(false)
    const $q = useQuasar()

    const deslogarUser = async () => {
      const data = deslogar()
      $q.notify({
        message: JSON.stringify(data),
        color: 'orange'
      })

      router.push('/login')
    }

    return { erro_login, user, token, isLogado, login, isLogged,  deslogar, deslogarUser }
  }
}
</script>
