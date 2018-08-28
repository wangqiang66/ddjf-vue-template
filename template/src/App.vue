<template>
  <div id="app">
    <header-nav></header-nav>
    <div>
      <left-image-main></left-image-main>
      <right-record-main></right-record-main>
    </div>
  </div>
</template>

<script>
import HeaderNav from '@/views/headerNav'
import LeftPreviewMain from '@/views/leftPreviewMain'
import RightRecordMain from '@/views/rightRecordMain'

export default {
  name: 'App',
  components: {
    HeaderNav,
    LeftPreviewMain,
    RightRecordMain
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
