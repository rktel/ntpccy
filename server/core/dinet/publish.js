import { Dinet } from '../../../imports/api/collections'


Meteor.publish('dinet_plates', () => {
    return Dinet.rawCollection().distinct('events.vehicle')
})
Meteor.publish('dinet_day', () => {
    
})
Meteor.publish('dinet_month', () => {
    
})

/**
 * 
 * Meteor.publish('personal', () => {
    return Personal.find({ role: { $ne: Meteor.settings.private.HYPER_PERSONAL_ROLE } })
})

        const plates = await Dinet.rawCollection().distinct('events.vehicle')
        return plates
 * 
 */