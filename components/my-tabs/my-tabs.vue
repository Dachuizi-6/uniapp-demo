<template>
  <view class="my-tabs-container">
    <view class="tab-box">
      <scroll-view
        class="scroll-view"
        scroll-x
        scroll-with-animation
        :scroll-left="scrollLeft"
      >
        <view class="scroll-content">
          <view class="tab-item-box">
            <block v-for="(item, index) in tabData" :key="item.id">
              <view
                :id="'_tab_' + index"
                class="tab-item"
                :class="{ 'tab-item-active': activeIdx === index }"
                :style="{
                  color:
                    activeIdx === index
                      ? defaultConfig.activeTextColor
                      : textColor,
                }"
                @click="tabClick(index)"
              >
                {{ item.label || item }}
              </view>
            </block>
            <view
              class="underline"
              :style="{
                transform: 'translateX(' + slider.left + 'px)',
                width: defaultConfig.underLineWidth + 'px',
                height: defaultConfig.underLineHeight + 'px',
                background: defaultConfig.underLineColor,
              }"
            ></view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  name: "my-tabs",
  props: {
    tabData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    config: {
      type: Object,
      default: () => {
        return {};
      },
    },
    defaultIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      activeIdx: -1,
      tabList: [],
      slider: {
        left: 0,
      },
      scrollLeft: "20",
      defaultConfig: {
        textColor: "#333333",
        activeTextColor: "#f94d2a",
        underLineWidth: 24,
        underLineHeight: 2,
        underLineColor: "#f94d2a",
      },
    };
  },
  watch: {
    // 监听外部传递的样式配置,一般采用默认的就行了
    config: {
      handler(val) {
        this.defaultConfig = { ...this.defaultConfig, ...val };
      },
      immediate: true,
    },
    // 组件外部更改index
    defaultIndex: {
      handler(val) {
        this.activeIdx = val;

        // swiper滑动改变滑块的位置
        this.tabToWhere();
      },
      immediate: true,
    },
    tabData: {
      handler(val) {
        this.tabList = val;
        // 等到dom渲染完毕之后,在计算宽度
        // this.$nextTick()有兼容性问题
        setTimeout(() => {
          this.updateTabWidth();
        }, 0);
      },
      immediate: true,
    },
  },
  methods: {
    // 点击tab
    tabClick(idx) {
      // 组件内部更改index
      this.activeIdx = idx;
      // 更新滑块的滑动距离
      this.tabToWhere();
      // 发送通知
      this.$emit("tabClick", idx);
    },

    // 数据进来初始化tab的宽度
    updateTabWidth() {
      let data = this.tabList;
      if (data.length === 0) return;

      const dom = uni.createSelectorQuery().in(this);
      data.forEach((item, index) => {
        dom
          .select("#_tab_" + index)
          .boundingClientRect((res) => {
            // console.log(res);
            // 这里的res就是dom节点,包含了节点本身的宽高,四个方位的信息
            item._slide = {
              left:
                res.left + (res.width - this.defaultConfig.underLineWidth) / 2,
            };
            // 运算完成之后计算一次滑动距离
            if (data.length - 1 === index) {
              this.tabToWhere();
            }
          })
          .exec();
      });
    },

    // tab需要滑动的距离
    tabToWhere() {
      if (this.tabList.length === 0) return;
      // 当前选中项
      const currentIdx = this.activeIdx;
      // 滑块的宽度
      const undeLineWidth = this.defaultConfig.underLineWidth;

      this.slider = {
        left: this.tabList[currentIdx]._slide.left,
      };
      // 滚动scroll-view
      this.scrollLeft = currentIdx * undeLineWidth;
    },
  },
};
</script>

<style lang="scss">
.my-tabs-container {
  font-size: $uni-font-size-base;
  background-color: $uni-bg-color;
  height: 45px;
  line-height: 45px;
  .tab-box {
    width: 100%;
    height: 45px;
    position: relative;
    .scroll-view {
      width: 100%;
      height: 100%;
      white-space: nowrap;
      box-sizing: border-box;
      .scroll-content {
        width: 100%;
        height: 100%;
        position: relative;
        .tab-item-box {
          height: 100%;
          .tab-item {
            height: 100%;
            display: inline-block;
            text-align: center;
            padding: 0 15px;
            color: $uni-text-color;
            &-active {
              color: $uni-text-color-hot;
              font-weight: bold;
            }
          }
          .underline {
            width: 24px;
            height: 2px;
            background-color: #f94d2a;
            border-radius: 3px;
            position: absolute;
            bottom: 0;
            transition: 0.5s;
          }
        }
      }
    }
  }
}
</style>
