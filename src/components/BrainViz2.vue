<template>
  <div>
    <!-- <p v-if="flag">Executing code to visualize cells in a 3d mouse brain...</p> -->
    <b-content>
      <b-row>
        <b-col>
          <h5>162</h5>
          <iframe id="jupyter" 
          width="600"
          height="400"
          src="./html/162.html"
          frameborder="1"></iframe>
        </b-col>
        <b-col>
          <h5>165</h5>
          <iframe id="jupyter" 
          width="600"
          height="400"
          src="./html/165.html"
          frameborder="1"></iframe>
        </b-col>
      </b-row>
    </b-content>
  </div>
</template>

<script>
  export default {
    name: 'BrainViz2',
    data: function() {
      return {
        flag: true,
      } 
    },
    methods: {

    },
  }
</script>

<style lang="scss" scoped>

</style>