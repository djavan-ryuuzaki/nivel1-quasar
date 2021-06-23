<template>
  <q-page class="flex flex-center">
    <Container>
        <div class="row items-center justify-between">
          <h3> Usuários </h3>
          <div>
            <q-btn round color="positive" icon="add" to="/novo"></q-btn>
          </div>
        </div>
        <div v-if="erro"> {{ erro }} </div>
        <div>
          <Suspense>
            <template #default>
              <UsuariosLocais  />
            </template>
            <template #fallback>
              <div> Carregando Usuários... </div>
            </template>
          </Suspense>

        </div>
    </Container>
  </q-page>
</template>

<script>
import Container from 'src/components/Container.vue';
import UsuariosLocais from 'src/components/UsuariosLocais.vue';
import { ref, defineComponent, onErrorCaptured } from 'vue';
import useUsuarios  from 'src/modules/usuarios'

export default defineComponent({
  components: {UsuariosLocais, Container},
  name: 'PageIndex',
  setup(){
    const { page } = useUsuarios()
    const erro = ref(null)

    onErrorCaptured(e => {
      erro.value = e;
    })

    return { erro, page }
  }
})


</script>
