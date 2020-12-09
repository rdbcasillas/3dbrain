<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="4" v-for="(brain,index) in brainObj[type]" :key="index" >
          <b-card
            :title=brain
            img-src="./3dinject.png"
            img-alt="Image"
            img-top
            img-height="300px"
            tag="article"
            style="max-width: 30rem;"
            class="mb-2"
          >

            <b-button :to="{name: type+'brain', params: { id: brain, category: type }}" variant="primary">Visualize</b-button>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  export default {
    name: "BrainList",
    props: ['type'],
    data: function(){
      return {
        brainObj:
          {
          'cervical': ['174','176'],
          'lumbar' : ['168'],
          'injured' : ['177','190','191'],
          'thoracic': ['140']
          },
      }
    },
    mounted() {
        console.log(this.type)
    }
  }
</script>

<style lang="scss" scoped>

</style>