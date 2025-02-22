<script setup lang="ts">
import GridPattern from "./index.vue";

defineOptions({
  name: "GridPatternDashed"
});
</script>

<template>
  <div
    class="absolute -z-10 flex size-full items-center justify-center overflow-hidden bg-background  md:shadow-xl"
  >
    <GridPattern
      :width="20"
      :height="20"
      :x="-1"
      :y="-1"
      stroke-dasharray="4 2"
    />
  </div>
</template>
