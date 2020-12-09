<template>
    <!-- <p v-if="flag">Executing code to visualize cells in a 3d mouse brain...</p> -->
    <b-container>
      <b-row>
        <b-col v-for="(html,index) in sourcetype.set1"  :key="index">
           <iframe id="jupyter" 
          width="600"
          height="400"
          :src="'./html/' + html"
          frameborder="1"></iframe>         
        </b-col>
        <!-- <b-col>
          <h5>156</h5>
          <iframe id="jupyter" 
          width="500"
          height="400"
          src="./html/156.html"
          frameborder="1"></iframe>
        </b-col>
        <b-col>
          <h5>158</h5>
          <iframe id="jupyter" 
          width="500"
          height="400"
          src="./html/158.html"
          frameborder="1"></iframe>
        </b-col> -->
      </b-row>
      <hr> 
    </b-container>
</template>

<script>
  export default {
    name: 'BrainViz',
    props: ["sourcetype"],
    data: function() {
      return {
        flag: true,
      } 
    },
    methods: {

    },
    mounted: function() {
      window.setInterval(()=>{
        let iframe = document.getElementById('jupyter');
        let innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        let canvas = innerDoc.getElementsByTagName('canvas')[0];
        if (canvas) {
          this.flag = false
        }
        else {
          console.log("no canvas yet")
        }
      },1000)
    }
  }
</script>

<style lang="scss" scoped>

</style>