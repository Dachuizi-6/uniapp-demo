<template>
  <view class="hot-container">
    <!-- logo -->
    <image class="logo" src="@/static/images/logo.png" mode="aspectFit"></image>
    <view class="search">
      <my-search placeholderText="uniapp 自定义搜索"></my-search>
    </view>
    <my-tabs :tabData="tabData" :defaultIndex="currentIndex"></my-tabs>
  </view>
</template>

<script>
import { getHotTabs } from "@/api/hot.js";
export default {
  data() {
    return {
      tabData: [],
      currentIndex: 0,
    };
  },
  created() {
    this.getHotTabs();
  },
  methods: {
    async getHotTabs() {
      const { data: res } = await getHotTabs();
      this.tabData = res.list;
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
}
</style>
