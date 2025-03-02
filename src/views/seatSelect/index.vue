<template>
  <div class="wapper">
    <seat-area ref="seatAreaRef">
      <!--以下为座位图具名插槽 开始-->
      <!-- :style="{
          width: seatBoxWidth + 'px',
          height: seatBoxHeight + 'px',
          transform: 'scale(' + seatScale + ')',
          marginLeft: size + 'px'
        }" -->
      <div
        class="seatBox"
        :style="{
          width: seatBoxWidth + 'px',
          height: seatBoxHeight + 'px',
          transform: 'scale(' + seatScale + ')'
          // marginLeft: size + 'px'
        }"
      >
        <template
          v-for="seatItem in seatList"
          :key="seatItem.x + '' + seatItem.y"
        >
          <SeatItem :seatItem="seatItem" :size="size"> </SeatItem>
        </template>
      </div>

      <!--以上为座位图具名插槽 结束-->
    </seat-area>
    <div>阿斯蒂芬</div>
  </div>
</template>

<script setup lang="ts">
import { getSeatListApi } from "@/api/mock";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import SeatArea from "./components/SeatArea.vue";
import SeatItem from "./components/SeatItem.vue";
import { computed } from "vue";

const seatList = ref<any[]>([]); // 座位对象list
const seatTypeList = ref<any[]>([]); // 座位类型list
const movieName = ref<string>(""); // 展示用 电影名称 接口获取
const hallName = ref<string>(""); // 展示用 影厅名称 接口获取
const showDate = ref<string>(""); // 展示用 开始日期 接口获取
const showTime = ref<string>(""); // 展示用 开始时间 接口获取

// 取最大横坐标
const xMax = computed(() => {
  let i = 0;
  for (let index in seatList.value) {
    if (seatList.value[index].x > i) {
      i = seatList.value[index].x;
    }
  }
  return i;
});

// 取最大纵坐标
const yMax = computed(() => {
  let i = 0;
  for (let index in seatList.value) {
    if (seatList.value[index].y > i) {
      i = seatList.value[index].y;
    }
  }
  return i;
});

//动态获取seatBox的宽高
const seatAreaRef = ref<any>(null);
const seatAreaWidthRem = ref<number>(0);
const seatAreaHeightRem = ref<number>(0);

const size = computed(() => {
  return Math.min(
    seatAreaWidthRem.value / (xMax.value + 2),
    seatAreaHeightRem.value / (yMax.value + 2)
  );
});

onMounted(() => {
  seatAreaWidthRem.value = seatAreaRef.value.$el.offsetWidth;
  seatAreaHeightRem.value = seatAreaRef.value.$el.offsetHeight;
  window.addEventListener("resize", () => {
    seatAreaWidthRem.value = seatAreaRef.value.$el.offsetWidth;
    seatAreaHeightRem.value = seatAreaRef.value.$el.offsetHeight;
  });
});

const seatBoxWidth = computed(() => {
  return size.value * (xMax.value + 2);
});

const seatBoxHeight = computed(() => {
  return size.value * (yMax.value + 2);
});

const seatScale = computed(() => {
  return 1;
  // return Math.max(seatBoxWidth, seatBoxHeight);
});

const router = useRouter();
async function getSeatList() {
  const response: any = await getSeatListApi();

  //座位返回
  if (response.errorCode !== 0) {
    router.go(-1);
  }

  let resSeatList = response.seatList;
  // 座位处理 -------开始
  if (!resSeatList) {
    return;
  }
  resSeatList.forEach(element => {
    // 加载座位的图标
    for (const item of response.seatTypeList) {
      // 加载每个座位的初始图标defautIcon 和 当前图标 nowIcon
      if (element.type + "" === item.type) {
        element.nowIcon = item.icon;
        element.defautIcon = item.icon;
      }
      // // 根据首字母找到对应的被选中图标
      // if (firstNumber + "-1" === item.type) {
      //   element.selectedIcon = item.icon;
      // }
      // // 根据首字母找到对应的被选中图标
      // if (firstNumber + "-2" === item.type) {
      //   element.soldedIcon = item.icon;
      // }
      // // 根据首字母找到对应的被选中图标
      // if (firstNumber + "-3" === item.type) {
      //   element.fixIcon = item.icon;
      // }
    }
    // 如果座位是已经售出 和 维修座位 加入属性canClick 判断座位是否可以点击
    if (
      element.defautIcon === element.soldedIcon ||
      element.defautIcon === element.fixIcon
    ) {
      element.canClick = false;
    } else {
      element.canClick = true;
    }
  });
  // 座位处理 -------结束

  // 开始处理上方影片信息显示数据
  let temp = response.showTime;
  if (temp.length === 19) {
    showDate.value = temp.substring(0, 10) + "(" + temp.substring(11, 13) + ")";
    showTime.value = temp.substring(14, 19);
  }
  seatList.value = resSeatList;
  seatTypeList.value = response.seatTypeList;
  movieName.value = response.movieName;
  hallName.value = response.name;
}

getSeatList();
</script>

<style scoped lang="scss">
.wapper {
  .seatBox {
    position: relative;
    // left: 50%;
    // transform-origin: 0rem 0rem 0rem;
    .middle-line {
      position: absolute;
      border-right: 0.05rem rgba(0, 0, 0, 0.2) dashed;
    }
  }
}
</style>
