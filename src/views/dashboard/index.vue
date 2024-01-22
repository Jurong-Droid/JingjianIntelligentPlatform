<!--suppress ALL -->
<template>
  <div
    v-if="this.$route.path == '/dashboard'"
    style="
      background-color: transparent;
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 1;
      overflow: hidden;
    "
  >
    <div class="wrap">
      <el-container style="margin-top: 4%">
        <!-- <el-header style="height: 10px">
          <span class="header-wrap"></span>
        </el-header> -->
        <el-container>
          <el-aside style="width: 25%">
            <el-card
              :body-style="{ padding: '5px', height: '100%', width: '100%' }"
              class="box-card slidleft_01"
              id="demo"
            >
              <i class="top"></i>
              <i class="bottom"></i>
              <div slot="header" class="clearfix">
                <span class="title_style"> 报警分类统计 </span
                ><!--违规分布-->
              </div>
              <div id="echart2" style="height: 80%; width: 100%"></div>
            </el-card>
            <el-card
              :body-style="{ padding: '5px' }"
              class="box-card slidleft_02"
            >
              <i class="top"></i>
              <i class="bottom"></i>
              <div slot="header" class="clearfix">
                <span class="title_style">设备在线情况</span>
              </div>
              <!--<div id="echart3" style="height:200px"></div>-->
              <div v-for="(item, index) in moduleRunStatus" :key="index">
                <div class="pie-bar">
                  <div
                    :id="'pieBar' + index"
                    style="height: 200px; margin-left: 3%; padding-top: 5%"
                    class="echartpie"
                    @click="gocamera"
                  ></div>
                  <span
                    style="
                      color: #00dcfd;
                      font-family: HuXiaoBoNanShenTi-2-Regular;
                      font-size: 20px;
                      width: 100%;
                      text-align: center;
                      position: absolute;
                    "
                    >{{ item.areaName }}<br />{{ item.runNum }}/{{
                      item.sum
                    }}</span
                  >
                </div>
              </div>
            </el-card>

            <el-card
              :body-style="{ padding: '5px', height: '600px' }"
              class="box-card slidleft_03"
              style="width: 100%; text-align: left; overflow: hidden"
              id="card"
            >
              <i class="top"></i>
              <i class="bottom"></i>
              <div slot="header" class="clearfix">
                <span class="title_style">实时报警信息</span>
              </div>
              <template>
                <!--{{item.areaName+'————'+item.expInfo}}-->
                <!--<el-alert :title="item.areaName+'————'+item.expInfo" type="info" class="background_color"  style=" color: #ffffff;"></el-alert>-->
                <!--<div @click="goabormalList" style="cursor: pointer;color:#ff7542;font-size: 18px;padding-top: 10px;">{{item.camName+"- "+item.expInfo}}-<span style="color:#c6e2ff ">{{item.areaName}}  </span><span style="padding-left: 20px">{{item.expTime}}</span></div>-->
                <ul class="th">
                  <li style="margin-left: -4%">报警区域</li>
                  <li style="margin-left: -3%">报警点</li>
                  <li style="margin-left: -6%">报警信息</li>
                  <li style="margin-left: -6%">报警时间</li>
                </ul>
                <vue-j-scroll
                  :data="abnormalList"
                  class="seamless-wrap"
                  :steep="0.3"
                  scroll-direction="top"
                  :is-roller="true"
                  :roller-scroll-distance="50"
                >
                  <ul
                    class="item"
                    style="
                      list-style: none;
                      margin-top: -2%;
                      margin-bottom: 6px;
                      margin-left: -13%;
                      display: inline-block;
                      width: 100%;
                    "
                  >
                    <li
                      v-for="(item, index) in abnormalList"
                      :key="index"
                      @click="goabormalList"
                      style="
                        cursor: pointer;
                        color: #ffffff;
                        font-size: 18px;
                        padding-top: 10px;
                        width: 100%;
                      "
                    >
                      <!--<span v-text="item.camName"></span> - <span v-text="item.expInfo"></span> - <span v-text="item.areaName"></span> - <span v-text="item.expTime"></span>-->
                      <ul
                        class="content"
                        style="display: flex; align-items: flex-start"
                      >
                        <li style="flex: 1">{{ item.areaName }}</li>
                        <li
                          style="flex: 1; margin-left: -58%; text-align: center"
                        >
                          {{ item.detectType }}
                        </li>
                        <li style="flex: 1; margin-left: -60%">
                          {{ item.camName }}
                        </li>
                        <li
                          style="flex: 1; text-align: center; margin-left: -59%"
                        >
                          {{ item.expTime }}
                        </li>
                      </ul>
                    </li>
                  </ul>
                </vue-j-scroll>
              </template>
            </el-card>
          </el-aside>
          <el-aside style="width: 50%; overflow: hidden">
            <div
              style="height: 60%; margin: 8px 2px 0px 2px; overflow: visible"
            >
              <object
                id="my-object"
                type="text/html"
                data="http://10.64.192.5:8090/Emap/jk_map.htm"
                width="100%"
                height="100%"
                style="position: relative; height: 100%"
              ></object>
            </div>
            <el-card
              :body-style="{ padding: '5px', height: '100%', width: '100%' }"
              class="box-card slidup"
              style="width: 100%; text-align: center; margin-top: 8px"
            >
              <i class="top"></i>
              <i class="bottom"></i>
              <div slot="header" class="clearfix">
                <span class="title_style">报警趋势分析</span>
              </div>
              <div id="echarts_box" style="height: 85%; width: 100%"></div>
            </el-card>
          </el-aside>
          <el-aside style="width: 25%">
            <el-card
              :body-style="{ padding: '0px' }"
              class="box-card slidright_01"
            >
              <div slot="header" class="clearfix">
                <span
                  class="title_style"
                >{{ listObj[this.listN[0]].cameraName }}</span>
              </div>
              <el-main
                :el-main="{ padding: '0px 0px' }"
                v-loading.body="listLoading"
                element-loading-text="拼命加载中"
                style="width: 100%; height: 100%; padding: 5px"
              >
                <div style="width: 100%; height: 100%">
                  <div
                    class="player-wrapper"
                    element-loading-text="加载中..."
                    element-loading-background="#000"
                    style="width: 100%; height: 100%"
                  >
                    <div class="video-wrapper" :style="videoclass">
                      <div
                        id="video1"
                        ref="videoElement1"
                        width="100%"
                        height="100%"
                        style="border-radius: 10px; height: 100%; margin: 0px"
                      ></div>
                    </div>
                  </div>
                </div>
              </el-main>
            </el-card>
            <el-card
              :body-style="{ padding: '0px' }"
              class="box-card slidright_02"
            >
              <div slot="header" class="clearfix">
                <span
                  class="title_style"
                >{{ listObj[this.listN[1]].cameraName }}</span>
              </div>
              <el-main
                :el-main="{ padding: '0px 0px' }"
                v-loading.body="listLoading"
                element-loading-text="拼命加载中"
                style="width: 100%; height: 100%; padding: 5px"
              >
                <div style="width: 100%; height: 100%">
                  <div
                    class="player-wrapper"
                    element-loading-text="加载中..."
                    element-loading-background="#000"
                    style="width: 100%; height: 100%"
                  >
                    <div class="video-wrapper" :style="videoclass">
                      <div
                        :id="`video2`"
                        ref="videoElement2"
                        width="100%"
                        height="100%"
                        style="border-radius: 10px; width: 100%; height: 100%"
                      ></div>
                    </div>
                  </div>
                </div>
              </el-main>
            </el-card>
            <el-card
              :body-style="{ padding: '0px' }"
              class="box-card slidright_03"
            >
              <div slot="header" class="clearfix">
                <span
                  class="title_style"
                >{{ listObj[this.listN[2]].cameraName }}</span>
              </div>
              <el-main
                :el-main="{ padding: '0px 0px' }"
                v-loading.body="listLoading"
                element-loading-text="拼命加载中"
                style="width: 100%; height: 100%; padding: 5px"
              >
                <div style="width: 100%; height: 100%">
                  <div
                    class="player-wrapper"
                    element-loading-text="加载中..."
                    element-loading-background="#000"
                    style="width: 100%; height: 100%"
                  >
                    <div class="video-wrapper" :style="videoclass">
                      <div
                        :id="`video3`"
                        ref="videoElement3"
                        width="100%"
                        height="100%"
                        style="border-radius: 10px; width: 100%; height: 100%"
                      ></div>
                    </div>
                  </div>
                </div>
              </el-main>
            </el-card>
          </el-aside>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts/core";
