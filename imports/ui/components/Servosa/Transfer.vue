<template>
    <VLayout>
        <h1>Transfer</h1>
    </VLayout>
</template>

<script>
export default {
    props:['universe'],
    created(){
        setInterval(ns=>{
            console.log(this.universe);
        }, 5000)
    },
}
</script>

<style>

</style>

