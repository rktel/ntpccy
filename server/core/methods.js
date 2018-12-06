import { Personal } from '../../imports/api/collections'
import { Antapaccay } from '../../imports/api/collections'

// PERSONAL
Meteor.methods({
    getPersonal: function () {
        return Personal.findOne({ userId: this.userId })
    },
    createPersonal: function (personal) {
        const { username, password } = createCredentials(personal)
        const userId = Accounts.createUser({ username, password })
        const { firstname, lastname, role } = personal
        return Personal.insert({ firstname, lastname, role, userId, username, password })
    },
    removePersonal: function (personal) {
        const { _id, userId } = personal
        if (userId) {
            Meteor.users.remove({ _id: userId })
        }
        return Personal.remove({ _id })
    },
    updatePersonal: function (personal) {
        const { firstname, lastname, role, _id } = personal
        return Personal.update({ _id }, { $set: { firstname, lastname, role } })
    }
})
//PERSONAL-USER
/*
Meteor.methods({
    createPersonalUser: function (personal) {
        const { username, password } = createCredentials(personal)
        const userId = Accounts.createUser({ username, password })
        return Personal.upsert({ _id: personal._id }, { $set: { userId, username, password } })
    }
})
*/
//ANTAPACCAY PLATES & REPORT
Meteor.methods({
    async queryPlates() {
        const plates = await Antapaccay.rawCollection().distinct('events.vehicle')
        return plates
    },
     queryRangeDatePlates(plates, dateTimeStart, dateTimeEnd){
        console.log(plates, dateTimeStart, dateTimeEnd)
        Antapaccay.rawCollection()
        .find({'events':{$elemMatch: {'vehicle':{$in:plates},'created':{$gte: dateTimeStart,$lte: dateTimeEnd}}}},{'events':1,'_id':0})
        .map(element => {
            console.log(element)
        });
        /*
                .find({'events':{$elemMatch: {'vehicle':{$in:plates},'created':{$gte: dateTimeStart,$lte: dateTimeEnd}}}},{'events':1,'_id':0})
        .sort({'events.vehicle':1,'events.created':1}, function(err, docs){
            console.log('error: ', err)
            console.log('docs: ', docs)
        })
                .forEach(element => {
            console.log(element)
        });
         */

        
    }
})

//FUNCTIONS HELPERS
function createCredentials(personal) {
    const { firstname, lastname } = personal
    const firstLetterUsername = firstname.substr(0, 1).toLowerCase()
    const moreLetterUsername = lastname.split(' ') ? lastname.split(' ')[0].toLowerCase().replace(/[aeiouáéíóú]/ig, '') : lastname.toLowerCase().replace(/[aeiouáéíóú]/ig, '')
    const username = firstLetterUsername + moreLetterUsername
    const password = firstname.split(' ') ? firstname.split(' ')[0].toLowerCase().replace(/[aeiouáéíóú]/ig, '') + Date.now().toString().substr(11) : firstname.toLowerCase().replace(/[aeiouáéíóú]/ig, '') + Date.now().toString().substr(11)
    return {
        username,
        password
    }
}