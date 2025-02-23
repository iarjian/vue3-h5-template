<template>
  <div
    class="seat-item"
    :style="{
      height: size + 'px',
      width: size + 'px',
      top: seatItem.gRow * size + 'px',
      left: seatItem.gCol * size + 'px'
    }"
  >
    <img class="seatImgClass" :seatId="seatItem.id" :src="seatItem.nowIcon" />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    seatItem: any;
    size?: number;
  }>(),
  {
    seatItem: {},
    size: 5
  }
);
</script>

<style scoped lang="scss">
.seat-item {
  position: absolute;
  .seatImgClass {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
  }
}
</style>
