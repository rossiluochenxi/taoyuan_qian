<template>
  <div id="container" style="width: 100%; height: calc(100vh - 100px)"></div>
</template>

<script>
export default {
  name: "Map",
  data() {
    return {
      validLatLng: [121.473667, 31.230525] // 有效的经纬度坐标

    }
  },
  mounted() {
    // 创建地图实例
    var map = new AMap.Map("container", {
      zoom: 12,
      center: [116.396901, 39.919544],
      resizeEnable: true
    });
    // 创建一个Marker实例
    var marker = new AMap.Marker({
      position: new AMap.LngLat(116.396901, 39.919544),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      title: '北京故宫',
    });
    // 将创建的点标记添加到已有的地图实例
    map.add(marker);
  },

}
</script>

<style scoped>

</style>

