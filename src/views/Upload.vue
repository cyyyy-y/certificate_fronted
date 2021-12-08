<template>
<!--  <div>upload</div>-->
<!--  action="/api/upload"-->
<!--  :http-request="uploadFile"-->
<!---->
  <div>
    <el-upload
      class="upload-demo"
      action="http://localhost:8081/file/upload"
      :on-success="upload_success"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :before-upload="beforeUpload"
      accept=".xls, .xlsx"
      multiple
      :limit="1"
      :on-exceed="handleExceed">
      <el-button  type="primary">点击导入Excel文件</el-button>
    </el-upload>

    <el-row>
      <el-col>
        <el-form class="form" :label-position="right" label-width="650px" :model="form">
          <el-form-item label="举办年份">
            <el-input class="input" v-model="form.year"></el-input>
          </el-form-item>
          <el-form-item label="第几届">
            <el-input class="input" v-model="form.jie"></el-input>
          </el-form-item>
          <el-form-item label="颁奖年份">
            <el-input class="input" v-model="form.byear"></el-input>
          </el-form-item>
          <el-form-item label="颁奖月份">
            <el-input class="input" v-model="form.bmonth"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="button" type="primary" plain @click="submitForm('form')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

  </div>

</template>

<script>

  export default {
    name: "Upload",
    data(){
      return{
        fileList: {},
        input: '',
        form: {
          year: '2021',
          jie: '14',
          byear: '2021',
          bmonth: '8',
        }
      }
    },
    methods:{
      submitForm(formName) {
        console.log(this.form);
        sessionStorage.setItem('year',this.form.year);
        sessionStorage.setItem('jie',this.form.jie);
        sessionStorage.setItem('byear',this.form.byear);
        sessionStorage.setItem('bmonth',this.form.bmonth);
      },

      // 自定义上传 导入数据
      uploadFile (item) {
        const form = new FormData();
        // form.append('token', this.token);
        form.append('file1', item.file);
        console.log(item.file)
        //
        for (var value of form.values()) {
          console.log(value);
        }

      },

      /*Excel上传成功！*/
      upload_success(file, fileList){
        const h = this.$createElement;
        this.$notify({
          type: 'success',
          title: '导入成功',
          message: h('p', null, [
            h('i', { style: 'color: teal' }, file),
            h('span', null, ' 成功导入！'),
          ])
        });
        //异步刷新
        this.reload();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      beforeUpload(file) {
        const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
        const whiteList = ["xls", "xlsx"];
        if (whiteList.indexOf(fileSuffix) === -1) {
          this.$message.error('上传文件只能是xls、xlsx格式');
          return false;
        }
      }
    }
  }
</script>

<style scoped>
  .form {
    margin-top: 60px;
    width: 500px;
    height: 400px;
  }
  .span {
    width: 200px;
  }
  .input {
    width: 200px!important;
  }
  .button {
    margin-left: 60px;
  }
</style>
