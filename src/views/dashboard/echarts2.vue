<template>
  <div class="chart-container">
     <el-row :gutter="10" class="row_list order_list">
				<el-col :span="7">
					<log-list></log-list>
   
				</el-col>
				<el-col :span="17">
					<bar-chart type="barChart"></bar-chart>
				</el-col>
			</el-row>
    <section class="data_section" ref="data_section">
      <el-row :gutter="10" class="row_list">
        <el-col :span="8" style="height=150px">
          <div class="row_left row_base">
            <el-col :span="12" style="background: #E6A23C; height=150px">
              <div
                class="pay saleBgcolor data_list rflex"
              >
                <div class="leftItem cflex wflex" style="float: left">
                  <p class="investor">新增用户</p>
                  <p class="number">68<span class="perTitle">(上涨：1%)</span></p>
                </div>

                <div class="rightItem" style="float: left;font-size:50px;padding-left: 30px;padding-top: 30px;">
                  <i class="el-icon-s-promotion" ></i>
                </div>
              </div>
            </el-col>
            <el-col :span="12" style="background: #409EFF">
              <div class="pay taxBgcolor data_list rflex">
                <div class="leftItem cflex wflex" style="float: left">
                  <p class="investor">上线人数</p>
                  <p class="number">120<span class="perTitle">(活跃：50%)</span></p>
                </div>
                 <div class="rightItem" style="float: left;font-size:50px;padding-left: 30px;padding-top: 30px;">
                  <i class="el-icon-upload" ></i>
                </div>
              </div>
            </el-col>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="row_right row_base">
            <el-col :span="6" style="background: 	#28FF28">
              <div class="extenedBgcolor data_list rflex">
                <div class="leftItem cflex wflex" style="float: left">
                  <p class="investor">访问量</p>
                  <p class="number">686<span class="perTitle">(123)</span></p>
                  <p class="cardText">Decreased by 10%</p>
                </div>
                <div class="rightItem" style="float: left;font-size:50px;padding-left: 30px;padding-top: 30px;">
                  <i class="el-icon-view" ></i>
                </div>
              </div>
            </el-col>
            <el-col :span="6" style="background: #216">
              <div class="likeBgcolor data_list rflex">
                <div class="leftItem cflex wflex" style="float: left">
                  <p class="investor">处理量</p>
                  <p class="number">1276<span class="perTitle">(123)</span></p>
                  <p class="cardText">Decreased by 50%</p>
                </div>
                <div class="rightItem" style="float: left;font-size:50px;padding-left: 30px;padding-top: 30px;">
                  <i class="el-icon-s-check" ></i>
                </div>
              </div>
            </el-col>
            <el-col :span="6" style="background: #EA0000">
              <div class="linkBgColor data_list rflex">
                <div class="leftItem cflex wflex" style="float: left">
                  <p class="investor">待处理</p>
                  <p class="number">82367<span class="perTitle">(123)</span></p>
                  <p class="cardText">Decreased by 30%</p>
                </div>
                <div class="rightItem" style="float: left;font-size:50px;padding-left: 30px;padding-top: 30px;">
                  <i class="el-icon-s-flag" ></i>
                </div>
              </div>
            </el-col>
            <el-col :span="6" style="background: #FF79BC">
              <div class="keleBgColor data_list rflex">
                <div class="leftItem cflex wflex" style="float: left">
                  <p class="investor">下单量</p>
                  <p class="number">
                    827373<span class="perTitle">(123)</span>
                  </p>
                  <p class="cardText">Decreased by 80%</p>
                </div>
                <div class="rightItem" style="float: left;font-size:50px;padding-left: 30px;padding-top: 30px;">
                  <i class="el-icon-platform-eleme" ></i>
                </div>
              </div>
            </el-col>
          </div>
        </el-col>
      </el-row>
    </section>

   <el-row :gutter="10" class="row_list order_list">
				<el-col :span="7">
				    <pie-chart type="ordertype"></pie-chart>
				</el-col>
				<el-col :span="10">
					<line-chart></line-chart>
				</el-col>
			   	<el-col :span="7">
					<radar-chart></radar-chart>
				</el-col>
			</el-row> 
      <div height="20px">

      </div>

    <el-row>
      <el-col :span="12" class="chart chart_left">
        <div id="userChart" style="height: 650px">图表加载失败</div>
      </el-col>
      <el-col :span="12" class="chart">
        <div id="userDoChart" style="height: 650px">图表加载失败</div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import echarts from 'echarts'
import * as echarts from "echarts";
import logList from "./logList";  // 日志列表
import barChart from './barChart' // 用户投资类型 柱状图
import pieChart from './pieChart' // 用户投资类型 饼状图
import radarChart from './radarChart' // 用户投资类型 雷达图
import lineChart from './lineChart' // 用户投资类型 折线图

