<template>
	<VLayout align-center justify-center>
		<VFlex xs5>
			<VCard >
				<VList dense>
					<section :style="{height: height + 'px', overflowY: 'scroll'}">
						<VListTile v-for="item in left" :key="item.vehicle">
							<VListTileAction>
								<VCheckbox v-model="item.checked"></VCheckbox>
							</VListTileAction>
							<VListTileContent>{{item.vehicle}}</VListTileContent>
						</VListTile>
					</section>
				</VList>
			</VCard>
		</VFlex>
		<VFlex xs2>
			<VLayout column fill-height align-center justify-center>
				<VBtn color="success" icon @click="leftToRight">
					<VIcon>chevron_right</VIcon>
				</VBtn>
				<VBtn color="success" icon @click="rightToLeft">
					<VIcon>chevron_left</VIcon>
				</VBtn>
			</VLayout>
		</VFlex>
		<VFlex xs5>
			<VCard >
				<VList dense>
					<section :style="{height: height + 'px', overflowY: 'scroll'}">
						<VListTile v-for="item in right" :key="item.vehicle">
							<VListTileAction>
								<VCheckbox v-model="item.checked"></VCheckbox>
							</VListTileAction>
							<VListTileContent>{{item.vehicle}}</VListTileContent>
						</VListTile>
					</section>
				</VList>
			</VCard>
		</VFlex>
	</VLayout>
</template>

<script>
export default {
	name: "Transfer",
	props: ["universe"],
	created() {
		this.left = resetChecked(this.universe);
        this.right = [];
        this.height = 220;
	},
	methods: {
		leftToRight() {
			const newLeft = getCheckedFalse(this.left);
			const newRight = this.right.concat(setFalseChecked(getCheckedTrue(this.left)));
			this.left = newLeft;
            this.right = newRight;
            this.$emit('childToParent', dataToParent(this.right))
		},
		rightToLeft() {
			const newRight = getCheckedFalse(this.right);
			const newLeft = this.left.concat(setFalseChecked(getCheckedTrue(this.right)));
			this.left = newLeft;
            this.right = newRight;
            this.$emit('childToParent', dataToParent(this.right))
		}
	},
	data() {
		return {
			left: [],
			right: []
		};
	}
};
//End export default
//Funciones de apoyo
function dataToParent(array) {
    return array.map(el => el.vehicle)
}
function resetChecked(array) {
	return array.map(el => ({ vehicle: el, checked: false }));
}
function setFalseChecked(array){
    return array.map(el => { return{checked : false, vehicle: el.vehicle}})
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

