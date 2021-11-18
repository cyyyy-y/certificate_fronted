import {request} from "./request";

//文件导入
export function upload(ruleForm) {
  return request({
    method: 'POST',
    url: '/file/upload',
    params: {
      file: ruleForm
    }
  })
}

//selectAll
export function selectAll() {
  return request({
    method: 'get',
    url:'/file/selectAll',
  })
}




