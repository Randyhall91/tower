<template>
  <div class="event-details d-flex">
    <EventDetails v-if="activeEvent" :key="activeEvent" :activeEvent="activeEvent" />
    <!-- TODO Add Comments -->

  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { TowerEvent } from '../models/TowerEvent.js';
import { eventService } from '../services/EventService.js';
import Pop from '../utils/Pop.js';
import EventDetails from '../components/EventDetails.vue';

export default {
  props: {
    activeEvent: { type: TowerEvent, required: true }
  },
  setup() {
    const route = useRoute();
    async function getEventById() {
      try {
        await eventService.getEventById(route.params.id);
      }
      catch (error) {
        Pop.error("[GetEventById]", error);
      }
    }
    onMounted(() => {
      getEventById();
    });
    return {
      activeEvent: computed(() => AppState.activeEvent)
    };
  },
  components: { EventDetails }
}
</script>


<style lang="scss" scoped>

</style>