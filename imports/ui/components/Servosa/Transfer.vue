<template>
	<VLayout fill-height>
		<VFlex s3>
			<VCard>
				<VList dense>
					<section :style="{height: 250 + 'px', overflowY: 'scroll'}">
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
		<VFlex s1>
			<VLayout column fill-height align-center>
				<VBtn color="success" icon @click="leftToRight">
					<VIcon>chevron_right</VIcon>
				</VBtn>
				<VBtn color="success" icon @click="rightToLeft">
					<VIcon>chevron_left</VIcon>
				</VBtn>
			</VLayout>
		</VFlex>
		<VFlex s3>
			<VCard>
				<VList dense>
					<section :style="{height: 250 + 'px', overflowY: 'scroll'}">
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
	},
	methods: {
		leftToRight() {
			const newLeft = getCheckedFalse(this.left);
			const newRight = this.right.concat(getCheckedTrue(this.left));
			this.left = resetChecked(newLeft);
			this.right = resetChecked(newRight);
		},
		rightToLeft() {
			const newRight = getCheckedFalse(this.right);
			const newLeft = this.left.concat(getCheckedTrue(this.right));
			this.left = resetChecked(newLeft);
			this.right = resetChecked(newRight);
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
function resetChecked(array) {
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

