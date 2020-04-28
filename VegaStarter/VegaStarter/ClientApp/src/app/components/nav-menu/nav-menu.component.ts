import { Component } from '@angular/core';
import { AuthLockService } from 'src/app/services/authlock.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  constructor(private auth:AuthService) {}
 
}
