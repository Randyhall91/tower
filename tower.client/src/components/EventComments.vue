<template>
  <div class="event-comments">
    <div class="form m-2 p-4 bg-grey text-end" @submit.prevent="handleSubmit()">

      <div class="form-floating bg">
        <textarea class="form-control bg-dark text-light" v-model="editable.body" placeholder="Leave a comment here"
          id="floatingTextarea"></textarea>
        <label for="floatingTextarea">Make a Comment</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
    <div v-for="c in eventComments" class="d-flex justify-content-center align-items-center m-3">
      <img height="50" class="rounded me-3" :src="c.creator.picture" :alt="c.creator.name" :title="c.creator.name">
      <div class="bg-grey d-flex flex-column px-3">
        <div class="align-self-end">
          <i @click="removeComment(c.id)" class="mdi mdi-close text-danger selectable"></i>
        </div>
        <p>{{c.body}}</p>
      </div>

    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { eventService } from '../services/EventService.js';
import Pop from '../utils/Pop.js';

export default {

  setup() {
    const editable = ref({})

    const route = useRoute()
    async function getCommentsByEventId() {
      try {
        await eventService.getCommentsByEventId(route.params.id)
      } catch (error) {
        Pop.error('GetCommentsByEventId', error)
      }
    }
    onMounted(() => {
      getCommentsByEventId()
    })
    return {
      editable,
      eventComments: computed(() => AppState.eventComments),
      async removeComment(id) {
        try {
          const yes = await Pop.confirm('Are you sure you want to delete your post?')
          if (!yes) { return }
          await eventService.removeComment(id)
        } catch (error) {
          Pop.error('[removeComment]', error)
        }
      },
      async handleSubmit() {
        try {
          editable.eventId = route.params.id
          await eventService.createComment(editable.value)
          editable.value = {}
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