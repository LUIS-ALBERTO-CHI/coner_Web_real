import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MatchEvents, Respuesta } from "../shared/interfaces";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class MatchEventService extends BaseService<MatchEvents>{
  pathSetingName: string;
  setingsStatus: String;
  pathSetings: string;
  path: string;

  constructor(public http: HttpClient) {
    super(http);
    this.path = '/match-events';
    this.pathSetings ="?match_id="
    this.setingsStatus= "&status=Active"
    this.pathSetingName= "?first_name="
  }

  




}