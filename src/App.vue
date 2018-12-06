<template>
  <div id="demo">
    <h1>{{ treeData.name }}</h1>
    <!-- <ul>
      <TreeItem class="item" :model="treeData"></TreeItem>
    </ul>   -->
    <mark-down-item></mark-down-item>
  </div>
</template>

<script>
import TreeItem from "./components/TreeEditor.vue"; 
import Vue from 'vue/dist/vue.js'
import {Node} from './node.js';
import MarkDownItem from "./components/MarkDownEditor.vue"

// demo data
var root = new Node("My tree");
root.children[0] = new Node("");
root.children[0].parent = root;
export default {
  components: {
		TreeItem,MarkDownItem
	},
  data: function(){
    return {
        treeData: root,
      };
  }
}
</script>

<style>
  input{
    border-width: 0;
    /* 去掉浏览器的蓝色边框 */
    outline: none
  }
</style>


