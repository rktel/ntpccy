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
					<section class="pl-3">
						<div class="mb-2">
							<p class="body-2 grey--text ma-0">Desde:</p>
							<input type="datetime-local" v-model="datetimeStart">
						</div>
						<div class="mb-2">
							<p class="body-2 grey--text ma-0">Hasta:</p>
							<input type="datetime-local" v-model="datetimeEnd">
						</div>
					</section>
					<v-divider></v-divider>
				</v-flex>
				<v-flex>
					<v-subheader>ACCION</v-subheader>
					<v-divider></v-divider>
					<div class="pa-3">
						<v-btn block color="primary" @click="onSRVSReport" :loading="loadingData">Buscar</v-btn>
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
		//	console.log("data: ", data);
			this.vehicles = data;
		},
		onSRVSReport() {
			const { vehicles, datetimeStart, datetimeEnd } = this;
			if (vehicles.length > 0) {
        this.loadingData = true
				Meteor.call("SRVS_getData",	vehicles,	datetimeStart, datetimeEnd, (error, data)=> {
						if (!error) {
              this.loadingData = false
              console.log("data: ", data);
						}
					}
				);
			}
		}
	},
	data() {
		return {
			drawer: true,
			plates: [],
			vehicles: [],
			// test input date-time
			datetimeStart: getDatetimeStart(),
      datetimeEnd: getDatetimeEnd(),
      loadingData: false,
		};
	}
};

function getDatetimeStart() {
	let date = new Date().toISOString();
	return date.substr(0, 10) + "T00:00";
}
function getDatetimeEnd() {
	let date = new Date().toISOString();
	return date.substr(0, 10) + "T23:59";
}
</script>

<style scoped>
.application {
	font-family: "Ubuntu", sans-serif !important;
}
</style>
