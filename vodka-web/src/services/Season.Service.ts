import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Season, Respuesta, SeasonxTeam } from "../shared/interfaces";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class SeasonService extends BaseService<Season>{
  pathSetingName: string;
  setingsStatus: String;
  pathSetings: string;
  path: string;

  constructor(public http: HttpClient) {
    super(http);
    this.path = '/seasons';
    this.pathSetingName = "?s_name="
  }

  public getItemsxName(name: string){

    return this.http.get<Respuesta<Season>>(this.url + this.path + this.pathSetingName + name);

  }
  public registerSeason(model: SeasonxTeam) {
    return this.http.post(this.url +this.path, model)
  }
}
