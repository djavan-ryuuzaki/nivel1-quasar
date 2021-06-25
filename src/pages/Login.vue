<template>
  <q-page class="flex flex-center">
    <Suspense>
      <template #default>
        <LoginCard />
      </template>
      <template #fallback>
        <div> Ocorreu algum problema </div>
      </template>
    </Suspense>

  </q-page>
</template>

<script>
import LoginCard from "src/components/LoginCard.vue"
import { ref, defineComponent, onErrorCaptured } from 'vue';
export default defineComponent({
  components: {LoginCard},
  name: 'LoginIndex',
  setup(){



    return {  }
  }
})


</script>
