<script setup lang="ts">
import DotPattern from "./index.vue";

defineOptions({
  name: "DotPatternLinearGradient"
});
</script>

<template>
  <div
    class="absolute flex size-full items-center justify-center overflow-hidden h-[300px] w-[300px] md:w-[600px] lg:w-[850px]"
  >
    <DotPattern :width="18" :height="18" :cx="1" :cy="1" :cr="1" />
  </div>
</template>
