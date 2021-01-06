<template>
<div>
    <!-- <div class="left">
     <h2>Your description</h2>
     <p>
       Brains were registered to the Allen Brain reference atlas using amap. 
       We used the background set of images for registration with following parameters: 
       <br>
       <code>
         amap /path/to/raw/data /path/to/output/directory -x 10 -y 10 -z 10
       </code>
     </p>
    </div> -->
    <b-container>
      <b-row>
        <b-col>
          <get-markdown src="../test.md"></get-markdown>
        </b-col>
      </b-row>
    </b-container>
</div>
</template>

<script>
import GetMarkdown from './GetMarkdownFile.vue'

  export default {
   components: {
    GetMarkdown,
   } 
  }
</script>

<style lang="css" scoped>
.left {
  float: left;
}
</style>