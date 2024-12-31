import {Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket!: WebSocket;
  private messagesSubject = new BehaviorSubject<any | null>(null);
  private messageSignal: WritableSignal<any> = signal(null)

  constructor() {
    this.connect();
  }

  private connect(): void {
    this.socket = new WebSocket('ws://localhost:8055');

    this.socket.onmessage = (event) => {
      this.messageSignal.set(event.data);
      this.messagesSubject.next(event.data);
    };

    this.socket.onerror = (error) => {
      console.error('Error WebSocket:', error);
    };

    this.socket.onclose = () => {
      console.log('WebSocket close connection. Connected...');
      setTimeout(() => this.connect(), 5000);
    };
  }

  sendMessage(message: string): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error('WebSocket не подключён');
    }
  }

  getMessages(): Signal<any> {
    return this.messageSignal();
    //return this.messagesSubject.asObservable();
  }

  ngOnDestroy(): void {
    this.socket.close();
  }
}
