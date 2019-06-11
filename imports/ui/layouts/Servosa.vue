<template>
	<v-app>
		<v-toolbar dense app clipped-left>
			<v-toolbar-side-icon></v-toolbar-side-icon>
			<img src="/img/Servosa.png" alt="Servosa" width="150">
			<v-spacer></v-spacer>
		</v-toolbar>
		<v-navigation-drawer app clipped floating v-model="drawer" width="460">
			<v-layout column>
				<v-flex>
					<v-subheader>VEHICULOS</v-subheader>
					<v-divider></v-divider>
					<template v-if="plates.length>0">
						<Transfer :universe="plates" v-on:childToParent="onChildClick"></Transfer>
					</template>
					<v-divider></v-divider>
				</v-flex>
				<v-flex>
					<v-subheader>PERIODO</v-subheader>
					<v-divider></v-divider>
					<div class="pa-3">
						<v-radio-group v-model="period" row @change="changePeriod">
							<v-radio label="Dia" value="day"></v-radio>
							<v-radio label="Mes" value="month"></v-radio>
							<v-radio label="Rango" value="range"></v-radio>
						</v-radio-group>
						<v-menu
							ref="pickerDay"
							:close-on-content-click="false"
							v-model="pickerDay"
							transition="scale-transition"
							v-if="period == 'day'"
						>
							<v-text-field
								slot="activator"
								v-model="pickerDayModel"
								readonly
								height="20"
								flat
								label="Dia"
							></v-text-field>
							<v-date-picker v-model="pickerDayModel" no-title @input="pickerDay = false"></v-date-picker>
						</v-menu>
						<v-menu
							ref="pickerMonth"
							:close-on-content-click="false"
							v-model="pickerMonth"
							transition="scale-transition"
							v-else-if="period == 'month'"
						>
							<v-text-field
								slot="activator"
								v-model="pickerMonthModel"
								readonly
								label="Mes"
								height="20"
								flat
							></v-text-field>
							<v-date-picker v-model="pickerMonthModel" no-title @input="pickerMonth = false" type="month"></v-date-picker>
						</v-menu>
						<section>
							<v-menu
								ref="pickerDayStart"
								:close-on-content-click="false"
								v-model="pickerDayStart"
								transition="scale-transition"
								v-if="period == 'range'"
							>
								<v-text-field
									slot="activator"
									v-model="pickerDayStartModel"
									readonly
									height="20"
									flat
									label="Desde"
								></v-text-field>
								<v-date-picker v-model="pickerDayStartModel" no-title @input="pickerDayStart = false"></v-date-picker>
							</v-menu>
							<v-menu
								ref="pickerDayEnd"
								:close-on-content-click="false"
								v-model="pickerDayEnd"
								transition="scale-transition"
								v-if="period == 'range'"
							>
								<v-text-field
									slot="activator"
									v-model="pickerDayEndModel"
									readonly
									height="20"
									flat
									label="Hasta"
								></v-text-field>
								<v-date-picker v-model="pickerDayEndModel" no-title @input="pickerDayEnd = false"></v-date-picker>
							</v-menu>
						</section>
					</div>
					<v-divider></v-divider>
				</v-flex>
				<v-flex>
					<v-subheader>ACCION</v-subheader>
					<v-divider></v-divider>
					<div class="pa-3">
						<v-btn block>Buscar</v-btn>
					</div>
				</v-flex>
			</v-layout>
		</v-navigation-drawer>
		<VContent>
			<VContainer>

			</VContainer>
		</VContent>
	</v-app>
</template>

<script>
import Transfer from "../components/Servosa/Transfer";
export default {
	components: {
		Transfer
	},
	created() {
		Meteor.call("SRVS_getPlates", (error, data) => {
			if (!error) {
				this.plates = data[0].plates;
				// console.log(this.plates);
			}
		});
	},
	methods: {
		onChildClick(data) {
			console.log("data: ", data);
			this.vehicles = data;
		}
	},
	data() {
		return {
			drawer: true,
			pickerDayModel: new Date().toISOString().substr(0, 10),
			pickerDay: false,
			pickerDayStartModel: null,
			pickerDayStart: false,
			pickerDayEndModel: null,
			pickerDayEnd: false,
			pickerMonthModel: null,
			pickerMonth: false,
			loadingData: false,
			plates: [],
			vehicles: [],
			period: "day"
		};
	}
};
</script>

<style scoped>
.application {
	font-family: "Ubuntu", sans-serif !important;
}
</style>
