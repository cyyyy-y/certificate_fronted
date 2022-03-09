<template>
  <div class="Echart">
    <div class="chart1">
      <div class="chart1-first">
        <div class="chart-first-icon">
          <img src="@/assets/first.png">
        </div>
        <div class="chart-first-text">{{price[0].value}}队</div>
      </div>
      <div class="chart1-second">
        <div class="chart-first-icon">
          <img src="@/assets/second.png">
        </div>
        <div class="chart-first-text">{{price[1].value}}队</div>
      </div>
      <div class="chart1-third">
        <div class="chart-first-icon">
          <img src="@/assets/third.png">
        </div>
        <div class="chart-first-text">{{price[2].value}}队</div>
      </div>
    </div>
    <div class="chart2">
      <div class="chart2-school" id="main1"></div>
      <div class="chart2-prize" id="main2"></div>
    </div>
    <div class="chart3" id="main3"></div>
<!--    &lt;!&ndash;为echarts准备一个具备大小的容器dom&ndash;&gt;-->
<!--    <div id="main1" style="width: 600px;height: 400px;"></div>-->
<!--    <div id="main2" style="width: 600px;height: 400px;"></div>-->
  </div>

</template>

<script>
  import {selectAll} from "../network/file";

  export default {
    name: "Charts",
    data() {
      return {
        tableData: [],
        price: [
          { value: 41, name: '一等奖' },
          { value: 80, name: '二等奖' },
          { value: 115, name: '三等奖' },
        ],
        schoolName: ['杭州电子科技大学', '杭州电子科技大学信息工程学院', '杭州师范大学', '杭州师范大学钱江学院',
          '湖州师范学院', '湖州学院', '嘉兴南湖学院','嘉兴学院',
          '丽水学院', '宁波大学', '宁波工程学院','宁波卫生职业技术学院',
          '台州学院', '温州肯恩大学', '浙江财经大学','浙江传媒学院',
          '浙江大学城市学院', '浙江工商大学', '浙江广厦建设职业技术学院','浙江海洋大学',
          '浙江科技学院', '浙江理工大学', '浙江农林大学','浙江农林大学暨阳学院',
          '浙江师范大学', '浙江师范大学行知学院', '浙江树人大学','浙江音乐学院',
          '浙江越秀外国语学院', '浙江中医药大学', '中国美术学院'],
        schoolNum:[10, 1, 32, 4,
          9, 4, 1, 7,
          5, 3, 4, 1,
          20, 1, 10, 27,
          2, 9, 5, 3,
          12, 1, 21, 5,
          11, 4, 1, 10,
          7, 5, 2],
        sortName: ['大数据应用', '计算机音乐制作（普通组）', '计算机音乐创作专业组', '人工智能应用',
          '软件应用与开发', '数媒动漫与短片（普通组）', '数媒动漫与短片专业组','数媒静态设计（普通组）',
          '数媒静态设计专业组', '数媒游戏与交互设计（普通组）', '数媒游戏与交互设计专业组','微课与教学辅助',
          '物联网应用', '信息可视化设计'],
        sortNum:[6, 2, 13, 19,
          37, 6, 20, 14,
          34, 8, 10, 31,
          13, 23],
      }
    },
    methods: {
      myEcharts(){
        var that = this;

        var myChart1 = this.$echarts.init(document.getElementById('main1'));
        var option1 = {
          title: {
            text: '参赛学校获奖情况',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: that.schoolName,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: 'Direct',
              type: 'bar',
              barWidth: '50%',
              data: that.schoolNum,
              itemStyle:{
                normal:{
                  color:'#5b636b'
                }
              },
            }
          ]
        };
        myChart1.setOption(option1);

        var myChart2 = this.$echarts.init(document.getElementById('main2'));
        var option2 = {
          title:{
            text: '获奖比例'
          },
          legend: {
            top: 'bottom'
          },
          toolbox: {
            show: true,
          },
          series: [
            {
              name: 'Nightingale Chart',
              type: 'pie',
              radius: [50, 110],
              center: ['50%', '45%'],
              roseType: 'area',
              itemStyle: {
                borderRadius: 8
              },
              data: that.price
            }
          ]
        };
        myChart2.setOption(option2);

        var myChart3 = this.$echarts.init(document.getElementById('main3'));
        var option3 = {
          title: {
            text: '参赛作品类别',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: that.sortName,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: 'Direct',
              type: 'bar',
              barWidth: '35%',
              data: that.sortNum,
              itemStyle:{
                normal:{
                  color:'#5b636b'
                }
              },
            }
          ]
        };
        myChart3.setOption(option3);
      }
    },
    mounted(){
      this.myEcharts();
    },
    created() {
      var that = this;
      selectAll().then(res => {
        that.tableData = res.data;
        console.log(res.data)
      })
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
    background-color: rgb(255, 255, 255);
    margin: 10px 10px 20px;
    box-shadow: 1px 1px 12px 1px #afbcc7;
    border-radius: 8px;
  }
  .chart1-first {
    height: 120px;
    width: 300px;
    margin-top: 40px;
    margin-left: 40px;
    box-shadow: 1px 1px 2px 1px #afbcc7;
    border-radius: 8px;
    display: flex;
  }
  .chart1-first:hover {
    height: 120px;
    width: 300px;
    margin-top: 40px;
    margin-left: 40px;
    box-shadow: 1px 1px 14px 1px #afbcc7;
    border-radius: 8px;
    display: flex;
  }
  .chart1-second {
    height: 120px;
    width: 300px;
    margin-top: 40px;
    margin-left: 40px;
    box-shadow: 1px 1px 2px 1px #afbcc7;
    border-radius: 8px;
    display: flex;
  }
  .chart1-second:hover {
    height: 120px;
    width: 300px;
    margin-top: 40px;
    margin-left: 40px;
    box-shadow: 1px 1px 14px 1px #afbcc7;
    border-radius: 8px;
    display: flex;
  }
  .chart1-third {
    height: 120px;
    width: 300px;
    margin-top: 40px;
    margin-left: 40px;
    box-shadow: 1px 1px 2px 1px #afbcc7;
    border-radius: 8px;
    display: flex;
  }
  .chart1-third:hover {
    height: 120px;
    width: 300px;
    margin-top: 40px;
    margin-left: 40px;
    box-shadow: 1px 1px 14px 1px #afbcc7;
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
    padding-top: 10px;
    padding-left: 10px;
    height: 100%;
    width: 65%;
    background-color: #ffffff;
    margin-right: 1%;
    box-shadow: 1px 1px 12px 1px #afbcc7;
    border-radius: 8px;
  }
  .chart2-prize {
    padding: 10px;
    height: 98%;
    width: 34%;
    background-color: #ffffff;
    box-shadow: 1px 1px 12px 1px #afbcc7;
    border-radius: 8px;
   }
  .chart3 {
    padding-top: 10px;
    padding-left: 10px;
    margin: 30px 10px 10px;
    height: 400px;
    width: 97.5%;
    background-color: #ffffff;
    box-shadow: 1px 1px 12px 1px #afbcc7;
    border-radius: 8px;
  }
</style>
