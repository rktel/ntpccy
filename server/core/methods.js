import { Personal } from '../../imports/api/collections'
import { Antapaccay, Exsa } from '../../imports/api/collections'

import { stNTPCCY, stXS } from "../../imports/api/streamers";


//-------------------- EXSA

Meteor.methods({
    async Exsa_queryPlates() {
        const plates = await Exsa.rawCollection().distinct('events.vehicle')
        return plates
    },
    Exsa_queryRangeDatePlates(userID, plates, dateTimeStart, dateTimeEnd) {
        console.log('........................EXSA...............................')
        // console.log('dateTimeStart', dateTimeStart, 'dateTimeEnd', dateTimeEnd)
        dateTimeStart = addHours(dateTimeStart, 5)
        dateTimeEnd = addHours(dateTimeEnd, 5)
        console.log('Usuario: ', Meteor.user().username)
        console.log('Fecha y Tiempo de Inicio[+5]: ', dateTimeStart)
        console.log('Fecha y Tiempo de Fin[+5]: ', dateTimeEnd)
        plates = plates.sort()
        console.log('placas: ', plates)
        Exsa.rawCollection()
            .find({ 'events': { $elemMatch: { 'vehicle': { $in: plates }, 'created': { $gte: dateTimeStart, $lte: dateTimeEnd } } } })
            .sort({ 'events.vehicle': 1 })
            .toArray((error, data) => {
                if (!error) {
                    Exsa_createReport(userID, data)
                }
            })
    }
});
//FUNCTIONS HELPERS EXSA
function Exsa_setState(estado, velocidad) {
    if (estado) {
        if (velocidad >= 5) {
            return 2 // 'En transito'
        } else {
            return 1 // 'Stop'
        }
    } else {
        return 0 //  'Aparcado'
    }
}
function Exsa_createReport(userID, data) {
    //console.log('in createRport')
    let Rows = []
    data.map(item => {
        item.events.map(e => {
            Rows.push(Exsa_objectRow(e))
        })
    })

    const rowsTotal = Rows.length
    console.log('Documentos Consultados: ', rowsTotal)
    // console.log('Rows : ', Rows)
    let RowsReport = []

    if (rowsTotal > 0) {

        Rows.map((row, index, rowArray) => {
            if(index==0){
                RowsReport.push(row)
            }
            if(index > 0 && index <= (rowsTotal - 1)){
                RowsReport.push(row)
            }
            // console.log(index, row.fechaHora, row.estado, row.placa)

        })

        // stXS.emit('Rows', userID, RowsReport)
        console.log('RowsReport: ', RowsReport)
        const rowsReportTotal = RowsReport.length
        console.log('Documentos Creados: ', rowsReportTotal)
    } else {
        stXS.emit('NoData', userID, 0)
        console.log('No hay data')
    }


}
function Exsa_objectRow(e){
    return{
        fechaHora: addHours(e.created, -5),
        estado: Exsa_setState(e.inputs.digital[0].value, Math.round(parseFloat(e.location.speed))),
        lat: e.location.latitude.toFixed(6),
        lon: e.location.longitude.toFixed(6),
        velocidad: Math.round(parseFloat(e.location.speed)),
        odometro: (e.counters[0].value / 1000).toFixed(3),
        direccion: e.location.address,
        geozona: e.location.areas[0] ? e.location.areas[0].name : ' ',
        conductor: e.person,
        placa: e.vehicle,        
    }
}

//-------------------- EMAIL
const FROM_EMAIL = "noreplay_trackandtrace@securitasperu.com";
Meteor.methods({
    sendEmail(to, from, subject, text) {
        this.unblock();
        Email.send({ to, from, subject, text })
    }
})

//-------------------- PERSONAL
Meteor.methods({
    getPersonal: function () {
        return Personal.findOne({ userId: this.userId })
    },
    createPersonal: function (personal) {
        const { username, password } = createCredentials(personal)
        const userId = Accounts.createUser({ username, password })
        const { firstname, lastname, email, role, api } = personal
        if (api) {
            return Personal.insert({ firstname, lastname, email, role, userId, username, password, api }, (error, id) => {
                if (!error)
                    Meteor.call("sendEmail", email, FROM_EMAIL, "Usuario RPT [Securitas-TrackAndTrace]", `Estimado ${firstname} ${lastname} \nSu cuenta de acceso a RPT Securitas-TrackAndTrace es el siguiente: \nUsuario: ${username}\nPassword: ${password} `)
            })
        } else {
            return Personal.insert({ firstname, lastname, email, role, userId, username, password }, (error, id) => {
                if (!error)
                    Meteor.call("sendEmail", email, FROM_EMAIL, "Usuario RPT [Securitas-TrackAndTrace]", `Estimado ${firstname} ${lastname} \nSu cuenta de acceso a RPT Securitas-TrackAndTrace es el siguiente: \nUsuario: ${username}\nPassword: ${password} `)
            })
        }

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

//ANTAPACCAY PLATES & REPORT
Meteor.methods({
    async queryPlates() {
        const plates = await Antapaccay.rawCollection().distinct('events.vehicle')
        return plates
    },
    queryRangeDatePlates(userID, plates, dateTimeStart, dateTimeEnd) {
        console.log('........................ANTAPACCAY...............................')
        // console.log('dateTimeStart', dateTimeStart, 'dateTimeEnd', dateTimeEnd)
        dateTimeStart = addHours(dateTimeStart, 5)
        dateTimeEnd = addHours(dateTimeEnd, 5)
        console.log('Usuario: ', Meteor.user().username)
        console.log('Fecha y Tiempo de Inicio[+5]: ', dateTimeStart)
        console.log('Fecha y Tiempo de Fin[+5]: ', dateTimeEnd)
        plates = plates.sort()
        console.log('placas: ', plates)
        Antapaccay.rawCollection()
            .find({ 'events': { $elemMatch: { 'vehicle': { $in: plates }, 'created': { $gte: dateTimeStart, $lte: dateTimeEnd } } } })
            .sort({ 'events.vehicle': 1 })
            .toArray((error, data) => {
                if (!error) {
                    createReport(userID, data)
                }
            })
    }
})

//FUNCTIONS HELPERS ANTAPACCAY .... console.log(item.events[0].id, item.events[0].created, item.events[0].vehicle)
function createReport(userID, data) {
    //console.log('in createRport')
    let Rows = []
    data.map(item => {
        item.events.map(e => {
            Rows.push({
                fechaHora: addHours(e.created, -5),
                estado: e.inputs.digital[0].value,
                lat: e.location.latitude.toFixed(6),
                lon: e.location.longitude.toFixed(6),
                velocidad: Math.round(parseFloat(e.location.speed)),
                odometro: (e.counters[0].value / 1000).toFixed(3),
                direccion: e.location.address,
                geozona: e.location.areas[0] ? e.location.areas[0].name : ' ',
                conductor: e.person,
                placa: e.vehicle,
            })

        })

    })
    const rowsTotal = Rows.length
    console.log('Documentos Consultados: ', rowsTotal)
    // console.log('Rows : ', Rows)
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
        stNTPCCY.emit('Rows', userID, RowsReport)
        console.log('Documentos Creados: ', RowsReport.length)
    } else {
        stNTPCCY.emit('NoData', userID, 0)
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

// END ANTAPACCAY API