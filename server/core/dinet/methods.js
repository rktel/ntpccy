import { Dinet } from '../../../imports/api/collections'

Meteor.methods({ 
    async DNT_getPlates() {
        const plates = await Dinet.rawCollection().distinct('events.vehicle')
        return plates
    },
});