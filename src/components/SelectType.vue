<template>
<div>
    <b-container>
      <b-row>
        <h4>
          Select Type of Injection  
        </h4>
      </b-row>
      <hr>
      <b-row>
        <b-col cols="4" v-for="cat in categoryObj" :key="cat.link">
          <b-card
            :title=cat.name
            :img-src="'../injectionimages/'+cat.link+'.png'"
            img-alt="Image"
            img-top
            img-height="300px"
            tag="article"
            class="mb-2"
          >
            <b-card-text>
              {{ cat.text }}  
            </b-card-text>

          <b-button  :to="{name: cat.link, params: {type: cat.link}}" size="md" variant="primary">
            <b>
            Explore
            </b>
          </b-button>
          </b-card>
        </b-col>
      </b-row>

    </b-container>
</div>
</template>

<script>
export default {
  name: "SelectType",
  data: function(){
    return {
      categories: ["Cervical_Lumbar", "Injured_Animals",
      "Lumbar Injection", "Thoracic Injection"],
      categoryObj: [
        {
        'name': 'Lower Lumbar Injection',
        'link': 'lowlumbar',
        'text': 'AAV2-Retro-H2B-mGL was injected to segment L3/4 of the spinal cord'
        },
        {
          'name': 'Upper Lumbar Injection',
          'link': 'lumbar',
          'text': 'AAV2-Retro-H2B-mGL was injected to segment L1 of the spinal cord'
        },
        {
          'name': 'Thoracic Injection',
          'link': 'thoracic',
          'text': 'AAV2-Retro-H2B-mGL was injected to segment T10 of the spinal cord'
        },
        {
        'name': 'Lumbar/Cervical Injection',
        'link': 'cervical',
        'text': 'AAV-Retro-mScarlet and AAV2-Retro-H2B-mGL were injected to segments C4 and L1 of the spinal cord, respectively'
        },
        {
          'name': 'Injured_Animals',
          'link': 'injured',
          'text': 'AAV2-Retro-H2B-mGL was injected rostrally or caudally after mild, moderate or severe spinal injury'
        },
      ]
    }
  }
};
</script>

<style lang="css" scoped>
h4 {
  margin-left: auto;
  margin-right: auto;
}
</style>