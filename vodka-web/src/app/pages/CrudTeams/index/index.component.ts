import { Component, OnInit } from "@angular/core";
import {
  Team,
  Respuesta,
  Pagination,
  Moder,
  RespLogin,
} from "src/shared/interfaces";
import { Router } from "@angular/router";
import { TeamService } from "src/services/team.service";
import { FormGroup, FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { MatDialog, MatDialogState } from "@angular/material/dialog";
import { ModalteamsComponent } from "src/app/plantillas/modalteams/modalteams.component";
import { MatSnackBar, MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";
import { ModalDeleteComponent } from "src/app/plantillas/modalDelete/modalDelete.component";
import { PlayerService } from "../../../../services/player.service";
import { variable } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"],
})
export class IndexComponent implements OnInit {
  form: FormGroup;
  pagina: FormGroup;
  teams: Team[];
  teamsLogin: Team[];
  moderLogin: Moder[];
  team: Team;
  error: boolean;
  events: Event[];
  teamsOriginal: Team[];
  CantidadElemento: number;
  pagination: Pagination;
  isLoginDialogOpen: boolean = false;
  prueba2: Team;
  numberPlayers: number;
  idTeams: number[];
  public respLogin: RespLogin;
  constructor(
    private router: Router,
    private service: TeamService,
    public http: HttpClient,
    public dialog: MatDialog,
    public snakbar: MatSnackBar,
    private servicePlayer: PlayerService
  ) {
    this.error = false;
    this.teams = [];
    this.teamsLogin = [];
    this.moderLogin = [];
    this.team;
    this.events = [];
    this.pagination;
    this.CantidadElemento = 25;
    this.prueba2;
    this.numberPlayers;
    this.idTeams = [];
    this.respLogin;

    this.form = new FormGroup({
      t_name: new FormControl(""),
      numberPlayers: new FormControl(0),
    });
  }

  ngOnInit() {
    this.load();
  }

  //Hacer de nuevo la misma petición pero pasar
  //Pintar el Next_page_pagination(URL) en mi boton y con el onclik lanzar la peticion src , href cuando yo le de click al bton me debe realizar
  //la peticion y literal esa URL que pinte la tengo que regresar al evento y mandarla de nuevo

  load() {
    this.respLogin = JSON.parse(sessionStorage.getItem("dataLoginALl"));
    if (this.respLogin.role == "captain") {
      this.menuPermissions(this.respLogin.role);
      this.moderLogin = JSON.parse(sessionStorage.getItem("dataLogin"));
      this.moderLogin.forEach((element) => {
        //this.teamsLogin.push(element.team);
        this.idTeams.push(element.team.id);
      });
      //this.teamsOriginal =  this.teamsLogin;
      this.idTeams.forEach((element) => {
        this.service.detail(element).subscribe((team: Team) => {
          //console.log(team);
          this.teamsLogin.push(team);
          this.numberplayers();
          this.validationsImage();
          this.formControlName();
        });
      });
    } else if (this.respLogin.role == "admin") {
      this.menuPermissions(this.respLogin.role);
      var limit = 25;
      this.service.get(limit).subscribe((resp) => {
        this.teamsLogin = resp.data;
        this.pagination = resp.pagination;
        this.numberplayers();
        this.validationsImage();
        this.formControlName();

        this.pagina = new FormGroup({
          link: new FormControl(this.pagination.next_page_url),
          linkprev: new FormControl(this.pagination.prev_page_url),
        });
      });
    }
    this.formControlName();
    //AQUI VA LA BUSQUEDA POR PETICION

    // this.form.valueChanges.subscribe(valores => {
    //   if (!valores) return;
    //   this.teamsLogin = this.teamsOriginal;
    //   this.searchTeams(valores);
    //   //console.log(valores);
    // });
  }

  isShown2: boolean = false;

  menuPermissions(role: string) {
    if (this.respLogin.role == "captain") {
      this.isShown2 = false;
      //this.isShown = false;
    } else if (this.respLogin.role == "admin") {
      this.isShown2 = true;
    }
  }

  get prueba() {
    if (this.teamsLogin && this.teamsLogin.length) {
      return true;
    }

    return false;
  }

  obtenerLink() {
    this.pagina.get("link").value;
    this.next(this.pagina.get("link").value);
  }

  obtenerLinkPrev() {
    this.pagina.get("linkprev").value;
    this.previous(this.pagina.get("linkprev").value);
  }

  next(LinkPagination: string) {
    //validar que si string es null entonces que te
    if (LinkPagination == null) {
      this.snakbar.open("¡Está es la última página!", "", {
        duration: 5000,
      });
    } else {
      this.error = true;
      this.service.getPagination(LinkPagination).subscribe((teams) => {
        this.teamsLogin = teams.data;
        this.pagination = teams.pagination;
        this.teamsOriginal = teams.data;
        this.numberplayers();
        this.validationsImage();
        //console.log(this.pagination);

        this.pagina = new FormGroup({
          link: new FormControl(this.pagination.next_page_url),
          linkprev: new FormControl(this.pagination.prev_page_url),
        });
      });
    }

    //AQUI VA LA BUSQUEDA POR PETICION

    // this.form.valueChanges.subscribe(valores => {
    //   if (!valores) return;
    //   this.teamsLogin = this.teamsOriginal;
    //   this.searchTeams(valores);
    //   //console.log(valores);
    // });
  }

