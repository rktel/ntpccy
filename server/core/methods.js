import { Personal } from '../../imports/api/collections'
import { Antapaccay } from '../../imports/api/collections'

import { stNTPCCY } from "../../imports/api/streamers";
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
    queryRangeDatePlates(userID, plates, dateTimeStart, dateTimeEnd) {
        // console.log('dateTimeStart', dateTimeStart, 'dateTimeEnd', dateTimeEnd)
        dateTimeStart = addHours(dateTimeStart, 5)
        dateTimeEnd = addHours(dateTimeEnd, 5)
        console.log('dateTimeStart', dateTimeStart, 'dateTimeEnd', dateTimeEnd)
        plates = plates.sort()
        console.log(plates)
        Antapaccay.rawCollection()
            .find({ 'events': { $elemMatch: { 'vehicle': { $in: plates }, 'created': { $gte: dateTimeStart, $lte: dateTimeEnd } } } })
            .sort({ 'events.vehicle': 1 })
            .toArray((error, items) => {
                if (!error) {
                    //console.log('preReport length:', items.length)
                    createReport(userID, items)
                }
            })
    }
})

//FUNCTIONS HELPERS.... console.log(item.events[0].id, item.events[0].created, item.events[0].vehicle)
function createReport(userID, data) {
    //console.log('in createRport')
    let Rows = []
    data.map(item => {
        item.events.map(e => {
            Rows.push({
                fechaHora: addHours(e.created, -5),
                estado: e.inputs.digital[0].value,
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
    const rowsTotal = Rows.length
    console.log('Rows Length: ', rowsTotal)
    let RowsReport = []
    if (rowsTotal > 0) {
        Rows.map((row, index, rowArray) => {

            if (index > 0 && row.placa != rowArray[index - 1].placa) {
                const dateTime4 = getDateAndTime(row.fechaHora)
                const date4 = dateTime4.date
                const time4 = dateTime4.time
                RowsReport.push({
                    //fechaHora: row.fechaHora,
                    fecha: date4,
                    hora: time4,
                    estado: row.estado ? 'En movimiento' : 'Detenido',
                    lat: row.lat,
                    lon: row.lon,
                    velocidad: row.velocidad,
                    odometro: row.odometro,
                    direccion: row.direccion,
                    geozona: row.geozona,
                    conductor: row.conductor,
                    placa: row.placa
                })
            } else {
                if (index > 0 && index <= (rowsTotal - 1)) {
                    const diffMinutes = getMinutesDiff(row.fechaHora, rowArray[index - 1].fechaHora)
                    if (diffMinutes > 1) {
                        const beforeRow = rowArray[index - 1]
                        for (let i = 1; i < diffMinutes; i++) {
                            const dateTime0 = getDateAndTime(addMinutes(beforeRow.fechaHora, i))
                            const date0 = dateTime0.date
                            const time0 = dateTime0.time
                            RowsReport.push({
                                //fechaHora: addMinutes(beforeRow.fechaHora, i),
                                fecha: date0,
                                hora: time0,
                                estado: beforeRow.estado ? 'En movimiento' : 'Detenido',
                                lat: beforeRow.lat,
                                lon: beforeRow.lon,
                                velocidad: beforeRow.velocidad,
                                odometro: beforeRow.odometro,
                                direccion: beforeRow.direccion,
                                geozona: beforeRow.geozona,
                                conductor: beforeRow.conductor,
                                placa: beforeRow.placa
                            })
                        }
                        const dateTime1 = getDateAndTime(row.fechaHora)
                        const date1 = dateTime1.date
                        const time1 = dateTime1.time
                        RowsReport.push({
                            // fechaHora: row.fechaHora,
                            fecha: date1,
                            hora: time1,
                            estado: row.estado ? 'En movimiento' : 'Detenido',
                            lat: row.lat,
                            lon: row.lon,
                            velocidad: row.velocidad,
                            odometro: row.odometro,
                            direccion: row.direccion,
                            geozona: row.geozona,
                            conductor: row.conductor,
                            placa: row.placa
                        })
                    } else {
                        const dateTime2 = getDateAndTime(row.fechaHora)
                        const date2 = dateTime2.date
                        const time2 = dateTime2.time
                        RowsReport.push({
                            //  fechaHora: row.fechaHora,
                            fecha: date2,
                            hora: time2,
                            estado: row.estado ? 'En movimiento' : 'Detenido',
                            lat: row.lat,
                            lon: row.lon,
                            velocidad: row.velocidad,
                            odometro: row.odometro,
                            direccion: row.direccion,
                            geozona: row.geozona,
                            conductor: row.conductor,
                            placa: row.placa
                        })
                    }
                } else {
                    const dateTime3 = getDateAndTime(row.fechaHora)
                    const date3 = dateTime3.date
                    const time3 = dateTime3.time
                    RowsReport.push({
                        //fechaHora: row.fechaHora,
                        fecha: date3,
                        hora: time3,
                        estado: row.estado ? 'En movimiento' : 'Detenido',
                        lat: row.lat,
                        lon: row.lon,
                        velocidad: row.velocidad,
                        odometro: row.odometro,
                        direccion: row.direccion,
                        geozona: row.geozona,
                        conductor: row.conductor,
                        placa: row.placa
                    })
                }
            }

        })
        // console.log('RowsReport: ',RowsReport)
        stNTPCCY.emit('Rows', userID, RowsReport )
        console.log('RowsReport.length: ', RowsReport.length)
    } else {
        stNTPCCY.emit('NoData',userID, 0)
        console.log('No hay data')
    }


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
function addZero(data) {
    return data < 10 ? '0' + data : data
}
function getDateAndTime(dateTime_) {
    const millis = getTimeMillis(dateTime_)
    const dateTime = new Date(millis)
    const year = dateTime.getFullYear()
    const month = addZero(dateTime.getMonth() + 1)
    const day = addZero(dateTime.getDate())
    const hour = addZero(dateTime.getHours())
    const minute = addZero(dateTime.getMinutes())
    return {
        date: day + '/' + month + '/' + year,
        time: hour + ':' + minute
    }
}
function addMinutes(dateTime, number) {
    const addMillis = getTimeMillis(dateTime) + number * (60 * 1000)
    return new Date(addMillis)
}
function getMinutesDiff(dateTimeMax, dateTimeMin) {
    const diff = getTimeMillis(dateTimeMax) - getTimeMillis(dateTimeMin)
    return parseInt(diff / (60 * 1000))
}
function getTimeMillis(dateTime) {
    return (new Date(dateTime)).getTime()

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