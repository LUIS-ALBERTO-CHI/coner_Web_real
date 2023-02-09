import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from,Observable,of, mergeMap, interval, map } from 'rxjs';
import { Event, Respuesta, RespuestaLogin, User } from "../shared/interfaces";

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T> {
  //url = 'https://api.ligasabatinadefutbol.com.mx/api';
  url = '/api';
  abstract path:string;
  abstract pathSetings:string;
  abstract pathSetingName:string;
  abstract setingsStatus: String;
  constructor(public http: HttpClient) {}


  getImage(imageUrl: string): Observable<any> {
    return this.http.get(imageUrl);
  }





  public list(): Observable<Respuesta<T>> {
    return this.http.get<Respuesta<T>>(this.url + this.path);
  }

  public login(model: User): Observable<RespuestaLogin<User>> {
    return this.http.post<RespuestaLogin<User>>(this.url + "/login", model)
  }


  public register(model: T) {
    return this.http.post(this.url +this.path, model)
  }


  //https://api.ligasabatinadefutbol.com.mx/api/players?team_id=<ID>



  public detail(model: number) {
   //return this.http.get(`${this.url}${this.path}${model}`);
   return this.http.get("https://api.ligasabatinadefutbol.com.mx/api" + this.path + "/"+ model)
  }

  //FALTA EL UPDATE
  public edit(idPlayer: number ,model: T) {
    return this.http.put(this.url + this.path + "/" + idPlayer , model)
  }

  public remove(id:number) {

    return this.http.delete(`${this.url}${this.path}/${id}`);

  }

  // public getTeamsxUser(modelsId:number []){
  //   return from(modelsId).pipe(
  //     mergeMap(m => this.http.get('https://api.ligasabatinadefutbol.com.mx/api/teams/', m))


  //   );
  // }
  //https://api.ligasabatinadefutbol.com.mx/api/teams?rel=false&limit=25

  public getItemsxModelStatus(idModel: number): Observable<Respuesta<T>> {
    return this.http.get<Respuesta<T>>(this.url + this.path + this.pathSetings + idModel + this.setingsStatus);
  }

  public getItemsxModel(idModel: number): Observable<Respuesta<T>> {
    return this.http.get<Respuesta<T>>(this.url + this.path + this.pathSetings + idModel);
  }



  public getItemsxModelLimit(idModel: number): Observable<Respuesta<T>> {
    return this.http.get<Respuesta<T>>(this.url + this.path + this.pathSetings + idModel+ "&limit=50");
  }


  public getItemsxName(name: string,id: number,){

    return this.http.get<Respuesta<T>>(this.url + this.path + this.pathSetingName + name);

  }

  //PREGUNTAR SI REL=FALSE NO AFECTA PARA EL RESTO DE LOS MODELOS
  public get (CantidadElementos: number): Observable<Respuesta<T>> {
    return this.http.get<Respuesta<T>>(this.url + this.path +'?rel=false&limit=' + CantidadElementos );
  }

  public getPagination (LinkPagina: string): Observable<Respuesta<T>> {
    return this.http.get<Respuesta<T>>(LinkPagina);
  }

  public getPaginationPrevious (LinkPagina: string): Observable<Respuesta<T>> {
    return this.http.get<Respuesta<T>>(LinkPagina);
  }

  public search(model: number) {
    return this.http.get(`${this.url}${this.path}${model}`);
   }

//https://api.ligasabatinadefutbol.com.mx/api/teams?rel=false&limit=25

}
