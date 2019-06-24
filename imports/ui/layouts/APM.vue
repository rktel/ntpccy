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
									<v-btn fab small dark color="grey" @click="transformFile">
										<v-icon>get_app</v-icon>
									</v-btn>
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
					let out = [];
					if (!err) {
						const ws = wb.Sheets[wb.SheetNames[0]];
						const json = XLSX.utils.sheet_to_json(ws, { header: 1});
					//	console.log(json);

						json.forEach((el, index)=>{
							if(index >1){
								out.push({
									Tipo: el[0],
									Dispositivo: el[1],
									Persona: el[2],
									Localizacion: el[3],
									Fecha: el[7]
								})
							}
						})

						console.log(out);
						
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
			/* original data */
var data = [
    {"name":"John", "city": "Seattle"},
    {"name":"Mike", "city": "Los Angeles"},
    {"name":"Zach", "city": "New York"}
];

/* this line is only needed if you are not adding a script tag reference */
// if(typeof XLSX == 'undefined') XLSX = require('xlsx');

/* make the worksheet */
var ws = XLSX.utils.json_to_sheet(data);

/* add to workbook */
var wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "People");

/* write workbook */
XLSX.write(wb, {bookType:'xlsx', type:'buffer'});
		}
	}
};
</script>

<style>
</style>
