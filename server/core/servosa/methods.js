import { Servosa, ArrayPlates } from '../../../imports/api/collections'

Meteor.methods({ 
    async SRVS_getPlates() {
        const plates = ArrayPlates.find({name:"Servosa"})
        return plates
    },
});