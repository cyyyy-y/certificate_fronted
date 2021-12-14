<template>
  <div class="Echart">
    <div class="chart1">
      <div class="chart1-first">
        <div class="chart-first-icon">
          <img src="@/assets/first.png">
        </div>
        <div class="chart-first-text">{{firstPrice}}队</div>
      </div>
      <div class="chart1-second">
        <div class="chart-first-icon">
          <img src="@/assets/second.png">
        </div>
        <div class="chart-first-text">{{secondPrice}}队</div>
      </div>
      <div class="chart1-third">
        <div class="chart-first-icon">
          <img src="@/assets/third.png">
        </div>
        <div class="chart-first-text">{{thirdPrice}}队</div>
      </div>
    </div>
    <div class="chart2">
      <div class="chart2-school"></div>
      <div class="chart2-prize"></div>
    </div>
    <div class="chart3"></div>
<!--    &lt;!&ndash;为echarts准备一个具备大小的容器dom&ndash;&gt;-->
<!--    <div id="main1" style="width: 600px;height: 400px;"></div>-->
<!--    <div id="main2" style="width: 600px;height: 400px;"></div>-->
  </div>

</template>

<script>
  export default {
    name: "Charts",
    data() {
      return {
        firstPrice: 12,
        secondPrice: 45,
        thirdPrice: 68,
        school: [
          { name:'aaa', num:12 },
          { name:'bbb', num:32 },
          { name:'ccc', num:42 },
        ],
        sort: [
          { name:'ddd', num:24 },
          { name:'eee', num:34 },
          { name:'fff', num:46 },
        ]
      }
    },
    methods: {
      myEcharts(){
        var myChart1 = this.$echarts.init(document.getElementById('main1'));
        var option1 = {
          backgroundColor: '#2c343c',
          title: {
            text: 'Customized Pie',
            left: 'center',
            top: 20,
            textStyle: {
              color: '#ccc'
            }
          },
          tooltip: {
            trigger: 'item'
          },
          visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
              colorLightness: [0, 1]
            }
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [
                { value: 335, name: 'Direct' },
                { value: 310, name: 'Email' },
                { value: 274, name: 'Union Ads' },
                { value: 235, name: 'Video Ads' },
                { value: 400, name: 'Search Engine' }
              ].sort(function (a, b) {
                return a.value - b.value;
              }),
              roseType: 'radius',
              label: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              labelLine: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              },
              itemStyle: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                return Math.random() * 200;
              }
            }
          ]
        };
        myChart1.setOption(option1);

        var myChart2 = this.$echarts.init(document.getElementById('main2'));
        var option2 = {
          title: [
            {
              text: 'Radial Polar Bar Label Position (middle)'
            }
          ],
          polar: {
            radius: [30, '80%']
          },
          radiusAxis: {
            max: 4
          },
          angleAxis: {
            type: 'category',
            data: ['a', 'b', 'c', 'd'],
            startAngle: 75
          },
          tooltip: {},
          series: {
            type: 'bar',
            data: [2, 1.2, 2.4, 3.6],
            coordinateSystem: 'polar',
            label: {
              show: true,
              position: 'middle',
              formatter: '{b}: {c}'
            }
          },
          backgroundColor: '#fff',
          animation: false
        };
        myChart2.setOption(option2);
      }
    },
    mounted(){
      // this.myEcharts();
    }
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .chart1 {
    padding-left: 5px;
    height: 200px;
    width: 98%;
    display: flex;
    background-color: #ffffff;
    margin: 10px 10px 20px;
    box-shadow: 1px 1px 12px 1px #afbcc7;
    border-radius: 8px;
  }
  .chart1-first {
    height: 120px;
    width: 300px;
    margin-top: 40px;
    margin-left: 40px;
    box-shadow: 1px 1px 12px 1px #afbcc7;
    border-radius: 8px;
    display: flex;
  }
  .chart1-second {
    height: 120px;
    width: 300px;
    margin-top: 40px;
    margin-left: 40px;
    box-shadow: 1px 1px 12px 1px #afbcc7;
    border-radius: 8px;
    display: flex;
  }
  .chart1-third {
    height: 120px;
    width: 300px;
    margin-top: 40px;
    margin-left: 40px;
    box-shadow: 1px 1px 12px 1px #afbcc7;
    border-radius: 8px;
    display: flex;
  }
  .chart-first-icon {
    height: 100%;
    width: 35%;
    display: flex;
    padding-left: 20px;
    align-items: center;
    justify-content: center;
  }
  .chart-first-text {
    height: 100%;
    width: 65%;
    display: flex;
    align-items: center;
    padding-left: 20px;
    font-weight: bolder;
    font-size: x-large;
    color: #545c64;
  }
  .chart2 {
    height: 400px;
    width: 98%;
    display: flex;
    margin: 10px 10px 20px;
  }
  .chart2-school {
    height: 100%;
    width: 65%;
    background-color: #ffffff;
    margin-right: 1%;
    box-shadow: 1px 1px 12px 1px #afbcc7;
    border-radius: 8px;
  }
  .chart2-prize {
     height: 100%;
     width: 34%;
    background-color: #ffffff;
    box-shadow: 1px 1px 12px 1px #afbcc7;
    border-radius: 8px;
   }
  .chart3 {
    margin: 10px;
    height: 400px;
    width: 98%;
    background-color: #ffffff;
    box-shadow: 1px 1px 12px 1px #afbcc7;
    border-radius: 8px;
  }
</style>
