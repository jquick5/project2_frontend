import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from '../account.model';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup;
  passwordsMatch: boolean = true;

  constructor(public aService: AccountService, public router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
    });
  }

  onRegister() {
    let account = new Account(
      this.registerForm.value['email'],
      this.registerForm.value['firstName'],
      this.registerForm.value['lastName'],
      this.registerForm.value['password'],
      null
    );
    if (
      this.registerForm.value['password'] ===
      this.registerForm.value['password2']
    ) {
      this.aService.register(account).subscribe((data) => {
        if (data) {
          this.router.navigate(['/']);
        }
      });
    } else {
      this.passwordsMatch = false;
      setTimeout((show) => {
        this.passwordsMatch = true;
      }, 3000);
    }
  }
}
