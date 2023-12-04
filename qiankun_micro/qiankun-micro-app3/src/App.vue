<template>
  <div class="app">
    <h2>vue3 子应用</h2>
    <div class="menu">
      <router-link to="/">list</router-link>
      <router-link to="/detail">detail</router-link>
      <button @click="gotoReact">React页面</button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
const gotoReact = () => {
  window.history.pushState({}, "", "/micro-react");
};
</script>

<style>
.app {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 24px;
}
h2 {
  color: #333;
}

.menu {
  margin-top: 20px;
}

.menu a,
.menu button {
  margin-right: 10px;
  padding: 8px 12px;
  font-size: 16px;
  text-decoration: none;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.menu a:hover,
.menu button:hover {
  background-color: #0056b3;
}
</style>
