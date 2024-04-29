<template>
  <div id="index" ref="appRef">
    <div class="bg">
      <dv-loading v-show="loading">Loading...</dv-loading>
      <div class="host-body">
        <div>
          <!-- 顶部title部分 -->
          <el-row>
            <el-col :span="6"><dv-decoration-8 class="title_right" :color="['#008CFF', '#00ADDD']" /></el-col>
            <el-col :span="12">
              <div class="title_text">陶 源 生 物 资 产 监 管 系 统</div>
              <dv-decoration-5 class="title_center" :color="['#008CFF', '#00ADDD']" />
            </el-col>
            <el-col :span="6">
              <div class="title_time">{{ dateYear + dateWeek + dateDay }}</div>
              <dv-decoration-8 :reverse="true" class="title_left" :color="['#008CFF', '#00ADDD']" />
            </el-col>
          </el-row>
          <!-- 主体部分 -->
          <el-row>
            <!-- 第一列 -->
            <el-col :span="6">
              <!-- 饼图部分 -->
              <div class="left_box1">
                <dv-border-box-12 :border="false">
                  <div id="Rose_diagram"></div>
                  <dv-active-ring-chart :config="config" class="left_box1_rose_right" />
                  <div class="rose_text" v-for="(item, index) in numberData" :key="index">
                    <!-- <p>
                      <span class="coin">￥</span>
                      <span class="rose_text_nmb">{{
                        item.number.number
                      }}</span>
                    </p> -->
                    <p>
                      <span>{{ item.text }}</span>
                      <span class="colorYellow"></span>
                    </p>
                  </div>
                </dv-border-box-12>
              </div>
              <!-- 柱状图部分 -->
              <div class="left_box2">
                <dv-border-box-12 style="padding-top: 13px">
                  <p style="margin-left: 13px">品种数量</p>
                  <div id="columnar"></div>
                </dv-border-box-12>
              </div>
              <!-- 轮播表格部分 -->
              <div class="left_box3">
                <dv-border-box-12 style="padding-top: 10px">
                  <dv-scroll-board :config="board_info" class="carousel_list" oddRowBGC="#fff" />
                </dv-border-box-12>
              </div>
            </el-col>
            <!-- 第二列 -->
            <el-col :span="12">
              <!-- 中国地图 -->
              <div id="china-map"></div>
              <!-- 折线图 -预警表-->
              <dv-border-box-8>
                <div id="line_center_diagram"></div>
              </dv-border-box-8>

              <dv-border-box-12 style="padding-top: 38px">
                <div class="warning_table">
                  <div style="height: 250px; overflow-y: auto;">

                    <el-table class="el-table" :data="tableData" height="100%"
                      style="width: 98%;margin-left: 10px;margin-top:-15px; color:cyan;">
                      <el-table-column prop="agroUserName" label="养殖户" width="180">
                      </el-table-column>
                      <el-table-column prop="agroLivestockIccid" label="设备编号" width="180">
                      </el-table-column>
                      <el-table-column prop="livestockVarieties" label="品种">
                      </el-table-column>
                      <el-table-column prop="info" label="预警信息">
                      </el-table-column>
                      <el-table-column prop="date" label="预警时间">
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </dv-border-box-12>


            </el-col>
            <!-- 第三列 -->
            <el-col :span="6">
              <!-- 轮播排行榜部分 -->
              <div class="right_box1">
                <dv-border-box-12 :border="false">
                  <dv-decoration-7 style="width: 100%; height: 30px">品 种 排 名</dv-decoration-7>
                  <dv-scroll-ranking-board :config="config" style="width: 95%; height: 87%; margin-left: 2%" />
                </dv-border-box-12>
              </div>
              <!-- <div class="right_box1">
                <dv-border-box-12>
                  <dv-decoration-7 style="width: 100%; height: 30px"
                    >品 种 排 名</dv-decoration-7
                  >
                  <dv-scroll-ranking-board
                    :config="config"
                    style="width: 95%; height: 87%; margin-left: 2%"
                  />
                </dv-border-box-12>
              </div> -->
              <!-- 养 殖 户 排 名 -->
              <div class="right_box2">
                <dv-border-box-12 :border="false">
                  <dv-decoration-7 style="width: 100%; height: 30px">养 殖 户 排 名</dv-decoration-7>
                  <dv-scroll-ranking-board :config="userNum" style="width: 95%; height: 87%; margin-left: 2%" />
                </dv-border-box-12>
              </div>

              <!-- 第二个部分 -->
              <div class="right_box3">
                <dv-border-box-12 :reverse="true" class="custom-border-box">
                  <dv-conical-column-chart :config="cone" class="cone_box" />
                </dv-border-box-12>
              </div>
              <!-- <div class="right_box2">
                <dv-border-box-12 :reverse="true">
                  <div id="dotter_bar"></div>
                </dv-border-box-12>
              </div> -->
              <!-- 部分 -->
              <!-- <div class="right_box3">
                <dv-border-box-12 :reverse="true">
                  <dv-conical-column-chart :config="cone" class="cone_box" />
                </dv-border-box-12>
              </div> -->

            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// 将自动注册所有组件为全局组件4.15
