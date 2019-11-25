<!-- '<', ctrl+space -->
<!-- 컴포넌트로 바꿀 HTML 다 집어 넣기 
    1. <div></div> <div></div>  두개씩 나열 금지
-->
<template>
  <div>
    <ul class="list-group">
      <li class="list-group-item" v-on:click="sortPrice()">가격순정렬</li>
      <li class="list-group-item" v-on:click="under50()">50만원이하</li>
      <li class="list-group-item" v-on:click="resetList()">원래대로</li>
    </ul>
  </div>
</template>

<script>
export default {
    props: {
    },
    methods: {
      sortPrice: function() {
        this.$emit('sortPrice');
      },
      under50: function() {
        this.$emit('under50');
      },
      resetList: function() {
        this.$emit('resetList');
      }
    }
}
</script>

<style>

</style>