import {Component, Input, ViewEncapsulation} from '@angular/core';
import {User} from "../../models/User.model";

@Component({
  selector: 'user-details',
  templateUrl: 'user-details.component.html',
  styleUrls: ['user-details.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class UserDetailsComponent {
  @Input()
  user: User;
}