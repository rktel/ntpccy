import { Personal } from '../imports/api/collections'

let hyperUserId = null

Meteor.startup(() => {
    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(Meteor.settings.private.USER_SMTP) +
        ':' + encodeURIComponent(Meteor.settings.private.PASS_SMTP) +
        '@' + encodeURIComponent(Meteor.settings.private.SERVER_SMTP) + ':' + Meteor.settings.private.PORT_SMTP;

    // console.log('process.env.MAIL_URL', process.env.MAIL_URL)

    if (Meteor.users.find().count() == 0) {
        hyperUserId = Accounts.createUser({
            username: Meteor.settings.private.HYPER_USER,
            password: Meteor.settings.private.HYPER_USER_PASSWORD,
        })
    }

    if (Personal.find().count() == 0) {
        Personal.insert({
            firstname: Meteor.settings.private.HYPER_PERSONAL_FIRSTNAME,
            lastname: Meteor.settings.private.HYPER_PERSONAL_LASTNAME,
            role: Meteor.settings.private.HYPER_PERSONAL_ROLE,
            userId: hyperUserId
        })
    }

    Meteor.call('ArrayPlates_getPlates_Servosa', function (error, plates) {
        if (!error) {
            if (!plates) {
                Meteor.call('ArrayPlates_setPlates_Servosa')
            }
        }
    });
    Meteor.call('ArrayPlates_getPlates_Antapaccay', function (error, plates) {
        if (!error) {
            if (!plates) {
                Meteor.call('ArrayPlates_setPlates_Antapaccay')
            }
        }
    });
    Meteor.call('ArrayPlates_getPlates_Exsa', function (error, plates) {
        if (!error) {
            if (!plates) {
                Meteor.call('ArrayPlates_setPlates_Exsa')
            }
        }
    });
    Meteor.call('ArrayPlates_getPlates_Induamerica', function (error, plates) {
        if (!error) {
            if (!plates) {
                 Meteor.call('ArrayPlates_setPlates_Induamerica')
            }
        }
    });

})