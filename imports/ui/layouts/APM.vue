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
			console.log(rABS);
		},
		transformFile() {
			alert("hello");
		}
	}
};
</script>

<style>
</style>
