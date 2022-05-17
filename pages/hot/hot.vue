<template>
  <view class="hot-container">
    <!-- logo -->
    <image class="logo" src="@/static/images/logo.png" mode="aspectFit"></image>
    <view class="search">
      <my-search placeholderText="uniapp 自定义搜索"></my-search>
    </view>
    <view class="tab-sticky">
      <my-tabs
        :tabData="tabData"
        :defaultIndex="currentIndex"
        @tabClick="tabClick"
      ></my-tabs>
    </view>

    <!-- list-->
    <swiper
      class="swiper"
      :current="currentIndex"
      :style="{ height: currentSwiperHeight + 'px' }"
      @animationfinish="onSwiperEnd"
      @change="onSwiperChange"
    >
      <swiper-item
        class="swiper-item"
        v-for="(tabItem, tabIdx) in tabData"
        :key="tabItem.id"
      >
        <view>
          <uni-load-more status="loading" v-if="isLoading"></uni-load-more>
          <block v-else>
            <hot-list-item
              :class="'hot-list-item-' + tabIdx"
              v-for="(item, index) in tabList[tabIdx]"
              :key="item._id"
              :data="item"
              :ranking="index + 1"
            />
          </block>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import { getHotTabs, getHotList } from "@/api/hot.js";
export default {
  data() {
    return {
      tabData: [],
      currentIndex: 0,
      isLoading: true,
      // 判断列表数据加载过没有
      tabList: {},
      // 计算swiper的高度
      currentSwiperHeight: 0,
      // 因为计算高度也是一个消耗,所以缓存起来
      swiperHeightData: {},

      // 当前页面的滚动位置(现在这个问题好像已经解决了)
      currentPageScrollTop: 0,
    };
  },
  created() {
    this.getHotTabs();
  },
  methods: {
    onPageScroll({ scrollTop }) {
      this.currentPageScrollTop = scrollTop;
    },
    // 获取热门标签数据
    async getHotTabs() {
      const { data: res } = await getHotTabs();
      this.tabData = res.list;

      // 获取标签的时候顺带一起获取列表数据
      this.getHotList();
    },

    // 获取热门文章数据
    async getHotList() {
      this.isLoading = true;
      // 判断自定义数据结构中有无缓存数据
      // if (!this.tabList[this.currentIndex]) {
      // 获取列表数据
      const id = this.tabData[this.currentIndex].id;
      const { data: res } = await getHotList(id);
      // 放入数据缓存
      this.tabList[this.currentIndex] = res?.list;
      // }
      this.isLoading = false;

      // 获取完列表数据之后计算swiper的高度,是异步的所以不能用兼容性的nextTick
      setTimeout(async () => {
        this.currentSwiperHeight = await this.getCurrentSwiperHeight();
        // 高度放入缓存
        this.swiperHeightData[this.currentIndex] = this.currentSwiperHeight;
      }, 0);
    },

    // 子组件tab点击的回调
    tabClick(idx) {
      this.currentIndex = idx;
      // 切换的时候也获取列表数据
      // this.getHotList();
    },

    // swiper动画完成之后再获取数据
    onSwiperEnd() {
      if (!this.tabList[this.currentIndex]) {
        this.getHotList();
        return;
      }
      this.currentSwiperHeight = this.swiperHeightData[this.currentIndex];
    },

    // swiper切换
    onSwiperChange(e) {
      // 这个已经被优化了,不用了
      if (this.currentPageScrollTop > 130) {
        uni.pageScrollTo({ scrollTop: 130 });
      }
      this.currentIndex = e.detail.current;
    },

    // 计算当前swiper的高度
    getCurrentSwiperHeight() {
      // 操作dom是异步操作
      return new Promise((resolve, reject) => {
        let sum = 0;
        const query = uni.createSelectorQuery().in(this);
        query
          .selectAll(`.hot-list-item-${this.currentIndex}`)
          .boundingClientRect((res) => {
            // console.log(res, "??");
            res.forEach((item) => {
              sum += item.height;
            });
            resolve(sum);
          })
          .exec();
      });
    },
  },
};
</script>

<style lang="scss">
.hot-container {
  background-color: $uni-bg-color;
  .logo {
    width: 100%;
    height: 80px;
  }
  .search {
    padding: 0 16px;
    margin-bottom: $uni-spacing-col-base;
  }
  .tab-sticky {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 999;
  }
}
</style>
