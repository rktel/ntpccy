import XLSX from "xlsx";

Meteor.methods({
    APM_uploadS(bstr, name) {

        let wb = XLSX.read(bstr, { type: 'binary' });
        let firstSheet = wb.SheetNames[0];
        let json = XLSX.utils.sheet_to_json(wb.Sheets[firstSheet]);
        console.log(json);
        return "hello"       
        /* DO SOMETHING WITH workbook HERE 
        var first_sheet_name = wb.SheetNames[0];
   
        var ws = wb.Sheets[first_sheet_name];
        const json = XLSX.utils.sheet_to_json(ws)
        console.log(json)
        return wb
        */
    },
    APM_uploadU(ab, name) {
        return XLSX.read(ab, { type: 'array' });
    },
});