import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { finalize } from "rxjs";
import { delay } from "rxjs";
import { Observable } from "rxjs";
import { BusyService } from "../services/busy.service";


@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    constructor(private busyService : BusyService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.busyService.busy();
        return next.handle(req).pipe(
            delay(1000),
            finalize(() => {
                this.busyService.idle();
            })
        ); 
    }
    
}