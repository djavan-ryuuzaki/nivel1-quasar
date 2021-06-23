<template>
  <q-page padding>
    <Container>
      <h3>Criar Usuário</h3>
      <Suspense>
          <template #default>
            <EditUserForm />
          </template>
          <template #fallback>
            <div> Carregando Usuários... </div>
          </template>
        </Suspense>
    </Container>
  </q-page>
</template>
<script>
import Container from 'src/components/Container.vue';
import EditUserForm from 'src/components/EditUserForm.vue';
import { ref, defineComponent, onErrorCaptured } from 'vue';


export default defineComponent({
  components: {EditUserForm, Container},
  name: 'EditUser',
  setup(){

    const erro = ref(null)

    onErrorCaptured(e => {
      erro.value = e;
    })

    return {  erro }
  }
})
</script>
