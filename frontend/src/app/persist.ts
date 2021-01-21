import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Users } from './models/Users';

@Injectable()
export class Persist {
    public currentUserName: string;
    public readonly CURRENT_USERNAME = "CURRENT_USERNAME";

    constructor(public storage: Storage) {
        this.currentUserName;
    }

    setCurrentUserName(username: string) {
        this.currentUserName = username;
        this.storage.set(this.CURRENT_USERNAME, this.currentUserName);
    }

}