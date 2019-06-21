<template>
	<v-app>
		<v-content>
			<v-container fill-height>
				<v-layout row justify-center>
					<v-flex xs12 lg8>
						<v-card>
							<v-card-title>Excel Report Convert</v-card-title>
							<v-card-text>
								<v-layout row justify-center>
									<v-flex xs12 lg6>
										<input type="file">
									</v-flex>
									<v-flex xs12 lg6>
										<v-btn>Convertir</v-btn>
									</v-flex>
								</v-layout>
							</v-card-text>
						</v-card>
					</v-flex>
				</v-layout>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
export default {};
</script>

<style>
</style>
