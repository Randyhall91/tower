<template>
  <div class="row">
    <div class="col-12">

      <div class="banner">
        <img src="../Public/TowerBanner.png.png" class="banner-width" alt="Banner" title="Tower Intro Banner">
        <div class="banner-text">
          <img src="../Public/Get ahead of the scalpers. Reserve your seat now with real events for real people..png"
            alt="Banner" aria-label="Get Tickets" title="Tower Intro Banner">
        </div>
      </div>



      <div class=" bg-grey d-flex align-content-center justify-content-around border-dark elevation-2">

        <button @click="getEventsByType('')" class='btn btn-outline-success' title="Filter Button: All"
          aria-label="All">All</button>
        <button @click="getEventsByType('concert')" class='btn btn-outline-success' title="Filter Button: Concert"
          aria-label="Concert">Concert</button>
        <button @click="getEventsByType('convention')" class='btn btn-outline-success' title="Filter Button: Convention"
          aria-label="Convention">Convention</button>
        <button @click="getEventsByType('sport')" class='btn btn-outline-success' title="Filter Button: Sport"
          aria-label="Sport">Sport</button>
        <button @click="getEventsByType('digital')" class='btn btn-outline-success' title="Filter Button: Digital"
          aria-label="Digital">Digital</button>
        <!-- Filter bar -->
      </div>

      <!-- Event Cards -->
      <div class="row">

        <EventCard v-for="e in towerEvents" :key="e" :towerEvent="e" />
      </div>


    </div>


  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { eventService } from '../services/EventService.js';
import Pop from '../utils/Pop.js';
import EventCard from '../components/EventCard.vue';

export default {

  setup() {
    async function getEvents() {
      try {
        await eventService.getEvents();
      }
      catch (error) {
        Pop.error("[getEvents]", error);
      }
    }
    onMounted(() => {
      getEvents();
    });
    return {
      async getEventsByType(type) {
        try {
          await eventService.getEvents(type)
        } catch (error) {
          Pop.error('getEventsByType', error)
        }
      },
      towerEvents: computed(() => AppState.towerEvent),
    }
  },
  components: { EventCard }
}
</script>

<style scoped lang="scss">
.banner-width {
  width: 90vw;
  height: 15rem;
}

.banner {
  position: relative;

}

.banner-text {
  position: absolute;
  top: 2rem;
  left: 3rem;
}
</style>
