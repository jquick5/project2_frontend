import { Component, OnChanges, OnInit } from '@angular/core';
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
    if (this.aService.loggedIn) {
      this.loggedIn = localStorage.getItem('loggedIn');
    }
  }

  ngOnChanges() {
    if (this.aService.loggedIn) {
      this.loggedIn = localStorage.getItem('loggedIn');
    }

    console.log('changes');
  }

  onLogout() {
    this.aService.logout();
    this.loggedIn = localStorage.getItem('loggrdIn');
  }
}
