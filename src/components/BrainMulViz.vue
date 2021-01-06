<template>
  <div class="multiviz">
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
      <b-breadcrumb-item :to="{ name: category, params: { type: category } }">
        {{ $route.name.slice(0,-5) }}
      </b-breadcrumb-item>
      <b-breadcrumb-item active>{{ id }}</b-breadcrumb-item>
    </b-breadcrumb>
    <b-container fluid>
      <b-row>
        <b-col >
          <div v-show="staticimage">
            <b-img
              thumbnail
              width="700"
              :src="'../static3d/' + id + '.png'"
              alt="Image 1"
            >
            </b-img>
            <b-button
              class="bt"
              @click="staticimage = !staticimage"
              variant="primary"
              >Load Interactive</b-button
            >
          </div>
          <iframe
            v-if="!staticimage"
            id="jupyter"
            width="1000"
            height="500"
            :src="'../html/' + category + '/' + id + '/' + id + '.html'"
            frameborder="1"
          ></iframe>
        </b-col>
      </b-row>
      <hr />
      <b-row class="myrow">
        <b-col cols="6" md="auto">
          <b-input-group>
            <v-button class="mybutton">
              <v-icon @click="prevImage" large> mdi-chevron-left-box </v-icon>
            </v-button>
            <b-img
              thumbnail
              v-if="filteredset[currentImage]"
              :src="filteredset[currentImage].pathLong"
              width="1000px"
              height="400px"
            >
            </b-img>
            <span>{{ imageCounter() }}</span>
            <v-button class="mybutton next">
              <v-icon @click="nextImage(filteredset)" large>
                mdi-chevron-right-box
              </v-icon>
            </v-button>
          </b-input-group>
          <b-input-group v-if="id == '176'">
            <v-button class="mybutton">
              <v-icon @click="prevSagImage" large>
                mdi-chevron-left-box
              </v-icon>
            </v-button>
            <b-img
              class="myimg"
              thumbnail
              v-if="images2[currentImage2]"
              :src="images2[currentImage2].pathLong"
              width="1000px"
            >
            </b-img>
            <v-button class="mybutton">
              <v-icon @click="nextSagImage(images2)" large>
                mdi-chevron-right-box
              </v-icon>
            </v-button>
          </b-input-group>
        </b-col>
        <b-col align-self="stretch">
          <b-input-group size="lg">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Search Key"
            ></b-form-input>
            <b-table
              :class="['w-100', id === '176' ? 'longheight' : 'shortheight']"
              caption-top
              show-filter
              :filter="filter"
              small
              sticky-header
              striped
              hover
              :items="brainkey"
              :fields="fields"
            >
              <template #table-caption><b>Region Index Key</b>
              </template>
              <template #cell(Region)="data">
                 <span id="tooltip-target-1">
                  {{ data.item.Region }} 
                 </span>
                <b-tooltip target="tooltip-target-1" triggers="hover" placement="left">
                <div>
                  <h5> References: </h5>
                  <ul>
                    <li v-for="(name,index) in data.item.Name" :key="index">
                         <a :href="data.item.Link[index]" target="_blank"> {{ name }}</a>
                    </li>
                  </ul>
                </div>
                </b-tooltip>
              </template>
            </b-table>
          </b-input-group>
        </b-col>
      </b-row>
      <hr />
      <b-row>
        <b-col>
          <b-button id="mybutton" v-if="!flag" @click="updateChart" variant="primary">
            Show cell count for each region
          </b-button>
        </b-col>
      </b-row>
      <b-row id="myid">
        <b-col>
          <apexchart
            v-if="flag"
            height="900"
            type="bar"
            :options="chartOptions2"
            :series="series2"
          ></apexchart>
        </b-col>
        <b-col>
          <apexchart
            v-if="flag"
            height="900"
            type="bar"
            :options="chartOptions"
            :series="series3"
          ></apexchart>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import * as d3 from "d3-fetch";
