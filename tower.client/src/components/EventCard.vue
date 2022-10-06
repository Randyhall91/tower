<template>
  <div class="event-card col-3">
    <div class="card border-dark rounded card-size m-3">
      <router-link v-if="towerEvent.id" :to="{name:'EventDetails', params: {id: towerEvent.id}}">
        <img :src="towerEvent.coverImg" :alt="towerEvent.name" :title="towerEvent.name"
          class="img-fluid rounded selectable">
      </router-link>

      <div class="card-box p-2 bg-grey bg-opacity-75 rounded">
        <h5>{{towerEvent.name}}</h5>
        <p class="m-0">{{towerEvent.location}}</p>
        <p class="m-0">{{new Date(towerEvent.startDate).toLocaleDateString('en-US',
        {month: 'short', year:'2-digit'})}}</p>
        <p class="capacity">{{towerEvent.capacity}}</p>
      </div>
    </div>


  </div>
</template>


<script>
import { TowerEvent } from "../models/TowerEvent.js"
export default {
  props: {
    towerEvent: { type: TowerEvent, required: true }
  },
  setup() {

    return {}
  }
}
</script>


<style lang="scss" scoped>
.card-size {
  width: 287px;
  // height: 251px;
}

.capacity {
  position: absolute;
  right: 1rem;
  bottom: 0;
}

.card-box {
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 287px;
  height: 97px;
}
</style>