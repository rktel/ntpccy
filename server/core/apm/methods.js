import XLSX from "xlsx";

Meteor.methods({
    APM_uploadS(bstr, name) {
        let out = [];
        const wb = XLSX.read(bstr, { type: 'binary' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(ws, {	header: 1 });
        //	console.log(json);

        json.forEach((el, index) => {
            if (index > 1) {
                out.push({
                    Tipo: el[0].substr(el[0].indexOf("Current Speed")+15, 7),
                    Dispositivo: el[1],
                    Persona: el[2],
                    Localizacion: el[3],
                    Fecha: ""+el[7]
                });
            }
        });

        return out




    },
    APM_uploadU(ab, name) {
        return XLSX.read(ab, { type: 'array' });
    },
});