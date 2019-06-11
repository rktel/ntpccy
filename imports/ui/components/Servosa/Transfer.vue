<template>
    <VLayout>
        <ul>
            <li v-for="item in right" :key="item.vehicle" @click="msg(item.vehicle, item.checked)">
                {{item.vehicle}}
            </li>
        </ul>
    </VLayout>
</template>

<script>
export default {
    name:'Transfer',
    props:['universe'],
    created(){
      this.right = addChecked(this.universe)
      this.left = []  
    },
    methods:{
        msg(a,b){
            alert(a +"," +b)
        }
    }
}
//End export default
//Funciones de apoyo
function addChecked(array) {
    return array.map(el => ({vehicle: el, checked: false}) )
}
function getCheckedTrue(array){
    return array.filter(el => el.checked===true)
}
function getCheckedFalse(array){
    return array.filter(el => el.checked===false)
}

</script>

<style>

</style>

