<template>
  <div>
    <el-button type="primary" @click="preview">预览证书</el-button>
    <el-dialog
      title="证书预览和下载"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">

      <div id="pdfDom">
        <div class="proBox">

          <el-row>
            <el-col :span="10"><p class="tit-left">获奖</p></el-col>
            <el-col :span="4">
              <el-divider class="pic"></el-divider>
            </el-col>
            <el-col :span="10"><p class="tit-right">证书</p></el-col>
          </el-row>

          <el-row>
            <el-col>
              <p class="con">
                <span>杭州电子科技大学</span>作品《<span>圈圈-基于推荐算法的智慧校园应用</span>》在2021年（第14届）中国大学生计算机设计大赛浙江省级赛中荣获
              </p>
            </el-col>
          </el-row>

          <el-row>
            <el-col>
              <p class="con-main"><span>三等奖</span></p>
            </el-col>
          </el-row>

          <el-row class="row">
            <el-col><p>作者：<span>葛亮、王书臣、陈升</span></p></el-col>
          </el-row>
          <el-row class="row">
            <el-col><p>指导老师：<span>马虹</span></p></el-col>
          </el-row>
          <el-row class="row">
            <el-col><p>作品分类：<span>软件应用与开发</span></p></el-col>
          </el-row>
          <el-row class="row">
            <el-col><p>证书编号：<span>2021023164</span></p></el-col>
          </el-row>

          <el-row>
            <el-col>
              <div class="con-unit">
                <p class="con-text">中国大学生计算机设计大赛浙江省级赛组织委员会</p>
                <p>2021年8月&nbsp</p>
                <div class="chapter" v-show="isShow"></div>
              </div>
            </el-col>
          </el-row>

        </div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-switch
          inactive-color="#67c23a"
          v-model="downType"
          active-text="图片下载"
          inactive-text="pdf下载"
          style="margin-right: 20px;"
        >
        </el-switch>
        <el-checkbox v-model="isShow" style="margin-right: 20px;">添加盖章</el-checkbox>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="getPdf('#pdfDom')">下载</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "demo",
    data() {
      return {
        dialogVisible: false,
        pageData: null, //接收html格式代码
        htmlTitle: "获奖证书",
        isShow: true,
        isCanvas: false,
        downType: true // false为 pdf , true为图片
      };
    },
    methods: {
      handleClose() {
        this.dialogVisible = false;
      },
      preview() {
        this.dialogVisible = true;
        this.$nextTick(()=> {
          if(!this.isCanvas) {
            // 只绘画一次
            this.isCanvas = true
            this.getChapter()
          }
        })
      },
      // 生成印章
      getChapter() {
        var canvas = document.getElementById("chapterCanvas");
        var context = canvas.getContext("2d");

        var text = "浙江省级赛组织委员会";
        var companyName = "中国大学生计算机设计大赛";
        //  context.translate(0, 0);
        // context.clearRect(0, 0, 200, 200);//清除整个画布
        // 绘制印章边框
        var width = canvas.width / 2;
        var height = canvas.height / 2;
        context.lineWidth = 3;
        context.strokeStyle = "#cf0c0c";
        context.beginPath();
        context.arc(width, height, 60, 0, Math.PI * 2); //宽、高、半径
        context.stroke();

        //画五角星
        create5star(context, width, height, 15, "#cf0c0c", 0);

        // 绘制印章名称
        context.font = "20px 宋体";
        context.textBaseline = "middle"; //设置文本的垂直对齐方式
        context.textAlign = "center"; //设置文本的水平对对齐方式
        context.lineWidth = 1;
        context.strokeStyle = "#cf0c0c";
        // context.strokeText(text, width, height + 30); // 名称 xx专用章

        // 绘制印章单位
        context.translate(width, height); // 平移到此位置,
        context.font = "20px 宋体";
        var count = companyName.length; // 字数
        var angle = (5 * Math.PI) / (3 * (count - 1)); // 字间角度
        var chars = companyName.split("");
        var c;
        for (var i = 0; i < count; i++) {
          c = chars[i]; // 需要绘制的字符
          if (i == 0) {
            context.rotate((4 * Math.PI) / 6);// 文字起始位置
          } else {
            context.rotate(angle);
          }

          context.save();
          context.translate(45, 0); // 平移到此位置,此时字和x轴垂直，公司名称和最外圈的距离
          context.rotate(Math.PI / 2); // 旋转90度,让字平行于x轴
          context.strokeText(c, 0, 0); // 此点为字的中心点
          context.restore();
        }

        //绘制五角星
        function create5star(context, sx, sy, radius, color, rotato) {
          context.save();
          context.fillStyle = color;
          context.translate(sx, sy); //移动坐标原点
          context.rotate(Math.PI + rotato); //旋转
          context.beginPath(); //创建路径
          var x = Math.sin(0);
          var y = Math.cos(0);
          var dig = (Math.PI / 5) * 4;
          for (var i = 0; i < 5; i++) {
            //画五角星的五条边
            var x = Math.sin(i * dig);
            var y = Math.cos(i * dig);
            context.lineTo(x * radius, y * radius);
          }
          context.closePath();
          context.stroke();
          context.fill();
          context.restore();
        }
      }
    }
  };
</script>

<style scoped >
  ::v-deep .el-dialog__body {
    padding: 0px;
    display: flex;
    justify-content: center;
  }
  #pdfDom {
    /* 要想pdf周边留白，要在这里设置 */
    padding: 20px;
    width: 750px;
  }
  .proBox {
    background: url("../assets/zs.jpeg") no-repeat;
    background-size: cover;
    width: 750px;
    height: 525px;
    padding: 75px 94px;
    box-sizing: border-box;
    margin: 0 auto;
    position: relative;
    color: #000;
    font-family: SimSun;
  }
  .pic {
    background: url("../assets/title.png");
    background-size: 100% 100%;
    width: 90px;
    height: 90px;
    position: absolute;
    top: -40px;
  }
  .tit-left {
    color: #cf0c0c;
    font-size: 40px;
    font-weight: 700;
    position: relative;
    top: 0px;
    left: 8px;
    letter-spacing: 20px;
    font-family: STHeiti;
    margin: 0px;
    text-align: right;
  }
  .tit-right {
    color: #cf0c0c;
    font-size: 40px;
    font-weight: 700;
    position: relative;
    top: 0px;
    left: 8px;
    letter-spacing: 20px;
    font-family: STHeiti;
    margin: 0px;
    text-align: left;
  }
  .con {
    font-size: 20px;
    font-weight: 700;
    text-align: left;
    margin-top: 30px;
    margin-bottom: 0px;
    line-height: 32px;
    text-indent: 2em;
  }
  .con-main {
    position: relative;
    margin: 0px;
    font-family: 楷体;
    font-weight: bolder;
    font-size: 60px;
    color: #ad4834;
  }
  .row p{
    padding: 3px;
    margin: 0;
    float: left;
    font-family: 楷体;
    /*font-weight: 550;*/
  }
  .con-unit {
    padding-top: 10px;;
    font-size: 16px;
    font-weight: 700;
    text-align: right!important;
    letter-spacing: 3px;
    position: relative;
  }
  .con-unit p {
    margin: 5px 0;
  }
  .con-text {
    z-index: 1000;
    position: relative;
  }
  .chapter {
    background: url("../assets/zsLogo.png");
    position: absolute;
    bottom: -20px;
    right: 110px;
    background-size: 100% 100%;
    width: 120px;
    height: 120px;
  }
</style>

