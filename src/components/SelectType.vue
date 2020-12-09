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
        <b-col v-for="cat in categoryObj" :key="cat.link">
          <b-card
            :title=cat.name
            img-src="./injectionimages/lumbar-cervical.png"
            img-alt="Image"
            img-top
            img-height="300px"
            tag="article"
            style="max-width: 30rem;"
            class="mb-2"
          >
            <b-card-text>
              For this one, we injected a lot of good stuff in all the proper places.  
            </b-card-text>

          <b-button  :to="{name: cat.link, params: {type: cat.link}}" size="md" variant="primary">
            Explore
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
      categoryObj: [{
        'name': 'Cervical_Lumbar',
        'link': 'cervical'
      },
      {
        'name': 'Injured_Animals',
        'link': 'injured'
      },
      {
        'name': 'Lumbar_Injection',
        'link': 'lumbar'
      },
      {
        'name': 'Thoracic_Injection',
        'link': 'thoracic'
      }]

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