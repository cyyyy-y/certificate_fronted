<template>
  <div class="Echart">
    <!--为echarts准备一个具备大小的容器dom-->
    <div id="main" style="width: 600px;height: 400px;"></div>
  </div>

</template>

<script>
  export default {
    name: "Charts",
    methods: {
      myEcharts(){
        var myChart = this.$echarts.init(document.getElementById('main'));
        //配置图表
        var option = {
          title: {
            text: 'echarts入门示例',
          },
          tooltip: {},
          legend: {
            data: ['销量']
          },
          xAxis: {
            data: ['衬衫','羊毛衫','雪纺衫','裤子','高跟鞋','袜子']
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5,20,36,10,10,20]
          }]
        };
        myChart.setOption(option);
      }
    },
    mounted(){
      this.myEcharts();
    }
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
