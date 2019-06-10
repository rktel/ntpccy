<template>
    <section>
        <VLayout justify-center column fill-height>
            <VFlex xs3>
                <VCard>
                    <VList dense :style="{height: 205+ 'px', overflowY: 'scroll'}">
                        <VListTile v-for="value in left" :key="value">
                            <v-list-tile-action>
                                <v-checkbox :checked="checked.indexOf(value)!== -1"></v-checkbox>
                            </v-list-tile-action>
                            <VListTileContent @click="handleToggle(value)">
                                <v-list-tile-sub-title>{{value +1}}</v-list-tile-sub-title>
                            </VListTileContent>
                        </VListTile>
                    </VList>
                </VCard>
            </VFlex>
            <VFlex xs1>
                <VLayout align-center justify-center column fill-height>
                    <VBtn
                        color="primary"
                        icon
                        @click="handleCheckedRight"
                        :disabled="leftChecked.length === 0"
                    >
                        <VIcon>chevron_right</VIcon>
                    </VBtn>
                    <VBtn
                        color="primary"
                        icon
                        @click="handleCheckedLeft"
                        :disabled="rightChecked.length === 0"
                    >
                        <VIcon>chevron_left</VIcon>
                    </VBtn>
                </VLayout>
            </VFlex>
            <VFlex xs3>
                <VLayout justify-center column fill-height>
                <VCard>
                    <VList dense :style="{height: 205+ 'px', overflowY: 'scroll'}">
                        <VListTile v-for="value in right" :key="value">
                            <v-list-tile-action>
                                <v-checkbox :checked="checked.indexOf(value)!== -1"></v-checkbox>
                            </v-list-tile-action>
                            <VListTileContent @click="handleToggle(value)">
                                <v-list-tile-sub-title>{{value +1}}</v-list-tile-sub-title>
                            </VListTileContent>
                        </VListTile>
                    </VList>
                </VCard>
                </VLayout>
            </VFlex>
        </VLayout>
    </section>
</template>

<script>
export default {
    created() {
        this.checked = [];
        this.left = [0, 1, 2, 3];
        this.right = [4, 5, 6, 7];
        this.leftChecked = intersection(this.checked, this.left);
        this.rightChecked = intersection(this.checked, this.right);
    },
    methods: {
        changeBox(value){
            this.checked.indexOf(value)!== -1
        },
        handleToggle(value) {
            console.log("handleToggle:", value)
            const currentIndex = this.checked.indexOf(value);
            const newChecked = [...this.checked];

            if (currentIndex === -1) {
                newChecked.push(value);
            } else {
                newChecked.splice(currentIndex, 1);
            }
            this.checked = newChecked;
        },

        handleAllRight() {
            this.right = this.right.concat(this.left);
            this.left = [];
        },

        handleCheckedRight() {
            this.right = this.right.concat(this.leftChecked);
            this.left = not(this.left, this.leftChecked);
            this.checked = not(this.checked, this.leftChecked);
        },

        handleCheckedLeft() {
            this.left = this.left.concat(this.rightChecked);
            this.right = not(this.right, this.rightChecked);
            this.checked = not(this.checked, this.rightChecked);
        },

        handleAllLeft() {
            this.left = this.left.concat(this.right);
            this.right = [];
        }
    },
    data() {
        return {
            checked: [],
            left: [],
            right: [],
            leftChecked: [],
            rightChecked: []
        };
    }
};

//Funciones de apoyo
function not(a, b) {
    return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter(value => b.indexOf(value) !== -1);
}
</script>

<style>
</style>
