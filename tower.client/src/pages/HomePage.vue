<template>
  <div class="row">
    <div class="col-12">
      <div class="row d-flex justify-content-center">

        <div class="banner">
          <img src="../Public/TowerBanner.png.png" alt="Banner" title="Tower Intro Banner">
          <div class="banner-text">
            <img src="../Public/Get ahead of the scalpers. Reserve your seat now with real events for real people..png"
              alt="">
          </div>
        </div>
        <div class="col-12 bg-grey d-flex align-content-center">

          <p class="p-3 m-0">All</p>
          <p class="p-3 m-0">All</p>
          <p class="p-3 m-0">All</p>
          <!-- Filter bar -->
        </div>
        <div class="col-12 d-flex">
          <!-- Event Cards -->
          <div class="row">

            <EventCard v-for="e in towerEvents" :key="e" :towerEvent="e" />
          </div>
        </div>
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
      towerEvents: computed(() => AppState.towerEvent)
    };
  },
  components: { EventCard }
}
</script>

<style scoped lang="scss">
.banner {
  // width: 80%;
  position: relative;
}

.banner-text {
  position: absolute;
  top: 2rem;
  left: 3rem;
}
</style>
