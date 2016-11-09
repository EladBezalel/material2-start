import {Component, OnInit} from '@angular/core';
import {User} from './models/User.model';
import {UsersService} from './services/users.service';
import {Observable} from 'rxjs';

import {MdIconRegistry} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [ UsersService, MdIconRegistry ]
})
export class AppComponent implements OnInit {
  users: Observable<User[]>;
  selectedUser: User;

  constructor(mdIconRegistry: MdIconRegistry, private usersService: UsersService,) {
    mdIconRegistry.addSvgIconSetInNamespace('avatars', './assets/avatars.svg');
  }

  ngOnInit(): void {
    this.users = this.usersService.loadAll().map(users => {
      this.selectedUser = users[0];

      return users;
    });
  }

  onUserSelected(user: User): void {
    this.selectedUser = user;
  }
}