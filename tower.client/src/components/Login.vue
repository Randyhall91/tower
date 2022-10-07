<template>
  <span class="navbar-text">
    <button class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0" @click="login"
      v-if="!user.isAuthenticated">
      Login
    </button>

    <div class="dropdown text-center my-2 my-lg-0 pt-4" v-else>
      <div v-if="account.picture || user.picture">
        <img :src="account.picture || user.picture" alt="account photo" height="40" class="rounded" />
      </div>

      <!-- <span class="mx-3 text-success lighten-30">{{ account.name || user.name }}</span> -->
      <div class="mt-5">
        <router-link :to="{name: 'Home'}">
          <h4 class="selectable">home</h4>
        </router-link>

      </div>
      <div class="mt-5">
        <router-link :to="{ name: 'Account' }">
          <div class="list-group-item list-group-item-action hoverable">
            Account
          </div>
        </router-link>
      </div>
      <div class="mt-5">
        <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#createEventModal">
          new event
        </button>
      </div>
      <div class="mt-5">

        <button @click="logout" class="btn btn-outline-light ">
          <i class="mdi mdi-logout"></i>
          logout
        </button>
      </div>

    </div>
  </span>


</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import { eventService } from '../services/EventService.js'
import Pop from '../utils/Pop.js'
export default {
  setup() {


    return {






      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}

.dropdown-menu.show {
  transform: scale(1);
}

.hoverable {
  cursor: pointer;
}
</style>