import * as _ from "lodash";
import * as $ from "jquery"
export default {
  name: "BrainMulViz",
  props: ["id", "category"],
  data: function () {
    return {
      staticimage: true,
      flag: false,
      tmpflag: false,
      images: [],
      images2: [],
      images3: [],
      filteredset: [],
      currentImage: 4,
      currentImage2: 0,
      interval: false,
      chartOptions: {
        chart: {
          id: "vuechart-example",
          type: "bar",
          stacked: true,
        },
      },
      brainkey: [],
      fields: [
        {
          key: "Index",
          sortable: true,
        },
        {
          key: "Region",
          sortable: false,
          thStyle: {},
        },
        {
          key: "abbrv",
          sortable: true,
          // Variant applies to the whole column, including the header and footer
          //variant: 'danger'
        },
        // {
        //   key: "groupname",
        //   sortable: false,
        //   thStyle: {},
        //   variant: 'info'
        // },
      ],
      filter: null,
    };
  },
  methods: {
    imageCounter(){
      let imageNumber = this.currentImage + 1
      let spanText = imageNumber + "/" + this.filteredset.length
      return spanText;
    },
    nextImage(imageset) {
      if (this.currentImage < imageset.length - 1) {
        this.currentImage += 1;
      }
    },
    prevImage() {
      if (this.currentImage > 0) {
        this.currentImage -= 1;
      }
    },
    nextSagImage(imageset) {
      if (this.currentImage2 < imageset.length - 1) {
        this.currentImage2 += 1;
      }
    },
    prevSagImage() {
      if (this.currentImage2 > 0) {
        this.currentImage2 -= 1;
      }
    },
    importAllHorizontal(r) {
      r.keys().forEach((key) =>
        this.images3.push({ pathLong: r(key), pathShort: key })
      );
    },
    importAllSaggital(r) {
      r.keys().forEach((key) =>
        this.images2.push({ pathLong: r(key), pathShort: key })
      );
    },
    importTest(r) {
      let id = this.id;
      r.keys().forEach((key) =>
        this.images3.push({ pathLong: r(key), pathShort: key })
      );
      let filteredarr = _.map(this.images3, function (o) {
        if (id=="17600"){
          let searchStr = id + "/horizontal";
          if (o.pathShort.indexOf(searchStr) > -1) return o;
        }
        else {
          let searchStr = id + "/";
          if (o.pathShort.indexOf(searchStr) > -1) return o;
        }
      });
      filteredarr = _.without(filteredarr, undefined);
      this.filteredset = filteredarr;
    },
    async fetchData() {
      this.brainkey = await d3.csv("../brain_region.csv");
      this.brainkey = _.forEach(this.brainkey, (obj)=>{
        obj.Name = obj.Name.split(";")
        obj.PMID = obj.PMID.split(";")
        obj.Title = obj.Title.split(";")
        obj.Link = obj.Link.split(";")
      });

      let graphdata = await d3.csv("../datasets/168-test2.csv")
      _.each(graphdata, item => item["168-Tot"] = parseInt(item["168-Tot"], 10));
      //New data
      let sumoutput =
        _(graphdata)
          .groupBy('Category-Name')
          .map((objs, key) => ({
              'Category-Name': key,
              'Color': _.map(objs, 'Color')[0],
              'Total': _.sumBy(objs, '168-Tot') }))
          //.orderBy(['Total'],['desc'])
          .filter(obj=>obj['Category-Name'] != 'Unused')
          .value();
     
      console.log(sumoutput)
      
      let newgraphdata = _.filter(graphdata,
                           (o)=>{return o['168-Tot'] > 0})

      this.mainregions = _.map(sumoutput, 'Category-Name');
      this.colors = _.map(sumoutput, 'Color')
      this.allcolors = _.map(newgraphdata,"Color");
      console.log(this.mainregions)
      this.categorytotal = _.map(sumoutput, 'Total');
      this.categories = _.map(newgraphdata, "Region-name");
      this.leftcounts = _.map(newgraphdata, "168-L");
      this.rightcounts = _.map(newgraphdata, "168-R");
      this.totalcounts = _.map(newgraphdata, "168-Tot")
    },
    updateChart() {
      $("html, body").animate({ scrollTop: $(document).height() }, "slow");
      this.flag = true;
      this.chartOptions2 = {
        plotOptions: {
          bar: {
            horizontal: true,
            distributed: true
          }
        },
        colors: this.colors, 
        grid: {
            show: true,
            borderColor: '#90A4AE',
            strokeDashArray: 0,
            position: 'back',
            xaxis: {
                lines: {
                    show: false
                }
            },   
            yaxis: {
                lines: {
                    show: false
                }
            },  
            row: {
                colors: undefined,
                opacity: 0.5
            },  
            column: {
                colors: undefined,
                opacity: 0.5
            },  
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },  
        },

        fill: {
          type: "solid",
          opacity: 1
        },
        title: {
          text: "Cell count by category",
          align: "centre",
          style: {
            fontSize: "14px",
            fontWeight: "bold",
            color: "#263238",
          },
        },
        xaxis: { categories: this.mainregions},
        yaxis: {tickAmount: 3, max: _.max(this.series2)},
        legend: {
          show:false,
          position: "top",
        },
        dataLabels: {
          enabled: false,
          style: {
            colors: ["black"],
          },
        },
      }
      this.chartOptions = {
        chart: {
          stacked: false,
        },
        colors: this.allcolors, 
        grid:{
          show: true
        },
        plotOptions: {
          bar: {
            horizontal: true,
            distributed: true
          }
        },
        fill: {
          type: "solid",
          opacity: 1
        },
        title: {
          text: "Cell count by brain region",
          align: "centre",
          style: {
            fontSize: "14px",
            fontWeight: "bold",
            color: "#263238",
          },
        },
        xaxis: { categories: this.categories },
        //yaxis: {logarithmic: true},
        legend: {
          show: false,
          position: "top",
        },
        dataLabels: {
          enabled: false,
          style: {
            colors: ["black"],
          },
        },
      };
      this.series2 = [
        {
          name: 'CategoryTotal',
          data: this.categorytotal
        }
      ]
      this.series3 = [
        {
          name: 'RegionTotal',
          data: this.totalcounts
        }
      ]
      this.series = [
        {
          name: "leftcounts",
          data: this.leftcounts,
        },
        {
          name: "rightcounts",
          data: this.rightcounts,
        },
      ];
    },
    showChart() {
      this.flag = true;
    },
  },
  created() {
    this.fetchData();
  },
  mounted() {
    this.filteredset = []
    this.staticimage = true;
    this.images3 = []
    // this.currentImage = 4;
    // this.currentImage2 = 0;
    // this.importAllHorizontal(
    //   require.context(
    //     "../assets/2d-annotations/176/horizontal/",
    //     true,
    //     /\.png$/
    //   )
    // );
    // //let pathToImage = "../assets/2d-annotations/" + this.id + "/horizontal/"
    //this.importAllHorizontal(require.context(pathToImage, true, /\.png$/));
    //this.importAllHorizontal(require.context(`../assets/2d-annotations/${this.id}/horizontal/`, true, /\.png$/));
    //this.importTest(require.context("../assets/2d-annotations/", true));
    this.importTest(require.context("../assets/Updated_2D_annotations/", true));
    if (this.id == "176") {
      this.importAllSaggital(
        require.context(
          //"../assets/2d-annotations/176/saggital/",
          "../assets/Updated_2D_annotations/sagittal/176-sagittal",
          true,
          /\.png$/
        )
      );
    }
  },
};
</script>

<style lang="css" scoped>
 /* .prev {
  margin-top: 200px;
  margin-right: -180px; 
} */
.next {
  margin-left: -30px; 
} 
.d-flex {
  display: inline;
}
.mydiv {
  display: inline;
}
.longheight {
  max-height: 1710px;
  border: 1px solid;
}
.shortheight {
  max-height: 800px;
  border: 1px solid;
}
.mybutton {
  margin-top: 330px;
}
.bt {
  display: block;
  margin: auto;
}
.multiviz {
  text-align: center;
}
</style>
