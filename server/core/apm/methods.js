import XLSX from "xlsx";

Meteor.methods({
    APM_uploadS(bstr, name) {

        return XLSX.read(bstr, { type: 'binary' });
     
        /*
        const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet);    
        
        
        
        DO SOMETHING WITH workbook HERE 
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