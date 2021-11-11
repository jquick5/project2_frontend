import {
  Component,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { AccountService } from '../account.service';
import { LandingPageComponent } from '../landing-page/landing-page.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnChanges {
  constructor(private aService: AccountService) {}

  loggedIn: string = localStorage.getItem('loggedIn');
  name: string = localStorage.getItem('firstName');

  ngOnInit(): void {
    this.loggedIn = localStorage.getItem('loggedIn');
  }

  ngOnChanges(change: SimpleChanges) {
    change.loggedIn;
  }

  onLogout() {
    localStorage.setItem('loggedIn', 'false');
    this.aService.logout();
  }
}
