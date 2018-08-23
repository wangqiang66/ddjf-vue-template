<!--
  function: search.vue
  author  : wq
  update  : 2018/8/2 14:25
-->
<template>
  <div class="scroll-view-box" ref="scroll-view-box"><div class="scroll-view-wrap" :class="isMove?'':'scroll-transition-short'"
         :style="{transform: `translateY(${translateY}px)`}" ref="scroll-view-wrap"
         @touchstart="doTouchStart" @mousedown="doTouchStart"
         @touchmove="doTouchMove" @mousemove="doTouchMove"
         @touchend="doTouchEnd" @mouseup="doTouchEnd">
      <div class="refresh-wrap base-wrap" v-if="refresh" ref="scroll-refresh">
        <i :class="refreshClass"></i>
        <span>{{refreshText}}</span>
      </div>
      <div class="content-wrap">
        <slot></slot>
      </div>
      <div class="load-more-wrap base-wrap" ref="scroll-load-more" v-if="loadmore">
        <i :class="loadmoreClass"></i>
        <span>{{loadingText}}</span>
      </div>
    </div>
  </div>
</template>

<script>

  function throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function () {
      previous = options.leading === false ? 0 : new Date().getTime();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function () {
      var now = new Date().getTime();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  }

  export default {
    name: "search",
    props: {
      refresh: {
        type: Boolean,
        default: false
      },
      loadmore: {
        type: Boolean,
        default: false
      }
    },
    /** refreshStatus: 0 处理状态 1 露出下拉刷新 2 长度超过下拉刷新 3 释放 4  释放至下拉刷新 5 释放完 **/
    /** loadingStatus: 0 处理状态 1 露出上拉加载 2 长度超过上拉加载 3 释放 4  释放至上拉加载 5 释放完 **/
    data() {
      return {
        refreshText: "下拉刷新",
        loadingText: "加载更多数据...",
        refreshStatus: 0,
        loadingStatus: 0,
        refreshClass: "arrow arrow-up",
        loadmoreClass: "arrow arrow-down",
        isMove: false,
        pageY: 0,
        touchMoving: false,
        loading: false,
        translateY: 0,
        refreshHeight: 0,
        offsetHeight: 0
      }
    },
    mounted() {
      this.refreshHeight = this.refresh ? this.$refs['scroll-refresh'].offsetHeight : 0;
      this.loadMoreHeight = this.loadmore ? this.$refs['scroll-load-more'].offsetHeight : 0;
      this.offsetHeight = this.$refs['scroll-view-wrap'].offsetHeight;
      const $wrap = this.$refs['scroll-view-box'];
      $wrap.style.height = $wrap.parentElement.offsetHeight + "px";
      this.wrapHeight = this.$refs['scroll-view-box'].offsetHeight;
    },
    // 数据更新的时候需要重新获取内容区域的高度
    updated() {
      this.offsetHeight = this.$refs['scroll-view-wrap'].offsetHeight;
      this.wrapHeight = this.$refs['scroll-view-box'].offsetHeight;
    },
    methods: {
      doTouchStart(e) {
        // e.preventDefault();
        this.touchMoving = false;
        if (this.loading) {
          return false;
        }
        let pageY;
        try {
          pageY = e.touches[0].pageY
        } catch (ex) {
          pageY = e.pageY
        }
        this.refreshStatus = 0;

        this.isMove = true;
        this.pageY = pageY;
      },
      doTouchMove: throttle(function (e) {
        if (!this.isMove) {
          return false;
        }
        let pageY, startY = this.pageY;
        try {
          pageY = e.touches[0].pageY
        } catch (ex) {
          pageY = e.pageY
        }
        const diff = this.translateY = this.translateY + pageY - startY;
        this.pageY = pageY;
        if (diff > 10) {
          this.touchMoving = true;
        }
        // 滑动一定高度
        if (this.refresh) {
          if (diff > this.refreshHeight) {
            this.refreshText = "释放刷新";
            this.refreshStatus = 2;
            this.refreshClass = 'arrow arrow-down';
          } else if (diff > 0) {
            this.refreshText = "下拉刷新";
            this.refreshStatus = 1;
            this.refreshClass = 'arrow arrow-up';
          }
        }
        if (this.loadmore) {
          if (diff < this.wrapHeight - this.offsetHeight - this.loadMoreHeight) {
            this.loadingText = "释放加载更多";
            this.loadingStatus = 2;
            this.loadmoreClass = 'arrow arrow-up';
          } else if (diff < this.wrapHeight - this.offsetHeight) {
            this.loadingText = "上拉加载更多";
            this.loadingStatus = 1;
            this.loadmoreClass = 'arrow arrow-down';
          }
        }
      }, 30),
      doTouchEnd(e) {
        if (this.touchMoving) {
          e.preventDefault();
        }
        this.isMove = false;
        const translateY = this.translateY;
        if (this.refresh) {
          if (translateY > this.refreshHeight) {
            this.refreshStatus = 1;
            this.translateY = this.refreshHeight;
            this.loading = true;
            this.refreshStatus=3;
            this.refreshClass = 'loading';
            this.$emit("pullDown", (bool) => {
              if (bool) {
                this.refreshText = "刷新成功";
              } else {
                this.refreshText = "刷新失败";
              }
              this.refreshStatus=4;
              this.translateY = 0;
              this.loading = false;
            });
          } else if (translateY > 0){
            this.refreshStatus = 1;
            this.translateY = 0;
          }
        } else if (translateY > 0) {
          this.translateY = 0;
        }

        if (this.loadmore) {
          if (translateY < this.wrapHeight - this.offsetHeight - this.refreshHeight) {
            this.translateY = this.wrapHeight - this.offsetHeight - this.refreshHeight;
            this.loading = true;
            this.loadingStatus=3;
            this.loadmoreClass = 'loading';
            this.$emit("pullUp", (bool) => {
              if (bool) {
                this.loadingStatus=4;
                this.refreshText = "加载成功";
              } else {
                this.refreshText = "加载失败";
              }
              this.translateY = this.wrapHeight - this.offsetHeight;
              this.loading = false;
            });
          } else if (translateY < this.wrapHeight - this.offsetHeight) {
            this.translateY = this.wrapHeight - this.offsetHeight;
          }
        } else if (translateY < this.wrapHeight - this.offsetHeight) {
          this.translateY = this.wrapHeight - this.offsetHeight;
        }
      }
    }
  }
</script>

<style lang="scss">
  $fresh_height: 40;
  $arrow_color: #333;
  $indicator_color: #f2f2f2;
  $loading_color: #333;

  .scroll-view-box {
    flex: 1;
    height: 400px;
    overflow: hidden;
    .scroll-view-wrap {
      position: relative;
      display: block;
      width: 100%;
      min-height: 100%;
      .base-wrap {
        position: absolute;
        background-color: $indicator_color;
        width: 100%;
        height: $fresh_height + px;
        display: flex;
        color: $arrow_color;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
      .refresh-wrap {
        top: -$fresh_height + px;
      }

      .load-more-wrap {
        bottom: -$fresh_height + px;
      }

      .content-wrap {
        width: 100%;
      }
    }

    .scroll-transition-short {
      transition: transform 0.8s ease-in-out;
    }

    .scroll-transition-over {
      transition: transform 1.2s ease-in-out;
    }

    .arrow {
      width: 4px;
      margin: 2px 10px 0 8px;
      height: 14px;
      background-color: $arrow_color;
    }
    .arrow:before {
      content: "";
      display: block;
      margin-left: -4px;
      margin-top: -2px;
      border-width: 0 6px 6px 6px;
      border-style: solid;
      border-color: transparent transparent $arrow_color transparent;
      transition: transform 0.8s;
    }

    .loading {
      display: flex;
      width: $fresh_height + px;
      height: $fresh_height + px;
      align-items: center;
      justify-content: center;
      overflow: visible;
    }

    .loading:before {
      content: "";
      display: block;
      font-size: 12px;
      width: 0.25em;
      height: 0.25em;
      left: 0;
      top: 0;
      border-radius: 50%;
      position: relative;
      text-indent: -9999em;
      animation: loadings 1.1s infinite ease;
    }

    .arrow.arrow-up {
      transform: rotate(0deg);
    }

    .arrow.arrow-down {
      transform: rotate(180deg);
    }
  }

  @function switchRgb($num1, $num2) {
    $chars: (
      '0': 0,
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
      '7': 7,
      '8': 8,
      '9': 9,
      a: 10,
      A: 10,
      b: 11,
      B: 11,
      c: 12,
      C: 12,
      d: 13,
      D: 13,
      e: 14,
      E: 14,
      f: 15,
      F: 15
    );
    @return map-get($chars,$num1) * 16 + map-get($chars,$num2);
  }
  @function getColorOpacity($opacity:1, $color: $loading_color) {
    $tmp: "";
    $tmp_color: $color + "";
    @if str-length($tmp_color) == 4 {
      $num1: str-slice($tmp_color, 2, 2);
      $num2: str-slice($tmp_color, 3, 3);
      $num3: str-slice($tmp_color, 4, 4);
      $tmp: rgba + '(' + (switchRgb($num1, $num1) + ',' + switchRgb($num2, $num2) + ',' + switchRgb($num3, $num3) + ',' + $opacity) + ')';
    }
    @else if str-length($tmp_color) == 7 {
      $num1: str-slice($tmp_color, 2, 2);
      $num2: str-slice($tmp_color, 3, 3);
      $num3: str-slice($tmp_color, 4, 4);
      $num4: str-slice($tmp_color, 5, 5);
      $num5: str-slice($tmp_color, 6, 6);
      $num6: str-slice($tmp_color, 7, 7);
      $tmp: rgba + '(' + (switchRgb($num1, $num2) + ',' + switchRgb($num3, $num4) + ',' + switchRgb($num5, $num6) + ',' + $opacity) + ')';
    }
    @return $tmp;
  }

  @keyframes loadings {
    0%,
    100% {
      box-shadow: 0em -0.7em 0em 0em getColorOpacity(1), 0.5em -0.5em 0 0em getColorOpacity(0.2), 0.7em 0em 0 0em getColorOpacity(0.2), 0.5em 0.5em 0 0em getColorOpacity(0.2), 0em 0.7em 0 0em getColorOpacity(0.2), -0.5em 0.5em 0 0em getColorOpacity(0.2), -0.7em 0em 0 0em getColorOpacity(0.5), -0.5em -0.5em 0 0em getColorOpacity(0.7);
    }
    11.25% {
      box-shadow: 0em -0.7em 0em 0em getColorOpacity(0.7), 0.5em -0.5em 0 0em getColorOpacity(1), 0.7em 0em 0 0em getColorOpacity(0.2), 0.5em 0.5em 0 0em getColorOpacity(0.2), 0em 0.7em 0 0em getColorOpacity(0.2), -0.5em 0.5em 0 0em getColorOpacity(0.2), -0.7em 0em 0 0em getColorOpacity(0.2), -0.5em -0.5em 0 0em getColorOpacity(0.5);
    }
    25% {
      box-shadow: 0em -0.7em 0em 0em getColorOpacity(0.5), 0.5em -0.5em 0 0em getColorOpacity(0.7), 0.7em 0em 0 0em getColorOpacity(1), 0.5em 0.5em 0 0em getColorOpacity(0.2), 0em 0.7em 0 0em getColorOpacity(0.2), -0.5em 0.5em 0 0em getColorOpacity(0.2), -0.7em 0em 0 0em getColorOpacity(0.2), -0.5em -0.5em 0 0em getColorOpacity(0.2);
    }
    37.5% {
      box-shadow: 0em -0.7em 0em 0em getColorOpacity(0.2), 0.5em -0.5em 0 0em getColorOpacity(0.5), 0.7em 0em 0 0em getColorOpacity(0.7), 0.5em 0.5em 0 0em getColorOpacity(1), 0em 0.7em 0 0em getColorOpacity(0.2), -0.5em 0.5em 0 0em getColorOpacity(0.2), -0.7em 0em 0 0em getColorOpacity(0.2), -0.5em -0.5em 0 0em getColorOpacity(0.2);
    }
    50% {
      box-shadow: 0em -0.7em 0em 0em getColorOpacity(0.2), 0.5em -0.5em 0 0em getColorOpacity(0.2), 0.7em 0em 0 0em getColorOpacity(0.5), 0.5em 0.5em 0 0em getColorOpacity(0.7), 0em 0.7em 0 0em getColorOpacity(1), -0.5em 0.5em 0 0em getColorOpacity(0.2), -0.7em 0em 0 0em getColorOpacity(0.2), -0.5em -0.5em 0 0em getColorOpacity(0.2);
    }
    61.25% {
      box-shadow: 0em -0.7em 0em 0em getColorOpacity(0.2), 0.5em -0.5em 0 0em getColorOpacity(0.2), 0.7em 0em 0 0em getColorOpacity(0.2), 0.5em 0.5em 0 0em getColorOpacity(0.5), 0em 0.7em 0 0em getColorOpacity(0.7), -0.5em 0.5em 0 0em getColorOpacity(1), -0.7em 0em 0 0em getColorOpacity(0.2), -0.5em -0.5em 0 0em getColorOpacity(0.2);
    }
    75% {
      box-shadow: 0em -0.7em 0em 0em getColorOpacity(0.2), 0.5em -0.5em 0 0em getColorOpacity(0.2), 0.7em 0em 0 0em getColorOpacity(0.2), 0.5em 0.5em 0 0em getColorOpacity(0.2), 0em 0.7em 0 0em getColorOpacity(0.5), -0.5em 0.5em 0 0em getColorOpacity(0.7), -0.7em 0em 0 0em getColorOpacity(1), -0.5em -0.5em 0 0em getColorOpacity(0.2);
    }
    87.5% {
      box-shadow: 0em -0.7em 0em 0em getColorOpacity(0.2), 0.5em -0.5em 0 0em getColorOpacity(0.2), 0.7em 0em 0 0em getColorOpacity(0.2), 0.5em 0.5em 0 0em getColorOpacity(0.2), 0em 0.7em 0 0em getColorOpacity(0.2), -0.5em 0.5em 0 0em getColorOpacity(0.5), -0.7em 0em 0 0em getColorOpacity(0.7), -0.5em -0.5em 0 0em getColorOpacity(1);
    }
  }

</style>
