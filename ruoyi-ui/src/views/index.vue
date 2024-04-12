<template>
  <div class="app-container home">

    <div class="left-column">
      <div class="box big-box blue">
        <canvas id="pieChart" width="200" height="200"></canvas>
      </div>
      <div class="box big-box blue">
        <canvas id="barChart" width="400" height="200"></canvas>
      </div>
      <div class="box big-box blue">
        <table class="monitoring-table">
          <caption>视频监控</caption>
          <thead>
            <tr>
              <th>设备编号</th>
              <th>设备名称</th>
              <th>养殖户名称</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>001</td>
              <td>摄像头1</td>
              <td>张三</td>
            </tr>
            <tr>
              <td>002</td>
              <td>摄像头2</td>
              <td>李四</td>
            </tr>
            <!-- 可以继续添加更多的表格行 -->
          </tbody>
        </table>
      </div>
    </div>

    <div class="middle-column">
      <div class="box bigger-box blue">陶源畜牧平台
        <div id="mapContainer" class="map-container"></div>
      </div>

      <div class="box small-box blue">
        <p style="text-align: center;">这是一个小盒子</p>
      </div>
    </div>

    <div class="right-column">
      <div class="box big-box blue">
        <p style="text-align: center;">这是一个大盒子</p>
      </div>
      <div class="box big-box blue">
        <p style="text-align: center;">这是一个大盒子</p>
      </div>
      <div class="box big-box blue">
        <p style="text-align: center;">这是一个大盒子</p>
      </div>
    </div>

  </div>
</template>

<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons')

export default {
  name: 'Home',
  data() {
    return {
      //livestock牲畜坐标
      // livestockCoordinates:[],
      //圆心坐标
      centerl:[],
      //用户经纬度
      lon: null,
      lat: null,
    };
  },
  mounted() {
    this.createPieChart();
    this.createBarChart();
    this.initMap();
  },
//   created() {
//     this.initMap();
// },
  methods: {

    initMap() {
      this.map = new AMap.Map("mapContainer", {
        zoom: 8,
        center: [123.414875, 41.908154],
        resizeEnable: true
      });
      console.log("调用了吗")

          
  },

  createPieChart() {
  var ctx = document.getElementById('pieChart');
  var myChart = echarts.init(ctx, 'macarons');
  var option = {
    grid: {
      left: '20%', // 设置左边距
      containLabel: true // 是否包含坐标轴的刻度标签
    },
    series: [{
      type: 'pie',
      data: [
        { name: '牛', value: 20, itemStyle: { color: '#FF5722' } }, // 使用不同的颜色区分
        { name: '猪', value: 30, itemStyle: { color: '#2196F3' } },
        { name: '羊', value: 25, itemStyle: { color: '#4CAF50' } },
        { name: '鸡', value: 15, itemStyle: { color: '#FFC107' } }
      ]
    }]
  };
  myChart.setOption(option);
},
    // createPieChart() {
    //   var ctx = document.getElementById('pieChart');
    //   var myChart = echarts.init(ctx, 'macarons');
    //   var option = {
    //     series: [{
    //       type: 'pie',
    //       data: data: [{
    //     name: '牛',
    //     value: 20
    //   }]
    //     }]
    //   };
    //   myChart.setOption(option); 
    // },
    createBarChart() {
      var ctx = document.getElementById('barChart'); 
      var myChart = echarts.init(ctx, 'macarons');
      var option = {
        xAxis: {
          type: 'category',
          data: ['牛']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [20],
          type: 'bar'
        }]
      };
      myChart.setOption(option);
    }
  }
};
</script>

<style scoped>
/* 样式可以根据您的需求自行调整 */
.app-container {
  display: flex;
  justify-content: space-between;
  /* max-width: 1330px; */
  margin: 0 auto;/* 宽度自适应 */
  height: auto; /* 高度自适应 */
  background-color: #001f3f; /* 深蓝色 */
  /* gap: 10px; 列之间的间隔为10px */
}

.box {
  margin-bottom: 20px;
  padding: 20px;
  box-sizing: border-box;
}

.blue {
  background-color: #3573a8; /* 蓝色 */
  color: #fff; /* 文字颜色 */
}

.map-container {
  width: 100%;
  height: 90%;
  /* width: 455px;
  height: 390px; */
  margin-top: 38px; /* 向下移动 20px */
}

.left-column,
.middle-column,
.right-column {
  /* flex: 1;
  display: flex;
  flex-direction: column;
  width: calc(33.33% - 10px); */
  flex-grow: 1; /* 等分剩余空间 */
  display: flex;
  flex-direction: column;
  width: calc(33.33% - 10px); /* 计算宽度，考虑到间隙 */
  margin-right: 10px; /* 为了留出间隙 */

}

.big-box,
.small-box {
  flex: 1;
}

.bigger-box {
  height: 470px; /* 调整更大的盒子的高度 */

  font-size: 24px; /* 调整更大的盒子的文字大小 */
  line-height: 10px; /* 垂直居中文本，这里是盒子高度的一半 */
  vertical-align: middle; /* 垂直居中文本 */
  text-align: center; /* 水平居中文本 */
}

.monitoring-table {
  border-collapse: collapse; /* 合并边框 */
  width: 100%;
}

.monitoring-table th,
.monitoring-table td {
  border: 1px solid #ddd; /* 设置单元格边框样式 */
  padding: 8px; /* 设置单元格内边距 */
  text-align: left; /* 文字左对齐 */
}

.monitoring-table th {
  background-color: #f2f2f2; /* 设置表头背景颜色 */
  color: #333; /* 设置表头文字颜色 */
}
</style>

