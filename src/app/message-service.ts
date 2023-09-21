import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject } from 'rxjs'

@Injectable()

export class MessageService {

    currentMessage = new BehaviorSubject(null);
    
    constructor(public angularFireMessaging: AngularFireMessaging) {
        // this.angularFireMessaging.messaging.subscribe(
        //     (_messaging) => {
        //         _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        //         _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
        //     }
        // )
    }

    requestPermission() {
        this.angularFireMessaging.requestToken.subscribe(
            (token) => {
                console.log(token);
            },
            (err) => {
                console.error('Unable to get permission to notify.', err);
            }
        );
    }

    receiveMessage() {
        this.angularFireMessaging.messages.subscribe(
            (payload) => {
                console.log("new message received. ", payload);
                this.currentMessage.next(payload);
            })
    }

}