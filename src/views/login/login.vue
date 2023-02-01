<template>
  <div class="text-white w-100 h-100 bg-blue1">
    <div class="login-form">
      <h2 class="text-center my-1 py-1">叩丁狼商品管理系统</h2>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            v-model="ruleForm.username"
            type="username"
            size="large"
            autofocus
            placeholder="请输入账号"
          />
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input
            :prefix-icon="Lock"
            v-model="ruleForm.pwd"
            type="pwd"
            size="large"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginFun" class="w-100" size="large"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { adminLoginApi, getAdminInfoApi } from "@/request/api";
import { User, Lock } from "@element-plus/icons-vue";
import Cookies from "js-cookie";
import { reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const state = reactive({
  ruleForm: {
    username: "admin",
    pwd: "123456",
  },
});

let { ruleForm } = toRefs(state);
// 获取el-form组件对象
const ruleFormRef = ref();
// 获取项目路由对象
let router = useRouter();
// 获取当前项目vuex对象
let store = useStore();
// 校验规则
const validatePwd = (
  rule: unknown,
  value: string | undefined,
  cb: (msg?: string) => void
) => {
  if (!value) {
    cb("密码不能为空");
  } else {
    cb();
  }
};
const rules = reactive({
  username: [
    {
      required: true,
      message: "用户名不能为空",
      trigger: "blur",
    },
  ],
  pwd: [
    {
      validator: validatePwd,
      trigger: "blur",
    },
  ],
});
const loginFun = async () => {
  ruleFormRef.value
    .validate()
    .then(async () => {
      const loginRes = await adminLoginApi({
        password: ruleForm.value.pwd,
        username: ruleForm.value.username,
      });
      if (loginRes.code === 200) {
        // 先存储 token
        Cookies.set("token", loginRes.data.tokenHead + loginRes.data.token);
        // 获取用户信息
        store.dispatch("getAdminInfo").then((res) => {
          if (res === 200) {
            // 跳转homePage页面
            router.push("/homepage");
          }
        });
      }
    })
    .catch(() => {
      console.log("校验不通过");
    });
};
</script>

<style lang="less" scoped>
.login-form {
  width: 400px;
  min-height: 300px;
  position: fixed;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
}
</style>
