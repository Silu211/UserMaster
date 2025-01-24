import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "./login.service";
import { Router } from "@angular/router";
import { ILoggedInUserModel } from "./login.model";

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrl: 'login.component.css',
    standalone: false
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(private fb: FormBuilder,
        private loginService: LoginService,
        private router: Router) { }

    ngOnInit(): void {
        sessionStorage.clear();
        this.setupLoginForm();
    }

    loginUser(): void {
        this.loginService.loginUser(this.loginForm.value).subscribe((userDetail: ILoggedInUserModel) => {
            if (userDetail) {
                this.router.navigateByUrl('users');
                sessionStorage.setItem('user-detail', JSON.stringify(userDetail));
            } else {
                alert('Invalid User Email and Password..!!');
            }
        });
    }

    registerUser(): void {
        this.router.navigateByUrl('upsert-user');
    }

    private setupLoginForm(): void {
        this.loginForm = this.fb.group({
            userEmail: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
}