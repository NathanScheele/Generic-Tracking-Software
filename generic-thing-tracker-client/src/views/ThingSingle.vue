<template>
  <div class="thing-single">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ thing.name }}
          </h1>
          <h2 class="subtitle ">
            <strong>Date:</strong> {{ thing.date }}
            <br>
            <strong>Time:</strong> {{ thing.time }}
          </h2>
        </div>
      </div>
    </section>
    <section class="thing-content">
      <div class="container">
        <p class="is-size-4 description">{{ thing.description }}</p>
        <p class="is-size-5"><strong>Location:</strong> {{ thing.location }}</p>
        <p class="is-size-5"><strong>Category:</strong> {{ thing.category }}</p>
        <div class="thing-images columns is-multiline has-text-centered">
          <div v-for="image in thing.images" :key="image.id" class="column is-one-third">
            <img :src="image" :alt="thing.name">
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import ThingService from '@/services/ThingService.js';

export default {
  name: 'ThingSingle',
  data () {
    return {
      thing: {}
    }    
  },
  created() {
    this.getThingData();
  },
  
  methods: {
    async getThingData() {
      // Get the access token from the auth wrapper
      const accessToken = await this.$auth.getTokenSilently()

      ThingService.getThingSingle(this.$route.params.id, accessToken)
      .then(
        (thing => {
          this.$set(this, "thing", thing);
        }).bind(this)
      );
    }
  }
}
</script>