<template>
  <div id="editor">
    <html-input-item v-for="index in itemDatas" :key="index" @keyup.enter.native="enterEvent(index, $event)"></html-input-item>
  </div>
</template>

<script>
import Vue from "vue";
import HtmlInputItem from "./HtmlInput.vue";
import { mixin, insertAfter } from "../directives/mixin";
export default {
  name: "MarkDownItem",
  components: {
    HtmlInputItem
  },
  data: function(){
      return {
          itemDatas: new Array("")
      }
  },
  mixins: [mixin],
  computed: {},
  methods: {
      enterEvent: function(index, event) {
          this.itemDatas[index] = event.target.value;
          this.itemDatas.splice(index + 1, 0, "");
      }
  }
};
</script>
