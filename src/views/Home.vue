<template>
  <div class="home">
    <el-container>
<!--      header-->
      <el-header height="70px">
<!--        水平且垂直居中-->
        <el-row type="flex" justify="center" align="middle">
<!--          标题-->
          <el-col :span="6">
            <el-row>
              <el-col :span="24" class="nav1">大 学 竞 赛 管 理 系 统</el-col>
              <el-col :span="24" class="nav1">H D U</el-col>
            </el-row>
          </el-col>
<!--          导航栏-->
          <el-col :span="14" class="nav2">
            <el-menu
              :default-active="homePage"
              text-color="#000000"
              active-text-color="#545c64"
              mode="horizontal"
              router>
              <el-menu-item index="homePage">主页</el-menu-item>
              <el-menu-item index="download">表格下载</el-menu-item>
              <el-menu-item index="upload">表格导入</el-menu-item>
              <el-menu-item index="list">导入表格预览</el-menu-item>
              <el-menu-item index="generate">证书生成</el-menu-item>
<!--              <el-menu-item index="demo">demo</el-menu-item>-->
              <el-menu-item index="charts">数据统计</el-menu-item>
            </el-menu>
          </el-col>
<!--          搜索-->
          <el-col :span="4" class="nav3">
            <template>
              <el-input v-model="search" size="small" suffix-icon="el-icon-search" placeholder="搜索"/>
            </template>
          </el-col>
        </el-row>
      </el-header>

<!--      主页面 通过router跳转vue-->
      <el-main class="home-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return{
      search: ''
    }
  },
  components: {

  }
}
</script>

<style>
  .el-menu{
    border: none;
  }
  .el-menu.el-menu--horizontal {
    border-bottom: none !important;
  }
  .el-row {
    display: flex;
    flex-wrap: wrap;
  }
  .nav1{
    text-align: center;
    font-size: larger;
    font-weight: bolder;
    background-image: -webkit-linear-gradient(15deg, #000000, #e2e2e2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 5px;
  }
  .home-main{
    /*background-color: #dcdde1;*/
  }

  .el-header {
    text-align: center;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /*line-height: 160px;*/
    height: 630px;
    /*box-shadow: 2px 2px 2px #6c7888;*/
  }

  body > .el-container {
    margin-bottom: 40px;
  }
</style>
