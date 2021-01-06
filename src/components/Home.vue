<template>
  <div>
    <b-container >

        <b-card  body-class="text-center" header-tag="nav"
        title="Visualizing Nuclei of Descending Pathways to the Spinal Cord" class="card"
        style="max-width: 80rem;">
        <b-card-img src="./176whole.png" height="600"></b-card-img>
          <b-card-text>
           This project explores the supra spinal projections at the cervical, thoracic and lumbar levels.  
          </b-card-text>

          <b-button variant="primary" :to="{name: 'selecttype'}">
            <b>Start Exploring</b>
            </b-button>
        </b-card>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  props: {
    msg: String,
    items: [
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
      },
    ],
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  margin: auto;
}

</style>
