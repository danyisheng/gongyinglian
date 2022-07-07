<template>
  <div class="charts" :style="{height:heights,width:width}"></div>
</template>
<script>
import echarts from "echarts";
export default {
  props: {
    width: {
      type: String,
      default: "90%"
    },
    height: {
      type: String,
      default: "450px"
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  watch:{
      chartData:{
          deep:true,
          handler(val){
              this.setOptions(val)
          }
      }
  },
  data() {
    return {};
  },
  computed:{
    heights(){
      return window.innerHeight-450+'px'
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    init() {
      this.chart = echarts.init(this.$el);
      this.setOptions(this.chartData);
    },
    setOptions({ expectedData, actualData,supplementData,data,length,HSNum,supplyer } = {}) {
      this.chart.setOption({
        xAxis: {
          data: data,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 30,
          bottom: 20,
          top: 60,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: length,
          itemWidth: 60,
          textStyle:{
            fontSize:15,
          }
        },
        series: [
          {
            name: "采购单",
            itemStyle: {
              normal: {
                color: "#FF005A",
                lineStyle: {
                  color: "#FF005A",
                  width: 2
                }
              }
            },
            smooth: true,
            type: "line",
            data: expectedData,
            animationDuration: 1000,
            animationEasing: "cubicInOut"
          },
          {
            name: "采购发货数",
            smooth: true,
            type: "line",
            itemStyle: {
              normal: {
                color: "#3888fa",
                lineStyle: {
                  color: "#3888fa",
                  width: 2
                },
                // areaStyle: {
                //   color: "#f3f8ff"
                // }
              }
            },
            data: actualData,
            animationDuration: 1000,
            animationEasing: "quadraticOut"
          },
          {
            name: "补发发货数",
            smooth: true,
            type: "line",
            itemStyle: {
              normal: {
                color: "#9bff18",
                lineStyle: {
                  color: "#9bff18",
                  width: 2
                },
                // areaStyle: {
                //   color: "#f3f8ff"
                // }
              }
            },
            data: supplementData,
            animationDuration: 1000,
            animationEasing: "quadraticOut"
          },
          {
            name: "货损数",
            smooth: true,
            type: "line",
            itemStyle: {
               normal: {
                color: "#FF005A",
                lineStyle: {
                  color: "#FF005A",
                  width: 2
                }
              }
            },
            data: HSNum,
            animationDuration: 1000,
            animationEasing: "quadraticOut"
          },
          {
            name: "新增供应商",
            smooth: true,
            type: "line",
            itemStyle: {
             normal: {
                color: "#3888fa",
                lineStyle: {
                  color: "#3888fa",
                  width: 2
                },
                // areaStyle: {
                //   color: "#f3f8ff"
                // }
              }
            },
            data: supplyer,
            animationDuration: 1000,
            animationEasing: "quadraticOut"
          }
        ]
      });
    }
  }
};
</script>