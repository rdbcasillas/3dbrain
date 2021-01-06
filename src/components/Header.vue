<template>
  <div>
       <b-navbar type="dark" variant="dark" class="mynavbar"  style="margin-top:-45px">
            <b-navbar-nav class="mx-auto ml-auto">
                <b-nav-item class="current" v-for="link in links" 
                :to="{name: link.route, 
                params: {type: link.route}}"
                :key="link.name"
                :active="link.state">
                    {{ link.name }}
                </b-nav-item>
            </b-navbar-nav>
       </b-navbar>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    data: function(){
      return {
          links: [
              {
                  name: 'Cervical Lumbar',
                  route: 'cervical',
                  state: false
              },
              {
                  name: 'Injured Animals',
                  route: 'injured',
                  state: false
              },
              {
                  name: 'Lumbar Injection',
                  route: 'lumbar',
                  state: false
              },
              {
                  name: 'Thoracic Injection',
                  route: 'thoracic',
                  state: false
              },
          ]
      }
    }
  }
</script>

<style scoped>
</style>