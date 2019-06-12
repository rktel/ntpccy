<template>
	<v-app>
		<v-toolbar dense app clipped-left>
			<v-toolbar-side-icon @click="drawer=!drawer"></v-toolbar-side-icon>
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
					<template v-else>
						<div class="text-xs-center">
							<v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
						</div>
					</template>
					<v-divider></v-divider>
				</v-flex>
				<v-flex>
					<v-subheader>PERIODO</v-subheader>
					<v-divider></v-divider>
					<v-layout row>
						<v-flex xs6>
							<input type="datetime-local" value="2018-06-12T19:30">
						</v-flex>
						<v-flex xs6>
							<input type="datetime-local" value="2018-06-12T19:30">
						</v-flex>
					</v-layout>

					<!--div class="pa-3">
						<section>
							<v-menu
								ref="pickerDayStart"
								:close-on-content-click="false"
								v-model="pickerDayStart"
								transition="scale-transition"
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
					</div-->
					<v-divider></v-divider>
				</v-flex>
				<v-flex>
					<v-subheader>ACCION</v-subheader>
					<v-divider></v-divider>
					<div class="pa-3">
						<v-btn block color="primary" @click="onSRVSReport">Buscar</v-btn>
					</div>
				</v-flex>
			</v-layout>
		</v-navigation-drawer>
		<VContent>
			<VContainer></VContainer>
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
		},
		onSRVSReport() {
			const T = "T";
			const Z = ":00.000Z";

			//const dateTimeStart = dateStart + T + timeStart + Z;
			//const dateTimeEnd = dateEnd + T + timeEnd + Z;
			if (this.vehicles.length > 0) {
				console.log(
					this.vehicles,
					this.pickerDayStartModel,
					this.pickerDayEndModel
				);
			}
		}
	},
	data() {
		return {
			drawer: true,
			pickerDayStartModel: null,
			pickerDayStart: false,
			pickerDayEndModel: null,
			pickerDayEnd: false,
			plates: [],
			vehicles: []
		};
	}
};
</script>

<style scoped>
.application {
	font-family: "Ubuntu", sans-serif !important;
}
</style>
