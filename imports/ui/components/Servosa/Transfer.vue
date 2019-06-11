<template>
	<VLayout fill-height>
		<VFlex s3>
			<VCard>
				<VList dense>
					<section :style="{height: 250 + 'px', overflowY: 'scroll'}">
						<VListTile v-for="item in left" :key="item.vehicle">
                            <VListTileAction>
                                <VCheckbox  v-model="item.checked" ></VCheckbox>
                            </VListTileAction>
                            <VListTileContent>
                                {{item.vehicle}}
                            </VListTileContent>
                        </VListTile>
					</section>
				</VList>
			</VCard>
		</VFlex>
		<VFlex s1>
            <VLayout column fill-height>
                <VBtn color="success" icon @click="leftToRight">
                    <VIcon>chevron_right</VIcon>
                </VBtn>
            </VLayout>
        </VFlex>
		<VFlex s3>
			<VCard>
				<VList dense>
					<section :style="{height: 250 + 'px', overflowY: 'scroll'}">
						<VListTile v-for="item in right" :key="item.vehicle">
                            <VListTileContent>
                                {{item.vehicle}}
                            </VListTileContent>
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
        this.left = addChecked(this.universe);
		this.right = [];
	},
	methods: {
		leftToRight() {
            let newLeft=[]
            let newRight=[]
            newLeft = getCheckedFalse(this.left)
            newRight = getCheckedTrue(this.left)
            this.left = newLeft
            this.right = newRight
            console.log(this.left, this.right);
		}
	}
};
//End export default
//Funciones de apoyo
function addChecked(array) {
	return array.map(el => ({ vehicle: el, checked: true }));
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

