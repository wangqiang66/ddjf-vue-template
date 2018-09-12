<!--
  function: api
  author  : wq
  update  : 2018/9/5 15:42
-->
<template>
  <div>
    <div class="slider-wrap">
      <ul :style="{width: slides.length * 100 + '%'}">
        <li :key="`slide-${idx}`" v-for="(slide, idx) in slides">
          <dd>{{slide.title}}</dd>
          <img :src="slide.image" />
        </li>
      </ul>
    </div>
    <div class="list-wrap">
      <ul>
        <li class="list-item" :key="`new-li-${idx}`" v-for="(item, idx) in news">
          <template v-if="!item.lapinid">
            <img :src="item.image"/>
            <div class="news-text">
              <div class="news-title">{{item.title}}</div>
              <div class="news-info">
                <p class="news-datetime">{{item.postdate}}</p>
                <p v-if="item.commentcount">{{item.commentcount}}评</p>
              </div>
            </div>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '@/service/api'
export default {
  data () {
    return  {
      slides: [],
      news: []
    }
  },
  created () {
    api.getSlides().then(data => {
      this.slides = data
    })
    api.getNewsList().then(data => {
      this.news = data
    })
  }
}
</script>

<style lang="scss">
  .slider-wrap {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    ul {
      display: flex;
      flex-direction: row;
      li {
        position: relative;
        flex: 1;
        img {
          width: 100%;
          height: 100%;
        }

        dd {
          position: absolute;
          top: 10%;
          right: 0;
          background-color: rgba(0,0,0,0.8);
          color: #fff;
          font-size: 28px;
        }
      }
    }
  }

  .list-wrap {
    display: flex;
    flex-direction: column;
    .list-item {
      display: flex;
      flex-direction: row;
      padding: 10px 20px;
    }

    .news-text {
      display: flex;
      flex-direction: column;
      font-size: 26px;
      padding: 0 8px;
    }

    .news-title {
      flex: 1;
    }

    .news-info {
      display: flex;
      flex-direction: row;
      color: #D2D2D2
    }

    .news-datetime {
      flex: 1;
    }
  }
</style>

