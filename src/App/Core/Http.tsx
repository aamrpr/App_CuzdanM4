import env from "./Env";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const GetToken = async () => {
    try {
        let Token = await AsyncStorage.getItem(env.KeyCookis);
        return Token;
    } catch (error) {
        return '';
    }
}

const SetToken = (Token: string) => {
    AsyncStorage.setItem(env.KeyCookis, Token);
}

const RemoveToken = async () => {
    await AsyncStorage.removeItem(env.KeyCookis);
}

const POST = async (URL: String, Param: any = {}) => {
    let Token = await GetToken();
    const response = await fetch(`${env.url + URL}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'authorization': 'barar ' + Token
        },
        body: JSON.stringify(Param)
    });
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        return { error: 0, data: await response.text() };
    }
}

const UploadFile = async (Path: string, name: any, type: any, onProgress?: (progress: number) => void) => {
    const formData: any = new FormData();

    formData.append('files', {
        uri: Path,
        name: name,
        type: type,
    });

    try {
        const formData: any = new FormData();

        formData.append('files', {
            uri: Path,
            name: name,
            type: type,
        });

        const response = await axios.post(env.url + 'api/Storage/UFT', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                const progress = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
                if (onProgress) onProgress(progress);
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export default { GetToken, SetToken, POST, UploadFile, RemoveToken }