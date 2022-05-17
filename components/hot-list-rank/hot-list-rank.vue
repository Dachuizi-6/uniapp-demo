<template>
  <view class="hot-list-rank-container">
    <image class="hot-list-rank-bg" :src="getRankBg" />
    <text class="hot-list-rank-text" :class="{ 'text-white': ranking <= 3 }">{{
      ranking
    }}</text>
  </view>
</template>

<script>
export default {
  name: "hot-list-rank",
  props: {
    ranking: {
      type: Number,
      required: true,
    },
  },
  computed: {
    getRankBg() {
      if (this.ranking <= 3) {
        return require(`@/static/images/ranking-${this.ranking}.png`);
      } else {
        return require(`@/static/images/ranking-other.png`);
      }
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.hot-list-rank-container {
  position: relative;
  width: 20px;
  height: 18px;
  text-align: center;
  .hot-list-rank-bg {
    width: 100%;
    height: 100%;
  }
  .hot-list-rank-text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-55%, -55%);
    font-size: $uni-font-size-sm;
    color: $uni-text-color;
    font-weight: bold;
  }
  .text-white {
    color: white;
  }
}
</style>
