<!-- HTML 관리 -->
<template>
  <div class="container">
    <!--항상 이미지의 경로는 ./로 시작한다-->
    <img src="./assets/logo.png" width="50px">동산
    <div class="row">
      <div class="col-md-2">
        <List :key="원룸들" v-bind:원룸들="원룸들" v-on:sortPrice="sortPrice" v-on:under50="under50" v-on:resetList="resetList"/>
        <hr>
      </div>
      <div class="col-md-10">
        <div class="row">
          <!-- 데이터 전송 -->
          <Card v-for="room in 원룸들" :key="room" v-bind:원룸들="room" />
          <Card v-for="(room,i) in 원룸들" v-bind:원룸들="room[2]" :key=i />
        </div>
      </div>
    </div>
  </div>
</template>
<!-- 스크립트 관리 -->
<script>
import Card from './components/Card.vue';
import List from './components/List.vue';
import data from './components/data.js';

export default {
  name: 'app',
  //데이터 보관 장소 : 여기 키로 설정 된 이름 그대로 템플릿에 이용하면 됨!
  //데이터를 관리하는 것이 핵심이다.
  data() {
     return {
        //TEXT 
        인삿말 : '안뇽 뷰는 처음이지?',
        원룸들 : data
        //[1] 리셋을 해도 순서가 바뀌지 않는다
     }
  },
  //컴포넌트 순서 
  //1. .vue 파일 생성
  //2. 여기에 임포트 시킨다. 
  //3. 등록한다
  //4 .<List/> 이런식으로 사용한다.
  //※ 컴포넌트는 vue 파일만 가지고 설정한다. json 데이터는 컴포넌트가 아니니 임포트 했다고 무조건 설정해서 안된다.
  components: {
    Card,List
  },
  /**
   * 1. 데이터 정장 하는 법
   * 2. {{}}
   * 3. v-bind
   * 4. v-for
   * 5. component화 하기
   * 6. pros로 데디어 전송하기
   * 7. 이벤트 리스너
   * ----------------------------------
   * 1. 원래대로 기능 만들기
   * 2. 탭기능 구성하기
   * <button>1</button>
   * <button>2</button>
   * <button>3</button>
   * <div>1</div>
   * <div>2</div>
   * <div>3</div>
   */
  //이벤트 리스너 : methods : 사용할때 마다 다시 사용할 경우
  //computed
  computed:{
    // 한번 실행하고 다시 실행 안할 경우
  },
  //watch : 
  watch:{
    // 데이터가 변경될때 마다 실행해줄 코드를 여기에 작성한다. 
  },
  methods: {
    //[1] 가격순 정렬
    sortPrice(){
      //json 인 경우 a, b는 각각의 json 객체의 값이다.
      this.원룸들.sort(
        function(a,b){
          //정렬함수(암기) -> 추가로 html을 수정 해줄 필요가 없다. 알아서 재랜더링 해준다.
          return a.price-b.price;
        }
      );
    },
    //[2] 50만원 이하 상품
    under50(){
      var newOneRomms = this.원룸들.filter(
        function(item){
          return item.price < 500000;
        });
      this.원룸들 = newOneRomms;
    },
    //[3] 숙제(1) 원래되로 버튼 만들기
    resetList(){
      //[2] 문제 : 순서까지 원래대로 만들어야 한다.
      this.원룸들.sort(function(a,b){
          return a.id - b.id;
      });
      //[1] 사라진 데이터가 복구된다. -> (질문.)순서는 복구가 안된다...
      //두번 클릭해야 된다...위아래 순서가 뒤바뀌면 없어진게 나오지 않는다...이거 하나로 정리가 되지 않는다..
      Object.assign(this.$data, this.$options.data());
    }
  }
}
</script>

<style>

</style>
