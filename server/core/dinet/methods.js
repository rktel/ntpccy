import { Dinet } from '../../../imports/api/collections'

Meteor.methods({ 
    async DNT_getPlates() {
        const plates = await Dinet.rawCollection().distinct('events.vehicle')
        return plates
    },
    async  DNT_getData(plates, dateTimeStart, dateTimeEnd) {
        // Exceso 15km/h : 97,  Exceso 30km/h : 93, Exceso 80km/h : 89, Fatiga : 81
        const arrayEvents = [97, 93, 89]
        const report = await Dinet.rawCollection().
            aggregate([
                { $match: { 'events.vehicle': { $in: plates }, 'events.created': { $gte: dateTimeStart, $lte: dateTimeEnd } } },
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