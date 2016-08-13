import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";

import {MdIconRegistry} from "@angular2-material/icon";

import {User} from "../../models/User.model";
import {UsersListComponent} from "../users-list/users-list.component";
import {UserDetailsComponent} from "../user-details/user-details.component";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'start-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.less'],
  directives: [UsersListComponent, UserDetailsComponent],
  providers: [MdIconRegistry, UsersService]
})
export class StartAppComponent implements OnInit, OnDestroy{
  users: User[];
  selectedUser: User;

  usersWatcher: Subscription;

  constructor (mdIconRegistry: MdIconRegistry, private usersService: UsersService) {
    mdIconRegistry.addSvgIconSetInNamespace('avatars', 'src/assets/avatars.svg');
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
