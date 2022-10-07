<template>
  <div v-if="towerEvent" class="event-card col-lg-3">
    <div class="card m-3 border-dark elevation-2 rounded card-size bg-dark">
      <router-link :to="{name:'EventDetails', params: {id: towerEvent.id}}">
        <img :src="towerEvent.coverImg || 'http://placeholder.com/700'" :alt="towerEvent.name" :title="towerEvent.name"
          class="img-fluid rounded selectable" :aria-label="towerEvent.name">

        <div v-if="!towerEvent.isCanceled" class="text-center bg-text p-2 rounded">
          <h5>{{towerEvent.name}}</h5>
          <p class="m-0">{{towerEvent.location}}</p>
          <p class="m-0">{{new Date(towerEvent.startDate).toLocaleDateString('en-US',
          {month: 'short', year:'2-digit'})}}</p>
          <p class="">{{towerEvent.capacity}} spots left</p>
        </div>
        <div v-else class="p-2 bg-text rounded text-center">
          <h5>{{towerEvent.name}}</h5>
          <p class="m-0">{{towerEvent.location}}</p>
          <p class="m-0">{{new Date(towerEvent.startDate).toLocaleDateString('en-US',
          {month: 'short', year:'2-digit'})}}</p>
          <p class="text-danger">Event Canceled</p>
        </div>

      </router-link>
    </div>


  </div>
</template>


<script>
import { Account } from "../models/Account.js";
import { TowerEvent } from "../models/TowerEvent.js"
export default {
  props: {
    towerEvent: { type: TowerEvent, required: true },
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
  margin: 0;
}

.card-box {
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 287px;
  height: 120px;

}

.bg-text {
  background-color: rgb(0, 0, 0);
  /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4);
  /* Black w/opacity/see-through */
  color: white;
  font-weight: bold;
  border: 3px solid #f1f1f1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 80%;
  padding: 20px;
  text-align: center;
}
</style>