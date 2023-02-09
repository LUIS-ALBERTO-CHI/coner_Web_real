import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Event, Respuesta, User, RespuestaLogin } from "../shared/interfaces";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User>{
  pathSetingName: string;
  setingsStatus: String;
  pathSetings: string;
  path: string;

  constructor(public http: HttpClient) {
    super(http);
    this.path = '/users';
  }

 

  
}


