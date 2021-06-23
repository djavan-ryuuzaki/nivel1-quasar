<template>
  <q-page class="bg-light-blue window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md">Teste Nivel 2</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input square filled clearable v-model="user.email" type="email" label="email" />
              <q-input square filled clearable v-model="user.password" type="password" label="senha" />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated color="primary" size="lg" class="full-width" label="Entrar" @click="logar"/>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import useLogin  from 'src/modules/login'
import { useRouter, useRoute } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
export default {
  props:{

  },
  async setup(){
    const {erro_login, user, token, isLogado, login, isLogged} = useLogin()
    const router = useRouter()
    const route = useRoute()
    const confirm = ref(false)
    const $q = useQuasar()



    const logar = async () => {
      const data = await login()
      $q.notify({
        message: JSON.stringify(data),
        color: 'orange'
      })

      router.push('/')
    }

    return { erro_login, user, token, isLogado, login, isLogged, logar }
  }
}
</script>

<style>
.q-card {
  width: 360px;
}
</style>
