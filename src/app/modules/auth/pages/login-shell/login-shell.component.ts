import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-login-shell',
  templateUrl: './login-shell.component.html',
  styleUrls: ['./login-shell.component.scss'],
})
export class LoginShellComponent implements OnInit {
  public error: string;
  public hide = true;
  public loginFormGroup: FormGroup;
  private componentActive = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public translateService: TranslateService
  ) {
    this.loginFormGroup = this.fb.group({
      loginName: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  ngOnInit(): void {
  }

  submit(): void {
    this.loginFormGroup.markAllAsTouched();

    if (!this.loginFormGroup.invalid) {
      this.authService
        .verificationUser(this.loginFormGroup.value)
        .pipe(takeWhile(() => this.componentActive))
        .subscribe({
          next: () => {
            const userRole = this.authService.getUserRole();
            this.router.navigate([`/${userRole}`]);
          },
          error: (errorResponse) => {
            this.error = errorResponse.error.error;
          },
        });
    }
  }


  ngOnDestroy(): void {
    this.componentActive = false;
  }
}
