import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from './account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  account: Account;
  loggedIn: boolean = false;
  constructor(private http: HttpClient) {}

  register(account: Account) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = { headers: headers };

    return this.http.post<Account>(
      'http://localhost:5500/api/registration',
      JSON.stringify(account),
      options
    );
  }

  login(email: string, password: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = { headers: headers };
    let body = { email: email, password: password };
    this.loggedIn = true;

    return this.http.post<Account>(
      'http://localhost:5500/api/login',
      JSON.stringify(body),
      options
    );
  }

  logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('userId');
    localStorage.setItem('loggedIn', 'false');
  }

  getAccount(email: string) {
    return this.http.get<Account>(
      `http://localhost:5500/api/accountsByEmail/${email}`
    );
  }
}
