<template>
  <view class="my-search-container">
    <view class="my-search">
      <image class="icon" src="@/static/images/search.png" mode=""></image>
      <text class="placeholder">{{ placeholderText }}</text>
    </view>
  </view>
</template>

<script>
export default {
  name: "my-search",
  props: {
    placeholderText: {
      type: String,
      default: "搜索",
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.my-search-container {
  display: flex;
  align-items: center;
  background-color: $uni-bg-color;
  .my-search {
    display: flex;
    align-items: center;
    width: 100%;
    height: 36px;
    border: 1px solid $uni-border-color;
    border-radius: 15px;
    padding: 0 $uni-spacing-row-base;
    .icon {
      width: $uni-img-size-sm;
      height: $uni-img-size-sm;
    }
    .placeholder {
      color: $uni-text-color-placeholder;
      font-size: $uni-font-size-sm;
      margin-left: $uni-spacing-row-sm;
    }
  }
}
</style>
