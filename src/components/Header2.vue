<template>
<div>
  <b-navbar type="dark" variant="dark">
    <b-navbar-nav>
      <b-nav-item href="/">Home</b-nav-item>
      <b-nav-item :to="{name: 'selecttype'}">Brains</b-nav-item>
      <b-nav-item href="#">Methods</b-nav-item>
      <!-- Navbar dropdowns -->
      <b-nav-item-dropdown text="Help" right>
        <b-dropdown-item href="#">Software</b-dropdown-item>
        <b-dropdown-item href="#">FAQ</b-dropdown-item>
      </b-nav-item-dropdown>
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