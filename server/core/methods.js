import { Personal, ArrayPlates } from '../../imports/api/collections'
import { Antapaccay, Exsa, Servosa } from '../../imports/api/collections'

import { stNTPCCY, stXS } from "../../imports/api/streamers";


//-------------------- ARRAY PLATES

Meteor.methods({
    // Servosa
    ArrayPlates_getPlates_Servosa: function () {
        return ArrayPlates.findOne({ name: 'Servosa' })
    },
    ArrayPlates_setPlates_Servosa: function () {
        Meteor.call("Servosa_queryPlates", (error, plates) => {
            if (!error) {
                ArrayPlates.insert({ name: 'Servosa', plates: plates.sort() })
            }
        });
    },
    ArrayPlates_updatePlates_Servosa: function () {
        Meteor.call("Servosa_queryPlates", (error, plates) => {
            if (!error) {
                ArrayPlates.replaceOne({ name: 'Servosa', plates: plates.sort() })
            }
        });
    },
    // Antapaccay
    ArrayPlates_getPlates_Antapaccay: function () {
        return ArrayPlates.findOne({ name: 'Antapaccay' })
    },
    ArrayPlates_setPlates_Antapaccay: function () {
        Meteor.call("Antapaccay_queryPlates", (error, plates) => {
            if (!error) {
                ArrayPlates.insert({ name: 'Antapaccay', plates: plates.sort() })
            }
        });
    },
    ArrayPlates_updatePlates_Antapaccay: function () {
        Meteor.call("Antapaccay_queryPlates", (error, plates) => {
            if (!error) {
                ArrayPlates.replaceOne({ name: 'Antapaccay', plates: plates.sort() })
            }
        });
    },
    // Exsa
    ArrayPlates_getPlates_Exsa: function () {
        return ArrayPlates.findOne({ name: 'Exsa' })
    },
    ArrayPlates_setPlates_Exsa: function () {
        Meteor.call("Exsa_queryPlates", (error, plates) => {
            if (!error) {
                ArrayPlates.insert({ name: 'Exsa', plates: plates.sort() })
            }
        });
    },
    ArrayPlates_updatePlates_Exsa: function () {
        Meteor.call("Exsa_queryPlates", (error, plates) => {
            if (!error) {
                ArrayPlates.replaceOne({ name: 'Exsa', plates: plates.sort() })
            }
        });
    },
});

//-------------------- SERVOSA

Meteor.methods({
    async Servosa_queryPlates() {
        const plates = await Servosa.rawCollection().distinct('events.vehicle')
        return plates
    },
    Servosa_queryEvents(userID, plates, dateTimeStart, dateTimeEnd) {
        console.log('........................SERVOSA...............................')
        // console.log('dateTimeStart', dateTimeStart, 'dateTimeEnd', dateTimeEnd)
        console.log('Usuario: ', Meteor.user().username)
        console.log('Fecha y Tiempo de Inicio: ', dateTimeStart)
        console.log('Fecha y Tiempo de Fin: ', dateTimeEnd)
        const dateTimeStart5 = addHours(dateTimeStart, 5)
        const dateTimeEnd5 = addHours(dateTimeEnd, 5)
        plates = plates.sort()
        console.log('placas: ', plates)

        plates.forEach((el, index, arrayPlate) => {
            Meteor.call('Servosa_getData', el, dateTimeStart5, dateTimeEnd5, (error, report) => {
                if (!error) {
                    console.log(report);
                }
            });
        })
    },

    async  Servosa_getData(el, dateTimeStart, dateTimeEnd) {
        const report = await Servosa.rawCollection().
            aggregate([
                // { $match: { 'events.vehicle': el, 'events.created': { $gte: dateTimeStart, $lte: dateTimeEnd }, 'events.original': { $in: [ 81,82] } } },
                { $match: { 'events.vehicle': el, 'events.created': { $gte: dateTimeStart, $lte: dateTimeEnd } } },
                { $unwind: '$events' },
                { $match: { 'events.vehicle': el, 'events.created': { $gte: dateTimeStart, $lte: dateTimeEnd }, 'events.type': { $in: [305, 306] } } },
                { $group: { _id: { plate: '$events.vehicle', eventType: '$events.type' }, total: { $sum: 1 } } },
                // { $project: { _id: 0, plate: '$_id.plate', event: '$_id.ev' , total: '$total'} },
                // { $group: { _id: { plate: '$events.vehicle', created: '$events.created', event: '$events.original' }} },
                //   { $project: { _id: 0, plate: '$_id.plate', event: '$_id.event', created: '$_id.created' } },
                //  { $sort: { '_id.plate': 1, '_id.ev': 1 } },
            ]).toArray()
        return report

    }
    /*
    async  Servosa_getData(plates, dateTimeStart, dateTimeEnd) {
        const report = await Servosa.rawCollection().
            aggregate([
                { $match: { 'events.vehicle': { $in: plates }, 'events.created': { $gte: dateTimeStart, $lte: dateTimeEnd }, 'events.original': { $in: [81, 82] } } },
                { $unwind: '$events' },
                //   { $group: { _id: {ev:'$events.original', plate: '$events.vehicle'}, total: { $sum: 1 } }},
                { $group: { _id: { plate: '$events.vehicle', ev: '$events.original' }, total: { $sum: 1 } } },
                // { $group: { _id: { plate: '$events.vehicle', created: '$events.created', event: '$events.original' }} },
                //   { $project: { _id: 0, plate: '$_id.plate', event: '$_id.event', created: '$_id.created' } },
                { $sort: { '_id.plate': 1, '_id.ev': 1 } },
            ]).toArray()
        return report

    }*/
});
//-------------------- EXSA

