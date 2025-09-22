import { create } from 'zustand';
import api from './api';
import { goToPage, SetStartPage } from '../../Router';
import ReactNativeBiometrics from 'react-native-biometrics';
import { RenderNotification } from './Notification';
const rnBiometrics = new ReactNativeBiometrics();
interface StoreState {
    UserInfo: any;
    Status: number,
    Notes: any[],
    Requests: any[],
    SetStatus: (status: number) => void;
    RefreshToken: () => void;
    ChickToken: () => void;
    ChcikNotes: () => void;
    GetAllRequests: () => void;
}

const handleBiometricAuth = () => {
    rnBiometrics.simplePrompt({ promptMessage: 'Parmak izi ile kimlik doğrulama' })
        .then(resultObject => {
            const { success } = resultObject;
            if (success) {
                SetStartPage('Tabs', {});
            } else {
                SetStartPage('LookScreen', {});
            }
        })
        .catch(() => {
            SetStartPage('LookScreen', {});
        });
};

RenderNotification();
const Store = create<StoreState>((set) => ({
    UserInfo: [],
    Status: 0,
    Notes: [],
    Requests: [],
    SetStatus: (status: number) => { set({ Status: status }) },
    ChickToken: async () => {
         console.log('ChickToken çalıştı');
        let result = await api.ApiChickToken();
        console.log(result);
        
        if (result.error == 0) {
            set({ UserInfo: result.data });
            rnBiometrics.isSensorAvailable()
                .then(resultObject => {
                    const { available, biometryType } = resultObject;
                    if (available && biometryType) {
                        handleBiometricAuth();
                    } else {
                        SetStartPage('LookScreen', {});
                    }
                });
        }
        else {
            if (result.data == 'The account is not verified.') {
                //  router.replace('/Pages/Confirm/Confirm');
                SetStartPage('Confirm', {});
            }
            else if (result.data == 'Your authentication has expired. Please log in.') {
                //router.replace('/Pages/Auth/Login');
                SetStartPage('Login', {});
            }
            else {

            }
        }
    },
    RefreshToken: async () => {
        let result = await api.ApiChickToken();
        if (result.error == 0) {
            set({ UserInfo: result.data })
        }
        else {
            if (result.data == 'The account is not verified.') {
                SetStartPage('Confirm', {});
            }
            else if (result.data == 'Your authentication has expired. Please log in.') {
                SetStartPage('Login', {});
            }
            else {

            }
        }
    },
    ChcikNotes: async () => {
        let result = await api.ApigetNewNote();
        if (result.error == 0) {
            let Note: any = [];
            for (let i = 0; i < result.data.length; i++) {
                Note.push(result.data[i].Data);
            }
            set({ Notes: Note });
        }
    },
    GetAllRequests: async () => {
        let result = await api.ApiGetAllRequest();
        if (result.error == 0) {
            let requestList: any = [];
            console.log(result.data);
            for (let i = 0; i < result.data.length; i++) {
                requestList.push(result.data[i]);
            }
            set({ Requests: requestList });
        }
    }
}));

export default Store;