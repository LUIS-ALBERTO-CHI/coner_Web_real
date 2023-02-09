import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Position, Respuesta } from "../shared/interfaces";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class PositionService extends BaseService<Position>{
  pathSetingName: string;
  setingsStatus: String;
  pathSetings: string;
  path: string;

  constructor(public http: HttpClient) {
    super(http);
    this.path = '/positions';
  }
}