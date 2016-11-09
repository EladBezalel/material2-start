import {Component, OnInit} from '@angular/core';
import {User} from './models/User.model';
import {UsersService} from './services/users.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [ UsersService ]
})
export class AppComponent implements OnInit {
  users: Observable<User[]>;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.users = this.usersService.loadAll();
  }
}