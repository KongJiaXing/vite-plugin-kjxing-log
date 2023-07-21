<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import {KLog} from "../../src";

KLog.version("测试vite插件", "0.0.1");

const data = {
  "name": "张三",
  "age": 24
}

KLog.log("system", data);
KLog.log("system", data);
KLog.log("test", data);
KLog.log("test", data);
KLog.log("login", data);
KLog.log("login", data);
KLog.log("aaa", data);
KLog.log("aaa", data);
KLog.log("bbb", data);
KLog.log("bbb", data);
KLog.log("ccc", data);
KLog.log("ccc", data);
KLog.log("ccc", data);
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo"/>
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo"/>
    </a>
  </div>
  <HelloWorld msg="Vite + Vue"/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