  previous(LinkPagination: string) {
    if (LinkPagination == null) {
      this.snakbar.open("¡Está es la primera página!", "", {
        duration: 5000,
      });
    } else {
      this.error = true;
      this.service.getPaginationPrevious(LinkPagination).subscribe((teams) => {
        this.teamsLogin = teams.data;
        this.pagination = teams.pagination;
        this.teamsOriginal = teams.data;
        this.numberplayers();
        this.validationsImage();
        //console.log(this.teams);

        this.pagina = new FormGroup({
          link: new FormControl(this.pagination.next_page_url),
          linkprev: new FormControl(this.pagination.prev_page_url),
        });
      });
    }

    //AQUI VA LA BUSQUEDA POR PETICION

    // this.form.valueChanges.subscribe(valores => {
    //   if (!valores) return;
    //   this.teamsLogin = this.teamsOriginal;
    //   this.searchTeams(valores);
    //   //console.log(valores);
    // });
  }

  // searchTeams(valores: any) {
  //   console.log(this.teamsLogin)
  //   if (valores.t_name) {
  //     this.teamsLogin = this.teamsLogin.filter(t => t.t_name.toLowerCase().includes(valores.t_name.toLowerCase()) );
  //   }
  // }

  openDialog(): void {
    debugger;
    if (this.isLoginDialogOpen) {
      return;
    }
    this.isLoginDialogOpen = true;
    const dialogRef = this.dialog.open(ModalteamsComponent, {
      width: "550px",
      height: "600px",
      data: "",
    });
    if (dialogRef.getState() === MatDialogState.OPEN) {
    }
    dialogRef.afterClosed().subscribe((res) => {
      //console.log(res);
      this.isLoginDialogOpen = false;

      // this.load();
    });
  }

  openDialogEdit(idTeam: number): void {
    debugger;
    //PRIMERO CONSULTAMOS LOS DATOS DEL TEAM A EDITAR MEDIANTE DETAIL DEL SERVICIO

    if (this.isLoginDialogOpen) {
      return;
    }

    this.service.detail(idTeam).subscribe((team: Team) => {
      if (this.isLoginDialogOpen) {
        return;
      }
      this.isLoginDialogOpen = true;
      const dialogRef = this.dialog.open(ModalteamsComponent, {
        width: "550px",
        height: "600px",
        data: team,
      });
      if (dialogRef.getState() === MatDialogState.OPEN) {
      }
      dialogRef.afterClosed().subscribe((res) => {
        //console.log(res);detailsTeam
        this.isLoginDialogOpen = false;
       // window.location.reload();
        //this.load();
      });
    });
  }

  openDialogDelete(idTeam: number): void {
    debugger;
    if (this.isLoginDialogOpen) {
      return;
    }
    //modal de que sea seguro que se elimine
    this.service.detail(idTeam).subscribe((team: Team) => {
      if (this.isLoginDialogOpen) {
        return;
      }
      this.isLoginDialogOpen = true;
      const dialogRef = this.dialog.open(ModalDeleteComponent, {
        width: "500px",
        height: "200px",
        data: team,
      });
      if (dialogRef.getState() === MatDialogState.OPEN) {
      }
      dialogRef.afterClosed().subscribe((res) => {
        //console.log(res);
        this.isLoginDialogOpen = false;
        window.location.reload();
        //this.load();
      });
    });
  }

  validationsPlayers(idTeam: number): void {
    this.servicePlayer.getItemsxModel(idTeam).subscribe((resp) => {
      if (resp.data.length > 0) {
        this.snakbar.open(
          "Este equipo se encuentra con jugadores ¡Favor de liberar!","",
          {
            duration: 4000,
          }
        );
      } else {
        this.openDialogDelete(idTeam);
      }
    });
  }

  numberplayers() {
    this.teamsLogin.forEach((element) => {
      this.servicePlayer.getItemsxModel(element.id).subscribe((teams) => {
        if (teams != null && teams.data.length != 0) {
          element.numberPlayers = teams.data.length;
          //console.log(teams.data.length)
        } else {
          element.numberPlayers = 0;
        }
      });
    });
  }

  validationsImage() {
    this.teams.forEach((element) => {
      if (element.t_emblem == "" || element.t_emblem == null) {
        element.t_emblem = "/assets/img/teamunknown.png";
      } else {
        element.t_emblem = `https://ligasabatinadefutbol.com.mx/media/bearleague/${element.t_emblem}`;
      }
      //element.photoName = prueba.ph_filename;
    });

    this.teamsLogin.forEach((element) => {
      if (element.t_emblem == "" || element.t_emblem == null) {
        element.t_emblem = "/assets/img/teamunknown.png";
      } else {
        element.t_emblem = `https://ligasabatinadefutbol.com.mx/media/bearleague/${element.t_emblem}`;
      }
      //element.photoName = prueba.ph_filename;
    });
  }

  findTeams(event:any) {
    //busqueda para todas las paginas
    var name = this.form.get('t_name').value;
    this.service.getItemsxName(name).subscribe((team) => {
      if (team.data.length == 0) {
        console.log(team)
        this.snakbar.open("No existen registros con ese nombre, ¡Escriba el nombre completo!", "", {
          duration: 3000,
        })
        return
      }
        this.teamsLogin.splice(0, this.teamsLogin.length);
        this.teamsLogin.push(...team.data);
        this.validationsImage()
        this.toggleShow();
      })
  }

  isShown: boolean = false;
  toggleShow() {
    var name = this.form.get('t_name').value
    if (name != "") {
      this.isShown = true;
    }
    else {
      this.isShown = false;
    }
  }

  deleteSearch() {
    //Cualquier cambio que suceda se vea reflejado
    this.form.valueChanges.subscribe(valores => {
      if (!valores) return;
      //this.players = this.playersOriginal;
      this.toggleShow();
      //console.log(valores);
    })
  }

  formControlName(){
    this.form.patchValue({
      t_name: '',
    });
    var name = this.form.get('t_name').value;
    if (name == "") {
      this.toggleShow();
    }
  }
}
