import {Component, Input} from '@angular/core';
import {User} from "../../models/User.model";

@Component({
  selector: 'user-details',
  templateUrl: 'user-details.component.html',
  styleUrls: ['user-details.component.less']
})
export class UserDetailsComponent {
  @Input() user: User;
}