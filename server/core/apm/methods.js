import XLSX from "xlsx";

Meteor.methods({
    APM_uploadS(bstr, name) {
       let wb =  XLSX.read(bstr, { type: 'binary', cellDates: true});
       let out = [];

       const ws = wb.Sheets[wb.SheetNames[0]];
       const json = XLSX.utils.sheet_to_json(
           ws,
           { header: 1 },
           { raw: false }
       );
     //  console.log(json);

       json.forEach((el, index) => {
           if (index > 1) {
               out.push({
                   Tipo: el[0].substr(el[0].indexOf("Current Speed") + 15, 7),
                   Dispositivo: el[1],
                   Persona: el[2],
                   Localizacion: el[3],
                   Fecha: el[7]
               });
           }
       });
        console.log(out);

    },
    APM_uploadU(ab, name) {
        return XLSX.read(ab, { type: 'array' });
    },
});

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
	isoString.setHours(isoString.getHours());
	isoString = isoString.toISOString();
	isoString = isoString.split("T");
	let date = isoString[0].split("-");
	let time = isoString[1].split(".");

	date = date[2] + "/" + date[1] + "/" + date[0];
	time = time[0];

	return date + " " + time;
}
/*

        let out = [];
        const wb = XLSX.read(bstr, { type: 'binary', cellDates: true });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(ws, {	header: 1 }, {raw: false});
        console.log(json);

        json.forEach((el, index) => {
            if (index > 1) {
                out.push({
                    Tipo: el[0].substr(el[0].indexOf("Current Speed")+15, 7),
                    Dispositivo: el[1],
                    Persona: el[2],
                    Localizacion: el[3],
                    Fecha: el[7]
                });
            }
        });

        return out*/