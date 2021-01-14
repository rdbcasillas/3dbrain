<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item href="/">
        <b-icon
          icon="house-fill"
          scale="1.25"
          shift-v="1.25"
          aria-hidden="true"
        ></b-icon>
        Home
      </b-breadcrumb-item>
      <b-breadcrumb-item :to="{ name: 'selecttype' }">
        Treatments
      </b-breadcrumb-item>
    </b-breadcrumb>
    <b-container>
      <b-row> </b-row>
      <b-row>
        <b-col
          cols="6"
          v-for="(brain, index) in brainObj[$route.name]"
          :key="index"
        >
          <b-card v-b-popover.hover="hoveredText(brain)"
            @mouseover="activeCard=index"
            @mouseout="activeCard=null"
            :border-variant="activeCard==index ? 'primary' : 'dark' "
            :header="($route.name=='injured') ? textContent(brain) : ''"
            header-text-variant="dark"
            :title="'Animal ID: ' + brain" 
            :img-src="'../injectionimages/'+brain+'.png'"
            img-alt="Image"
            img-top
            :img-height="300"
            tag="article"
            style="max-width: 70%"
            :class="activeCard==index ? ['highlightcard','mb-2'] : 'mb-2'"
          >
            <b-button
              :to="{
                name: $route.name + 'brain',
                params: { id: brain, category: $route.name },
              }"
              variant="primary"
            >
              <b>Visualize</b>
            </b-button>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "BrainList",
  props: ["type"],
  data: function () {
    return {
      activeCard: null,
      brainObj: {
        cervical: ["174", "176"],
        lumbar: ["167", "168"],
        lowlumbar: ["136","138"],
        injured: [ "190", "191", "177", "179", "180","182", "148", "149",],
        thoracic: ["140", "145"],
      },
    };
  },
  methods: {
    hoverEffect(){
      console.log("hi")
    },
    hoveredText(id){
     if (id=='148' || id == '149') {
       return "AAV2-Retro-H2B-mGL injected to T10 four weeks after T11/12 injury"
     } 
     else {
       return "AAV2-Retro-H2B-mGL injected to L1 seven weeks after T11/12 injury"
     }
    },
    // if colors required for the border
    borderColor(id){
      if (id=='182' || id=='180') {
        return 'danger'
      }
      else if (id=='148' || id == '149') {
        return 'warning'
      }
      else if (id=='190' || id == '191') {
        return 'info'
      }
      else {
        return 'primary'
      }
      //:header-bg-variant="($route.name=='injured') ? borderColor(brain) : ''"
    }
    ,
    textContent(id){
      if (id=='182' || id=='180') {
        return 'Severe Injury'
      }
      else if (id=='148' || id == '149') {
        return 'Severe Injury, Rostral Injection'
      }
      else if (id=='190' || id == '191') {
        return 'Mild Injury'
      }
      else {
        return 'Moderate Injury'
      }
    }
  },
  mounted() {
    console.log(this.$route.name);
  },
};
</script>

<style lang="css" scoped>
.card {
  border: solid 2px;
}
.text-dark {
  font-size: large;
  font-weight: bold;
}
.highlightcard {
  border: solid 3px;
  transition: 0.1s;
  transition-timing-function: ease;
}
</style>