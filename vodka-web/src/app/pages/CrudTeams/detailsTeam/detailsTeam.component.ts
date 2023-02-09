import { Component, OnInit } from "@angular/core";
import {
  Team,
  Respuesta,
  Pagination,
  Moder,
  Player,
  PlayerxTeam,
  Position,
   RespLogin,
} from "src/shared/interfaces";
import { Router, ActivatedRoute } from "@angular/router";
import { TeamService } from "src/services/team.service";
import { PositionService } from "src/services/position.service";
import { PlayerService } from "src/services/player.service";
import { PlayerxTeamService } from "src/services/playerxteam.service";
import { FormGroup, FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { MatDialog, MatDialogState } from "@angular/material/dialog";
import { ModalteamsComponent } from "src/app/plantillas/modalteams/modalteams.component";
import { MatSnackBar, MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";
import { ModalDeleteComponent } from "src/app/plantillas/modalDelete/modalDelete.component";
import { ModalReleasePlayerComponent } from "src/app/plantillas/modalReleasePlayer/modalReleasePlayer.component";
import { ModalImagePlayerComponent } from "src/app/plantillas/modalimageplayer/modalImgPlayer.component";
import { ModalPlayerComponent } from "src/app/plantillas/modalPlayer/modalPlayer.component";
import { element } from "protractor";
import { stringify } from "querystring";
import { ModalEditPlayerComponent } from "src/app/plantillas/modalEditPlayer/modalEditPlayer.component";
import { ModalDetailsPlayerComponent } from "src/app/plantillas/modalDetailsPlayer/modalDetailsPlayer.component";

@Component({
  selector: "app-detailsTeam",
  templateUrl: "./detailsTeam.component.html",
  styleUrls: ["./detailsTeam.component.scss"],
})
export class DetailsTeamComponent implements OnInit {
  pagination: Pagination;
  postions: Position[];
  form: FormGroup;
  formpost: FormGroup;
  pagina: FormGroup;
  teams: Team[];
  teamsLogin: Team[];
  moderLogin: Moder[];
  team: Team;
  error: boolean;
  events: Event[];
  teamsOriginal: Team[];
  isLoginDialogOpen: boolean = false;
  prueba2: Team;
  routerlink: string;
  playersTeam: Player[];
  player: Player;
  routeCedula: string;
  routeCedula2: string;
  routeNewPlayer: string;
  backpage:string;
  id: number;
  public respLogin: RespLogin;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public teamService: TeamService,
    public playerService: PlayerxTeamService,
    public snakbar: MatSnackBar,
    public servicePlayer: PlayerService,
    public http: HttpClient,
    private route: ActivatedRoute,
    public servicePosition: PositionService
  ) {
    this.restore();
    this.routeNewPlayer = "";
    this.routeCedula = "";
    this.pagination;
    this.routeCedula2 = "";
    this.routerlink = "";
    this.error = false;
    this.teams = [];
    this.teamsLogin = [];
    this.moderLogin = [];
    this.team;
    this.events = [];
    this.prueba2;
    this.id = 0;
    this.postions = [];
    this.player;
    this.form = new FormGroup({
      t_name: new FormControl(""),
    });

    this.formpost = new FormGroup({
      id: new FormControl(this.team.id),
      t_name: new FormControl(this.team.t_name),
      Phone: new FormControl(""), //PENDIENTE VALIDAR EL TELEFONO
      Manager: new FormControl(""),
      Email: new FormControl(""), //PENDIENTE VALIDAR EL CORREO
      t_city: new FormControl(this.team.t_city),
      t_descr: new FormControl(this.team.t_descr),
      t_emblem: new FormControl(this.team.t_emblem),
      //file: new FormControl('', [Validators.required]),
      //fileSource: new FormControl('', [Validators.required]),
      t_yteam: new FormControl("0"),
      players: new FormControl(this.team.players),
      def_img: new FormControl(this.team.def_img),
    });
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    //sessionStorage.getItem(name, content)
    //borrar
    debugger;
    var idTeam = parseInt(this.route.snapshot.paramMap.get("id"));
    this.respLogin = JSON.parse(sessionStorage.getItem("dataLoginALl"));
    this.menuPermissions(this.respLogin.role);
    this.servicePlayer.getItemsxModel(idTeam).subscribe((players) => {
      //console.log(players);
      this.pagination = players.pagination;
      this.playersTeam = players.data;
      if (this.playersTeam.length == 0) {
        this.teamService.detail(idTeam).subscribe((team: Team) => {
          this.formpost.patchValue({
            id: team.id,
            t_name: team.t_name,
            Manager: "N/A",
          });
          this.routeNewPlayer = "/createPlayer/" + team.id;
        });
      }

      // this.teamsOriginal = teams.data;
      //console.log(this.teamsOriginal);

      this.pagina = new FormGroup({
        link: new FormControl(this.pagination.next_page_url),
        linkprev: new FormControl(this.pagination.prev_page_url),
      });
      this.validationsImageandPosition();
    });

    this.form.patchValue({
      t_name: "",
    });
    var name = this.form.get("t_name").value;
    if (name == "") {
      this.toggleShow();
    }
  }


  isShown2: boolean = false;

  menuPermissions(role:string) {
    if (this.respLogin.role == "captain") {
      this.isShown2 = true;
      //this.isShown = false;
    } else if (this.respLogin.role == "admin") {
      this.isShown2 = false;
    }
  }

  findPlayers() {
    //busqueda para todas las paginas
    var name = this.form.get("t_name").value;

    var idTeam = parseInt(this.route.snapshot.paramMap.get("id"));

    this.servicePlayer.getItemsxName(name, idTeam).subscribe((player) => {
      //console.log(player.data);
      if (player.data.length == 0) {
        this.snakbar.open("No existen registros con ese nombre, ¡Escriba el nombre completo!", "", {
          duration: 5000,
        })
        return
      }
      this.player = player.data[0];

      //element.photoName = `https://ligasabatinadefutbol.com.mx/media/bearleague/${prueba.ph_filename}`;
      this.player.photoName = `https://ligasabatinadefutbol.com.mx/media/bearleague/${this.player.photos[0].ph_filename}`;
      this.player.positionName = this.player.position.p_name;
      //console.log(this.player);
        this.playersTeam.splice(0, this.playersTeam.length);
        this.playersTeam.push(...player.data);
        this.validationsImageandPosition();
        this.toggleShow();
    });
  }

  isShown: boolean = false; // hidden by default

  toggleShow() {
    var name = this.form.get("t_name").value;
    if (name != "") {
      this.isShown = true;
    } else {
      this.isShown = false;
    }
  }

  deleteSearch() {
    //Cualquier cambio que suceda se vea reflejado
    this.form.valueChanges.subscribe((valores) => {
      if (!valores) return;
      //this.players = this.playersOriginal;
      this.toggleShow();
      //console.log(valores);
    });
  }

  openDialogCreate(): void {
    debugger;

    var idTeam = parseInt(this.route.snapshot.paramMap.get("id"));
    this.servicePosition.list().subscribe((resp) => {
      this.postions = resp.data;
    });

    if (this.isLoginDialogOpen) {
      return;
    }

    this.isLoginDialogOpen = true;
    const dialogRef = this.dialog.open(ModalPlayerComponent, {
      width: "1100px",
      height: "450px",
      data: {
        id: idTeam,
        positions: this.postions,
      },
    });
    if (dialogRef.getState() === MatDialogState.OPEN) {
    }
    dialogRef.afterClosed().subscribe((res) => {
      console.log(res);
      this.isLoginDialogOpen = false;
      this.load();
    });
  }

  openDialogRelease(): void {
    debugger;

    this.id = this.formpost.controls["id"].value;

    this.playerService
      .getItemsxModelLimit(this.id)
      .subscribe((playersxTeam) => {
        //this.team = team; //para que venga inactive
        this.playersTeam = playersxTeam.data.filter(
          (p) => p.status.toLowerCase() !== "inactive"
        );
        //console.log(this.team.players)
        if (this.isLoginDialogOpen) {
          return;
        }

        this.isLoginDialogOpen = true;
        const dialogRef = this.dialog.open(ModalReleasePlayerComponent, {
          width: "998px",
          height: "600px",
          data: this.playersTeam,
        });
        if (dialogRef.getState() === MatDialogState.OPEN) {
        }
        dialogRef.afterClosed().subscribe((res) => {
          console.log(res);
          this.isLoginDialogOpen = false;
          this.load();
        });
      });
  }

  openDialogPhoto(idPlayer: number): void {
    debugger;
    //PRIMERO CONSULTAMOS LOS DATOS DEL TEAM A EDITAR MEDIANTE DETAIL DEL SERVICIO
    this.servicePlayer.detail(idPlayer).subscribe((player: Player) => {
      if (this.isLoginDialogOpen) {
        return;
      }

      this.isLoginDialogOpen = true;
      const dialogRef = this.dialog.open(ModalImagePlayerComponent, {
        width: "550px",
        height: "570px",
        data: player,
      });
      if (dialogRef.getState() === MatDialogState.OPEN) {
      }
      dialogRef.afterClosed().subscribe((res) => {
        // console.log(res);
        this.isLoginDialogOpen = false;
        this.load();
      });
    });
  }

  openDialogUpdate(idPlayer: number): void {
    debugger;
    //console.log(idPlayer);
    this.servicePlayer.detail(idPlayer).subscribe((player: Player) => {
      if (this.isLoginDialogOpen) {
        return;
      }
      this.isLoginDialogOpen = true;
      const dialogRef = this.dialog.open(ModalEditPlayerComponent, {
        width: "550px",
        height: "390px",
        data: player,
      });
      if (dialogRef.getState() === MatDialogState.OPEN) {
      }
      dialogRef.afterClosed().subscribe((res) => {
        //console.log(res);
        this.isLoginDialogOpen = false;
        this.load();
      });
    });
  }

  openDialogDetails(idPlayer: number): void {
    debugger;
    if (this.isLoginDialogOpen) {
      return;
    }
    this.servicePlayer.detail(idPlayer).subscribe((player: Player) => {
      if (this.isLoginDialogOpen) {
        return;
      }
      this.isLoginDialogOpen = true;
      const dialogRef = this.dialog.open(ModalDetailsPlayerComponent, {
        width: "550px",
        height: "550px",
        data: player,
      });
      if (dialogRef.getState() === MatDialogState.OPEN) {
      }
      dialogRef.afterClosed().subscribe((res) => {
        //console.log(res);
        this.isLoginDialogOpen = false;
        //window.location.reload();
      });
    });
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
    if (LinkPagination == null) {
      this.snakbar.open("¡Está es la última página!", "", {
        duration: 5000,
      });
    } else {
      this.servicePlayer.getPagination(LinkPagination).subscribe((players) => {
        this.playersTeam = players.data;
        this.pagination = players.pagination;

        this.pagina = new FormGroup({
          link: new FormControl(this.pagination.next_page_url),
          linkprev: new FormControl(this.pagination.prev_page_url),
        });
        this.validationsImageandPosition()
      });

      this.form.patchValue({
        t_name: "",
      });
      var name = this.form.get("t_name").value;
      if (name == "") {
        this.toggleShow();
      }
    }
  }

  previous(LinkPagination: string) {
    if (LinkPagination == null) {
      this.snakbar.open("¡Está es la primera página!", "", {
        duration: 5000,
      });
    } else {
      this.playerService
        .getPaginationPrevious(LinkPagination)
        .subscribe((players) => {
          this.playersTeam = players.data;
          this.pagination = players.pagination;

          this.pagina = new FormGroup({
            link: new FormControl(this.pagination.next_page_url),
            linkprev: new FormControl(this.pagination.prev_page_url),
          });
          this.validationsImageandPosition()
        });

      this.form.patchValue({
        t_name: "",
      });
      var name = this.form.get("t_name").value;
      if (name == "") {
        this.toggleShow();
      }
    }
  }

  validationsImageandPosition(){
    this.playersTeam.forEach((element) => {
      if (this.team.id == 0) {
        this.team = element.team;
        //console.log(this.team);

        this.routeCedula = "/reporteCedula/" + this.team.id;
        this.routeCedula2 = "/cedula/" + this.team.id;
        this.routeNewPlayer = "/createPlayer/" + this.team.id;
        //this.backpage = "detailsTeam" + this.team.id;


        this.formpost.patchValue({
          id: this.team.id,
          t_name: this.team.t_name,
          Manager: "N/A",
        });
      }

      if (element.position != null) {
        element.positionName = element.position.p_name;
      } else {
        element.positionName = "Sin posición";
      }

      if (element.photos.length > 0) {
        var prueba = element.photos[0];
        if (!prueba) {
          element.photoName = "assets/img/noimage.png";
        } else {
          element.photoName = `https://ligasabatinadefutbol.com.mx/media/bearleague/${prueba.ph_filename}`;
        }
      } else {
        element.photoName = "assets/img/noimage.png";
      }
    });
  }

  restore() {
    this.team = {
      id: 0,
      t_name: "",
      t_descr: "",
      t_yteam: "0",
      def_img: 0,
      t_emblem: "",
      t_city: "",
      players: [],
      isSelected: false,
      numberPlayers: 0,
      idUrl: "",
      route: "",
      selected: false,
    };
  }
}
