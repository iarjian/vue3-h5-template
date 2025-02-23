import { defineMock } from "vite-plugin-mock-dev-server";
import Mock from "mockjs";
import seatLove from "./seatLove.json";

export default defineMock([
  {
    url: "/dev-api/list/get",
    delay: 1000,
    body: {
      code: 0,
      message: "OK",
      result: Mock.mock({
        "list|10": [
          {
            "id|+1": 1
          }
        ]
      })
    }
  },
  {
    url: "/dev-api/list/error",
    delay: 1000,
    body: {
      code: 1,
      message: "ERROR",
      result: null
    }
  },
  // 电影数据mock
  {
    url: "/dev-api/list/seat/get",
    delay: 1000,
    body: {
      code: 0,
      message: "OK",
      result: seatLove
    }
  }
]);