export default {
  data() {
    return {
       value: new Date()
    };
  },
  components: {
		  
		   logList,
       barChart,
       pieChart,
       radarChart,
       lineChart,



		   
		},	
  methods: {
    // 加载用户来源图
    getUserChartInit() {
      const myChart = echarts.init(document.getElementById("userChart"));
      myChart.showLoading();
      var option = {
        title: {
          text: "用户来源",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["华东", "华北", "华南", "西部", "其他"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "华东",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "华北",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "华南",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "西部",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "其他",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top",
              },
            },
            areaStyle: { normal: {} },
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      };
      myChart.setOption(option);
      myChart.hideLoading();
    },
    // 加载每日用户行为图
    getUserDoChartInit() {
      const myChart = echarts.init(document.getElementById("userDoChart"));
      myChart.showLoading();
      var app = {};
      var option = null;
      var cellSize = [80, 80];
      var pieRadius = 30;

      function getVirtulData() {
        var date = +echarts.number.parseDate("2017-02-01");
        var end = +echarts.number.parseDate("2017-03-01");
        var dayTime = 3600 * 24 * 1000;
        var data = [];
        for (var time = date; time < end; time += dayTime) {
          data.push([
            echarts.format.formatTime("yyyy-MM-dd", time),
            Math.floor(Math.random() * 10000),
          ]);
        }
        return data;
      }

      function getPieSeries(scatterData, chart) {
        return echarts.util.map(scatterData, function (item, index) {
          var center = chart.convertToPixel("calendar", item);
          return {
            id: index + "pie",
            type: "pie",
            center: center,
            label: {
              normal: {
                formatter: "{c}",
                position: "inside",
              },
            },
            radius: pieRadius,
            data: [
              { name: "工作", value: Math.round(Math.random() * 24) },
              { name: "娱乐", value: Math.round(Math.random() * 24) },
              { name: "睡觉", value: Math.round(Math.random() * 24) },
            ],
          };
        });
      }

      function getPieSeriesUpdate(scatterData, chart) {
        return echarts.util.map(scatterData, function (item, index) {
          var center = chart.convertToPixel("calendar", item);
          return {
            id: index + "pie",
            center: center,
          };
        });
      }
      var scatterData = getVirtulData();
      option = {
        tooltip: {},
        title: {
          text: "每日用户行为",
        },
        legend: {
          data: ["工作", "娱乐", "睡觉"],
          bottom: 20,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        calendar: {
          top: "middle",
          left: "center",
          orient: "vertical",
          cellSize: cellSize,
          yearLabel: {
            show: false,
            textStyle: {
              fontSize: 30,
            },
          },
          dayLabel: {
            margin: 20,
            firstDay: 1,
            nameMap: [
              "星期日",
              "星期一",
              "星期二",
              "星期三",
              "星期四",
              "星期五",
              "星期六",
            ],
          },
          monthLabel: {
            show: false,
          },
          range: ["2017-02"],
        },
        series: [
          {
            id: "label",
            type: "scatter",
            coordinateSystem: "calendar",
            symbolSize: 1,
            label: {
              normal: {
                show: true,
                formatter: function (params) {
                  return echarts.format.formatTime("dd", params.value[0]);
                },
                offset: [-cellSize[0] / 2 + 10, -cellSize[1] / 2 + 10],
                textStyle: {
                  color: "#000",
                  fontSize: 14,
                },
              },
            },
            data: scatterData,
          },
        ],
      };
      if (!app.inNode) {
        var pieInitialized;
        setTimeout(function () {
          pieInitialized = true;
          myChart.setOption({
            series: getPieSeries(scatterData, myChart),
          });
        }, 10);

        app.onresize = function () {
          if (pieInitialized) {
            myChart.setOption({
              series: getPieSeriesUpdate(scatterData, myChart),
            });
          }
        };
      }
      if (option && typeof option === "object") {
        myChart.setOption(option, true);
      }
      myChart.hideLoading();
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.getUserChartInit();
      this.getUserDoChartInit();
    });
  },
};
</script>
<style scoped>
.chart {
  background-color: white;
  border-radius: 4px;
}

.chart_left {
  border-right: #f2f2f2 10px solid;
}
/* .el-col-12 {
  height: 150px;
} */

.data_section {
  margin: 20px;
  border-radius: 2px;
}

.row_list {
  margin-bottom: 10px;
}

.row_base {
  box-sizing: border-box;
  border-radius: 6px;
  height: 150px;
}
.data_list {
  text-align: center;
  font-size: 14px;
  border-radius: 6px;
  padding: 10px;
  color: #fff;
  height: 150px;
}
.leftItem {
  align-items: start;
  justify-content: space-between;
  text-align: left;
}
.rightItem {
  width: 62px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.svg-icon {
  font-size: 30px;
}

.number {
  font-size: 22px;
  font-weight: bold;
}
.perTitle {
  font-size: 13px;
  margin-left: 5px;
}
.pay .leftItem {
  justify-content: space-around;
}
.order_list .orderArea {
  width: 100%;
  height: 300px;
  background: #fff !important;
  border-radius: 6px;
  box-sizing: border-box;
  padding: 10px;
  padding-top: 40px;
  overflow: hidden;
}
.order_list .orderbarArea {
  height: 370px;
}
</style>
