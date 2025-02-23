<template>
  <div id="header">
    <!-- <div class="back" v-show="showLeft" @click="backClick"> 返回</div> -->
    <slot name="leftView"><div class="back"></div></slot>
    <slot name="titleView">
      <div class="title">{{ titleText }}</div>
    </slot>
    <slot name="rightView"><div class="right"></div></slot>
    <slot></slot>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  showLeft: Boolean,
  titleText: String
});
</script>

<style scoped lang="scss">
#header {
  display: flex;
  background: linear-gradient(to right, #6f50f5, #c26dfe);
  height: 40.5px; // 81px / 2
  width: 100%;
  color: white;
}
.back {
  width: 70px; // 140px / 2
  height: 100%;
  text-align: center;
  line-height: 40.5px; // 81px / 2
  font-size: 12.5px; // 25px / 2
}
.backImage {
  margin-left: -35px; // -70px / 2
  margin-top: 13px; // 26px / 2
  width: 7px; // 14px / 2
  height: 14px; // 28px / 2
}
.title {
  width: 235px; // 470px / 2
  height: 100%;
  text-align: center;
  font-size: 15px; // 30px / 2
  line-height: 40.5px; // 81px / 2
}
.right {
  width: 65px; // 130px / 2
  height: 100%;
  text-align: center;
  padding-right: 6px; // 12px / 2
  font-size: 15px; // 30px / 2
  line-height: 40.5px; // 81px / 2
  color: white;
}
</style>
