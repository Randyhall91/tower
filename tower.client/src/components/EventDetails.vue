<template>
  <div class="event-details">
    <div class="border p-3 d-flex" v-if="activeEvent">
      <div>
        <img :src="activeEvent.coverImg" alt="">
      </div>
      <div class="p-3">
        <h3>{{activeEvent.name}}</h3>
        <h5>{{activeEvent.location}}</h5>
        <p>{{activeEvent.description}}</p>
      </div>
      <div class="text-end top-right">
        <!-- TODO add v-if for owner of event check -->
        <button class="btn btn-danger">Delete Event</button>
        <div>
          <p><strong>{{new Date(activeEvent.startDate).toLocaleDateString('en-US',
          {month: 'short', year:'2-digit'})}}</strong></p>
        </div>
      </div>
      <!-- TODO add spots left and Attend Button -->
    </div>

  </div>
  <!-- TODO add whose attending -->
</template>


<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import { TowerEvent } from '../models/TowerEvent.js';

export default {
  props: {
    activeEvent: { type: TowerEvent, required: true }
  },
  setup() {

    return {
      // activeEvent: computed(() => AppState.activeEvent)
    }
  }
}
</script>

<style lang="scss" scoped>
.event-details {
  position: relative;
}

.top-right {
  position: absolute;
  right: 1rem;
  top: 1rem
}
</style>