<template>
    <VLayout>
        <h1>Transfer</h1>
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
}
//End export default
//Funciones de apoyo
function addChecked(array) {
    return array.map(el => ({name: el, checked: false}) )
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

