<template>
	<VLayout fill-height>
		<VFlex s3>
			<VCard>
				<VList>
					<div :style="{height: 250 + 'px', overflowY: 'scroll'}">
						<VListTile v-for="item in right" :key="item.vehicle">
                            <VListTileContent>
                                {{item.vehicle}}
                            </VListTileContent>
                        </VListTile>
					</div>
				</VList>
			</VCard>
		</VFlex>
		<VFlex s1></VFlex>
		<VFlex s3></VFlex>
	</VLayout>
</template>

<script>
export default {
	name: "Transfer",
	props: ["universe"],
	created() {
		this.right = addChecked(this.universe);
		this.left = [];
	},
	methods: {
		msg(a, b) {
			alert(a + "," + b);
		}
	}
};
//End export default
//Funciones de apoyo
function addChecked(array) {
	return array.map(el => ({ vehicle: el, checked: false }));
}
function getCheckedTrue(array) {
	return array.filter(el => el.checked === true);
}
function getCheckedFalse(array) {
	return array.filter(el => el.checked === false);
}
</script>

<style>
</style>

