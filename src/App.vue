<script>
import { store } from './store';
//import axios from 'axios';

export default {
  components: {

  },
  data() {
    return {
      store
    }
  }
}
</script>

<template>
  <main>
    <router-view></router-view>
  </main>
</template>

<style lang="scss" scoped>
@import './styles/general.scss';

</style>
