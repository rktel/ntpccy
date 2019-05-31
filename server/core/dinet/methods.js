import { Dinet } from '../../../imports/api/collections'

const SEVEN = 7 * 60 * 60 * 1000    // INICIO TURNO A
const NINETEEN = 19 * 60 * 60 * 1000 // FIN TURNO A, INICIO TURNO B
const THIRTYONE = 31 * 60 * 60 * 1000 // FIN TURNO B

Meteor.methods({
    async DNT_getPlates() {
        const plates = await Dinet.rawCollection().distinct('events.vehicle')
        return plates
    },
    async DNT_get_OverspeedPilots(TIME_S, TIME_E) {
        const arrayEvents = [97, 93, 89]
        let report = await Dinet.rawCollection().
            aggregate([
                { $match: { 'events.created': { $gt: TIME_S, $lt: TIME_E } } },
                { $unwind: '$events' },
                { $match: { 'events.original': { $in: arrayEvents } } },
                {
                    $group: {
                        _id: '$events.person',
                        firstEvent: { $first: '$events' },
                        lastEvent: { $last: '$events' },
                        overspeed15: {
                            $sum: {
                                $cond: [
                                    { $eq: ['$events.original', 97] }, 1, 0
                                ]
                            }
                        },
                        overspeed30: {
                            $sum: {
                                $cond: [
                                    { $eq: ['$events.original', 93] }, 1, 0
                                ]
                            }
                        },
                        overspeed80: {
                            $sum: {
                                $cond: [
                                    { $eq: ['$events.original', 89] }, 1, 0
                                ]
                            }
                        }
                    }
                },
                { $project: { _id: 0, pilot: '$_id', overspeed15: '$overspeed15', overspeed30: '$overspeed30', overspeed80: '$overspeed80', firstEvent: '$firstEvent', lastEvent: '$lastEvent' } },
            ]).toArray()
        return report
    },
    async DNT_getOverspeedEvents(PLATE, TIME_S, TIME_E) {
        // Exceso 15km/h : 97,  Exceso 30km/h : 93, Exceso 80km/h : 89
        const arrayEvents = [97, 93, 89]
        let report = await Dinet.rawCollection().
            aggregate([
                { $match: { 'events.vehicle': { $in: [PLATE] }, 'events.created': { $gt: TIME_S, $lt: TIME_E } } },
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
                { $project: { _id: 0, exceso15: '$exceso15', exceso30: '$exceso30', exceso80: '$exceso80', primerEvento: '$primerEvento', ultimoEvento: '$ultimoEvento' } },
            ]).toArray()

        return report
    },
    async DNT_TEST_getDataPilots(dataOptions) {
        const { type, day, month, dayStart, dayEnd } = dataOptions

        switch (type) {
            case 'day':
                const data = Meteor.call("DNT_packetDayDataPilots", day)
                console.log('Pilot Day data:', data);
                return data;
                break;
            case 'range':
                const dataRange = Meteor.call("DNT_packetRangeDataPilots", dayStart, dayEnd)
                break;
            case 'month':
                const dataMonth = Meteor.call("DNT_packetMonthDataPilots", month)
                break;

            default:
                break;
        }
    },
    async DNT_packetDayDataPilots(day) {
        const data = Meteor.call("DNT_TEST_getDayDataPilots", day)
        const proData = {
               data: [data]
        }
        return proData
    },
    async DNT_TEST_getDayDataPilots(DAY){


     //   let TIME_START = new Date(DAY + 'T'+'00:00:00.000Z')
     //   let TIME_END = new Date(DAY + 'T'+'23:59:59.000Z')

        let TIME_START = new Date(new Date(DAY).getTime() + parseInt(SEVEN))
        let TIME_END = new Date(new Date(DAY).getTime() + parseInt(THIRTYONE))

        TIME_START = addHours(TIME_START, 5)
        TIME_END = addHours(TIME_END, 5)
        
        let resultDay = {}
        let dataDay = Meteor.call('DNT_get_OverspeedPilots', TIME_START, TIME_END)

        resultDay.day = getDateString(DAY)
        console.log(dataDay);
        

        if (dataDay && dataDay.length > 0) {
            const distance = getDistance(dataDay[0].firstEvent, dataDay[0].lastEvent)
            delete dataDay[0].firstEvent
            delete dataDay[0].lastEvent
            dataDay[0].distancia = distance
            resultDay.dataDay = dataDay[0]
        } else {
            resultDay.dataDay = serieNULL()
        }
        
        return resultDay
    },
    async DNT_TEST_getData(dataOptions) {
        const { vehicle, type, day, month, dayStart, dayEnd } = dataOptions

        switch (type) {
            case 'day':
                console.log("day:", day, vehicle);
                const data = Meteor.call("DNT_packetDayData", day, vehicle)
                console.log(data);
                return data;
                break;
            case 'range':
                console.log("range:", vehicle, dayStart, dayEnd);
                const dataRange = Meteor.call("DNT_packetRangeData", dayStart, dayEnd, vehicle)
                console.log(dataRange);
                return dataRange;
                break;
            case 'month':
                console.log("month:", vehicle, month);
                const dataMonth = Meteor.call("DNT_packetMonthData", month, vehicle)
                console.log(dataMonth);
                return dataMonth;
                break;

            default:
                break;
        }

    },
    async DNT_packetMonthData(month, vehicle) {
        const dates = getDaysInMonth(month)
        let preData = []
        dates.forEach((day) => {
            const dayData = Meteor.call("DNT_TEST_getDayData", day, vehicle)
            preData.push(dayData)
        })
        let monthString = ''
        let totalExceso15_A = 0
        let totalExceso15_B = 0
        let totalDistancia_A = 0
        let totalDistancia_B = 0
        monthString = preData[0].day.split(' ')[1]
        preData.forEach(element => {
            totalDistancia_A = totalDistancia_A + element.turnA.distancia
            totalDistancia_B = totalDistancia_B + element.turnB.distancia
            totalExceso15_A = totalExceso15_A + element.turnA.exceso15
            totalExceso15_B = totalExceso15_B + element.turnB.exceso15
        })
        console.log(totalDistancia_A);
        const proData = {
            plate: vehicle,
            data: [{ day: monthString, turnA: { distancia: totalDistancia_A, exceso15: totalExceso15_A }, turnB: { distancia: totalDistancia_B, exceso15: totalExceso15_B } }]
        }
        return proData
    },
    async DNT_packetDayData(day, vehicle) {
        const data = Meteor.call("DNT_TEST_getDayData", day, vehicle)
        const proData = {
            plate: vehicle,
            data: [data]
        }
        return proData
    },
    async DNT_packetRangeData(dayStart, dayEnd, vehicle) {
        const dates = getDates(dayStart, dayEnd)
        let preData = []
        dates.forEach((day) => {
            const dayData = Meteor.call("DNT_TEST_getDayData", day, vehicle)
            preData.push(dayData)
        })
        const proData = {
            plate: vehicle,
            data: preData
        }
        return proData
    },
    async  DNT_TEST_getDayData(DAY, PLATE) {
        // DAY: 2019-05-16
        //TURNO A 
        //2019-05-16T07:00:00.000Z TO 2019-05-16T19:00:00.000Z

        //TURNO B
        //2019-05-16T19:00:00.000Z TO 2019-05-17T07:00:00.000Z
        /*
                console.log('........................Dinet_X...............................')
        
                console.log('Usuario: ', Meteor.user().username)
                console.log('Dia: ', DAY)
        */
        let TURN_A_S = new Date(new Date(DAY).getTime() + parseInt(SEVEN))
        let TURN_A_E = new Date(new Date(DAY).getTime() + parseInt(NINETEEN))
        let TURN_B_E = new Date(new Date(DAY).getTime() + parseInt(THIRTYONE))

        // console.log(TURN_A_S, TURN_A_E, TURN_B_E);
        TURN_A_S = addHours(TURN_A_S, 5)
        TURN_A_E = addHours(TURN_A_E, 5)
        TURN_B_E = addHours(TURN_B_E, 5)
        // console.log(TURN_A_S, TURN_A_E, TURN_B_E);

        let resultDay = {}
        let turnA = Meteor.call('DNT_getOverspeedEvents', PLATE, TURN_A_S, TURN_A_E)
        let turnB = Meteor.call('DNT_getOverspeedEvents', PLATE, TURN_A_E, TURN_B_E)

        resultDay.day = getDateString(DAY)

        if (turnA && turnA.length > 0) {
            const distanceA = getDistance(turnA[0].primerEvento, turnA[0].ultimoEvento)
            delete turnA[0].primerEvento
            delete turnA[0].ultimoEvento
            turnA[0].distancia = distanceA
            resultDay.turnA = turnA[0]
        } else {
            resultDay.turnA = serieNULL()
        }
        if (turnB && turnB.length > 0) {
            const distanceB = getDistance(turnB[0].primerEvento, turnB[0].ultimoEvento)
            delete turnB[0].primerEvento
            delete turnB[0].ultimoEvento
            turnB[0].distancia = distanceB
            resultDay.turnB = turnB[0]
        } else {
            resultDay.turnB = serieNULL()
        }
        return resultDay
    },

});



