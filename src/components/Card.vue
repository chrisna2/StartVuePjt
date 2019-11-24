<template>
    <div class="col-md-6">
        <img v-bind:src="원룸들.image" width="100%"/>
        <h4>제목 : {{원룸들.title}}</h4>
        <h4>특징 : {{원룸들.caption}}</h4>
        <h5>가격 : {{원룸들.price}}원</h5>
    </div>
</template>
<script>
export default {
    // 원룸의 데이터를 여기다 보내야 한다. props
    // 데이터 관리 법칙 : 모든 데이터는 app.vue에 한개에서 관리 해야 한다. 최상위 요소이기 때문
    // props로 데이터를 전송해서 사용
    
    /*
        1. v-bind: 이이름으로 전송 ="이 데이터 이름" 데이터릃 하위 컴포넌트로 전송할때 사용
        2. Card.vue는 이걸 props로 등록한 다음 사용
    */
    props: {
        인삿말 : String,
        //[] 대괄호로 시작하면 무조건 Array
        //만약 한개씩 데이터를 올릴경우 Object (JSON 아니다!)
        원룸들 : Object
    }
}
</script>

<style>

</style>