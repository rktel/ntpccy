import { Dinet } from '../../../imports/api/collections'

Meteor.methods({
    async DNT_getPlates() {
        const plates = await Dinet.rawCollection().distinct('events.vehicle')
        return plates
    },
    async  DNT_TEST_getDayData(dateTimeStart, dateTimeEnd, plate) {
        console.log('........................Dinet_X...............................')
        // console.log('dateTimeStart', dateTimeStart, 'dateTimeEnd', dateTimeEnd)
        // Meteor.call('getDayData', timeStart, timeEnd, this.vehicle)
        console.log('Usuario: ', Meteor.user().username)
        console.log('Fecha y Tiempo de Inicio: ', dateTimeStart)
        console.log('Fecha y Tiempo de Fin: ', dateTimeEnd)

        const dateTimeStart5 = addHours(dateTimeStart, 5)
        const dateTimeEnd5 = addHours(dateTimeEnd, 5)
        // Exceso 15km/h : 97,  Exceso 30km/h : 93, Exceso 80km/h : 89, Fatiga : 81
        const arrayEvents = [97, 93, 89]
        let report = await Dinet.rawCollection().
            aggregate([
                { $match: { 'events.vehicle': { $in: [plate] }, 'events.created': { $gte: dateTimeStart5, $lte: dateTimeEnd5 } } },
                { $unwind: '$events' },
                { $match: { 'events.original': { $in: arrayEvents } } },
                { $sort: { 'events.created': 1 } },
                {
                    $group: {
                        _id: '$events.vehicle',
                        primerEvento: { $first: '$events' },
                        ultimoEvento: { $last: '$events' },
                        exceso15A: {
                            $sum: {
                                $cond: [
                                    {
                                        $and: [
                                            { $eq: ['$events.original', 97] },
                                            { $gte: ['$events.created', '2019-05-12T00:00:00.000Z'] }
                                        ]
                                    }, 1, 0
                                ]
                            }
                        },
                        exceso30: {
                            $sum: {
                                $cond: [
                                    { $eq: ['$events.original', 93] }, 1, 0
                                ]
                            }
                        },
                        exceso80: {
                            $sum: {
                                $cond: [
                                    { $eq: ['$events.original', 89] }, 1, 0
                                ]
                            }
                        }
                    }
                },
                { $project: { _id: 0, placa: '$_id', exceso15A: '$exceso15A', exceso30: '$exceso30', exceso80: '$exceso80', primerEvento: '$primerEvento', ultimoEvento: '$ultimoEvento' } },
                //               { $sort: { 'placa': 1 } },
            ]).toArray()

        if (report.length > 0) {
            report = report[0]
            const placa = report.placa;
            const exceso15A = report.exceso15A;
            const exceso30 = report.exceso30;
            const exceso80 = report.exceso80;
            const primerEvento = report.primerEvento
            const ultimoEvento = report.ultimoEvento
            let primerDistancia = primerEvento.counters.find(el => el.type === 9)
            primerDistancia = primerDistancia.value
            let ultimoDistancia = ultimoEvento.counters.find(el => el.type === 9)
            ultimoDistancia = ultimoDistancia.value
            const distanciaRecorrida = (ultimoDistancia > primerDistancia) ? parseInt((ultimoDistancia - primerDistancia) / 1000) : 0
            report = {
                placa,
                exceso15A,
                exceso30,
                exceso80,
                distanciaRecorrida
            }
            // return report
            console.log(report);

        } else {
            //  return false
        }
    },
    async  DNT_getDayData(dateTimeStart, dateTimeEnd, plate) {
        console.log('........................Dinet_X...............................')
        // console.log('dateTimeStart', dateTimeStart, 'dateTimeEnd', dateTimeEnd)
        // Meteor.call('getDayData', timeStart, timeEnd, this.vehicle)
        console.log('Usuario: ', Meteor.user().username)
        console.log('Fecha y Tiempo de Inicio: ', dateTimeStart)
        console.log('Fecha y Tiempo de Fin: ', dateTimeEnd)

        const dateTimeStart5 = addHours(dateTimeStart, 5)
        const dateTimeEnd5 = addHours(dateTimeEnd, 5)
        // Exceso 15km/h : 97,  Exceso 30km/h : 93, Exceso 80km/h : 89, Fatiga : 81
        const arrayEvents = [97, 93, 89]
        let report = await Dinet.rawCollection().
            aggregate([
                { $match: { 'events.vehicle': { $in: [plate] }, 'events.created': { $gte: dateTimeStart5, $lte: dateTimeEnd5 } } },
                { $unwind: '$events' },
                { $match: { 'events.original': { $in: arrayEvents } } },
                { $sort: { 'events.created': 1 } },
                {
                    $group: {
                        _id: '$events.vehicle',
                        primerEvento: { $first: '$events' },
                        ultimoEvento: { $last: '$events' },
                        exceso15: {
                            $sum: {
                                $cond: [
                                    { $eq: ['$events.original', 97] }, 1, 0
                                ]
                            }
                        },
                        exceso30: {
                            $sum: {
                                $cond: [
                                    { $eq: ['$events.original', 93] }, 1, 0
                                ]
                            }
                        },
                        exceso80: {
                            $sum: {
                                $cond: [
                                    { $eq: ['$events.original', 89] }, 1, 0
                                ]
                            }
                        }
                    }
                },
                { $project: { _id: 0, placa: '$_id', exceso15: '$exceso15', exceso30: '$exceso30', exceso80: '$exceso80', primerEvento: '$primerEvento', ultimoEvento: '$ultimoEvento' } },
                //               { $sort: { 'placa': 1 } },
            ]).toArray()

        if (report.length > 0) {
            report = report[0]
            const placa = report.placa;
            const exceso15 = report.exceso15;
            const exceso30 = report.exceso30;
            const exceso80 = report.exceso80;
            const primerEvento = report.primerEvento
            const ultimoEvento = report.ultimoEvento
            let primerDistancia = primerEvento.counters.find(el => el.type === 9)
            primerDistancia = primerDistancia.value
            let ultimoDistancia = ultimoEvento.counters.find(el => el.type === 9)
            ultimoDistancia = ultimoDistancia.value
            const distanciaRecorrida = (ultimoDistancia > primerDistancia) ? parseInt((ultimoDistancia - primerDistancia) / 1000) : 0
            report = {
                placa,
                exceso15,
                exceso30,
                exceso80,
                distanciaRecorrida
            }
            return report

        } else {
            return false
        }
    },
    async  DNT_getMonthData(month, plate) {
        console.log('........................Dinet_X...............................')
        // console.log('dateTimeStart', dateTimeStart, 'dateTimeEnd', dateTimeEnd)
        // Meteor.call('DNT_getMonthData', month, this.vehicle)
        console.log('Usuario: ', Meteor.user().username)
        console.log('Mes: ', month)

        //const dateTimeStart5 = addHours(dateTimeStart, 5)
        //const dateTimeEnd5 = addHours(dateTimeEnd, 5)
        // Exceso 15km/h : 97,  Exceso 30km/h : 93, Exceso 80km/h : 89, Fatiga : 81
        const arrayEvents = [97, 93, 89]
        let report = await Dinet.rawCollection().
            aggregate([
                { $match: { 'events.vehicle': { $in: [plate] }, 'events.created': new RegExp(month) } },
                { $unwind: '$events' },
                { $match: { 'events.original': { $in: arrayEvents } } },
                { $sort: { 'events.created': 1 } },
                {
                    $group: {
                        _id: '$events.vehicle',
                        primerEvento: { $first: '$events' },
                        ultimoEvento: { $last: '$events' },
                        exceso15: {
                            $sum: {
                                $cond: [
                                    { $eq: ['$events.original', 97] }, 1, 0
                                ]
                            }
                        },
                        exceso30: {
                            $sum: {
                                $cond: [
                                    { $eq: ['$events.original', 93] }, 1, 0
                                ]
                            }
                        },
                        exceso80: {
                            $sum: {
                                $cond: [
                                    { $eq: ['$events.original', 89] }, 1, 0
                                ]
                            }
                        }
                    }
                },
                { $project: { _id: 0, placa: '$_id', exceso15: '$exceso15', exceso30: '$exceso30', exceso80: '$exceso80', primerEvento: '$primerEvento', ultimoEvento: '$ultimoEvento' } },
                //               { $sort: { 'placa': 1 } },
            ]).toArray()
        if (report.length > 0) {
            report = report[0]
            const placa = report.placa;
            const exceso15 = report.exceso15;
            const exceso30 = report.exceso30;
            const exceso80 = report.exceso80;
            const primerEvento = report.primerEvento
            const ultimoEvento = report.ultimoEvento

            //  console.log(primerEvento,ultimoEvento );

            let primerDistancia = primerEvento.counters.find(el => el.type === 9)
            primerDistancia = primerDistancia.value
            let ultimoDistancia = ultimoEvento.counters.find(el => el.type === 9)
            ultimoDistancia = ultimoDistancia.value
            const distanciaRecorrida = (ultimoDistancia > primerDistancia) ? parseInt((ultimoDistancia - primerDistancia) / 1000) : 0
            report = {
                placa,
                exceso15,
                exceso30,
                exceso80,
                distanciaRecorrida
            }

            return report

        } else {
            return false
        }

    }
});



/** Helpers Function */

function addHours(datetime, hours) {
    let date = new Date(datetime);
    date.setHours(date.getHours() + hours);
    return date.toISOString()
}