/** Helpers Function */

function addHours(datetime, hours) {
    let date = new Date(datetime);
    date.setHours(date.getHours() + hours);
    return date.toISOString()
}

function getDates(startDate, endDate) {
    startDate = new Date(startDate)
    endDate = new Date(endDate)
    var dates = [],
        currentDate = startDate,
        addDays = function (days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        };
    while (currentDate <= endDate) {
        dates.push(currentDate);
        currentDate = addDays.call(currentDate, 1);
    }
    return dates;
};
function getDaysInMonth(str) {
    // str : '2019-05'
    // Since no month has fewer than 28 days
    str = str.split("-")
    let year = parseInt(str[0])
    let month = parseInt(str[1]) - 1
    let date = new Date(year, month, 1);
    let days = [];

    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
}

function getDateString(data) {
    data = new Date(data).toDateString()
    data = data.split(" ")
    return data[2] + " " + data[1]
}

function serieNULL() {
    return {
        exceso15: 0,
        exceso30: 0,
        exceso80: 0,
        distancia: 0
    }
}
function getDistance(eveS, eveE) {
    let firstD = eveS.counters.find(el => el.type === 9)
    firstD = (firstD && firstD.value) ? firstD.value : 0
    let lastD = eveE.counters.find(el => el.type === 9)
    lastD = (lastD && lastD.value) ? lastD.value : 0
    return (lastD > firstD) ? parseInt((lastD - firstD) / 1000) : 0
}