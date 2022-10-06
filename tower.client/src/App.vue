<template>
  <main>
    <div class="container-fluid">

      <div class="row">

        <div class="col-10 bg-dark">
          <div>
            <img src="./Public/Logo.png" class="logo p-3" alt="Tower" title="Tower">
          </div>
          <router-view />
        </div>

        <div class="col-2 bg-grey">
          <!-- Sidebar Login -->
          <Login />
        </div>
      </div>
    </div>
  </main>


</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import Login from "./components/Login.vue"

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, Login }
}
</script>
<style lang="scss">
.logo {
  height: 4rem;
  width: 12rem
}

.col-height {
  height: 100vh
}


@import "./assets/scss/main.scss";
</style>
