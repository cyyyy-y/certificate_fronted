<template>
  <div>
    <el-button @click="download" type="primary">下载Excel模板</el-button>
  </div>
</template>

<script>
  export default {
    name: "Download",
    methods: {
      // 下载本地文件
      download() {
        window.location.href = 'http://localhost:8080/template/template.xlsx'
      },
    },
  }
</script>

<style scoped>

</style>
