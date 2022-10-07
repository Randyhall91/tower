<template>
  <div class="event-details">
    <div class="border p-3 d-flex" v-if="activeEvent">
      <div>
        <img :src="activeEvent.coverImg" class="img-fluid" alt="">
      </div>
      <div class="p-3">
        <h3>{{activeEvent.name}}</h3>
        <p><strong>{{new Date(activeEvent.startDate).toLocaleDateString('en-US',
        {month: 'short', year:'2-digit'})}}</strong></p>
        <h5>{{activeEvent.location}}</h5>
        <p>{{activeEvent.description}}</p>
      </div>
      <div v-if="activeEvent.creatorId == account.id" class="text-end top-right">
        <!-- TODO add v-if for owner of event check -->
        <button v-if="!activeEvent.isCanceled" @click="cancelEvent(activeEvent.id)" class="btn btn-danger">Cancel
          Event</button>
        <button v-else class="btn btn-danger">Event Canceled</button>
      </div>

    </div>
    <div class="capacity-position">
      <p class="d-flex"><strong>{{activeEvent.capacity}}</strong> spots left</p>
    </div>
    <div v-if="account.id" class="attend-position">
      <button v-if="activeEvent.capacity > 0 && !usersTicket" @click="makeTicketforEvent(activeEvent.id)"
        class="btn btn-warning d-flex"><i class="mdi mdi-human"></i>Attend</button>

      <button v-else-if="usersTicket" @click="removeTicket()" class="btn btn-danger">Refund</button>

      <button v-else class="btn btn-danger">Sold Out</button>
    </div>


    <div class="bg-grey d-flex align-content-center border-dark elevation-2 p-3 mt-3">
      <img height="50" v-for="t in ticketHolders" :src="t.profile.picture" :alt="t.profile.name"
        :title="t.profile.name">

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
import { AuthService } from '../services/AuthService.js';
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
      account: computed(() => AppState.account),
      usersTicket: computed(() => AppState.usersTicket),

      async makeTicketforEvent(id) {
        try {
          let holders = this.ticketHolders
          let i = 0
          if (holders.length) {
            //TODO troubleshoot Loop
            for (i; i <= holders.length; i++) {
              if (holders[i].profile.id == this.account.id) {
                Pop.error("You can't buy more than one ticket")
                return
              } else {
                await eventService.makeTicketforEvent(id)
              }
            }
          }
          await eventService.makeTicketforEvent(id)


        } catch (error) {
          Pop.error('[getTicket]', error)
        }
      },
      async cancelEvent(id) {
        try {
          await eventService.cancelEvent(id)
        } catch (error) {
          Pop.error('[CancelEvent]', error)
        }
      },
      async removeTicket() {
        try {
          const yes = await Pop.confirm('Are you sure you want to refund your ticket?')
          if (!yes) { return }
          await eventService.removeTicket(AppState.usersTicket.id)
        } catch (error) {
          Pop.error('[removeTicket]', error)
        }
      }


    }
  }
}
</script>

<style lang="scss" scoped>
.capacity-position {
  position: relative;
  bottom: 15%;
  left: 92%
}

.attend-position {
  position: relative;
  bottom: 14%;
  left: 92%
}

.event-details {
  position: relative;
  min-width: 80vw;
}

.top-right {
  position: absolute;
  right: 1rem;
  top: 1rem
}
</style>