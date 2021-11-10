import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  loginForm: FormGroup;
  loggedIn: boolean = localStorage.getItem('userId') ? true : false;

  constructor(
    private http: HttpClient,
    private aService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    localStorage.setItem('loggedIn', 'false');
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  onLogin() {
    this.aService
      .login(this.loginForm.value['email'], this.loginForm.value['password'])
      .subscribe((data) => {
        if (data) {
          this.loggedIn = true;
          this.aService
            .getAccount(this.loginForm.value['email'])
            .subscribe((userData) => {
              console.log('Logged in: ' + this.loggedIn);
              localStorage.setItem('userId', userData[0].id);
              localStorage.setItem('firstName', userData[0].firstName);
              localStorage.setItem('lastName', userData[0].lastName);
              localStorage.setItem('email', userData[0].email);
              localStorage.setItem('loggedIn', 'true');
              this.router.navigate(['/recipes']);
            });
        }
      });

    console.log('login clicked');
  }
}
