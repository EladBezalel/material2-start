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

  constructor(mdIconRegistry: MdIconRegistry, private usersService: UsersService) {
    mdIconRegistry.addSvgIconSetInNamespace('avatars', './assets/avatars.svg');
  }

  ngOnInit(): void {
    this.users = this.usersService.loadAll();
  }
}