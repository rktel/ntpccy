/**
 * import { Dinet } from '../../../imports/api/collections'

Meteor.methods({
    async DNT_getPlates() {
        const plates = await Dinet.rawCollection().distinct('events.vehicle')
        return plates
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
        const report = await Dinet.rawCollection().
            aggregate([
                { $match: { 'events.vehicle': { $in: [plate] }, 'events.created': { $gte: dateTimeStart, $lte: dateTimeEnd } } },
                { $unwind: '$events' },
                { $match: { 'events.original': { $in: arrayEvents } } },
                {
                    $group: {
                        _id: '$events.vehicle',
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
                { $project: { _id: 0, placa: '$_id', exceso15: '$exceso15', exceso30: '$exceso30', exceso80: '$exceso80' } },
                { $sort: { 'placa': 1 } },
            ]).toArray()
        return report
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
        const report = await Dinet.rawCollection().
            aggregate([
                { $match: { 'events.vehicle': { $in: [plate] }, 'events.created': new RegExp(month)} },
                { $unwind: '$events' },
                { $match: { 'events.original': { $in: arrayEvents } } },
                {
                    $group: {
                        _id: '$events.vehicle',
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
                { $project: { _id: 0, placa: '$_id', exceso15: '$exceso15', exceso30: '$exceso30', exceso80: '$exceso80' } },
                { $sort: { 'placa': 1 } },
            ]).toArray()
        return report

    }
});



/** Helpers Function 

function addHours(datetime, hours) {
    let date = new Date(datetime);
    date.setHours(date.getHours() + hours);
    return date.toISOString()
}
 */