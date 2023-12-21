const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.checkExpiredReagentsDaily = functions.pubsub.schedule('every 24 hours').timeZone('Asia/Manila').onRun(async (context) => {
    const reagentsCollection = admin.firestore().collection('reagents');
    const currentDate = new Date();

    const notifications = [];

    // Query reagents that have expired
    const expiredReagentsQuery = reagentsCollection.where('expirationData', '<=', currentDate);

    try {
        const expiredReagentsSnapshot = await expiredReagentsQuery.get();

        expiredReagentsSnapshot.forEach(async (doc) => {
            const reagentsData = doc.data();
            const reagentName = reagentsData.name;

            // Query 'fcm_tokens' collection within 'users' and get tokens for each user
            const usersCollection = admin.firestore().collection('users');
            const usersSnapshot = await usersCollection.get();

            usersSnapshot.forEach(async (userDoc) => {
                const userTokensCollection = userDoc.ref.collection('fcm_tokens');
                const tokensSnapshot = await userTokensCollection.select('fcm_token').get();

                tokensSnapshot.forEach(async (tokenDoc) => {
                    const tokenData = tokenDoc.data();
                    const deviceToken = tokenData.fcm_token;

            // Notify Android devices using FCM
            const payload = {
                token: deviceToken,
                notification: {
                    title: 'Oh No! A Reagent has Expired!',
                    body: `Reagent ${reagentName} has expired.`,
                },
            };

            notifications.push(admin.messaging().send(payload));

        });

    });

});

     await Promise.all(notifications);


        return null; // No expired reagents found
    } catch (error) {
        console.error('Error querying Firestore:', error);
        return null;
    }
});