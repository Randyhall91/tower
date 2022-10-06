<template>
  <div>
    <h5 class="text-success">My Events</h5>
    <div class="row">

      <EventCard v-for="e in towerEvents" :key="e.event" :towerEvent="e.event" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService.js'
import Pop from '../utils/Pop.js'
import EventCard from '../components/EventCard.vue'
export default {
  setup() {

    async function getMyEvents() {
      try {
        await accountService.getMyEvents();
      }
      catch (error) {
        Pop.error("[getMyEvents]", error);
      }
    }
    onMounted(() => {
      getMyEvents();
    });
    return {
      towerEvents: computed(() => AppState.towerEvent),
      account: computed(() => AppState.account)
    };
  },
  components: { EventCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