import { BarChart, PieChart, LineChart } from "echarts/charts";
import Player from "xgplayer";
import FlvPlugin from "xgplayer-flv";
import "xgplayer/dist/index.min.css";

import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DatasetComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  PieChart,
  LineChart,
  CanvasRenderer,
  LegendComponent,
  DatasetComponent,
]);

import flvjs from "mpegts.js";

export default {
  name: "threeMap",
  data() {
    return {
      randomTop: 0,
      randomLeft: 0,
      showVideo: false,
      videoUrl: "",
      radio1: "默认",
      scene: "",
      labelRenderer: "",
      light: "",
      camera: "",
      controls: "",
      renderer: "",
      geometry: "",
      material: "",
      cube: "",
      fov: 45,
      biaozhudiv: "",
      img: "",
      biaozhuLabel: "",
      detectTypeRatioList: [],
      preMonthAbnormalList: [],
      preMonthAbnormalList: [],
      lineData2: [],
      numData: [],
      dateList2: [],
      lineData: [],
      dateList: [],
      dateList: [],
      preMonthMax: 10,
      abnormalList: [],
      intervalId: null,
      areaRatioList: [],
      moduleRunStatus: [],
      listLoading: true, //数据加载等待动画
      data: [],
      defaultProps: {
        children: "children",
        label: "name",
        level: "level",
      },
      title: "",
      fullscreen: false,
      fornum: 4,
      clonum: 12,
      dialogFormVisible: false,
      videoclass:
        " position: relative; margin: 0px auto; overflow: hidden;width: 100%; height: 100%",
      listN: [0, 1, 2, 3], //监控
      videoStatus: true, //开启轮播状态
      videoTimer: null,
      videoTime: 30000, //监控轮播间隔

      listvideo: [],
      listObj: [],
      flvPlayerList: [],
      listQuery: {
        id: null,
        level: "",
        url: "",
      },
      data: [],
      url: "",
      listObjTest: [],
    };
  },
  created() {
    if (location.href.indexOf("#reloaded") == -1) {
      location.href = location.href + "#reloaded";
      location.reload();
    }
  },
  async mounted() {
    console.log("提交");
    document.body.style.zoom = 0.8;
    this.listLoading = false;

    await this.api({
      url: "/cameraLive/alistCameraLive",
      method: "post",
      data: {
        pageNum: 1, //页码
        pageRow: 4, //每页条数
        id: [],
        level: "1",
      },
    }).then((data) => {
      this.listObjTest = data;
      this.listObjTest.forEach((item) => {
        this.listObj.push({
          id: 11,
          cameraName: item.cameraName,
          ip: "",
          httpUrl: item.httpUrl,
        });
      });
    });
    this.createEcharts2();
    this.createEchart();
    // this.createEchartRadar();
    this.getDetectTypeRatio();
    this.getLastAbnormalList();
    //this.dataRefreh();
    this.getCountAreaRatio();
    this.getCountModuleRunStatus();

    this.$nextTick(() => {
      this.initPlayer1();
      this.initPlayer2();
      this.initPlayer3();
    });

    //this.switchTime();
  },
  destroyed() {
    // 在页面销毁后，清除计时器
    this.clear();
  },

  methods: {
    rightfill(num, targetnum) {
      return num.toString().padEnd(targetnum, "s");
    },
    closeVideo() {
      this.showVideo = false;
      this.videoUrl = "";
    },

    createEcharts2() {
      var myChart = echarts.init(document.getElementById("echart2"));
      this.api({
        url: "/screenDisplay/countDetectTypeRatio",
        method: "get",
      }).then((data) => {
        this.detectTypeRatioList = data; //取到的数据
        let max = 0;
        for (let i = 0; i < this.detectTypeRatioList.length; i++) {
          let preDetectTypeRatio = this.detectTypeRatioList[i];
          this.lineData2.push(preDetectTypeRatio.detectType);
          this.dateList2.push(preDetectTypeRatio.ratio);
          this.numData.push(preDetectTypeRatio.runNum);
          if (max < preDetectTypeRatio.ratio) {
            max = preDetectTypeRatio.ratio;
          }
        }
        let lineData2 = this.lineData2;
        this.preRadioMax = max;
        let option = {
          tooltip: {
            trigger: "axis",
            axisPointer: { type: "shadow" },
          },
          grid: {
            //height:'200px',
            left: "0%",
            top: "8%",
            right: "0%",
            bottom: "2%",
            containLabel: true, //
          },
          xAxis: [
            {
              type: "category",
              data: this.lineData2,
              axisLine: {
                show: true,
                lineStyle: {
                  color: "rgba(255,255,255,.1)",
                  width: 10,
                  type: "solid",
                },
              },

              axisTick: {
                show: false,
              },
              axisLabel: {
                interval: 0,
                // formatter: function (value) {
                //   return value.split('').join('\n')
                // },
                show: true,
                splitNumber: 15,
                textStyle: {
                  color: "rgba(255,255,255,.6)",
                  fontSize: "18",
                  width: "20",
                },
                nameTextStyle: {
                  width: "20",
                },
              },
            },
          ],
          yAxis: [
            {
              type: "value",
              axisLabel: {
                formatter: "{value}",
                show: true,
                textStyle: {
                  color: "rgba(255,255,255,.6)",
                  fontSize: "10",
                },
              },
              axisTick: {
                show: false,
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "rgba(255,255,255,.1 )",
                  width: 1,
                  type: "solid",
                },
              },
              splitLine: {
                lineStyle: {
                  color: "rgba(255,255,255,.1)",
                },
              },
            },
          ],
          series: [
            {
              type: "bar",
              data: this.numData,
              barWidth: "50px",
              barGap: 0,
              center: ["70%", "30%"],
              itemStyle: {
                normal: {
                  //'#27d08a'
                  color: function (params) {
                    var colorlist = [
                      "#3479D3",
                      "#29C7C8",
                      "#FCA253",
                      "#F24D84",
                      "#91c7ae",
                      "#749f83",
                      "#61a0a8",
                      "#d48265",
                    ];
                    return colorlist[params.dataIndex];
                  },
                  opacity: 1,
                  label: {
                    show: true,
                    // data:this.numData,
                    position: "top",
                    formatter: "{c}",
                    textStyle: {
                      //数值样式
                      color: "#fff",
                      fontSize: 18,
                    },
                  },
                },
              },
            },
          ],
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      });
    },

    createEchart() {
      var myChart = echarts.init(document.getElementById("echarts_box"));
      this.api({
        url: "/screenDisplay/countPreMonthNum",
        method: "get",
      }).then((data) => {
        this.preMonthAbnormalList = data;
        let max = 0;
        for (let i = 0; i < this.preMonthAbnormalList.length; i++) {
          let preMonthData = this.preMonthAbnormalList[i];
          this.lineData.push(preMonthData.num);
          this.dateList.push(preMonthData.date);
          if (max < preMonthData.num) {
            max = preMonthData.num;
          }
        }
        let lineData = this.lineData;
        if (max % 10 == 0) {
          max += 10;
        } else {
          max = Math.ceil(max / 10) * 10;
        }
        this.preMonthMax = max;
        let optionL = {
          color: ["#2f90ff"],
          tooltip: {
            trigger: "axis",
            axisPointer: { type: "shadow" },
          },
          grid: {
            left: "3%",
            right: "5%",
            bottom: "3%",
            top: "3%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              data: this.dateList,
              axisLine: {
                lineStyle: {
                  color: "rgba(255,255,255,.1)",
                },
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                fontSize: 12,
                textStyle: {
                  color: "rgba(255,255,255,.6)",
                },
              },
            },
            {
              type: "category",
              axisLine: {
                lineStyle: {
                  color: "rgba(255,255,255,.1)",
                },
                onZero: false,
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                show: false,
              },
            },
          ],
          yAxis: [
            {
              type: "value",
              max: this.preMonthMax,
              axisLine: {
                lineStyle: {
                  color: "rgba(255,255,255,.1)",
                },
                show: true,
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                fontSize: 12,
                textStyle: {
                  color: "rgba(255,255,255,.6)",
                },
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: "rgba(255,255,255,.1)",
                },
              },
              interval: 400,
            },
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "rgba(255,255,255,.1)",
                },
                onZero: false,
                show: true,
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                show: false,
              },
              splitLine: {
                show: false,
              },
            },
          ],
          series: [
            {
              data: this.lineData,
              type: "line",
              smooth: true,
              symbol: "circle",
              symbolSize: 10,
              showSymbol: false,
              itemStyle: {
                emphasis: {
                  borderColor: "#ffffff",
                },
              },
            },
          ],
        };
        myChart.setOption(optionL);
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      });
    },

    createEchartPie(moduleRunStatus) {
      for (let i = 0; i < moduleRunStatus.length; i++) {
        let ratioVO = moduleRunStatus[i];
        let percent = parseInt((ratioVO.runNum / ratioVO.sum) * 100);
        let pieBar = echarts.init(document.getElementById("pieBar" + i));
        let option = {
          grid: {
            top: "3%",
            bottom: "3%",
          },
          tooltip: {
            trigger: "item",
            formatter: function (params) {
              return "在线:" + ratioVO.runNum + "<br>" + "总数:" + ratioVO.sum;
            },
          },
          series: [
            {
              name: percent,
              type: "pie",
              center: ["50%", "50%"],
              radius: ["35%", "90%"],
              startAngle: 0,
              avoidLabelOverlap: false,
              hoverAnimation: false,

              label: {
                normal: {
                  show: true,
                  position: "center",
                  // formatter: "{c}
                  formatter: "{a}%",
                  fontSize: 20, // Increase font size to 20px
                  color: "#ffffff",
                },
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0,0,0,0.5)",
                  },
                },
                color: "rgba(255,255,255,.6)",
              },
              data: [
                {
                  value: 100,
                  itemStyle: {
                    normal: {
                      color: "rgba(80,150,224,0)",
                    },
                  },
                },
                {
                  value: percent, // 渐变色部分
                  itemStyle: {
                    // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    //   { offset: 0, color: "#3db6fc" },
                    //   { offset: 0.5, color: "#fdb146" },
                    //   { offset: 1, color: "#00ECD9" },
                    // ]),
                    color: "#3db6fc",
                  },
                },
                {
                  value: 100 - percent, // 右侧部分
                  itemStyle: {
                    normal: {
                      color: "#0C5071",
                    },
                  },
                },
              ],
            },
          ],
        };

        pieBar.setOption(option);
      }
    },

    getDetectTypeRatio() {
      this.api({
        url: "/screenDisplay/countDetectTypeRatio",
        method: "get",
      }).then((data) => {
        this.detectTypeRatioList = data;
      });
    },
    getLastAbnormalList() {
      this.api({
        url: "/screenDisplay/getLastAbnormalList",
        method: "get",
        params: { pageNum: 1, pageRow: 15, uncheck: true },
      }).then((data) => {
        this.abnormalList = data.list;
        this.abnormalList.forEach((temp) => {
          let str = temp.expTime.split("-");
          temp.expTime = str[1] + "-" + str[2];
        });
      });
    },
    // 定时刷新数据函数
    dataRefreh() {
      // 计时器正在进行中，退出函数
      if (this.intervalId != null) {
        return;
      }
      // 计时器为空，操作
      this.intervalId = setInterval(() => {
        this.getLastAbnormalList(); //加载数据函数
      }, 10000);
    },
    // 停止定时器
    clear() {
      clearInterval(this.intervalId); //清除计时器
      this.intervalId = null; //设置为null
    },
    getCountAreaRatio() {
      this.api({
        url: "/screenDisplay/countAreaRatio",
        method: "get",
      }).then((data) => {
        this.areaRatioList = data;
      });
    },
    getCountModuleRunStatus() {
      this.api({
        url: "/screenDisplay/countModuleRunStatus",
        method: "get",
      }).then((data) => {
        this.moduleRunStatus = data;

        setTimeout(() => {
          this.createEchartPie(this.moduleRunStatus);
        }, 1);
      });
    },

    // 判断轮播
    judgeStaus() {
      if (this.videoStatus != true) {
        clearInterval(this.videoTimer);
      }
    },
    // 轮播
    forVideo() {
      for (let i in this.listN) {
        this.listN[i] =
          (this.listN[i] + this.listN.length) % this.listObj.length;
      }
      this.initPlayer1();
      this.initPlayer2();
      this.initPlayer3();
    },
    // 初始化
    initPlayer1() {
      this.closePlayer();
      if (flvjs.isSupported()) {
        const videoElement1 = this.$refs.videoElement1;
        this.createVideo(videoElement1, this.listN[0]);
      }
    },
    initPlayer2() {
      if (flvjs.isSupported()) {
        const videoElement2 = this.$refs.videoElement2;
        this.createVideo(videoElement2, this.listN[1]);
      }
    },
    initPlayer3() {
      if (flvjs.isSupported()) {
        const videoElement3 = this.$refs.videoElement3;
        this.createVideo(videoElement3, this.listN[2]);
      }
    },

    createVideo(videoElement, n) {
      // console.log(videoElement, n);
      this.listLoading = false;

      new Player({
        id: `video${n + 1}`,
        isLive: true,
        plugins: [FlvPlugin],
        url: this.listObj[n].httpUrl,
        autoplay: true,
        fluid: true,
      });
    },
    reloadVideo(videoElement, n, flvPlayer) {
      videoElement.src = "";
    },
    goabormalList() {
      this.$router.push({
        path: "/system/abnormalInfo",
      });
    },
    gocamera() {
      this.$router.push({
        path: "/system/config/cameraInfo",
      });
    },
    destoryVideo(flvPlayer) {
      try {
        if (flvPlayer) {
          console.log("close flvPlayer......");
          flvPlayer.pause();
          flvPlayer.unload();
          flvPlayer.detachMediaElement();
          flvPlayer.destroy();
          flvPlayer = null;
        }
      } catch (err) {
        console.error(err);
        flvPlayer = null;
      }
    },
    //中断直播播放流
    closePlayer() {
      for (let i in this.flvPlayerList) {
        console.log(i);
        this.destoryVideo(this.flvPlayerList[i]);
      }
      this.flvPlayerList = [];
    },
  },
};
</script>

