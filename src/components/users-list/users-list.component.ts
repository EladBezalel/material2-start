import {Component, Input, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {User} from "../../models/User.model";

@Component({
  selector: 'users-list',
  templateUrl: 'users-list.component.html',
  styleUrls: ['users-list.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class UsersListComponent {
  @Input()
  users: User[];

  @Output() selected: EventEmitter<User> = new EventEmitter<User>();

  onSelect(user: User) {
    this.selected.emit(user);
  }
}