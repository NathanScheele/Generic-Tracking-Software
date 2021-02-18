<template>
  <div class="things container">
    <h2 class="subtitle is-3">
    Check out your generic things
    </h2>
    <div class="columns is-multiline">
      <div v-for="thing in things" :thing="thing" :key="thing.id" class="column is-one-quarter">
        <router-link :to="'/things/' + thing.id">
          <ThingCard :thing="thing" />
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import ThingCard from "@/components/ThingCard";
import ThingService from '@/services/ThingService.js';
export default {
  name: "ThingList",
  components: {
    ThingCard
  },
  data() {
    return {
      thing: {},
      things: []
    };
  },
  created() {
    this.getThingsData();
  },
  methods: {
    async getThingsData() {
      ThingService.getThings()
      .then(
        (things => {
          this.$set(this, "things", things);
        }).bind(this)
      );
    }
  }
};
</script>
<style lang="scss" scoped>
  .things {
    margin-top: 100px;
    text-align: center;
  }
</style>