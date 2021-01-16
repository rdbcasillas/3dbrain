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
      <!-- <b-breadcrumb-item :to="{ name: category, params: { type: category } }">
        {{ $route.name.slice(0, -5) }}
      </b-breadcrumb-item> -->
      <b-breadcrumb-item :to="{ name: category, params: { type: category } }">
        {{ calcBreadCrumbVal }}
      </b-breadcrumb-item>
      <b-breadcrumb-item active>{{ id }}</b-breadcrumb-item>
    </b-breadcrumb>
    <b-container fluid>
      <b-row>
        <b-col>
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
              <template #table-caption><b>Region Index Key</b> </template>
              <template #cell(Region)="data">
                <span id="tooltip-target-1">
                  {{ data.item.Region }}
                </span>
                <b-tooltip
                  target="tooltip-target-1"
                  triggers="hover"
                  placement="left"
                >
                  <div>
                    <h5>References:</h5>
                    <ul>
                      <li v-for="(name, index) in data.item.Name" :key="index">
                        <a :href="data.item.Link[index]" target="_blank">
                          {{ name }}</a
                        >
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
          <b-button
            id="mybutton"
            v-if="!flag"
            @click="showChart"
            variant="primary"
            :disabled="id=='180' || id=='182'"
          >
            Plot Cell Counts Across Regions
          </b-button>
        </b-col>
      </b-row>
      <b-row v-if="flag" >
        <b-col cols="8">
          <span>Use the slider to filter the graph by cell count</span>
          <vue-slider
            v-model="slidervalue"
            :min="minval"
            :max="calcMax"
            :marks="calcSliderMarks"
          ></vue-slider>
        </b-col>
        <!-- <b-col>
          <b-button @click="showLeftRight">Show Left/Right values</b-button>
        </b-col> -->
      </b-row>
      <br />
      <b-row id="myid">
        <b-col v-if="flag">
          <br />
          <apexchart
            height="900"
            type="bar"
            :options="chartOptions2"
            :series="getCategoryData()"
          ></apexchart>
        </b-col>
        <b-col>
          <br />
          <apexchart
            v-if="flag"
            height="900"
            type="bar"
            :options="chartOptions"
            :series="regionTotal"
          ></apexchart>
        </b-col>
      </b-row>
      <hr>
      <b-row v-if="normBrains.includes(id)">
        <b-col>
          <b-button
            id="mybutton"
            v-if="showNormalizedButton"
            @click="plotNormalized"
            variant="primary"
            :disabled="id=='180' || id=='182'"
          >
            Show normalized values 
          </b-button>
        </b-col>
      </b-row>
      <b-row v-if="showNormalized">
        <b-col>
          <apexchart
            height="800"
            type="bar"
            :options="normchartOptions"
            :series="normSeries"
          ></apexchart>
        </b-col>
        <b-col>
          <apexchart
            height="800"
            type="bar"
            :options="normRegionChartOptions"
            :series="normRegionSeries"
          ></apexchart>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import * as d3 from "d3-fetch";
//import * as d3sc from "d3-scale";
import * as _ from "lodash";
import * as $ from "jquery";

