<template>
  <div>
    <b-container fluid>
      <b-row>
          <b-breadcrumb>
          <b-breadcrumb-item href="/">
            <b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
            Home
          </b-breadcrumb-item>
          <b-breadcrumb-item :to="{name: category, 
          params:{type:category}}">
            {{ category }}
          </b-breadcrumb-item>
          <b-breadcrumb-item active>{{ id }}</b-breadcrumb-item>
        </b-breadcrumb>
      </b-row>
      <b-row>
        <b-col cols="12">
          <div v-show="staticimage">
            <b-img thumbnail fluid src="../3dstatic.png" alt="Image 1">
            </b-img>
            <b-button class="bt" @click="staticimage = !staticimage" variant="dark">Load Interactive</b-button>
          </div>
          <iframe v-if="!staticimage" id="jupyter" 
          width="1000"
          height="500"
          :src="'../html/' + category + '/' + id + '/' + id + '.html'"
          frameborder="1"></iframe>
        </b-col>
      </b-row>
      <hr>
      <b-row class="myrow">
        <b-col cols="6" md="auto" align-self="baseline">
        <b-input-group>
          <v-button class="mybutton">
          <v-icon @click="prevImage" large > mdi-chevron-left-box </v-icon>
          </v-button>
          <b-img thumbnail v-if="filteredset[currentImage]" :src="filteredset[currentImage].pathLong"
          height="550px"
          width="1000px" 
          >
          </b-img>
          <v-button class="mybutton">
          <v-icon @click="nextImage(images)" large > mdi-chevron-right-box </v-icon>
          </v-button>
        </b-input-group>
        <b-input-group v-if="category=='cervical'">
          <v-button class="mybutton">
          <v-icon @click="prevSagImage" large > mdi-chevron-left-box </v-icon>
          </v-button>
          <b-img class="myimg" thumbnail v-if="images2[currentImage2]" :src="images2[currentImage2].pathLong"
          width="1000px" 
          >
          </b-img>
          <v-button class="mybutton">
          <v-icon @click="nextSagImage(images2)" large > mdi-chevron-right-box </v-icon>
          </v-button>
        </b-input-group>
        </b-col>
        <b-col align-self="stretch">
          <b-input-group size="lg">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Type to Search The Table"
            ></b-form-input>
            <b-table class="w-100 myclass" caption-top show-filter :filter="filter" small sticky-header striped hover :items="brainkey" :fields="fields">
              <template #table-caption>Number to Region Key</template>
            </b-table>
          </b-input-group>
        </b-col>
      </b-row>
      <hr>
      <b-row>
        <b-col>
          <b-button v-if="!flag" @click="updateChart" variant="dark">
            Show cell count for each region 
          </b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <apexchart v-if="flag" height="700" width="1400" type="bar" :options="chartOptions" :series="series"></apexchart>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import * as d3 from "d3-fetch";
  import * as _ from "lodash";
  export default {
    name: 'BrainMulViz',
    props: ['id','category'],
    data: function(){
      return {
        staticimage: true,
        flag: false,
        tmpflag: false,
        images:[],
        images2:[],
        images3:[],
        filteredset:[],
        currentImage: 0,
        currentImage2: 0,
        interval: false,
        chartOptions: {
          chart: {
            id: 'vuechart-example',
            type: 'bar',
            stacked: true,
          },
        },
        brainkey: [],
        fields: [
          {
            key: 'Order',
            sortable: true
          },
          {
            key: 'Structure_name',
            sortable: false,
            thStyle: {
          }
          },
          {
            key: 'abbrv',
            sortable: true,
            // Variant applies to the whole column, including the header and footer
            //variant: 'danger'
          }
        ],
        filter: null
      }
    },
    methods: {
      nextImage(imageset){
        if (this.currentImage < imageset.length-1){
          this.currentImage +=1
        }
      },
      prevImage(){
        if (this.currentImage > 0){
          this.currentImage -=1
        }
      },
      nextSagImage(imageset){
        if (this.currentImage2 < imageset.length-1){
          this.currentImage2 +=1
        }
      },
      prevSagImage(){
        if (this.currentImage2 > 0){
          this.currentImage2 -=1
        }
      },
      importAllHorizontal(r){
        r.keys().forEach(key => (this.images.push({ pathLong: r(key), pathShort: key })));
        console.log(this.images)
      },
      importAllSaggital(r){
        r.keys().forEach(key => (this.images2.push({ pathLong: r(key), pathShort: key })));
      },
      importTest(r) {
        let id = this.id
        r.keys().forEach(key => (this.images3.push({ pathLong: r(key), pathShort: key })));
        let filteredarr =_.map(this.images3, function(o) {
            let searchStr = id + "/"
            if (o.pathShort.indexOf(searchStr)>-1) return o;
        });
        filteredarr = _.without(filteredarr, undefined)
        this.filteredset = filteredarr;
      },
      async fetchData() {
        let data2 = await d3.csv("../datasets/summary.csv")
        this.brainkey = await d3.csv("../brainkey.csv")

        this.summary =  _.filter(data2,(o)=>{
          return o.left_cell_count > 20 && o.right_cell_count > 20
        })
        this.categories = _.map(this.summary, "structure_name")
        console.log(this.categories)
        this.leftcounts = _.map(this.summary, "left_cell_count")
        this.rightcounts = _.map(this.summary, "right_cell_count")

      },
      updateChart(){
        this.flag = true
        this.chartOptions = {
          chart: {
            stacked: false
          },
          title: {
            text: "Cell count by brain region",
            align: 'centre',
            style: {
              fontSize:  '14px',
              fontWeight:  'bold',
              color:  '#263238'
            }
          },
          xaxis: {categories: this.categories},
          legend: {
            position: 'top'
          },
          dataLabels: {
            style: {
              colors: ['black']
            }
          }
        }
        this.series =  [
            {
              name: 'leftcounts',
              data: this.leftcounts
            },
            {
              name: 'rightcounts',
              data: this.rightcounts
            },
          ]
      },
      showChart(){
        this.flag = true;
      }
    },
    created(){
      this.fetchData();
    },
    mounted() {
      this.importAllHorizontal(require.context('../assets/2d-annotations/176/horizontal/', true, /\.png$/));
      //let pathToImage = "../assets/2d-annotations/" + this.id + "/horizontal/"
      //this.importAllHorizontal(require.context(pathToImage, true, /\.png$/));
      //this.importAllHorizontal(require.context(`../assets/2d-annotations/${this.id}/horizontal/`, true, /\.png$/));
      this.importTest(require.context('../assets/2d-annotations/', true));
      console.log(this.id)
      if (this.category=='cervical') {
        this.importAllSaggital(require.context('../assets/2d-annotations/176/saggital/', true, /\.png$/));
      }
    },
  }
</script>

<style lang="css" scoped>
/* .prev {
  margin-top: 200px;
  margin-right: -180px; 
}
.next {
  margin-top: 200px;
  margin-left: -180px; 
} */
.d-flex {
  display: inline;
}
.mydiv {
  display: inline;
}
.myclass {
  max-height: 1535px;
  border: 1px solid
}
.mybutton {
  margin-top: 200px;
}
.bt {
  display: block;
  margin: auto
}
.myrow {
  position: relative;
}
</style>