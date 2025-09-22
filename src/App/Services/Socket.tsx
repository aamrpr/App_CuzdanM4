// socketService.js
import { io } from 'socket.io-client';
import Http from '../Core/Http';
import env from '../Core/Env';

class SocketService {
    socket: any = null;
    events: any[] = [];
    connect = () => {
        return new Promise(async (resolve: any, reject: any) => {
            this.socket = io(env.url, { query: { token: await Http.GetToken(), ttt: true }, transports: ['websocket'], reconnection: true });
            this.socket.on('connect', () => {
                console.log('🟢 Socket connected!');
                this.events.forEach(event => {
                    this.socket.on(event.eventName, event.callback);
                });
                resolve();
            });

            this.socket.on('connect_error', (err: any) => {
                console.log('🔴 Socket connection error:', err);
                reject(err);
            });
        });
    };

    disconnect = () => {
        if (this.socket) {
            this.socket.disconnect();
            console.log('🔌 Socket disconnected');
        }
    };

    sendMessage = (eventName: string, data: any) => {
        if (this.socket) {
            this.socket.emit(eventName, data);
        }
    };

    addEventListener = (eventName: string, callback: any) => {
        let key = this.events.length + 1;
        this.events.push({ key: key, eventName: eventName, callback: callback });
        let ev = this.events.find(x => x.key == key);
        if (!this.socket) return;
        this.socket.on(ev.eventName, ev.callback);
        return key;
    };

    removeListener = (key: any) => {
        if (!this.socket) return;
        const event = this.events.find(x => x.key === key);
        if (event) {
            this.socket.off(event.eventName, event.callback);
            this.events = this.events.filter(x => x.key !== key);
            console.log(`🗑️ Listener removed: ${event.eventName}`);
        }
    };
}

const socketService = new SocketService();
export default socketService;
