<template>
  <div class="event-details">
    <div class="border p-3 d-flex" v-if="activeEvent">

      <img :src="activeEvent.coverImg" class="img-fluid" alt="">

      <div class="p-3">
        <h3>{{activeEvent.name}}</h3>
        <p><strong>{{new Date(activeEvent.startDate).toLocaleDateString('en-US',
        {month: 'short', year:'2-digit'})}}</strong></p>
        <h5>{{activeEvent.location}}</h5>
        <p>{{activeEvent.description}}</p>
      </div>

      <div class="align-self-end ">
        <p class="d-flex"><strong>{{activeEvent.capacity}}</strong> spots left</p>
      </div>
      <div v-if="account.id" class="ms-3 align-self-end">
        <button v-if="activeEvent.capacity > 0 && !usersTicket && !activeEvent.isCanceled"
          @click="makeTicketforEvent(activeEvent.id)" class="btn btn-warning d-flex" title="Attend"
          aria-label="Attend Event"><i class="mdi mdi-human"></i>Attend</button>

        <button v-else-if="usersTicket" @click="removeTicket()" class="btn btn-danger" aria-label="Refund"
          title="Refund">Refund</button>

        <button v-else class="btn btn-danger" aria-label="Sold Out" title="Sold Out">Sold Out</button>
      </div>

      <div v-if="activeEvent.creatorId == account.id" class="text-end">
        <!-- TODO add v-if for owner of event check -->
        <button v-if="!activeEvent.isCanceled" @click="cancelEvent(activeEvent.id)" class="btn btn-danger"
          aria-label="Cancel Event" title="Cancel">Cancel
          Event</button>
        <button v-else class="btn btn-danger" aria-label="Close" title="Event Canceled">Event Canceled</button>
      </div>

    </div>
    <div class="bg-grey d-flex border-dark elevation-2 p-3 mt-3">
      <img class="rounded m-1" height="50" v-for="t in ticketHolders" :aria-label="t.profile.name"
        :src="t.profile.picture" :alt="t.profile.name" :title="t.profile.name">

    </div>
  </div>
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