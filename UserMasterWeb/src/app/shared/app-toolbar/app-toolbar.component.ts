import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ILoggedInUserModel } from "../../login/login.model";

@Component({
    selector: 'app-toolbar',
    templateUrl: 'app-toolbar.component.html',
    styleUrl: 'app-toolbar.component.css',
    standalone: false
})
export class AppToolBarComponent implements OnInit {
    loggedInUserDetail: ILoggedInUserModel;

    constructor(private router: Router) { }

    ngOnInit(): void {
        if (sessionStorage.length > 0) {
            this.loggedInUserDetail = JSON.parse(sessionStorage.getItem('user-detail')!);
        }
    }

    viewToken(): void {
        alert(this.loggedInUserDetail.accessToken);
    }

    logoutUser(): void {
        this.router.navigateByUrl('login');
    }
}