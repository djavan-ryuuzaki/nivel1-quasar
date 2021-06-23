<template>
  <q-page class="flex flex-center">
    <Container>
        <div class="row items-center justify-between">
          <h3> Dashboard </h3>
        </div>

        <div>
          <Grafico />

          <PolarGrafico />
        </div>
    </Container>
  </q-page>
</template>

<script>
import Container from 'src/components/Container.vue';
import Usuarios from 'src/components/Usuarios.vue';
import  Grafico from 'src/components/Grafico.vue';
import  PolarGrafico from 'src/components/PolarGrafico.vue';
import { ref, defineComponent, onErrorCaptured } from 'vue';
import useUsuarios  from 'src/modules/usuarios'

export default defineComponent({
  components: { Container, Grafico, PolarGrafico},
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
