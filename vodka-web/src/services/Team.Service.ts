import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Team, Respuesta, Player } from "../shared/interfaces";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class TeamService extends BaseService<Team>{
  pathSetingName: string;
  setingsStatus: String;
  pathSetings: string;
  path: string;

  constructor(public http: HttpClient) {
    super(http);
    this.path = '/teams';
    this.pathSetings= "?team_id="
    this.pathSetingName = "?t_name="
  }

  public getItemsxName(name: string){
    return this.http.get<Respuesta<Team>>(this.url + this.path + this.pathSetingName + name);
  }

}

