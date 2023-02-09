import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from,Observable,of, mergeMap, interval, map } from 'rxjs';
import { MatchDay, Respuesta } from "../shared/interfaces";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class MatchDayService extends BaseService<MatchDay>{
  pathSetingName: string;
  setingsStatus: String;
  pathSetings: string;
  path: string;

  constructor(public http: HttpClient) {
    super(http);
    this.path = '/matchdays';
    this.pathSetingName = "/?m_name="
    //this.pathSetings= "?m_id="
  }

  public registerMatchDay(matchDays: MatchDay[]): Observable<MatchDay> {
    return from(matchDays).pipe(
      mergeMap(matchD => <Observable<MatchDay>> this.http.post('https://api.ligasabatinadefutbol.com.mx/api/matchdays', matchD))
    );
  }

  public getItemsxName(name: string){

    return this.http.get<Respuesta<MatchDay>>(this.url + this.path + this.pathSetingName + name);

  }

  public getMatchDayxSeason(idSeason: number){

    return this.http.get<Respuesta<MatchDay>>(this.url + this.path +"?s_id="+ idSeason);

  }
}
