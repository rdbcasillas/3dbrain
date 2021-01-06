<template>
<div>
  <b-navbar type="dark" variant="primary" class="navitems">
    <b-navbar-nav>
      <b-nav-item href="/">Home</b-nav-item>
      <b-nav-item :to="{name: 'selecttype'}">Brains</b-nav-item>
      <b-nav-item :to="{name: 'methods'}">Methods</b-nav-item>
      <b-nav-item :to="{name: 'software'}">Software</b-nav-item>
      <b-nav-item href="#">Contact</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</div>
</template>

<script>
  export default {
    name: 'Header2',
    data: function(){
      return {
          links: [
              {
                  name: 'Home',
                  route: 'cervical',
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
              {
                  name: 'Injured Animals',
                  route: 'injured',
                  state: false
              },

          ]
      }
    }
  }
</script>

<style scoped>
.navitems {
  color: white;
  font-weight: bold;
  font-size: 22px;
}
.nav-link {
    color: white !important;
}
</style>