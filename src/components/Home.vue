<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-card  body-class="text-center" header-tag="nav"
        title="Explore 3D brains" class="card"
        style="max-width: 80rem;">
        <b-card-img src="./176whole.png" height="600"></b-card-img>
          <b-card-text>
            More text here summarizing the project
          </b-card-text>

          <b-button variant="primary" :to="{name: 'selecttype'}">Start Exploring</b-button>
        </b-card>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  margin:auto;
}
</style>
