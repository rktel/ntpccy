Meteor.methods({
    async  APM_uploadS(bstr, name) {
        const wb = await XLSX.read(bstr, { type: 'binary' });
        return wb
    },
    async  APM_uploadU(ab, name) {
        const wb = await XLSX.read(ab, { type: 'array' });
        return wb
    },
});