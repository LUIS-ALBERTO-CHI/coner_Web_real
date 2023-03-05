import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from,Observable,of, mergeMap} from 'rxjs';
import { Player, PlayerArray, Respuesta} from "../shared/interfaces";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class PlayerService extends BaseService<Player>{
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
    this.pathSetingName= "?first_name="

  }

  public registerPlayer(players: Player[]): Observable<Player> {
    return from(players).pipe(
      mergeMap(player => <Observable<Player>> this.http.post('https://api.ligasabatinadefutbol.com.mx/api/players', player))
    );
  }

  getImageBase64(imageUrl: string){

    return this.http.get(imageUrl);
  }
  // public registerPlayer(model: Player[]) {
  //   return this.http.post("https://api.ligasabatinadefutbol.com.mx/api/players/bulk", model)
  // }

  public ActivePlayers(model: Player[]) {
    return this.http.post("https://api.ligasabatinadefutbol.com.mx/api/players/bulk", model)
  }

/* api/players/free
en el body {players: number[]} */

public releasePlayer(playersId: PlayerArray ) {
  return this.http.put("https://api.ligasabatinadefutbol.com.mx/api/players/free", playersId)
}

// public getItemsxTeam(idModel: number): Observable<PlayerxTeam> {
//   return this.http.get<PlayerxTeam>(this.url + this.path + this.pathSetings + idModel + this.setingsStatus);
// }

public getItemsxName(name: string, id?: number): Observable<Respuesta<Player>> {
  return this.http.get<Respuesta<Player>>(this.url + this.path + this.pathSetingName + name + (id ? '&team_id='+id:''));
}

}
