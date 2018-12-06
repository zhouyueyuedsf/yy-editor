<template>
  <div>
    <TreeItem v-if="isRoot()" class="item" v-for="(model, index) in model.children" :key="index" :model="model"></TreeItem>
    <li v-if="!isRoot()" >
      <div @keyup.enter="enterEvent" v-on:keydown="dispatchevent($event)">
        <input v-model="model.name" v-focus>
      </div>
      <ul>
        <TreeItem class="item" v-for="(model, index) in model.children" :key="index" :model="model"></TreeItem>
      </ul>
    </li>
  </div>
</template>

<script>
import Vue from "vue";
import { Node } from "../node.js";
import {focus} from "../directives/mixin";
export default {
  name: "TreeItem",
  props: {
    model: Object
  },
  data: function() {
    return {
      open: false,
      MAIN_LAYER_LEVEL: 1,
    };
  },
  computed: {
    hasContent: function() {
      return this.model.name != "";
    }
  },
  methods: {
    isRoot: function() {
      return this.model.parent == null;
    },
    hasChild: function() {
      return this.model.children && this.model.children.length;
    },
    indexOf: function(model) {
      var index = 0;
      while (model.pre != null) {
        index++;
        model = model.pre;
      }
      return index + 1;
    },
    getLayerLevel: function(model){
      var layerLevel = 0;
      while(model.parent != null){
        layerLevel++;
        model = model.parent;
      }
      return layerLevel;
    },
    dispatchevent: function(event) {
      var keycode = event.keyCode;
      if (keycode == 9) {
          event.preventDefault();
          this.tabEvent();
      }
    },
    enterEvent: function() {
      if(this.hasChild()) {
        this.addChild(0);
      } else {
        // 检查兄弟兄弟节点
        if (this.model.next != null || this.getLayerLevel(this.model) == this.MAIN_LAYER_LEVEL || this.hasContent) {
          // 当前节点所在数组的索引
          this.addRightBrother(this.model);
        } else {
          // 无内容 无孩子 无兄弟节点，且不是主层
          this.addRightBrother(this.model.parent);
          this.removeNode(this.model);
        }
      }
    },
    tabEvent: function(){
      if(this.model.pre != null) {
        this.model.parent.children.splice(this.indexOf(this.model) - 1, 1);
        this.model.pre.next = this.model.next;
        if(this.model.next != null){
          this.model.next.pre = this.model.pre;
        }
        var len = this.model.pre.children.length;
        this.buildChildrenArray(this.model.pre, this.model, len)
        .buildPointer(this.model.pre, this.model, len);
      }
    },
    addRightBrother: function(model) {
      model.next = new Node("");
      model.next.pre = model;
      model.parent.children.splice(
        this.indexOf(model),
        0,
        model.next
      );
      model.next.parent = model.parent;
    },
    addChild: function(index) {
      var node = new Node("");
      this.buildChildrenArray(this.model, node, index)
      .buildPointer(this.model, node, index);
    },
    buildChildrenArray: function(parent, node, index){
      parent.children.splice(index, 0, node);
      return this;
    },
    /**
     * 指定父节点，插入的节点，和插入的位置
     */
    buildPointer: function(readyParent, node, index) {
      node.parent = readyParent;
      if(readyParent.length > index + 1){
        node.next = readyParent.children[index + 1];
        readyParent.children[index + 1].pre = node;
      }else{
        node.next = null;
      }
      if(index > 0) {
        node.pre = readyParent.children[index - 1]
      } else{
        node.pre = null;
      }
    },
    removeNode: function(model) {
      model.parent.children.splice(this.indexOf(model) - 1, 1);
      if (model.pre != null) {
        model.pre.next = null;
      }
      model.pre = null;
      model.parent = null;
    }
  }
};
</script>