// import dataV from '@jiaminghi/data-view' 
// Vue.use(dataV)
// import ElementUI from 'element-ui';  
// import 'element-ui/lib/theme-chalk/index.css';
//  Vue.use(ElementUI);
// import geoJson from '@/views/china.json'
// import * as echarts from 'echarts'
// Vue.prototype.$echarts = echarts
// echarts.registerMap('china', geoJson);


import drawMixin from "./drawMixin"; //自适应缩放
import { listagroIndex, listagroRankingFarmers,dmAlarmDataIndexList} from "@/api/agroIndex/agroIndex";//首页品种数量

// import { formatTime } from "../utils/index.js"; //日期格式转换
import * as echarts from 'echarts'
export default {
  mixins: [drawMixin],
  data() {
    return {
      //首页用户排名
      agroNumlist: [],
      //首页品种集合
      IndexVarList: [],
      //定时器
      timing: null,
      //loading图
      loading: true,
      //时分秒
      dateDay: null,
      //年月日
      dateYear: null,
      //周几
      dateWeek: null,
      //周几
      weekday: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],

      //预警信息
      tableData: [],

      //轮播养殖户排名
      userNum: {
        data: [],
      },
      //轮播品种排行榜
      config: {
        data: [],
      },

      //左侧饼图文字
      numberData: [
        {
          number: {
            number: 15,
          },
          text: "牛群结构",
        },
        // {
        //   number: {
        //     number: 1144,
        //   },
        //   text: "总共完成数量",
        // },
        // {
        //   number: {
        //     number: 361,
        //   },
        //   text: "正在编译数量",
        // },
      ],
      //左侧轮播表格配置项
      board_info: {
        header: ["养殖户名称", "监控设备编号", "设备状态"],
        data: [
          ["张三", "10830", "在线"],
          ["张四", "13500", "在线"],
          ["张五", "10350", "在线"],
          ["张六", "13300", "在线"],
          ["张七", "12500", "在线"],
          ["张八", "11500", "在线"],
          ["张九", "12500", "在线"],
          ["王六", "10360", "在线"],
          ["王二", "10567", "在线"],
          ["李四", "15721", "在线"],
        ],
        evenRowBGC: "#020308",
        oddRowBGC: "#382B47",
        headerBGC: "#020308",
      },
      // 定义颜色
      colorList: {
        linearYtoG: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#f5b44d",
            },
            {
              offset: 1,
              color: "#28f8de",
            },
          ],
        },
        linearGtoB: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#43dfa2",
            },
            {
              offset: 1,
              color: "#28f8de",
            },
          ],
        },
        linearBtoG: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#1c98e8",
            },
            {
              offset: 1,
              color: "#28f8de",
            },
          ],
        },
        areaBtoG: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgba(35,184,210,.2)",
            },
            {
              offset: 1,
              color: "rgba(35,184,210,0)",
            },
          ],
        },
      },

      //锥形柱状图
      cone: {
        data: [

          {
            name: "鸡",
            value: 66,
          },

          {
            name: "鸭",
            value: 80,
          },

          {
            name: "牛",
            value: 45,
          },

          {
            name: "鹅",
            value: 29,
          },

          {
            name: "兔",
            value: 55,
          },
          {
            name: "羊",
            value: 120,
          },

        ],
        showValue: true,
      },
    };
  },
  created() {
    this.getIndexVarList();
    this.getAgroNumlist();
    this.getDmAlarmDataIndexList();
  },

  mounted() {
    // 假设在 mounted 钩子函数中获取后端数据，并赋值给 IndexVarList 数组
    // this.fetchData();
    // //获取实时时间
    // this.timeFn();
    //加载loading图
    this.cancelLoading();
    //中国地图
    this.china_map();


    //中间折线图
    this.line_center_diagram();
    //虚线柱状图
    // this.dotter_bar();

  },
  beforeDestroy() {
    //离开时删除计时器
    clearInterval(this.timing);
  },
  methods: {

    getIndexVarList() {
      this.loading = true;
      listagroIndex().then(response => {
        // 获取后端返回的数据
        const rows = response.rows;

        // 将获取的数据赋值给 IndexVarList
        // this.IndexVarList = rows;

        // 对数据进行格式化并赋值给 config 对象中的 data 属性
        const formattedData = rows.map(item => {
          return {
            value: parseInt(item.varietiesNum), // 将字符串转换为整数
            name: item.livestockVarieties
          };
        });
        this.$delete(this.config, 'data');
        this.$set(this.config, 'data', formattedData);
        // this.config.data=formattedData;

        //左侧柱状图
        this.columnar();
        //左侧玫瑰饼图
        this.Rose_diagram();
        this.loading = false; // 数据加载完成后设置 loading 为 false
      }).catch(error => {
        console.error('获取数据出错：', error);
        this.loading = false; // 数据加载出错时也需要设置 loading 为 false
      });
    },

    getAgroNumlist() {
      this.loading = true;
      listagroRankingFarmers().then(response => {
        // 获取后端返回的数据
        const rows = response.rows;

        // 将获取的数据赋值给 IndexVarList
        // this.agroNumlist = rows;

        // 对数据进行格式化并赋值给 config 对象中的 data 属性
        const formattedData = rows.map(item => {
          return {
            value: parseInt(item.num), // 将字符串转换为整数
            name: item.agroUserName
          };
        });
        this.$delete(this.userNum, 'data');
        this.$set(this.userNum, 'data', formattedData);
        // this.config.data=formattedData;


        this.loading = false; // 数据加载完成后设置 loading 为 false
      }).catch(error => {
        console.error('获取数据出错：', error);
        this.loading = false; // 数据加载出错时也需要设置 loading 为 false
      });
    },

    //报警数据
    getDmAlarmDataIndexList() {
      this.loading = true;
      dmAlarmDataIndexList().then(response => {
        // 获取后端返回的数据
    this.tableData = response.rows;




        this.loading = false; // 数据加载完成后设置 loading 为 false
      }).catch(error => {
        console.error('获取数据出错：', error);
        this.loading = false; // 数据加载出错时也需要设置 loading 为 false
      });
    },

    //loading图
    cancelLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    //中国地图
    china_map() {
      let mapChart = this.$echarts.init(document.getElementById("china-map")); //图表初始化，china-map是绑定的元素
      window.onresize = mapChart.resize; //如果容器变大小，自适应从新构图
      let series = []; //存放循环配置项
      let res = []; //存放射线的起始点和结束点位置
      let province = []; //存放有射线的省的名字，以此来拿到对应省份的坐标
      //提前存好的所有省份坐标，用于后面根据名字拿到对应的左边
      let chinaGeoCoordMap = {
        新疆: [86.9023, 41.148],
        西藏: [87.8695, 31.6846],
        内蒙古: [110.5977, 41.3408],
        青海: [95.2402, 35.4199],
        四川: [102.9199, 30.1904],
        黑龙江: [128.1445, 46.7156],
        甘肃: [102.7129, 38.166],
        云南: [101.0652, 24.6807],
        广西: [108.7813, 23.6426],
        湖南: [111.5332, 27.3779],
        陕西: [108.5996, 33.7396],
        广东: [113.8668, 22.8076],
        吉林: [126.1746, 43.5938],
        河北: [115.4004, 38.1688],
        湖北: [112.2363, 30.8572],
        贵州: [106.6113, 26.6385],
        山东: [118.2402, 36.2307],
        江西: [115.7156, 27.99],
        河南: [113.0668, 33.8818],
        辽宁: [123.0438, 41.0889],
        山西: [112.4121, 36.6611],
        安徽: [117.2461, 31.0361],
        福建: [118.3008, 25.9277],
        浙江: [120.498, 29.0918],
        江苏: [119.8586, 32.915],
        重庆: [107.7539, 29.8904],
        宁夏: [105.9961, 37.1096],
        海南: [109.9512, 19.2041],
        台湾: [120.8254, 23.5986],
        北京: [116.4551, 40.2539],
        天津: [117.4219, 39.4189],
        上海: [121.4648, 31.2891],
        香港: [114.6178, 22.3242],
        澳门: [113.5547, 21.6484],
      };
      //后台给的数据模拟
      let lineData = [
        {
          val: 32, //数据
          blat: [86.9023, 41.148], //发射点
          elon: [87.8695, 31.6846], //接收点
          bcitysim: "新疆", //发射省的名字
          ecitysim: "西藏", //接收省的名字
        },
        {
          val: 31,
          blat: [87.8695, 31.6846],
          elon: [95.2402, 35.4199],
          bcitysim: "西藏",
          ecitysim: "青海",
        },
        {
          val: 33,
          blat: [86.9023, 41.148],
          elon: [95.2402, 35.4199],
          bcitysim: "新疆",
          ecitysim: "青海",
        },
        {
          val: 33,
          blat: [116.4551, 40.2539],
          elon: [119.8586, 32.915],
          bcitysim: "北京",
          ecitysim: "江苏",
        },
        {
          val: 33,
          blat: [120.8254, 23.5986],
          elon: [109.9512, 19.2041],
          bcitysim: "台湾",
          ecitysim: "海南",
        },
        {
          val: 33,
          blat: [120.498, 29.0918],
          elon: [115.7156, 27.99],
          bcitysim: "浙江",
          ecitysim: "江西",
        },
        {
          val: 33,
          blat: [117.2461, 31.0361],
          elon: [119.8586, 32.915],
          bcitysim: "安徽",
          ecitysim: "江苏",
        },
        {
          val: 33,
          blat: [117.2461, 31.0361],
          elon: [105.9961, 37.1096],
          bcitysim: "安徽",
          ecitysim: "宁夏",
        },
        {
          val: 33,
          blat: [117.2461, 31.0361],
          elon: [107.7539, 29.8904],
          bcitysim: "安徽",
          ecitysim: "重庆",
        },
        {
          val: 33,
          blat: [117.2461, 31.0361],
          elon: [123.0438, 41.0889],
          bcitysim: "安徽",
          ecitysim: "辽宁",
        },
        {
          val: 33,
          blat: [119.8586, 32.915],
          elon: [102.7129, 38.166],
          bcitysim: "江苏",
          ecitysim: "甘肃",
        },
        {
          val: 33,
          blat: [119.8586, 32.915],
          elon: [128.1445, 46.7156],
          bcitysim: "江苏",
          ecitysim: "黑龙江",
        },
        {
          val: 33,
          blat: [119.8586, 32.915],
          elon: [110.5977, 41.3408],
          bcitysim: "江苏",
          ecitysim: "内蒙古",
        },
        {
          val: 33,
          blat: [119.8586, 32.915],
          elon: [101.0652, 24.6807],
          bcitysim: "江苏",
          ecitysim: "云南",
        },
        {
          val: 33,
          blat: [119.8586, 32.915],
          elon: [86.9023, 41.148],
          bcitysim: "江苏",
          ecitysim: "新疆",
        },
        {
          val: 33,
          blat: [86.9023, 41.148],
          elon: [110.5977, 41.3408],
          bcitysim: "新疆",
          ecitysim: "内蒙古",
        },
        {
          val: 33,
          blat: [86.9023, 41.148],
          elon: [102.9199, 30.1904],
          bcitysim: "新疆",
          ecitysim: "四川",
        },
      ];
      //循环拿到处理好的数据
      for (var i = 0; i < lineData.length; i++) {
        province.push(lineData[i].bcitysim); //存进去每个省的名字
        province.push(lineData[i].ecitysim); //存进去每个省的名字
        res.push({
          fromName: lineData[i].bcitysim, //发射的省名，保存用于弹框显示
          toName: lineData[i].ecitysim, //接收的省名，保存用于弹框显示
          coords: [
            lineData[i].blat, //发射
            lineData[i].elon, //接收
          ],
          count: lineData[i].val, //数据
        });
      }
      let index_data = new Set(province); //把省的名字去重
      let data_res = []; //定义一个新的变量存放省的坐标

      //注意这里一定要用name和value的形式。不是这个格式的散点图显示不出来
      index_data.forEach((item) => {
        data_res.push({
          name: item, //每个省的名字
          value: chinaGeoCoordMap[item], //每个省的坐标
        });
      });
      //循环往series内添加配置项
      series.push(
        {
          //射线效果图层
          type: "lines", //类型：射线
          zlevel: 1, //类似图层效果
          effect: {
            show: true, //是否显示图标
            symbol: "arrow", //箭头图标
            symbolSize: 5, //图标大小
            trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
          },
          label: {
            show: true,
          },
          lineStyle: {
            color: "#fff",
            normal: {
              color: "#00A0FF",
              width: 1, //尾迹线条宽度
              opacity: 0.5, //尾迹线条透明度
              curveness: 0.1, //尾迹线条曲直度
            },
          },
          //提示框信息
          tooltip: {
            formatter: function (param) {
              return (
                param.data.fromName +
                ">" +
                param.data.toName +
                "<br>数量：" +
                param.data.count
              );
            },
          },
          data: res, //拿到射线的起始点和结束点
        },
        //散点图
        // {
        //   type: "effectScatter",//散点图
        //   coordinateSystem: "geo",//这个不能删，删了不显示
        //   zlevel: 1,
        //   rippleEffect: {
        //     //涟漪特效
        //     period: 4, //动画时间，值越小速度越快
        //     brushType: "stroke", //波纹绘制方式 stroke, fill
        //     scale: 4, //波纹圆环最大限制，值越大波纹越大
        //   },
        //   //设置文字部分
        //   label: {
        //     normal: {
        //       show: true, //省份名显示隐藏
        //       position: "right", //省份名显示位置
        //       offset: [5, 0], //省份名偏移设置
        //       formatter: function (params) {
        //         //圆环显示省份名
        //         return params.name;  //这个名字是根据data中的name来显示的
        //       },
        //       fontSize: 12,//文字大小
        //     },
        //     emphasis: {
        //       show: true,
        //     },
        //   },
        //   symbol: "circle",//散点图
        //   symbolSize: 5,//散点大小
        //   itemStyle: {//散点样式
        //     normal: {
        //       show: true,
        //       color: "#fff",
        //     },
        //   },
        //   data: data_res, //处理好后的散点图坐标数组
        // },
        //点击高亮
        {
          type: "map",
          mapType: "china",
          zlevel: 1,
          roam: true,
          geoIndex: 0,
          tooltip: {
            show: true,
          },
          itemStyle: {
            areaColor: "#00196d",
            borderColor: "#0a53e9",
          },
          emphasis: {
            show: true,
            label: {
              normal: {
                show: true, // 是否显示对应地名
                textStyle: {
                  color: "#fff",
                },
              },
            },
            itemStyle: {
              areaColor: "#00196d",
              borderColor: "#0a53e9",
            },
          },
        }
      );
      //配置
      let option = {
        //title可要可不要

        // title: {
        //   text: "查查的地图",
        //   textStyle: {
        //     color: "#ffffff",
        //   },
        // },
        legend: {
          show: true,
          selected: {},
          x: "left",
          orient: "vertical",
          textStyle: {
            color: "white",
          },
          data: [],
        },
        //鼠标移上去的弹框
        tooltip: {
          trigger: "item",
          show: true,
        },
        //geo：这是重点
        geo: {
          map: "china", //中国地图
          zoom: 1.2, //缩放倍数
          roam: false, //是否允许缩放和拖拽地图
          label: {
            normal: {
              show: true, // 是否显示省份名字，现在是隐藏的状态，因为和散点图的名字重叠了。如果需要就true
              textStyle: {
                //名字的样式
                color: "#fff",
              },
            },
            emphasis: {
              show: true,
            },
          },
          //地图样式
          itemStyle: {
            normal: {
              borderColor: "#293171", //地图边框颜色
              borderWidth: "2", //地图边框粗细
              areaColor: "#0A0F33", //地图背景色
            },
            //省份地图阴影
            emphasis: {
              areaColor: null,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: "#fff",
            },
          },
        },
        series: series, //图表配置
      };
      mapChart.setOption(option); //生成图表
    },
    //玫瑰饼图
    Rose_diagram() {
      let mapChart = this.$echarts.init(
        document.getElementById("Rose_diagram")
      ); //图表初始化，china-map是绑定的元素
      window.onresize = mapChart.resize; //如果容器变大小，自适应从新构图
      // 提取config1中的数据
      let roseData = this.config.data;


      let option = {
        color: [
          "#37a2da",
          "#32c5e9",
          "#9fe6b8",
          "#ffdb5c",
          "#ff9f7f",
          "#fb7293",
          "#e7bcf3",
          "#8378ea",
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        toolbox: {
          show: true,
        },
        calculable: true,
        series: [
          {
            name: "通过率统计",
            type: "pie",
            radius: [10, 50],
            roseType: "area",
            center: ["50%", "40%"],
            data: roseData,
          },
        ],
      };
      mapChart.setOption(option); //生成图表
    },

    //柱状图
    columnar() {
      let mapChart = this.$echarts.init(document.getElementById("columnar")); //图表初始化，china-map是绑定的元素
      window.onresize = mapChart.resize; //如果容器变大小，自适应从新构图

      // 提取config1中的数据
      let xAxisData = this.config.data.map(item => item.name);
      let seriesData = this.config.data.map(item => item.value);
      let option = {
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255,255,255,0.1)",
          axisPointer: {
            type: "shadow",
            label: {
              show: true,
              backgroundColor: "#7B7DDC",
            },
          },
        },
        grid: {
          x: "8%",
          width: "95%",
          y: "4%",
        },
        xAxis: {
          data: xAxisData, // 使用config1中的数据
          // data: [
          // xAxisData, // 使用config1中的数据
          // ],
          axisLine: {
            lineStyle: {
              color: "#B4B4B4",
            },
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: [
          {
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: "#B4B4B4",
              },
            },

            axisLabel: {
              formatter: "{value} ",
            },
          },
        ],
        series: [
          {
            name: "数量",
            type: "bar",
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#956FD4" },
                  { offset: 1, color: "#3EACE5" },
                ]),
              },
            },
            data: seriesData, // 使用config1中的数据
            // data: [
            //   46, 50, 55, 650, 75, 85, 99, 125,
            // ],
          },
        ],
      };
      mapChart.setOption(option); //生成图表
    },
    //折线图
    line_center_diagram() {
      let mapChart = this.$echarts.init(
        document.getElementById("line_center_diagram")
      ); //图表初始化，china-map是绑定的元素
      window.onresize = mapChart.resize; //如果容器变大小，自适应从新构图
      let option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          position: "bottom",
          axisLine: true,
          axisLabel: {
            color: "rgba(255,255,255,.8)",
            fontSize: 12,
          },
        },
        yAxis: {
          type: "value",
          name: "年度生产量",
          nameLocation: "end",
          nameGap: 24,
          nameTextStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: 14,
          },
          splitNumber: 4,
          axisLine: {
            lineStyle: {
              opacity: 0,
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#fff",
              opacity: 0.1,
            },
          },
          axisLabel: {
            color: "rgba(255,255,255,.8)",
            fontSize: 12,
          },
        },
        grid: {
          left: 50,
          right: 10,
          bottom: 25,
          top: "18%",
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
            symbol: "emptyCircle",
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: "#fff",
              },
            },
            //线的颜色样式
            lineStyle: {
              normal: {
                color: this.colorList.linearBtoG,
                width: 3,
              },
            },
            //填充颜色样式
            areaStyle: {
              normal: {
                color: this.colorList.areaBtoG,
              },
            },
          },
        ],
      };
      mapChart.setOption(option); //生成图表
    },

  },
};
</script>

