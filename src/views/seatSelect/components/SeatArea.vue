<template>
  <div class="activity-area">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.activity-area {
  width: 100%;
  height: 300px;
  position: relative;
  background: #f3f4f6;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
