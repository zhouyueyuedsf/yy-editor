<template>
  <div @keyup.enter="enterEvent">
    <input :value="input"  @input="update" v-bind:style="styleInput" v-on:focus="focusEvent" v-on:blur="blurEvent" v-focus>
    <div v-bind:style="styleDiv" v-html="compiledMarkdown" v-on:click="divClickEvent"></div>
  </div>
</template>

<script>
import Vue from "vue";
import _ from "lodash";
import marked from "marked";
import {mixin} from "../directives/mixin";
export default {
  name: "HtmlInputItem",
  data: function(){
      return {
        html: '',
        focusFlag: true,
        input: ''
      }
  },
  mixins:[mixin],
  computed: {
    styleInput: function() {
      return this.focusFlag ? { display: "block" } : { display: "none" };
    },
    styleDiv: function() {
      return this.focusFlag ? { display: "none" } : { display: "block" };
    },
    compiledMarkdown: function() {
      // 返回html标签
      this.html = marked(this.input, { sanitize: true });
      return this.html;
    }
  },
  methods: {
    focusEvent: function() {
      this.focusFlag = true;
    },
    blurEvent: function() {
      this.focusFlag = false;
    },
    enterEvent: function() {
        this.focusFlag = false;
    },
    divClickEvent:  function() {
        this.focusFlag = true;
    },
    update: _.debounce(function (e) {
      this.input = e.target.value
    }, 300)
  }
};
</script>
