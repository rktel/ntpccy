import { Personal } from '../imports/api/collections'

let hyperUserId = null
 
Meteor.startup(() => {
    console.log('Meteor backend up')

    if (Meteor.users.find().count() == 0) {
        hyperUserId = Accounts.createUser({
            username: Meteor.settings.private.HYPER_USER,
            password: Meteor.settings.private.HYPER_USER_PASSWORD,
        })
    }

    if (Personal.find().count() == 0) {
        Personal.insert({
            firstname: Meteor.settings.private.HYPER_PERSONAL_FIRSTNAME,
            lastname: Meteor.settings.private.HYPER_PERSONAL_LASTNAME,
            role: Meteor.settings.private.HYPER_PERSONAL_ROLE,
            userId: hyperUserId
        })
    }

    Meteor.call('getPlates', (error, plates) => {
        if(!error){
            console.log(plates)
        }
    })

})