import { Component, OnInit, Inject, Renderer2 } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SeasonService } from "src/services/season.service";
import { Pagination, Season, SeasonxTeam, Team } from "src/shared/interfaces";
import { MatSnackBar, MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { TeamService } from "src/services/team.service";
import { ModalteamsComponent } from "src/app/plantillas/modalteams/modalteams.component";
import { MatDialog, MatDialogState } from "@angular/material/dialog";

@Component({
  selector: "app-details",
  templateUrl: "./detailSeason.component.html",
  styleUrls: ["./detailSeason.component.scss"],
})
export class DetailSeasonComponent implements OnInit {
  formpost: FormGroup;
  pagination: Pagination;
  pagina: FormGroup;
  form: FormGroup;
  base64: string = "";
  status: string;
  season: Season;
  isLoginDialogOpen: boolean = false;
  //seasonTeam: Team[]; no lo trae
  //seasons: Season[];
  constructor(
  public route: ActivatedRoute,
  public service: SeasonService,
  public serviceTeam: TeamService,
  public snakbar: MatSnackBar,
  public dialog: MatDialog,
  )
  {
    this.restore();
    // this.season = data;
    this.formpost = new FormGroup({
      s_name: new FormControl(this.season.s_name),
      s_descr: new FormControl(this.season.s_descr), //PENDIENTE VALIDAR EL TELEFONO
      s_rounds: new FormControl(this.season.s_rounds),
      s_id: new FormControl(this.season.s_id), //PENDIENTE VALIDAR EL CORREO
      published: new FormControl(this.season.published),
      //s_win_point: new FormControl(this.season.s_win_point),
      s_win_point: new FormControl(Number(this.season.s_win_point)), //21_09_Covert to number
      s_lost_point: new FormControl(Number(this.season.s_lost_point)),
      s_enbl_extra: new FormControl(this.season.s_enbl_extra),
      s_extra_win: new FormControl(this.season.s_extra_win),
      s_extra_lost: new FormControl(this.season.s_extra_lost),
      s_draw_point: new FormControl(Number(this.season.s_draw_point)),
      s_groups: new FormControl(this.season.s_groups),
      s_win_away: new FormControl(Number(this.season.s_win_away)),
      s_draw_away: new FormControl(Number(this.season.s_draw_away)),
      s_lost_away: new FormControl(Number(this.season.s_lost_away)),
    });
  }

  ngOnInit(): void {
    this.load();
  }

  // get f() {
  //   return this.formpost.controls;
  // }



  load(){
    let season = parseInt(this.route.snapshot.paramMap.get("id"));
    //console.log(season);
    this.service.detail(season).subscribe((resp:Season)=>{
      this.season = resp;
      this.validationsImage();
      this.numberplayers();
      if(this.season){
        this.formpost.patchValue({
          id: resp.s_id,
          s_name: resp.s_name
        })
      }
    })
    const temporal = localStorage.getItem("season");
    // //this.season = temporal ? JSON.parse(temporal) : "";
    if (temporal === null) {
      localStorage.setItem("season", JSON.stringify(this.season));
    }
  }

  numberplayers() {
    this.season.teams.forEach((element) => {
      this.serviceTeam.detail(element.id).subscribe((teams:Team) => {
        if (teams.players.length != 0) {
          element.numberPlayers = teams.players.length;
          //console.log(teams.data.length)
        } else {
          element.numberPlayers = 0;
        }
      });
    });
  }

  validationsImage() {
    this.season.teams.forEach((element) => {
      if (element.t_emblem == "" || element.t_emblem == null) {
        element.t_emblem = "/assets/img/teamunknown.png";
      } else {
        element.t_emblem = `https://ligasabatinadefutbol.com.mx/media/bearleague/${element.t_emblem}`;
      }
      //element.photoName = prueba.ph_filename;
    });
  }

  // openDialogEdit(idTeam: number): void {
  //   debugger;
  //   //PRIMERO CONSULTAMOS LOS DATOS DEL TEAM A EDITAR MEDIANTE DETAIL DEL SERVICIO
  //   if (this.isLoginDialogOpen) {
  //     return;
  //   }

  //   this.serviceTeam.detail(idTeam).subscribe((team: Team) => {
  //     if (this.isLoginDialogOpen) {
  //       return;
  //     }
  //     this.isLoginDialogOpen = true;
  //     const dialogRef = this.dialog.open(ModalteamsComponent, {
  //       width: "550px",
  //       height: "600px",
  //       data: team
  //     });
  //     if (dialogRef.getState() === MatDialogState.OPEN) {
  //     }
  //     dialogRef.afterClosed().subscribe((res) => {
  //       //console.log(res);detailsTeam
  //       this.isLoginDialogOpen = false;
  //       window.location.reload();
  //       //this.load();
  //     });
  //   });
  // }

  // AddSeason(form: Season) {

  //   this.service.register(form).subscribe((resp: Season) => {
  //     if (resp.t_id != null) {
  //       // this.dialogRef.close();
  //       this.snakbar.open("configuraciones guardadas con exito", "", {
  //         duration: 2000,
  //       });
  //     }
  //   });
  // }

  // obtenerLink() {
  //   this.pagina.get("link").value;
  //   this.next(this.pagina.get("link").value);
  // }

  // obtenerLinkPrev() {
  //   this.pagina.get("linkprev").value;
  //   this.previous(this.pagina.get("linkprev").value);
  // }

  // next(LinkPagination: string) {
  //   if (LinkPagination == null) {
  //     this.snakbar.open("¡Está es la última página!", "", {
  //       duration: 2000,
  //     });
  //   } else {
  //     this.service.getPagination(LinkPagination).subscribe((season) => {
  //       this.seasons = season.data;
  //       this.pagination = season.pagination;

  //       this.pagina = new FormGroup({
  //         link: new FormControl(this.pagination.next_page_url),
  //         linkprev: new FormControl(this.pagination.prev_page_url),
  //       });
  //     });

  //     this.form.patchValue({
  //       t_name: "",
  //     });
  //     var name = this.form.get("t_name").value;
  //     if (name == "") {
  //       this.toggleShow();
  //     }
  //   }
  // }

  // previous(LinkPagination: string) {
  //   if (LinkPagination == null) {
  //     this.snakbar.open("¡Está es la primera página!", "", {
  //       duration: 2000,
  //     });
  //   } else {
  //     this.service
  //       .getPaginationPrevious(LinkPagination)
  //       .subscribe((season) => {
  //         this.seasons = season.data;
  //         this.pagination = season.pagination;

  //         this.pagina = new FormGroup({
  //           link: new FormControl(this.pagination.next_page_url),
  //           linkprev: new FormControl(this.pagination.prev_page_url),
  //         });
  //       });

  //     this.form.patchValue({
  //       t_name: "",
  //     });
  //     var name = this.form.get("t_name").value;
  //     if (name == "") {
  //       this.toggleShow();
  //     }
  //   }
  // }

  // addStorageSeason(form: Season) {
  //   localStorage.setItem("season", JSON.stringify(form));

  //   if (localStorage != null) {
  //     // this.dialogRef.close();
  //     this.snakbar.open("Configuraciones guardadas", "", {
  //       duration: 2000,
  //     });
  //   }
  // }

  restore() {
    this.season = {
      s_id: 0,
      s_name: "",
      s_descr: "",
      s_rounds: 0,
      t_id: 0,
      published: "",
      s_win_point: "",
      s_lost_point: "",
      s_enbl_extra: 0,
      s_extra_win: "",
      s_extra_lost: "",
      s_draw_point: "",
      s_groups: 0,
      s_win_away: "",
      s_draw_away: "",
      s_lost_away: "",
      teams: [],
      isSelected: false,
      teams2: [],
    };
  }

  // active = 0;

  // onTabChange(e) {
  //   console.log(e);
  // }

  // isShown: boolean = false; // hidden by default

  // toggleShow() {
  //   this.isShown = !this.isShown;
  // }
}
