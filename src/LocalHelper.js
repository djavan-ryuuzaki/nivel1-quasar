import { ref, watch, onMounted, onUnmounted } from 'vue'

const useLocalDB = (key, defaultValue) => {
  const value = ref(defaultValue)
  const ler = () => {
    const v = window.localStorage.getItem(key)
    if (v != null) {
      value.value = JSON.parse(v)
    }
  }

  ler()

  onMounted(() => {
    window.addEventListener('storage', ler)
  })
  onUnmounted(() => {
    window.removeEventListener('storage', ler)
  })

  const store = () => {
    window.localStorage.setItem(key, JSON.stringify(value.value))
  }

  watch([value], store, { deep: true })

  return value
}

export const useLocalUsuarios =  () => {  
  return useLocalDB('usuarios', [])
}
