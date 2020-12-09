<template>
  <div>
    <b-tabs
      active-nav-item-class="font-weight-bold text-uppercase text-success"
      active-tab-class="font-weight-bold text-primary"
      content-class="mt-3"
      align="center"
    >
      <b-tab title="Category1" active>
        <p>We are the brains in category 1!</p>
        <BrainViz :sourcetype="htmlsets[0]"/>
      </b-tab>
      <b-tab @click="lazyToggle" title="Category2" :lazy="lazyval">
        <p>We are the brains in category 2!</p>
        <BrainViz2></BrainViz2>
      </b-tab>
      <b-tab title="Category3" lazy>
        <p>We are the brains in category 3!</p>
        <BrainViz3/>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
  import BrainViz from './BrainViz.vue'
  import BrainViz2 from './BrainViz2.vue'
  import BrainViz3 from './BrainViz3.vue'
  export default {
    name: 'TabList',
    components: {
      BrainViz,
      BrainViz2,
      BrainViz3
    },
    data: function(){
      return {
        lazyval: true,
        htmlsets:[
          {
            'set1': ['156.html','158.html']
          },
          {
            'set2': ['162.html','165.html']
          },
        ]
      }
    },
    methods: {
      lazyToggle(){
        this.lazyval = false
      }
    }
    
  }
</script>

<style lang="scss" scoped>

</style>