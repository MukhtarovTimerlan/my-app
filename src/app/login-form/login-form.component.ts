import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  loading = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(event:Event): void {
    event.preventDefault();

    this.submitted = true;

    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;

    this.authService.login(this.f['login'].value, this.f['password'].value)
        .subscribe(
            () => {
                this.loading = false;
                this.submitted = false;
            },
            error => {
                this.loading = false;
                console.log
                (error);
            });
   }
}