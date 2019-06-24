import XLSX from "xlsx";

Meteor.methods({
    APM_uploadS(bstr, name) {
        const wb = XLSX.read(bstr, { type: 'binary' });
        const json = XLSX.utils.sheet_to_json(wb)
        console.log(json)
        return wb
    },
    APM_uploadU(ab, name) {
        return XLSX.read(ab, { type: 'array' });
    },
});