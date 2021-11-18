<template>
  <div>
    <el-table
      :data="tableData"
      height="590"
      border
      style="width: 100%">
      <el-table-column prop="fileId" label="序号" width="50px"></el-table-column>
      <el-table-column prop="number" label="作品编号" width="100px"></el-table-column>
      <el-table-column prop="award" label="省赛获奖" width="80px"></el-table-column>
      <el-table-column prop="name" label="作品名称"></el-table-column>
      <el-table-column prop="school" label="参赛学校"></el-table-column>
      <el-table-column prop="category" label="作品类别"></el-table-column>
      <el-table-column prop="subcategory" label="作品子类别"></el-table-column>
      <el-table-column prop="author1" label="作者1" width="70px"></el-table-column>
      <el-table-column prop="author2" label="作者2" width="70px"></el-table-column>
      <el-table-column prop="author3" label="作者3" width="70px"></el-table-column>
      <el-table-column prop="author4" label="作者4" width="70px"></el-table-column>
      <el-table-column prop="author5" label="作者5" width="70px"></el-table-column>
      <el-table-column prop="teacher1" label="指导教师1" width="70px"></el-table-column>
      <el-table-column prop="teacher2" label="指导教师2" width="70px"></el-table-column>
      <el-table-column align="center" label="操作" width="80px">
        <template #default="scope">
          <el-button
            type="primary"
            size="mini"
            @click="generate(scope.$index, scope.row)">生成</el-button>
        </template>
      </el-table-column>
    </el-table>

<!--    证书-->
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
                <span>{{itemData.school}}</span>作品《<span>{{itemData.name}}</span>》在2021年（第14届）中国大学生计算机设计大赛浙江省级赛中荣获
              </p>
            </el-col>
          </el-row>

          <el-row>
            <el-col>
              <p class="con-main"><span>{{itemData.award}}</span></p>
            </el-col>
          </el-row>

          <el-row class="row">
            <el-col><p>作者：<span>{{itemData.author1}} {{itemData.author2}} {{itemData.author3}} {{itemData.author4}}</span></p></el-col>
          </el-row>
          <el-row class="row">
            <el-col><p>指导老师：<span>{{itemData.teacher1}} {{itemData.teacher2}}</span></p></el-col>
          </el-row>
          <el-row class="row">
            <el-col><p>作品分类：<span>{{itemData.category}}</span></p></el-col>
          </el-row>
          <el-row class="row">
            <el-col><p>证书编号：<span>{{itemData.number}}</span></p></el-col>
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
  import {selectAll} from "../network/file";

  export default {
    name: "List",
    data() {
      return {
        itemData:{},
        tableData: [],
        dialogVisible: false,
        pageData: null, //接收html格式代码
        htmlTitle: "获奖证书",
        isShow: true,
        isCanvas: false,
        downType: true // false为 pdf , true为图片
      }
    },
    methods: {
      handleClose() {
        this.dialogVisible = false;
      },
      generate(index,row){
        // console.log(index,row);
        this.itemData = row;
        if (this.itemData.author1 == "无"){
          this.itemData.author1 = null
        }
        if(this.itemData.author2 == "无") {
          this.itemData.author2 = null
        }
        if(this.itemData.author3 == "无") {
          this.itemData.author3 = null
        }
        if(this.itemData.author4 == "无") {
          this.itemData.author4 = null
        }
        if(this.itemData.author5 == "无") {
          this.itemData.author5 = null
        }
        if (this.itemData.teacher1 == "无"){
          this.itemData.teacher1 = null
        }
        if(this.itemData.teacher2 == "无") {
          this.itemData.teacher2 = null
        }
        console.log(this.itemData)
        this.dialogVisible = true;
        this.$nextTick(()=> {
          if(!this.isCanvas) {
            // 只绘画一次
            this.isCanvas = true
            this.getChapter()
          }
        })
      },
    },
    created() {
      var that = this;
      selectAll().then(res => {
        that.tableData = res.data
        console.log(res.data)
      })
    },
  }
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
