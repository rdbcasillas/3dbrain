<template>
  <div>
    <!-- <p v-if="flag">Executing code to visualize cells in a 3d mouse brain...</p> -->
    <b-content>
      <b-row>
        <b-col>
          <h5>177</h5>
          <iframe id="jupyter" 
          width="600"
          height="400"
          src="./html/173.html"
          frameborder="1"></iframe>
        </b-col>
        <b-col>
          <h5>173</h5>
          <iframe id="jupyter" 
          width="600"
          height="400"
          src="./html/177.html"
          frameborder="1"></iframe>
        </b-col>
      </b-row>
    </b-content>
  </div>
</template>

<script>
  export default {
    name: 'BrainViz3',
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