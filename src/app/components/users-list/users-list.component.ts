import {Component, Input} from '@angular/core';
import {User} from '../../models/User.model';

@Component({
  selector: 'users-list',
  templateUrl: 'users-list.component.html',
  styleUrls: ['users-list.component.less']
})
export class UsersListComponent {
  @Input() users: User[];
}