export default {
  name: "BrainMulViz",
  components: {},
  props: ["id", "category"],
  data: function () {
    return {
      minval: 0,
      maxval: 12000,
      slidervalue: 9000,
      staticimage: true,
      flag: false,
      showNormalized: false,
      showNormalizedButton: false,
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
        },
      ],
      filter: null,
      normBrains: ['174','176','177','179','190','191'],
      normSeries: [],
      normchartOptions: {},
      normRegionSeries: [],
      normRegionChartOptions: {}
    };
  },
  computed: {
    calcSliderMarks: function(){
      //let finalpoint = this.slidervalue
      if (this.category=='cervical') {
        let marks = [500, 1000, 3000, 5000, 16000];
        return marks;
      }
      else {
        let marks = [100, 500, 1000, 3000, 5000, 12000];
        return marks;
      }
    },
    calcMax: function(){
      if (this.category=='cervical') {
        return 16000;
      }
      else {
        return 12000;
      }
    },
    calcBreadCrumbVal(){
      if (this.category=='cervical') {
        return 'cervical-lumbar'
      }
      else if (this.category=='lowlumbar') {
        return 'lower-lumbar'
      }
      else if (this.category=='lumbar') {
        return 'upper-lumbar'
      }
      else if (this.category=='thoracic') {
        return 'thoracic'
      }
      else {
        return 'injured'
      }
    }
  },
  methods: {
    imageCounter() {
      let imageNumber = this.currentImage + 1;
      let spanText = imageNumber + "/" + this.filteredset.length;
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
        if (id == "17600") {
          let searchStr = id + "/horizontal";
          if (o.pathShort.indexOf(searchStr) > -1) return o;
        } else {
          let searchStr = id + "/";
          if (o.pathShort.indexOf(searchStr) > -1) return o;
        }
      });
      filteredarr = _.without(filteredarr, undefined);
      this.filteredset = filteredarr;
    },
    async fetchData() {
      console.log(this.$route.name)
      this.brainkey = await d3.csv("../brain_region.csv");
      this.brainkey = _.forEach(this.brainkey, (obj) => {
        obj.Name = obj.Name.split(";");
        obj.PMID = obj.PMID.split(";");
        obj.Title = obj.Title.split(";");
        obj.Link = obj.Link.split(";");
      });

      let path = "../datasets/" + this.id + ".csv";
      let pathtocatdata = ''
      if (this.normBrains.includes(this.id)){
        pathtocatdata = "/../datasets/" + this.id + "-cat-norm.csv"
        this.catnormdata = await d3.csv(pathtocatdata)
      }
      //this.graphdata = await d3.csv("../datasets/138.csv")
      _.each(this.catnormdata, (item) => (item["TotalCount"] = parseInt(item["TotalCount"], 10)) )

      this.graphdata = await d3.csv(path);
      _.each(
        this.graphdata,
        (item) => (item["TotalCount"] = parseInt(item["TotalCount"], 10))
      );
      _.each(
        this.graphdata,
        (item) => (item["LeftCount"] = parseInt(item["LeftCount"], 10))
      );
      _.each(
        this.graphdata,
        (item) => (item["RightCount"] = parseInt(item["RightCount"], 10))
      );

      if (this.normBrains.includes(this.id)){
        _.each(
          this.graphdata,
          (item) => (item["Normalized"] = parseInt(item["Normalized"], 10))
        );
      }
      //New data
      this.sumoutput = _(this.graphdata)
        .groupBy("Category-Name")
        .map((objs, key) => ({
          "Category-Name": key,
          Color: _.map(objs, "Color")[0],
          Total: _.sumBy(objs, "TotalCount"),
          LeftTotal: _.sumBy(objs, "LeftCount"),
          RightTotal: _.sumBy(objs, "RightCount")
        }))
        .filter((obj) => obj["Category-Name"] != "Unused")
        //.filter(obj1=>obj1['Total'] <= this.slidervalue)
        .value();

      if (this.normBrains.includes(this.id)){
        this.normalizedoutput = _(this.graphdata)
        .groupBy("Category-Name")
        .map((objs, key) => ({
          "Category-Name": key,
          Color: _.map(objs, "Color")[0],
          Total: _.sumBy(objs, "TotalCount"),
          NormalizedTotal: _.sumBy(objs,"Normalized"),
          LeftTotal: _.sumBy(objs, "LeftCount"),
          RightTotal: _.sumBy(objs, "RightCount")
        }))
        .filter((obj) => obj["Category-Name"] != "Unused")
        .filter((obj) => obj["NormalizedTotal"] >= 0)
        //.filter((obj) => obj["Normalized"] >= 0)
        .value(); 
      }
      this.newgraphdata = _.map(this.graphdata, function (element) {
        return _.extend({}, element, {
          newlabel: element["Region-name"] + " (" + element["Abbrv"] + ")",
        });
      });

      this.mainregions = _.map(this.sumoutput, "Category-Name");
      this.colors = _.map(this.sumoutput, "Color");
      this.allcolors = _.map(this.newgraphdata, "Color");
      this.categorytotal = _.map(this.sumoutput, "Total");
      this.categoryleft = _.map(this.sumoutput, "LeftTotal")
      this.categoryright = _.map(this.sumoutput, "RightTotal")
      //this.maxval = _.max(this.categorytotal);
      this.slidervalue = _.max(this.categorytotal);
      this.categories = _.map(this.newgraphdata, "newlabel");
      this.leftcounts = _.map(this.newgraphdata, "LeftCount");
      this.rightcounts = _.map(this.newgraphdata, "RightCount");
      this.totalcounts = _.map(this.newgraphdata, "TotalCount");


      if (this.normBrains.includes(this.id)){
        //this.normalizedCategory = _.map(this.normalizedoutput, "NormalizedTotal");
        this.normalizedRegionCounts = _.filter(_.map(this.newgraphdata, "Normalized"), (item)=> item>=0);
        this.normalizedCategory = _.filter(_.map(this.catnormdata, "TotalCount"), (item)=> item>=0);
      }
    },
    showChart() {
      $("html, body").animate({ scrollTop: $(document).height() }, "slow");
      this.flag = true;
      if (this.category=='injured' || this.category=='cervical') {
        this.showNormalizedButton = true;
      }
      this.chartOptions2 = {
        chart: {
          stacked: this.stackedState,
        },
        tooltip: {
          intersect: true,
          shared: false,
          onDatasetHover: {
            highlightDataSeries: true,
          },
        },
        plotOptions: {
          bar: {
            horizontal: true,
            distributed: true,
          },
        },
        colors: this.colors,
        grid: {
          show: true,
          borderColor: "#90A4AE",
          strokeDashArray: 0,
          position: "back",
          xaxis: {
            lines: {
              show: false,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
          },
          row: {
            colors: undefined,
            opacity: 0.5,
          },
          column: {
            colors: undefined,
            opacity: 0.5,
          },
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },

        fill: {
          type: "solid",
          //type: "pattern",
          opacity: 1,
        },
        title: {
          text: "Raw cell count by category",
          align: "center",
          offsetY: 10,
          style: {
            fontSize: "14px",
            fontWeight: "bold",
            color: "#263238",
          },
        },
        xaxis: { categories: this.mainregions,
        tickPlacement: 'on' },
        yaxis: {
          tickAmount: 5,
          max: this.slidervalue,
          labels: { maxWidth: 270, style: { fontSize: "16px" } },
        },
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
      this.chartOptions = {
        chart: {
          stacked: false,
        },
        colors: this.allcolors,
        grid: {
          show: true,
        },
        plotOptions: {
          bar: {
            horizontal: true,
            distributed: true,
          },
        },
        fill: {
          type: "solid",
          opacity: 1,
        },
        title: {
          text: "Raw cell count by brain region",
          align: "centre",
          style: {
            fontSize: "14px",
            fontWeight: "bold",
            color: "#263238",
          },
        },
        xaxis: { categories: this.categories },
        yaxis: {
          tickAmount: 5,
          max: this.slidervalue,
          labels: { maxWidth: 350, offsetX: -10 },
        },
        legend: {
          show: false,
          position: "top",
        },
        textAnchor: "top",
        dataLabels: {
          distributed: true,
          enabled: false,
          style: {
            colors: ["black"],
            fontWeight: "normal",
            fontSize: "10px",
          },
        },
      };
      this.categoryTotal = [
        {
          name: "CategoryTotal",
          data: this.categorytotal,
        },
      ];
      this.regionTotal = [
        {
          name: "RegionTotal",
          data: this.totalcounts,
        },
      ];
      this.regionsLeftRight = [
        {
          name: "leftcounts",
          data: this.leftcounts,
        },
        {
          name: "rightcounts",
          data: this.rightcounts,
        },
      ];
      this.categoryLeftRight = [
        {
          name: "leftcounts",
          data: this.categoryleft,
        },
        {
          name: "rightcounts",
          data: this.categoryright,
        },
      ];
    },
    updateChart() {
      this.flag = true;

    },
    stackedState(){
      if (this.category=="injured"){
        return false;
      }
      else {
        return false
      }
    },
    //show left-right value
    showLeftRight(){
    },
    getCategoryData(){
      if (this.category=="injured"){
        //return this.categoryLeftRight;
        return this.categoryTotal;
      }
      else {
        return this.categoryTotal;
      }
    },
    plotNormalized(){
      this.showNormalized= true;
      this.showNormalizedButton= false;
      $("html, body").animate({ scrollTop: $(document).height() }, "slow");
      this.normchartOptions = {
          chart: {
            stacked: false,
          },
          plotOptions: {
            bar: {
              horizontal: true,
              distributed: true,
            },
          },
          colors: this.colors,
          fill: {
            type: "solid",
            //type: "pattern",
            opacity: 1,
          },
          title: {
            text: "Norm Cell count by category",
            align: "center",
            offsetY: 10,
            style: {
              fontSize: "14px",
              fontWeight: "bold",
              color: "#263238",
            },
          },
          xaxis: { categories: this.mainregions},
          yaxis: {
            tickAmount: 5,
            //max: this.maxval,
            labels: { maxWidth: 270, style: { fontSize: "16px" } },
          },
          legend: {
            show: false,
            position: "top",
          },
          dataLabels: {
            enabled: false,
          },
        };
        this.normSeries = [
          {
            name: "normCategoryCount",
            data: this.normalizedCategory,
          },
        ]
        this.normRegionChartOptions = {
          chart: {
            stacked: false,
          },
          colors: this.allcolors,
          grid: {
            show: true,
          },
          plotOptions: {
            bar: {
              horizontal: true,
              distributed: true,
            },
          },
          fill: {
            type: "solid",
            opacity: 1,
          },
          title: {
            text: "Normalized cell count by brain region",
            align: "centre",
            style: {
              fontSize: "14px",
              fontWeight: "bold",
              color: "#263238",
            },
          },
          xaxis: { categories: this.categories },
          yaxis: {
            tickAmount: 5,
            labels: { maxWidth: 350, offsetX: -10 },
          },
          textAnchor: "top",
          dataLabels: {
            enabled: false,
          },
          legend: {
            show: false,
          }
        };
        this.normRegionSeries = [
          {
            name: "normRegionCount",
            data: this.normalizedRegionCounts,
          },
        ]
    }
  },
  created() {
    this.fetchData();
  },
  watch: {
    slidervalue: function () {
      //left graph update
      this.newsumoutput = _.filter(
        this.sumoutput,
        (obj1) => obj1["Total"] <= this.slidervalue
      );
      this.newcategorytotal = _.map(this.newsumoutput, "Total");
      this.mainregions = _.map(this.newsumoutput, "Category-Name");
      this.colors = _.map(this.newsumoutput, "Color");
      this.categoryTotal = [
        {
          name: "CategoryTotal",
          data: this.newcategorytotal,
        },
      ];

      this.chartOptions2 = {
        xaxis: {
          categories: this.mainregions,
        },
        yaxis: {
          max: _.max(this.newcategorytotal),
        },
        colors: this.colors,
      };

      //right graph update
      this.updatedgraphdata = _.filter(
        this.newgraphdata,
        (obj1) => obj1["TotalCount"] <= this.slidervalue
      );
      this.categories = _.map(this.updatedgraphdata, "newlabel");
      this.totalcounts = _.map(this.updatedgraphdata, "TotalCount");
      this.allcolors = _.map(this.updatedgraphdata, "Color");

      this.regionTotal = [
        {
          name: "RegionTotal",
          data: this.totalcounts,
        },
      ];

      this.chartOptions = {
        xaxis: {
          categories: this.categories,
        },
        yaxis: {
          max: _.max(this.totalcounts),
          labels: { maxWidth: 350 },
        },
        colors: this.allcolors,
      };
    },
  },
  mounted() {
    this.filteredset = [];
    this.staticimage = true;
    this.images3 = [];
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
#myid {
  border: 1px solid;
}
</style>
