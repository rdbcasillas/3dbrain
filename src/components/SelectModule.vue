<template>
<div>
    <b-container>
      <b-row>
        <b-col>
        <h2>Welcome to the 3d mouse brain project</h2>

      <hr>
        </b-col>
      </b-row>
      <br>

      <b-row>
        <b-col>
          <b-card
            title="3d view"
            img-src="./3dbrain.png"
            img-height="400"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem"
            class="mb-2"
          >
            <b-card-text>
              Play with an interactive 3d model visualizing cells in a mouse brain
            </b-card-text>
            <b-button :to="{name: 'tablist'}" variant="primary">Go 3d</b-button>
          </b-card>
        </b-col>
        <b-col>
          <b-card
            title="2d view"
            img-src="./2dbrain.png"
            img-height="400"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem"
            class="mb-2"
          >
            <b-card-text>
              View 2d images to locate the cell locations on a mouse brain
            </b-card-text>

            <b-button :to="{name: 'brainmulviz'}" variant="primary">Go 2d</b-button>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
</div>
</template>

<script>
export default {
  name: "SelectModule",
};
</script>

<style lang="scss" scoped>
</style>