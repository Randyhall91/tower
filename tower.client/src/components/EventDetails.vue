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

        <div class="capacity-position">
          <p class="d-flex"><strong>{{activeEvent.capacity}}</strong> spots left</p>
        </div>
        <div class="attend-position">
          <button @click="makeTicketforEvent(activeEvent.id)" class="btn btn-warning d-flex"><i
              class="mdi mdi-human"></i>
            Attend</button>
        </div>
      </div>

    </div>

    <div class="bg-grey d-flex align-content-center border-dark elevation-2 p-3 mt-3">
      <img height="50" v-for="t in ticketHolders" :src="t.profile.picture" :alt="t.profile.name">

    </div>
  </div>
  <!-- TODO add whose attending -->
</template>


<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { TowerEvent } from '../models/TowerEvent.js';
import { eventService } from '../services/EventService.js';
import Pop from '../utils/Pop.js';

export default {
  props: {
    activeEvent: { type: TowerEvent, required: true }
  },
  setup() {
    const route = useRoute()
    async function getTicketHolders() {
      try {
        await eventService.getTicketHolders(route.params.id)
      } catch (error) {
        Pop.error('[GetTicketHolders]', error)
      }
    }
    onMounted(() => {
      getTicketHolders();
    })

    return {
      ticketHolders: computed(() => AppState.eventTicketHolders),
      async makeTicketforEvent(id) {
        try {
          await eventService.makeTicketforEvent(id)
        } catch (error) {
          Pop.error('[getTicket]', error)
        }
      }

    }
  }
}
</script>

<style lang="scss" scoped>
.capacity-position {
  position: absolute;
  top: 41rem;
  right: 10rem;
}

.attend-position {
  position: absolute;
  top: 41rem;
  right: 0;
}

.event-details {
  position: relative;
}

.top-right {
  position: absolute;
  right: 1rem;
  top: 1rem
}
</style>