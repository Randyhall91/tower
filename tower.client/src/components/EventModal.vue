<template>
  <div class="event-modal">
    <div class="modal fade" id="createEventModal" tabindex="-1" aria-labelledby="createEventModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content  bg-dark">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="createEventModalLabel">Create new event</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form @submit.prevent="handleSubmit()">
            <div class="modal-body">
              <div class="input-group mb-3">


                <span class="input-group-text bg-dark" id="basic-addon1">Name</span>
                <input type="text" v-model="editable.name" required class="form-control bg-grey text-light"
                  placeholder="Name" aria-label="Name" aria-describedby="basic-addon1">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text bg-dark" required id="basic-addon1">Picture</span>
                <input type="url" v-model="editable.coverImg" class="form-control bg-grey text-light"
                  placeholder="Import URL" aria-label="Import URL" aria-describedby="basic-addon1">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text bg-dark" required id="basic-addon1">Location</span>
                <input type="text" v-model="editable.location" class="form-control bg-grey text-light"
                  placeholder="Location" aria-label="Location" aria-describedby="basic-addon1">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text bg-dark" required id="basic-addon1">Capacity</span>
                <input type="number" v-model="editable.capacity" class="form-control bg-grey text-light"
                  placeholder="Capacity" aria-label="Capacity" aria-describedby="basic-addon1">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text bg-dark" required id="basic-addon1">Date</span>
                <input type="date" v-model="editable.startDate" class="form-control bg-grey text-light"
                  placeholder="Date" aria-label="Date" aria-describedby="basic-addon1">
              </div>
              <div class="input-group mb-3">

                <label class="input-group-text bg-dark" required for="type">Select an event</label>
                <select class="form-select bg-grey" v-model="editable.type" id="type">
                  <option value="concert">Concert</option>
                  <option value="convention">Convention</option>
                  <option value="sport">Sport</option>
                  <option value="digital">Digital</option>
                </select>

              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Save changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
import { ref } from 'vue';
import { eventService } from '../services/EventService.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const editable = ref({});
    return {
      editable,
      async handleSubmit() {
        try {
          await eventService.createEvent(editable.value)
        } catch (error) {
          Pop.error('[handleSubmit]', error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>