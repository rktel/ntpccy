<template>
	<v-app>
		<v-content>
			<v-container fill-height>
				<v-layout row justify-center>
					<v-flex xs12 lg8>
						<v-card>
							<v-card-title>Excel Report Convert</v-card-title>
							<v-card-text>
								<v-toolbar flat>
									<input type="file" @change="changeFile">
									<v-spacer></v-spacer>
									<!--v-btn fab small dark color="grey" @click="transformFile">
										<v-icon>get_app</v-icon>
									</v-btn-->
								</v-toolbar>
							</v-card-text>
						</v-card>
					</v-flex>
				</v-layout>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
import XLSX from "xlsx";
import { json2excel } from "js2excel";
export default {
	methods: {
		changeFile(event) {
			const file = event.currentTarget.files[0];
			const reader = new FileReader();
			const rABS = !!reader.readAsBinaryString;
			reader.onload = function(e) {
				const data = e.target.result;
				const name = file.name;
				console.log("name:", name);
				// console.log("data:", data);
				/* Meteor magic */
				Meteor.call("APM_uploadS", data, name, (err, wb) => {
					//if (err) throw err;
					/* load the first worksheet */

					if (!err) {
						json2excel({
							data: wb,
							name: "Reporte",
							//formateDate: "yyyy/mm/dd"
						});
						/*
						let out = [];

						const ws = wb.Sheets[wb.SheetNames[0]];
						const json = XLSX.utils.sheet_to_json(
							ws,
							{ header: 1 },
							{ raw: false }
						);
						console.log(json);

						json.forEach((el, index) => {
							if (index > 1) {
								out.push({
									Tipo: el[0].substr(
										el[0].indexOf("Current Speed") + 15,
										7
									),
									Dispositivo: el[1],
									Persona: el[2],
									Localizacion: el[3],
									Fecha: ExcelDateToJSDate(el[7])
								});
							}
						});
*/
						/*
						json2excel({
							data: out,
							name: "Reporte",
							formateDate: "yyyy/mm/dd"
						});
*/
					}

					/* generate HTML table and enable export 
					const html = XLSX.utils.sheet_to_html(ws, { editable: true });
					document.getElementById('out').innerHTML = html;
					document.getElementById('dnload').disabled = false;
				*/
				});
			};
			if (rABS) reader.readAsBinaryString(file);
			//	else reader.readAsArrayBuffer(file);
		},
		transformFile() {
			//alert("hello");
		}
	}
};
/*
function ExcelDateToJSDate(serial) {
	var utc_days = Math.floor(serial - 25569);
	var utc_value = utc_days * 86400;
	var date_info = new Date(utc_value * 1000);

	var fractional_day = serial - Math.floor(serial) + 0.0000001;

	var total_seconds = Math.floor(86400 * fractional_day);

	var seconds = total_seconds % 60;

	total_seconds -= seconds;

	var hours = Math.floor(total_seconds / (60 * 60));
	var minutes = Math.floor(total_seconds / 60) % 60;

	let isoString = new Date(date_info.getFullYear(),date_info.getMonth(),date_info.getDate(),hours,minutes,seconds	);
	// isoString = isoString.setHours(isoString.getHours() + 19);
	isoString.setHours(isoString.getHours() + 19);
	isoString = isoString.toISOString();
	isoString = isoString.split("T");
	let date = isoString[0].split("-");
	let time = isoString[1].split(".");

	date = date[2] + "/" + date[1] + "/" + date[0];
	time = time[0];

	return date + " " + time;
}
*/
</script>

<style>
</style>
