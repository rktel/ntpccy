import { Servosa, ArrayPlates } from '../../../imports/api/collections'

Meteor.methods({
    async SRVS_getPlates() {
        const plates = ArrayPlates.find({ name: "Servosa" }).fetch()
        return plates
    },
    async  SRVS_getData(plates, dateTimeStart, dateTimeEnd) {
        // 'FatigueAlarm', 'DistractionAlarm', 'No Rostro o No Conductor'
        /**
         *      ORIGINAL    NAME_EVENT
         *      82          Distraccion
         *      81          Fatiga
         *      80          No Rostro
         */
        const eventOriginal_Array = [82, 81, 80]
        // const arrayEvents = [81,82]

        const report = await Servosa.rawCollection().
            aggregate([
                { $match: { 'events.vehicle': { $in: plates }, 'events.created': { $gte: dateTimeStart, $lte: dateTimeEnd } } },
                { $unwind: '$events' },
                { $match: { 'events.original': { $in: eventOriginal_Array } } },
                {
                    $group: {
                        _id: '$events.vehicle',
                        noRostro: {
                            $sum: {
                                $cond: [
                                    { $eq: ['$events.original', 80] }, 1, 0
                                ]
                            }
                        },
                        fatiga: {
                            $sum: {
                                $cond: [
                                    { $eq: ['$events.original', 81] }, 1, 0
                                ]
                            }
                        },
                        distraccion: {
                            $sum: {
                                $cond: [
                                    { $eq: ['$events.original', 82] }, 1, 0
                                ]
                            }
                        },
                    },
                },
                { $project: { _id: 0, placa: '$_id', noRostro: '$noRostro', fatiga: '$fatiga', distraccion: '$distraccion' } },
                { $sort: { 'placa': 1 } },

            ]).toArray()


        return report

    }
});

/** Helpers Function */

function addHours(datetime, hours) {
    let date = new Date(datetime);
    date.setHours(date.getHours() + hours);
    return date.toISOString()
}