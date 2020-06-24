import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  errorMessage = false;
  loginForm: FormGroup;

  constructor(
    private aS: AuthenticationService,
    private fB: FormBuilder,
    private router: Router
    ) {
    }

  ngOnInit(): void {
    this.loginForm = this.fB.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  public get f() { return this.loginForm.controls }

  public signIn() {
    if(this.loginForm.valid){
    this.aS.signIn(this.loginForm.value.email, this.loginForm.value.password)
    .then((response) => {
      this.router.navigate(['/']);
    })
    .catch(error => this.errorMessage = true)
    }
  }
}
