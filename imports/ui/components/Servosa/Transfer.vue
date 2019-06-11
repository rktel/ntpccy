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
        console.log(this.universe);
    },
}
</script>

<style>

</style>

