import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, mergeMap, Observable } from "rxjs";
import { Match, Respuesta } from "../shared/interfaces";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class MatchService extends BaseService<Match>{
  pathSetingName: string;
  setingsStatus: String;
  pathSetings: string;
  path: string;

  constructor(public http: HttpClient) {
    super(http);
    this.path = '/matches';
    this.pathSetings= "?m_id=";
  }

  public registerMatch(matches: Match[]): Observable<Match> {
    return from(matches).pipe(
      mergeMap(match => <Observable<Match>> this.http.post('https://api.ligasabatinadefutbol.com.mx/api/matches', match))


    );
  }

  public getMatchesxTeam(idteam: number){

    return this.http.get<Respuesta<Match>>(this.url + this.path +"?team1_id="+idteam+ "||team2_id="+ idteam);

  }


  //https://api.ligasabatinadefutbol.com.mx/api/matches?team1_id=5||team2_id=5

}
