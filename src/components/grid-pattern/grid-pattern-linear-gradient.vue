<script setup lang="ts">
import GridPattern from "./index.vue";

defineOptions({
  name: "GridPatternLinearGradient"
});
</script>

<template>
  <div
    class="absolute flex size-full items-center justify-center overflow-hidden bg-background p-20 md:shadow-xl"
  >
    <GridPattern
      :width="18"
      :height="18"
      :x="-1"
      :y="-1"
    />
  </div>
</template>
