Meteor.methods({
    APM_uploadS(bstr, name) {
        return XLSX.read(bstr, { type: 'binary' });
    },
    APM_uploadU(ab, name) {
        return XLSX.read(ab, { type: 'array' });
    },
});