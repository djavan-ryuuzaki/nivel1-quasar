const BaseConfig = {
   // Serveur
   APP_VERSION: "0.1",
   API_BASE_URL: "https://reqres.in/api/",
   API_LIST:"users?page=",
   API_GET: "users/",
   API_CREATE: "users/",
   API_UPDATE: "users/",
   API_DELETE: "users/",
   DEFAULT_PROFILE: "https://icon-library.com/images/default-user-icon/default-user-icon-1.jpg",
   DEFAULT_JOB: "Usuário"
}


export default async ({ Vue }) => {
  Vue.prototype.$BaseConfig = BaseConfig
}
export { BaseConfig }
