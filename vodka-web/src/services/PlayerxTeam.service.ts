import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Player, Respuesta, PlayerArray, PlayerxTeam } from "../shared/interfaces";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class PlayerxTeamService extends BaseService<PlayerxTeam>{
  pathSetingName: string;
  setingsStatus: String;
  pathSetings: string;
  path: string;
  

  url = 'https://api.ligasabatinadefutbol.com.mx/api';

  constructor(public http: HttpClient) {
    super(http);
    this.path = '/players';
    this.pathSetings ="?team_id="
    this.setingsStatus= "&status=Active"
    

  }

  

// public getItemsxTeam(idModel: number): Observable<PlayerxTeam> {
//   return this.http.get<PlayerxTeam>(this.url + this.path + this.pathSetings + idModel);
// }

// public getItemsxTeamStatus(idModel: number): Observable<PlayerxTeam> {
//     return this.http.get<PlayerxTeam>(this.url + this.path + this.pathSetings + idModel + this.setingsStatus);
//   }
  


}