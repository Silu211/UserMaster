import { Injectable } from "@angular/core";
import { CanMatch, GuardResult, MaybeAsync, Route } from "@angular/router";

@Injectable()
export class CanViewAuthGuard implements CanMatch {

    canMatch(): MaybeAsync<GuardResult> {
        return sessionStorage.length > 0;
    }
}