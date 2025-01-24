import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ILoggedInUserModel, ILoginModel } from "./login.model";
import { App_Constants } from "../app.constant";

@Injectable()
export class LoginService {
    constructor(private httpClient: HttpClient) { }

    loginUser(loginModel: ILoginModel): Observable<ILoggedInUserModel> {
        return this.httpClient.post<ILoggedInUserModel>(App_Constants.API_URL + 'api/Login/LoginUser', loginModel);
    }
}