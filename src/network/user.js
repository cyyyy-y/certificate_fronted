import {request} from "./request";

//登录
export function loginCheck(ruleForm) {
  return request({
    method: 'PUT',
    url: '/user/login',
    params: {
      name:ruleForm.name,
      pwd:ruleForm.pwd
    }
  })
}




