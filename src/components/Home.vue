<template>
  <div>
    <!-- <b-container >

        <b-card  body-class="text-center" header-tag="nav"
        title="Exploring Nuclei of Descending Input to the Spinal Cord" class="card"
        style="max-width: 80rem;">
        <b-card-img src="./176whole.png" height="600"></b-card-img>
          <b-card-text>
           This project visualizes and quantifies supra spinal neurons with projections to the 
           cervical, thoracic and lumbar segments.  
          </b-card-text>

          <b-button variant="primary" :to="{name: 'selecttype'}">
            <b>Start Exploring</b>
            </b-button>
        </b-card>
    </b-container> -->
  <b-container>
    <b-row class="container">
      <b-col>
        <h3>
          Exploring Nuclei of Descending Input to the Spinal Cord
        </h3>
        <b-carousel
          id="carousel-fade"
          style="text-shadow: 0px 0px 2px #000"
          fade
          indicators
          img-width="800"
          img-height="380"
        >
          <b-carousel-slide v-for="(image, index) in items" :key="index"
            :caption="image.text"
            :img-src="image.src"
          ></b-carousel-slide>
        </b-carousel>
      </b-col>
    </b-row>
    <br>
      <b-row>
          <b-button class="butt" variant="primary" :to="{name: 'selecttype'}">
            <b>Start Exploring</b>
          </b-button>
      </b-row>
  </b-container>


  </div>
</template>

<script>
export default {
  name: "Home",
  data: function() {
    return {
      items: [
        {
          src: "../carousel/CAROUSEL.001.png",
          //text: "Text to go with first slide"
        },
        {
          src: "../carousel/CAROUSEL.002.png",
          //text: "Text to go with first slide"
        },
        {
          src: "../carousel/CAROUSEL.003.png",
          //text: "Text to go with second slide"
        },
        {
          src: "../carousel/CAROUSEL.004.png",
          //text: "Text to go with third slide"
        },
        {
          src: "../carousel/CAROUSEL.005.png",
          //text: "Text to go with fourth slide"
        },
        {
          src: "../carousel/CAROUSEL.006.png",
          //text: "Text to go with fifth slide"
        },
        {
          src: "../carousel/CAROUSEL.007.png",
          //text: "Text to go with fifth slide"
        },
      ],
    };
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  text-align: center;
}
.butt {
  margin: 0 auto;
  display: block;
}

.carousel-item {
  height: 750px !important;
}
.container {
  margin-top: -20px;
}
/* .img {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 300px;
} */

</style>