<style scoped>
#echart2 {
  zoom: 1.25;
}
#echarts_box {
  zoom: 1.25;
}
.content {
  /*margin-left: -7%;*/
  width: 800px;
  background-image: url("../../assets/images/listitembg.png");
  height: 40px;
  padding-top: 10px;
}
.content li {
  display: inline;
  padding-left: 3%;
  padding-right: 3%;
  white-space: nowrap;
}
.th {
  flex-direction: row;
  margin-left: -5%;
  width: 800px;
  color: #00dcfd;
}
.th li {
  display: inline;
  padding-left: 6%;
  padding-right: 6%;
  white-space: nowrap;
  font-size: 23px;
  font-family: HuXiaoBoNanShenTi-2-Regular;
}
.seamless-wrap {
  height: 329px;
  width: 100%;
  overflow: hidden;
}
.wrap {
  position: absolute;
  z-index: 1005;
  height: 100%;
  top: 0px;
  bottom: 0px;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/images/bgimg3.png");
  background-size: 100% 100%;
  background: -webkit-linear-gradient();
}
.header-wrap {
  position: absolute;
  top: 10;
  left: 0;
  right: 0;
  margin-left: 24px;
  height: 80px;
  background-size: auto 70%;
  z-index: 222;
  text-align: center;
  line-height: 80px;
  font-size: 30px;
  font-weight: bold;
  background-image: -webkit-linear-gradient(
    left,
    rgb(0, 121, 255),
    rgb(0, 255, 255),
    rgb(0, 121, 255)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.box-card {
  background-color: rgba(3, 20, 52, 0.1);
  color: #fff;
  background-image: url("../../assets/images/loginbg.png");
  background-size: cover;
  background-repeat: no-repeat;
  border: 1px solid rgba(32, 254, 255, 0.3);
  position: relative;
  transform: scale(0.95);
}

.box-card::before {
  content: " ";
  position: absolute;
  width: 3px;
  height: 100%;
  top: -100%;
  left: 0;
  background-image: linear-gradient(0deg, transparent, #66b1ff, transparent);
  animation: two 4s linear infinite;
}

.box-card::after {
  content: " ";
  position: absolute;
  width: 3px;
  height: 100%;
  bottom: -100%;
  right: 0;
  background-image: linear-gradient(360deg, transparent, #66b1ff, transparent);
  animation: four 4s linear 2s infinite;
}
.box-card i {
  position: absolute;
  display: inline-block;
  height: 3px;
  width: 100%;
}
.box-card .bottom {
  bottom: 0;
  left: -100%;
  background-image: linear-gradient(270deg, transparent, #66b1ff, transparent);
  animation: one 4s linear 1s infinite;
}

.box-card .top {
  top: 0;
  right: -100%;
  background-image: linear-gradient(270deg, transparent, #66b1ff, transparent);
  animation: three 4s linear 3s infinite;
}
.slidleft_01 {
  animation-name: leftslide, blink-border;
  animation-duration: 0.5s, 2s;
  animation-iteration-count: 1, infinite;
  animation-delay: 0s, 0.5s;
}
.slidleft_02 {
  animation-name: leftslide, blink-border;
  animation-duration: 1s, 2s;
  animation-iteration-count: 1, infinite;
  animation-delay: 0s, 1.5s;
}
.slidleft_03 {
  animation-name: leftslide, blink-border;
  animation-duration: 1.5s, 2s;
  animation-iteration-count: 1, infinite;
  animation-delay: 0s, 2s;
}
.slidup {
  animation-name: upslide, blink-border;
  animation-duration: 1.5s, 2s;
  animation-iteration-count: 1, infinite;
  animation-delay: 0s, 1.5s;
}
.slidright_01 {
  animation-name: rightslide, blink-border;
  animation-duration: 0.5s, 2s;
  animation-iteration-count: 1, infinite;
  animation-delay: 0s, 0.5s;
}
.slidright_02 {
  animation-name: rightslide, blink-border;
  animation-duration: 1s, 2s;
  animation-iteration-count: 1, infinite;
  animation-delay: 0s, 1.5s;
}
.slidright_03 {
  animation-name: rightslide, blink-border;
  animation-duration: 1.5s, 2s;
  animation-iteration-count: 1, infinite;
  animation-delay: 0s, 2s;
}

@keyframes leftslide {
  from {
    margin-left: -100%;
  }
  to {
    margin-left: 0%;
  }
}
@keyframes upslide {
  from {
    margin-top: 40%;
  }
  to {
    margin-top: 8px;
  }
}
@keyframes rightslide {
  from {
    margin-left: 100%;
  }
  to {
    margin-left: 0%;
  }
}
@keyframes one {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}

@keyframes two {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}

@keyframes three {
  0% {
    right: -100%;
  }
  50%,
  100% {
    right: 100%;
  }
}

@keyframes four {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
}
/*两侧标题*/
.title_style {
  text-align: center;
  display: block;
  /*color: #00ffff;*/
  color: #ffffff;
  font-size: 24px;
  font-family: HuXiaoBoNanShenTi-2-Regular;
}
.title_style::before {
  content: " ";
  background-image: url("../../assets/images/left.png");
  background-size: cover;
  display: inline-block;
  width: 19px;
  height: 16px;
  margin-right: 10px;
}
.title_style::after {
  content: " ";
  background-image: url("../../assets/images/right.png");
  background-size: cover;
  display: inline-block;
  width: 19px;
  height: 16px;
  margin-left: 10px;
}
/*左侧*/
.content_style {
  text-align: center;
  display: block;
  /*color: #00ffff;*/
  color: #ffffff;
  font-size: 15px;
}

.el-progress--line >>> .el-progress-bar__outer {
  background-color: rgb(56, 98, 145);
}
/*两侧标题内容中间线条*/
.box-card /deep/ .el-card__header {
  border-bottom: 1px solid rgb(56, 98, 145);
  padding: 5px 18px;
  background-image: url("../../assets/images/lightwhite.png");
  background-repeat: no-repeat;
  text-align: center;
  background-position-x: center;
  background-position-y: top;
}

.el-progress-circle__track {
  stroke: #386291;
}
.el-font-color {
  color: #fff;
}
/*违规背景*/
.background_color {
  background-color: rgba(3, 20, 52, 0.1);
}

.el-header {
  height: 10%;
}
.el-container {
  /*设置内部填充为0，几个布局元素之间没有间距*/
  padding: 0px;
  /*外部间距也是如此设置*/
  margin: 0px;
  /*统一设置高度为100%*/
  height: 100%;
  width: 100%;
}
.el-aside {
  width: 25%;
  padding: 0px;
  /*外部间距也是如此设置*/
  margin: 0px;
}

.box-card {
  height: 30%;
  width: 100%;
  margin: 5px 0px;
}
.pie-bar {
  float: left;
  position: relative;
  width: 33%;
  margin-top: 10%;
  /*background-image:url("../../assets/images/bgpie.png") no-repeat;*/
}
.pie-bar span {
  position: absolute;
  left: 50%;
  bottom: 10%;
  /* color: #0a0a0a; */
  color: #ffffff;
  font-size: 12px;
  transform: translateX(-50%);
}

.wrap-item-1 {
  position: relative;
  padding: 0 24px;
  height: 30%;
}

.item-title {
  height: 50px;
  line-height: 50px;
  color: #000000;
  font-size: 20px;
}

.item-box {
  position: absolute;
  top: 56px;
  left: 24px;
  right: 24px;
  bottom: 0;
}

.fault-box {
  height: 100%;
}
.fault-box li .fault-icon {
  float: left;
  width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  color: #00ffff;
  background: #053336;
}

/* 左上角进度条样式 */
.fault-name .block-bar {
  float: right;
  margin-top: 4px;
  width: 55%;
}
#my-object::-webkit-scrollbar {
  width: 0 !important;
  height: 0 !important;
}
</style>

<style scoped>
.video-wrapper {
  /*position: relative;*/
  /*top: 0px;*/
  /*bottom: 0px;*/
  /*left: 0px;*/
  /*right: 0px;*/
  padding: 0px;
}
/*@keyframes blink-border {*/
/*  from {*/
/*    !*border-color: transparent;*!*/
/*    border: 2px solid transparent;*/
/*    border-radius: 10px;*/
/*  }*/
/*  to {*/
/*    !*border-color: #00ffff; !* 使用你喜欢的颜色 *!*!*/
/*    border: 2px solid #00ffff;*/
/*    border-radius: 10px;*/
/*  }*/
/*}*/
/*
css 注释：
只对table td设置左与上边框；
对table设置右与下边框；
为了便于截图，我们将css 注释说明换行排版
*/
.player-wrapper {
  padding-bottom: 0px;
}
</style>

