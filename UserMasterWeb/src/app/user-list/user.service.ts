import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IUsersDetailModel } from "./user-list.model";
import { App_Constants } from "../app.constant";

@Injectable()
export class UserService {

    constructor(private httpClient: HttpClient) { }

    getAllUserDetails(): Observable<IUsersDetailModel[]> {
        return this.httpClient.get<IUsersDetailModel[]>(App_Constants.API_URL + 'UserMaster/GetAllUserDetails');
    }

    getUserDetailsById(userId: number): Observable<IUsersDetailModel> {
        return this.httpClient.get<IUsersDetailModel>(App_Constants.API_URL + 'UserMaster/GetUserDetailsById/' + userId);
    }

    getUserProfilePicture(userId: number): Observable<string> {
        return this.httpClient.get<string>(App_Constants.API_URL + 'UserMaster/GetUserProfilePicture/' + userId);
    }

    upsertUserDetails(model: IUsersDetailModel): Observable<number> {
        return this.httpClient.post<number>(App_Constants.API_URL + 'UserMaster/UpsertUserDetails', model);
    }

    deleteUser(userId: number): Observable<number> {
        return this.httpClient.delete<number>(App_Constants.API_URL + 'UserMaster/DeleteUser/' + userId);
    }
}