Meteor.methods({
    async Exsa_queryPlates() {
        const plates = await Exsa.rawCollection().distinct('events.vehicle')
        return plates
    },
    Exsa_queryRangeDatePlates(userID, plates, dateTimeStart, dateTimeEnd) {
        console.log('........................EXSA...............................')
        // console.log('dateTimeStart', dateTimeStart, 'dateTimeEnd', dateTimeEnd)
        console.log('Usuario: ', Meteor.user().username)
        console.log('Fecha y Tiempo de Inicio: ', dateTimeStart)
        console.log('Fecha y Tiempo de Fin: ', dateTimeEnd)
        const dateTimeStart5 = addHours(dateTimeStart, 5)
        const dateTimeEnd5 = addHours(dateTimeEnd, 5)
        plates = plates.sort()
        console.log('placas: ', plates)

        plates.forEach((plate, index, plateArray) => {
            Exsa.rawCollection()
                .find({ 'events.vehicle': plate, 'events.created': { $gte: dateTimeStart5, $lte: dateTimeEnd5 } })
                .toArray((error, data) => {
                    if (!error) {
                        Exsa_createReport(userID, data, dateTimeEnd, plate)
                        //console.log(data)
                    }
                })
        })

        /*
        Exsa.rawCollection()
            .find({ 'events': { $elemMatch: { 'vehicle': { $in: plates }, 'created': { $gte: dateTimeStart5, $lte: dateTimeEnd5 } } } })
            .sort({ 'events.vehicle': 1 })
            .toArray((error, data) => {
                if (!error) {
                    Exsa_createReport(userID, data, dateTimeEnd)
                }
            })
        */

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
function Exsa_setStateString(estado) {
    switch (estado) {
        case 0:
            return 'Aparcado';
            break;
        case 1:
            return 'Stop';
            break;
        case 2:
            return 'En tránsito';
            break;

        default:
            break;
    }
}
function Exsa_createReport(userID, data, dateTimeEnd, plate) {
    //console.log('in createRport')
    let Rows_A = []
    data.forEach(item => {
        item.events.forEach(e => {
            Rows_A.push(Exsa_objectRow(e))
        })
    })

    console.log(`Documentos Consultados para ${plate}: `, Rows_A.length)

    let Rows_B = [] // Rows_B => Detecta cambio de estado y el primer documento.

    if (Rows_A.length > 0) {

        Rows_A.forEach((row, index, rowArray) => {

            if (index == 0) {
                Rows_B.push(row)
            }

            if (index > 0 && row.estado != rowArray[index - 1].estado) {
                Rows_B.push(row)
            }

        })
        /*
        Rows_B.forEach((row, index, rowArray) => {
            console.log(row.placa, row.fechaHora)
        })
        */
        let Rows_C = [] // Rows_C => Suma los tiempos entre cambio de estado.

        if (Rows_B.length == 1) {
            Rows_C.push(Exsa_auxRow_C(Rows_B[0], dateTimeEnd))
        } else {
            Rows_B.forEach((row, index, rowArray) => {
                if (index < rowArray.length - 1) {
                    Rows_C.push(Exsa_objectRow_C(rowArray[index + 1], row))
                }
                else {
                    Rows_C.push(Exsa_auxRow_C(Rows_B[rowArray.length - 1], dateTimeEnd))
                }
            })
        }
        // Recorrido de Rows_C
        /*
        Rows_C.forEach((row, index, rowArray) => {
            console.log(row.Estado, row.Placa, row.Inicio, row.Fin, row.Duracion)
        })
        */
        if (Rows_C.length > 0) {
            stXS.emit('Rows', userID, Rows_C)
        }

    } else {
        stXS.emit('NoData', userID, plate)
        console.log(`No hay data para ${plate}`)
    }


}
function Exsa_objectRow(e) {
    return {
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
function Exsa_objectRow_C(e_next, e_actual) {
    if (e_actual.estado == 2) {
        return {
            Estado: Exsa_setStateString(e_actual.estado),
            Placa: e_actual.placa,
            Inicio: Exsa_formatDateTime(e_actual.fechaHora),
            Fin: Exsa_formatDateTime(e_next.fechaHora),
            Duracion: Exsa_getHours(e_next.fechaHora, e_actual.fechaHora),
            Coordenadas: ``,
            Direccion: ``,
            Geozona: ``,
        }
    } else {
        return {
            Estado: Exsa_setStateString(e_actual.estado),
            Placa: e_actual.placa,
            Inicio: Exsa_formatDateTime(e_actual.fechaHora),
            Fin: Exsa_formatDateTime(e_next.fechaHora),
            Duracion: Exsa_getHours(e_next.fechaHora, e_actual.fechaHora),
            Coordenadas: `${e_actual.lat},${e_actual.lon}`,
            Direccion: e_actual.direccion,
            Geozona: e_actual.geozona
        }
    }

}
function Exsa_auxRow_C(e_next, dateTimeEnd) {
    if (e_next.estado == 2) {
        return {
            Estado: Exsa_setStateString(e_next.estado),
            Placa: e_next.placa,
            Inicio: Exsa_formatDateTime(e_next.fechaHora),
            Fin: Exsa_formatDateTime(dateTimeEnd),
            Duracion: Exsa_getHours(dateTimeEnd, e_next.fechaHora),
            Coordenadas: ``,
            Direccion: ``,
            Geozona: ``,
        }
    } else {
        return {
            Estado: Exsa_setStateString(e_next.estado),
            Placa: e_next.placa,
            Inicio: Exsa_formatDateTime(e_next.fechaHora),
            Fin: Exsa_formatDateTime(dateTimeEnd),
            Duracion: Exsa_getHours(dateTimeEnd, e_next.fechaHora),
            Coordenadas: `${e_next.lat},${e_next.lon}`,
            Direccion: e_next.direccion,
            Geozona: e_next.geozona
        }
    }
}
function Exsa_formatDateTime(date) {
    const DateTime = new Date(date)
    return [addZero(DateTime.getDate()), addZero(DateTime.getMonth() + 1), DateTime.getFullYear()].join('/') + ' ' +
        [addZero(DateTime.getHours()), addZero(DateTime.getMinutes()), addZero(DateTime.getSeconds())].join(':')
}
function Exsa_getHours(dateTimeMax, dateTimeMin) {

    const minutes = getMinutesDiff(dateTimeMax, dateTimeMin)

    if (minutes >= 60) {
        return addZero(parseInt(minutes / 60)) + ':' + addZero(minutes % 60) + 'h'
    } else {
        return '00:' + addZero(minutes) + 'h'
    }

}

//-------------------- EMAIL
const FROM_EMAIL = "noreplay_trackandtrace@securitasperu.com";
const URL_TRACK_AND_TRACE = "http://190.81.123.82:2020/login"
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
                    Meteor.call("sendEmail", email, FROM_EMAIL, "Usuario RPT [Securitas-TrackAndTrace]", `Estimado ${firstname} ${lastname} \nSu cuenta de acceso a RPT Securitas-TrackAndTrace ${URL_TRACK_AND_TRACE} es el siguiente: \nUsuario: ${username}\nPassword: ${password} `)
            })
        } else {
            return Personal.insert({ firstname, lastname, email, role, userId, username, password }, (error, id) => {
                if (!error)
                    Meteor.call("sendEmail", email, FROM_EMAIL, "Usuario RPT [Securitas-TrackAndTrace]", `Estimado ${firstname} ${lastname} \nSu cuenta de acceso a RPT Securitas-TrackAndTrace ${URL_TRACK_AND_TRACE} es el siguiente: \nUsuario: ${username}\nPassword: ${password} `)
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
    async Antapaccay_queryPlates() {
        const plates = await Antapaccay.rawCollection().distinct('events.vehicle')
        return plates
    },
    queryRangeDatePlates(userID, plates, dateTimeStart, dateTimeEnd) {
        console.log('........................ANTAPACCAY...............................')
        // console.log('dateTimeStart', dateTimeStart, 'dateTimeEnd', dateTimeEnd)
        console.log('Usuario: ', Meteor.user().username)
        console.log('Fecha y Tiempo de Inicio: ', dateTimeStart)
        console.log('Fecha y Tiempo de Fin: ', dateTimeEnd)
        dateTimeStart = addHours(dateTimeStart, 5)
        dateTimeEnd = addHours(dateTimeEnd, 5)
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