<style lang="scss">
//全局样式部分！！！！
* {
  margin: 0px;
  padding: 0px;
  list-style-type: none;
  outline: none;
  box-sizing: border-box;
}

html {
  margin: 0;
  padding: 0;
}

// body {
//   font-family: Arial, Helvetica, sans-serif;
//   // line-height: 1.2em;
//   background-color: #f1f1f1;
//   margin: 0;
//   padding: 0;
// }

a {
  color: #343440;
  text-decoration: none;
}

//--------------------------------------------

//页面样式部分！！！！
.container {
  color: #d3d6dd;
  max-width: 1700px;
  /* 最大宽度限制为1700px */
  width: 100%;
  /* 初始宽度为100% */
  height: auto;
  /* 高度自适应 */
  margin: 0 auto;
  /* 水平居中 */
  overflow: visible;
  /* 尝试修改 overflow 属性为 visible */
}

// .container {
//   color: #d3d6dd;
//   width: 100%; /* 初始宽度为100% */
//   max-width: 1700px; /* 最大宽度限制为1700px */
//   height: auto; /* 高度自适应 */
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   transform-origin: left top;
//   overflow: visible; /* 尝试修改 overflow 属性为 visible */
// }

.container-inner {
  width: 50%;
}

#index {
  color: #d3d6dd;
  width: 1890px;
  height: auto;
  position: absolute;
  top: 49%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: left top;
  overflow: hidden;

  .bg {
    //整体页面背景
    width: 100%;
    height: 100%;
    padding: 16px 16px 0 16px;
    background-image: url("../assets/images/background.png"); //背景图
    background-size: cover; //背景尺寸
    background-position: center center; //背景位置
  }

  //顶部右边装饰效果
  .title_left {
    width: 100%;
    height: 50px;
  }

  //顶部左边装饰效果
  .title_right {
    width: 100%;
    height: 50px;
    margin-top: 18px;
  }

  //顶部中间装饰效果
  .title_center {
    width: 100%;
    height: 5px;
  }

  //顶部中间陶源生物资产监管系统
  .title_text {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    margin-top: 30px;
    color: #008cff;
  }

  //时间日期
  .title_time {
    text-align: center;
  }

  //中国地图
  #china-map {
    height: 610px;
    width: 100%;
  }

  //中间折线图
  .line_center {
    width: 100%;
    height: 300px;
  }

  //左1模块
  .left_box1 {
    height: 300px;
    width: 96%;
    margin-left: 2%;
    margin-bottom: 10px;
    position: relative;
  }

  //左2模块
  .left_box2 {
    height: 280px;
    width: 96%;
    margin-left: 2%;
    margin-bottom: 10px;
  }

  //左3模块
  .left_box3 {
    height: 300px;
    width: 96%;
    margin-left: 2%;
  }

  //右1模块
  .right_box1 {
    height: 300px;
    width: 94%;
    margin-left: 2%;
    margin-bottom: 10px;
  }

  //右2模块
  .right_box2 {
    height: 280px;
    width: 94%;
    margin-left: 2%;
    margin-bottom: 10px;
  }

  //右3模块
  .right_box3 {
    height: 300px;
    width: 94%;
    margin-left: 2%;
  }

  //左1模块-玫瑰饼图
  #Rose_diagram {
    height: 80%;
    width: 55%;
    top: 60px;
  }

  //左1模块-圆环图
  .left_box1_rose_right {
    height: 85%;
    width: 55%;
    position: absolute;
    right: 0;
    top: 25px;
  }

  //左1模块-文字部分
  .rose_text {
    display: inline-block;
    margin-top: 4%;
    margin-left: 4%;
  }

  // 左1模块-￥符号样式
  .coin {
    font-size: 20px;
    color: #ffc107;
  }

  //左1模块-（件）样式
  .colorYellow {
    color: yellowgreen;
  }

  //左1模块-数字样式
  .rose_text_nmb {
    font-size: 20px;
    color: #00b891;
  }

  //左2模块 柱状图
  #columnar {
    height: 97%;
    width: 95%;
    margin-left: 3%;
    margin-top: 10px;
  }

  //折线图
  #line_center_diagram {
    height: 100%;
    width: 100%;
  }

  //轮播表格
  .carousel_list {
    width: 96%;
    height: 98%;
    margin-left: 10px;
  }

  //虚线柱状图
  #dotter_bar {
    width: 100%;
    height: 100%;
  }

  //锥形图
  .cone_box {
    width: 95%;
    height: 97%;
    margin-left: 3%;
  }
}

//预警信息背景透明
.el-table,
.el-table__expanded-cell,
tr,
.el-table__cell {
  background-color: transparent !important;
}

/* 在你的样式表中添加自定义样式 */
.custom-border-box {
  border: none;
  /* 移除边框 */
  padding: 10px;
  /* 可选：控制内容与边框的间距 */
  display: inline-block;
  /* 或者使用 display: inline-flex; */
  /* 其他样式 */
}
</style>
