<!-- HTML 관리 -->
<template>
  <div class="container" id="app">

    <!-- 모달창 -->
    <div class="white-background" v-if="모달창열렸니">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <img :src="원룸들[누른데이터].image" width='100%'>
          </div>
          <div class="col-md-6">
            <h4>{{원룸들[누른데이터].title}}</h4>
            <p>{{원룸들[누른데이터].caption}}</p>
            <p>{{원룸들[누른데이터].price}}</p>
            <p>납부해야 할 월세 : {{원룸들[누른데이터].price*몇개월}}원</p>
            <input type="range" class="form-control-range" min="1" max="12" v-model="몇개월">
            
            <!-- 데이터 바로 호출
            <input v-model="누른데이터">
             -->

            <button v-on:click="모달창열렸니=false">닫기버튼</button>
          </div>
        </div>
      </div>
    </div>

    <!--항상 이미지의 경로는 ./로 시작한다-->
    <img src="./assets/logo.png" width="50px">동산
    <button v-for="(tab,index) in tabs" :key="index"
            v-bind:class="{active: currentTab == index}" 
            v-on:click="currentTab = index">{{tab}}</button>  

    <div class="row" v-show="currentTab==0">
      <div class="col-md-2">
        <List :key="원룸들" v-bind:원룸들="원룸들" v-on:sortPrice="sortPrice" v-on:under50="under50" v-on:resetList="resetList"/>
      </div>
      <div class="col-md-10">
        <div class="row">
            <!-- 데이터 전송 -->
            <Card v-on:click.native="openmodal" v-for="room in 원룸들" :key="room" v-bind:원룸들="room" />
        </div>
      </div>
    </div>

    <div class="row" v-show="currentTab==1">
      <div class="col-md-2">
        <List :key="원룸들" v-bind:원룸들="원룸들" v-on:sortPrice="sortPrice" v-on:under50="under50" v-on:resetList="resetList"/>
      </div>
      <div class="col-md-10">
        <div class="row">
        아파트 정보 
        </div>
      </div>
    </div>
    
    <div class="row" v-show="currentTab==2">
      <div class="col-md-2">
        <List :key="원룸들" v-bind:원룸들="원룸들" v-on:sortPrice="sortPrice" v-on:under50="under50" v-on:resetList="resetList"/>
      </div>
      <div class="col-md-10">
        <div class="row">
        단독주택 정보 
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
  //react -> state(상태라고 한다.)
  data() {
     return {
        //TEXT 
        인삿말 : '안뇽 뷰는 처음이지?',
        원룸들 : data,
        원룸들원본 : [...data],//데이터 원본 저장 할때 이렇게 해야 한다. by javascript 최신 기법
        누른데이터 : 0,
        몇개월 : 0,
        //[1] 리셋을 해도 순서가 바뀌지 않는다
        currentTab : 0,
        tabs : ['원룸들', '아파트틀', '빌라들'],
        //[2] 회면 상태 값
        모달창열렸니: false
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
    // resetList(){
    //   //[2] 문제 : 순서까지 원래대로 만들어야 한다.
    //   this.원룸들.sort(function(a,b){
    //       return a.id - b.id;
    //   });
    //   //[1] 사라진 데이터가 복구된다. -> (질문.)순서는 복구가 안된다...
    //   //두번 클릭해야 된다...위아래 순서가 뒤바뀌면 없어진게 나오지 않는다...이거 하나로 정리가 되지 않는다..
    //   Object.assign(this.$data, this.$options.data());
    // }
    resetList(){
      //정답[1]
      //this.원룸들 = this.원룸들원본; //데이터를 이어 달라는 의미밖에 안된다.
      //이렇게 하면 소팅이 풀리지 않는다.

      //정답[2]
      this.원룸들 = this.원룸들원본; //새로운 배열을 만들어 준다. -> 여기서 말고 data() 위에서 
      //그래도 소팅이 안풀리는데?

    },
    openmodal(e){
      //1.모달창 띄우기
      this.모달창열렸니=true;
      //2.이 사람이 몇번째 사진을 눌렀는지 저장
      this.누른데이터 = e.target.dataset.id;
      //3.이사람이 실제 누른 html 요소, 그리고 거기 저장되어있는 dataset.id 호출
      /* eslint-disable */
      console.log(e.target.dataset.id);
    } 
  },
  //HTML다 장착되고 나서 실행시킬 코드 -> HTML이 다 랜더링된 이후 뭔가 변경시키고 싶을때 
  mounted(){

  },
  //페이지 첫로드시 데이터 초기화 시킬 함수 -> 페이지 첫로드시 데이터 초기값을 설정해주고 싶을 때
  created(){

  },
  //데이터가 변경되고 DOM 랜더링 전 -> 데이터가 변경된 직후에 뭔가 동작시킬 때
  beforeUpdate(){

  },
  //데이터가 변경되어 재랜더링 된 이후 -> 데이터가 변경되어 재렌더링된 이후 뭔가 동작시킬 때
  updated(){

  }
}
</script>



<!-- CSS -->
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.white-background {
  position: fixed;
  z-index: 5;
  width : 100%;
  height: 100%;
  background-color: white;
}
</style>
