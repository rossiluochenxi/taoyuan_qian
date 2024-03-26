<template>
  <div class="map-data-container">
    <div class="map-section">
      <div id="mapContainer" class="map-container"></div>
    </div>
    <div class="data-section" style="margin-top: 15px;">
      <div class="input-section">
        <div class="input-item">
          <label for="farmer">养殖户</label>
          <input type="text" id="farmer" v-model="farmerName" class="input-field">
        </div>
        <div class="input-item">
          <label for="earTag">牲畜耳标号</label>
          <input type="text" id="earTag" v-model="earTagNumber" class="input-field">
        </div>
        <div class="input-item">
          <button @click="search" class="search-button">查询</button>
        </div>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>养殖户</th>
            <th>牲畜标号</th>
            <th>设备编号</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in searchData" :key="index" class="data-row">
            <td>{{ item.farmer }}</td>
            <td>{{ item.earTag }}</td>
            <td>{{ item.device }}</td>
            <td><button @click="locateOnMap(index)" class="locate-button">定位</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Map",
  data() {
    return {
      map: null,
      farmerName: "",
      earTagNumber: "",
      deviceNumber: "",
      searchData: [
        { farmer: "养殖户1", earTag: "001", device: "A001" },
        { farmer: "养殖户2", earTag: "002", device: "A002" },
        { farmer: "养殖户3", earTag: "003", device: "A003" }
      ]
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.map = new AMap.Map("mapContainer", {
        zoom: 10,
        center: [116.396, 39.919],
        resizeEnable: true
      });
      // 添加其他地图初始化操作
    },
    search() {
      // 执行查询操作
    },
    locateOnMap(index) {
      // 在地图上定位到指定位置
    }
  }
};
</script>

<style scoped>
.map-data-container {
  display: flex;
}

.map-section {
  flex: 1;
}

.data-section {
  flex: 1;
  padding-left: 500px;
  margin-top: 15px; /* 将整体向下移动 15 像素 */
}

.map-container {
  width: 180%;
  height: 860px;
}

.input-section {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}

.input-item {
  flex: 1;
  margin-right: 10px;
}

.input-field {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-button {
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 22px; /* 将按钮向下移动22像素 */
  transition: background-color 0.3s, box-shadow 0.3s;
}
.search-button:hover {
  background-color: #0056b3;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #ccc;
  font-weight: bold;
}

.data-table th {
  background-color: #f0f0f0;
}

.data-table td {
  background-color: #f9f9f9;
}

.data-row:hover {
  background-color: #e9e9e9;
}

.locate-button {
  padding: 6px 12px;
  background-color: #5cb85c;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
</style>
