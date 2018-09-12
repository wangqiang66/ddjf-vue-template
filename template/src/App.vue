{{#mpvue}}
<script>
export default {
  mpType: 'app'
}
</script>

<style>
  .container {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    box-sizing: border-box;
  }
</style>
{{/mpvue}}
{{#if_not mpvue}}
<template>
  <div id="app">
    {{#router}}
    <router-view/>
    {{else}}
    <HelloWorld/>
    {{/router}}
  </div>
</template>

<script>
{{#unless router}}
import HelloWorld from './components/HelloWorld'

{{/unless}}
export default {
  name: 'App'{{#router}}{{else}},
  components: {
    HelloWorld
  }{{/router}}
}
</script>

<style  lang="scss">
@import url('@ddjf/weui');
@import url('@ddjf/mpweui/style/weui.web.scss');
@import './assets/styles/reset.scss';
@import './assets/styles/common.scss';
#app {
  font-family: '微软雅黑', '黑体','宋体', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body{
  font-size: $font-size;
}
</style>
{{/if_not}}
