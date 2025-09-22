import { PermissionsAndroid, Platform } from "react-native";
import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';
import env from "../Core/Env";
var ListNote: any[] = [];

export const RenderNotification = async () => {
    if (Platform.OS === 'android') {
        try {
            const POST_NOTIFICATIONS = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
            const BLUETOOTH_CONNECT = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT);
        } catch (err) {
            console.warn(err);
        }
    }

    PushNotification.configure({
        onRegister: function (token) {
            console.log("TOKEN:", token);
        },
        onNotification: async function (notification: any) {
            if (notification.data.channelId == "Note") {
                console.log(notification.data);
            }
            if (notification.channelId == "Note") {

            }
            else if (notification.channelId == "Requests") {

            }
        },
        onAction: async function (notification: any) {

        },
        permissions: {
            alert: true,
            badge: true,
            sound: false,
        },

        popInitialNotification: true,
        requestPermissions: true,
    });
    CreateChannel("Note", "notifications about any updates ", "This is for notifications about any updates to your account or any improvements to the application.");
    PushNotification.requestPermissions();

    //on Recved Message on Forground
    messaging().onMessage(async (remoteMessage: any) => {
        if (remoteMessage.data.channelId == "Note") {
            if (Platform.OS === 'android') {

            }
            console.log(remoteMessage.notification.android);

            //ShowNote(remoteMessage.data.title, 'https://www.w3schools.com/w3images/avatar5.png', 'asdasd asdasd asd', '12312', []);
        }
        // console.log('📩 رسالة جديدة داخل التطبيق:', remoteMessage);
    });
}

export const CreateChannel = (channelId: string, channelName: string, channelDescription: string) => {
    PushNotification.createChannel(
        {
            channelId: channelId,
            channelName: channelName,
            channelDescription: channelDescription,
            playSound: true,
            soundName: "default",
            importance: 4,
            vibrate: true,
        },
        (created: any) => console.log(`createChannel returned '${created}'`)
    );
}

export const RemoveNotById = (id: any) => {
    let NotId: any = ListNote.find(x => x == id);
    if (NotId) {
        PushNotification.cancelLocalNotification(NotId);
    }
}


export const ShowNote = (UserName: string, UserImage: string, message: string, id: string, actions: any[], ongoing: boolean = false) => {
    let option = {
        channelId: "Note",
        title: UserName,
        message: message,
        actions: actions,
        invokeApp: false,
        largeIconUrl: UserImage,
        data: { Type: "Consultation ", id: id },
        ongoing: ongoing,
        onlyAlertOnce: false,
        autoCancel: true,
        playSound: true,
        soundName: "recivedmony.wav",
    };
    PushNotification.localNotification(option);
}

// setTimeout(() => {
//     ShowNote('amer alla', 'https://www.w3schools.com/w3images/avatar5.png', 'asdasd asdasd asd', '12312', []);
// }, 1000);