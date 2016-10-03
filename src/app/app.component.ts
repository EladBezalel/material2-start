import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";

import {MdIconRegistry} from "@angular/material/icon";

import {User} from "./models/User.model";

import {UsersService} from "./services/users.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.less'],
  providers: [MdIconRegistry, UsersService]
})
export class AppComponent implements OnInit, OnDestroy{
  users: User[];
  selectedUser: User;

  usersWatcher: Subscription;

  constructor (mdIconRegistry: MdIconRegistry, private usersService: UsersService) {
    mdIconRegistry.addSvgIconSetInNamespace('avatars', './assets/avatars.svg');
  }

  ngOnInit () {
    this.usersWatcher = this.usersService.loadAll().subscribe(users => {
      this.users = users;
      this.selectedUser = users[0];
    });
  }

  ngOnDestroy(): void {
    this.usersWatcher.unsubscribe();
  }

  onUserSelected(user:User):void {
    this.selectedUser = user;
  }
}