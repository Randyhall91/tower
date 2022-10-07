<template>
  <div class="row event-details d-flex">
    <div class="col-12">

      <EventDetails v-if="activeEvent" :key="activeEvent" :activeEvent="activeEvent" />
    </div>
  </div>

  <div class="row">
    <div class="col-12">
      <EventComments :activeEvent="activeEvent" />

    </div>

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
import EventComments from '../components/EventComments.vue';

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
  components: { EventDetails, EventComments }
}
</script>


<style lang="scss" scoped>

</style>