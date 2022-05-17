<template>
  <view class="hot-list-item-container">
    <view class="hot-list-item-box">
      <view class="hot-list-item-left">
        <hot-list-rank :ranking="ranking" />
      </view>
      <view class="hot-list-item-right">
        <view class="item-right-title line-clamp-2">{{ data.title }}</view>
        <view class="item-right-desc line-clamp-2">{{ data.desc }}</view>
        <view class="item-bottom-box">
          <text class="item-author">{{ data.nickname }}</text>
          <view class="hot-box">
            <image class="hot-icon" src="@/static/images/hot-icon.png" />
            <text class="hot-text">{{ data.views | hotNum }} 热度</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "hot-list-item",
  props: {
    data: {
      type: Object,
      required: true,
    },
    ranking: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.hot-list-item-container {
  padding-bottom: $uni-spacing-col-lg;
  .hot-list-item-box {
    display: flex;
    margin: 0 $uni-spacing-row-base;
    padding: $uni-spacing-col-lg $uni-spacing-row-base;
    background-color: $uni-bg-color;
    border-radius: $uni-border-radius-lg;
    box-shadow: 2px 2px 5px 1px rgba(143, 143, 143, 0.1);
    .hot-list-item-left {
      margin-right: $uni-spacing-row-sm;
    }
    .hot-list-item-right {
      width: 100%;
      .item-right-title {
        font-size: $uni-font-size-lg;
        color: $uni-text-color-title;
        font-weight: bold;
      }
      .item-right-desc {
        font-size: $uni-font-size-base;
        color: $uni-text-color;
        padding-top: $uni-spacing-col-sm;
      }
      .item-bottom-box {
        display: flex;
        justify-content: space-between;
        margin-top: $uni-spacing-col-sm;
        .item-author {
          font-size: $uni-font-size-sm;
          color: $uni-text-color-grey;
        }
        .hot-box {
          .hot-icon {
            width: $uni-img-size-sm;
            height: $uni-img-size-sm;
            vertical-align: top;
          }
          .hot-text {
            color: $uni-text-color-hot;
            font-size: $uni-font-size-sm;
            margin-left: $uni-spacing-row-sm;
          }
        }
      }
    }
  }
}
</style>
