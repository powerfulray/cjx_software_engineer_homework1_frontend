<template>
  <div>
    <!-- 头部区域 -->
    <div style="height: 60px; display: flex;  " >
      <div style="width: 240px;display: flex; align-items: center;padding-left: 20px;background-color: #3a456b">
        <img style="width: 40px; height: 40px; border-radius: 50%" src="@/assets/imgs/logos.png" alt="">
        <span style="font-size: 20px;font-weight: bold; margin-left: 5px ;color: #2cffe6">通讯录管理系统</span>
      </div>

      <div style="flex: 1;display: flex; align-items: center; padding-left: 20px;border-bottom: 1px solid #ddd">
        首页 / 通讯录数据
      </div>

      <div style="width:fit-content;display: flex; align-items: center;padding-right: 20px;align-items: center;border-bottom: 1px solid #ddd">
        <el-dropdown>
          <div style="display: flex; align-items: center">
            <img style="width: 40px; height: 40px; border-radius: 50%" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt="">
            <span style="margin-left: 5px">管理员</span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
          </el-dropdown>
        </div>

    </div>
    <!--  头部区域结束 -->

    <!--  下方区域开始 -->
    <div style="display: flex">
      <!--  菜单区域开始 -->
      <div style="width: 240px;">
        <el-menu router :default-openeds="['1']" :default-active="router.currentRoute.value.path " style="min-height: calc(100vh - 60px)">
          <el-menu-item index="/Manager/home">
            <el-icon><House /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/Manager/admin">通讯录信息</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
      <!--  菜单区域结束 -->

      <!--  数据渲染区域开始 -->
      <div style="flex: 1; width: 0; padding: 10px; background-color: #f2f4ff">
        <RouterView />
      </div>
      <!--  数据渲染区域结束 -->
    </div>
    <!--  下方区域结束 -->

  </div>
</template>


<script setup>
import router from "@/router/index.js";
</script>

<style>
.el-menu {
  background-color: #3a456b;
  border:none;
}
.el-sub-menu__title {
  background-color: #3a456b;
  color: #ddd;
}
.el-menu-item {
  height: 50px;
  color: #ddd;
}
.el-menu .is-active {
  background-color: #537bee;
  color: #fff;
}
.el-sub-menu__title:hover {
  background-color: #3a456b;
}
.el-menu-item:not(.is-active):hover {
  background-color: #7a9fff;
  color: #333;
}
.el-tooltip__trigger {
  outline: none;
}
.el-menu--inline .el-menu-item {
  padding-left: 48px !important;
}
</style>