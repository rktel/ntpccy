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
    queryRangeDatePlates(plates, dateTimeStart, dateTimeEnd) {
        console.log('dateTimeStart', dateTimeStart, 'dateTimeEnd', dateTimeEnd)
        dateTimeStart = addHours(dateTimeStart, 5)
        dateTimeEnd = addHours(dateTimeEnd, 5)
        console.log('dateTimeStart', dateTimeStart, 'dateTimeEnd', dateTimeEnd)
        plates = plates.sort()
        console.log(plates)
        Antapaccay.rawCollection()
            .find({ 'events': { $elemMatch: { 'vehicle': { $in: plates }, 'created': { $gte: dateTimeStart, $lte: dateTimeEnd } } } })
            .sort({ 'events.vehicle': 1 })
            .toArray(Meteor.bindEnvironment((error, items) => {
                if (!error) {
                    //console.log('preReport length:', items.length)
                    createReport(items)
                }
            }))
    }
})

//FUNCTIONS HELPERS.... console.log(item.events[0].id, item.events[0].created, item.events[0].vehicle)
function createReport(data) {
    console.log('in createRport')
    let Rows = []
    data.map(item => {
        item.events.map(e => {
            // console.log(addHours(e.created, -5), e.vehicle)
            //console.log(e.inputs.digital)
            //console.log(e.counters)
            //console.log(e.location.areas)

            Rows.push({
                dateTime: addHours(e.created, -5),
                estado: e.inputs.digital[0].value ? 'En movimiento' : 'Detenido',
                lat: e.location.latitude,
                lon: e.location.longitude,
                velocidad: Math.round(parseFloat(e.location.speed)),
                odometro: parseInt(e.counters[0].value) / 1000,
                direccion: e.location.address,
                geozona: e.location.areas[0] ? e.location.areas[0].name : ' ',
                conductor: e.person,
                placa: e.vehicle,
            })

        })

    })
    console.log('Rows Length: ',Rows.length)
    console.log('Rows: ',Rows)

}
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
function addHours(datetime, hours) {
    let date1 = new Date(datetime);
    date1.setHours(date1.getHours() + hours);
    return date1.toISOString()
}


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