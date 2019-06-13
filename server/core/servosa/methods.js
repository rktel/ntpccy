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
        dateTimeStart5 = addHours(dateTimeStart, 5)
        dateTimeEnd5 = addHours(dateTimeEnd, 5)

       // console.log(dateTimeStart, dateTimeEnd);
        const eventOriginal_Array = [82, 81, 80]
        // const arrayEvents = [81,82]

        const report = await Servosa.rawCollection().
            aggregate([
                { $match: { 'events.vehicle': { $in: plates }, 'events.created': { $gte: dateTimeStart5, $lte: dateTimeEnd5 } } },
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
        // Agrupacion de la Data Segun criterios del cliente:
        if (report && report.length > 0) {
            const auxArray = report.map(el =>
                 ({
                    // 'MES': Servosa_getMonth(dateTimeStart),
                    'FECHA': Servosa_getDate(dateTimeStart) +"-"+ Servosa_getDate(dateTimeEnd),
                    'RUTA': '    ',
                    'CODIGO': '  ',
                    'PLACA': el.placa,
                    'CONDUCTOR': '   ',
                    'DNI': ' ',
                    'N° DE REPORTES REGISTRADOS': el.fatiga,
                    'N° DE NO ROSTRO': el.noRostro,
                    'ACCION EN CAMPO': Servosa_Accion(el.fatiga),
                    'HORA REAL': Servosa_getHoraReal(),
                    'SUP. ESCOLTA': '    ',
                    'TRAMO': '   '
                })
            )

            return auxArray

        }

    }
});

/** Helpers Function */

function addHours(datetime, hours) {
    let date = new Date(datetime);
    date.setHours(date.getHours() + hours);
    return date.toISOString()
}

function Servosa_Accion(eventCount) {
    if (eventCount <= 19) {
        return 'Pausa Activa General'
    } else if (eventCount >= 20 && eventCount <= 50) {
        return 'Registro de Retroalimentacion'
    } else if (eventCount >= 50 && eventCount <= 80) {
        return 'Aplicar Test de Fatiga'
    } else if (eventCount > 80) {
        return 'Evaluacion del Caso'
    }
}
function Servosa_getDate(dateTime_) {
    const millis = getTimeMillis(dateTime_)
    const dateTime = new Date(millis)
    const year = dateTime.getFullYear()
    const month = addZero(dateTime.getMonth() + 1)
    const day = addZero(dateTime.getDate())
    return day + '/' + month + '/' + year
}
function Servosa_getMonth(dateTime_) {
    const millis = getTimeMillis(dateTime_)
    const dateTime = new Date(millis)
    let month
    switch (dateTime.getMonth()) {
        case 0:
            month = 'ENERO';
            break;
        case 1:
            month = 'FEBRERO';
            break;
        case 2:
            month = 'MARZO';
            break;
        case 3:
            month = 'ABRIL';
            break;
        case 4:
            month = 'MAYO';
            break;
        case 5:
            month = 'JUNIO';
            break;
        case 6:
            month = 'JULIO';
            break;
        case 7:
            month = 'AGOSTO';
            break;
        case 8:
            month = 'SEPTIEMBRE';
            break;
        case 9:
            month = 'OCTUBRE';
            break;
        case 10:
            month = 'NOVIEMBRE';
            break;
        case 11:
            month = 'DICIEMBRE';
            break;

        default:
            break;
    }
    return month
}
function Servosa_getHoraReal() {
    const dateTime = new Date(addHours(new Date(), -5))
    const hour = addZero(dateTime.getHours())
    const minute = addZero(dateTime.getMinutes())
    const seconds = addZero(dateTime.getSeconds())
    return hour + ':' + minute + ':' + seconds
}
function getTimeMillis(dateTime) {
    return (new Date(dateTime)).getTime()
}
function addZero(data) {
    return data < 10 ? '0' + data : data
}