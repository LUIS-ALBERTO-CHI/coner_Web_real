import { Component, OnInit } from '@angular/core';
import { Team, Respuesta, Pagination, Season } from 'src/shared/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { SeasonService } from 'src/services/season.service';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatDialog, MatDialogState } from '@angular/material/dialog';
import { ModalteamsComponent } from 'src/app/plantillas/modalteams/modalteams.component'
import { ModalseasonComponent } from 'src/app/Plantillas/modalseason/modalseason.component';
import { DetailSeasonComponent } from '../detailSeason/detailSeason.component';
import { TeamService } from 'src/services/team.service';
import { ModalSpinnerComponent } from 'src/app/plantillas/modalSpinner/modalSpinner.component';

@Component({
  selector: 'app-index',
  templateUrl: './indexSeason.component.html',
  styleUrls: ['./indexSeason.component.scss']
})
export class IndexSeasonComponent implements OnInit {

  form: FormGroup;
  pagina: FormGroup;
  seasons: Season[];
  season: Season;
  detailsSeason: Season[];
  error: boolean;
  events: Event[];
  seasonsOriginal: Season[];
  CantidadElemento: number;
  pagination: Pagination;
  isLoginDialogOpen: boolean = false;
  //routerLinkCreate : string;

  constructor(
    private router: Router,
    private service: SeasonService,
    public http: HttpClient,
    public dialog: MatDialog,
    public snakbar: MatSnackBar,
    public serviceTeam: TeamService,
    public route: ActivatedRoute,
    ) {
    this.error = false;
    this.seasons = [];
    this.events = [];
    this.pagination;
    this.CantidadElemento = 25;
    this.detailsSeason = [];
   // this.routerLinkCreate = '/createSeason'
    this.form = new FormGroup({
      s_name: new FormControl('')
    });
  }

  ngOnInit() {
    this.load();

  }

  //Hacer de nuevo la misma petición pero pasar
  //Pintar el Next_page_pagination(URL) en mi boton y con el onclik lanzar la peticion src , href cuando yo le de click al bton me debe realizar
  //la peticion y literal esa URL que pinte la tengo que regresar al evento y mandarla de nuevo
  load(){
    const dialogRef = this.dialog.open(ModalSpinnerComponent,
      {
        width: '150px',
        height: '150px',
        //hasBackdrop:false
      })
    this.error = true;
    this.service.list().subscribe(season => {
      this.seasons = season.data;
      this.pagination = season.pagination;
      // console.log(this.teams);
      //console.log(this.pagination);
      this.seasonsOriginal = season.data;
      //console.log(this.teamsOriginal);
      this.detailSeason(dialogRef);
      this.pagina = new FormGroup({
        link: new FormControl(this.pagination.next_page_url),
        linkprev: new FormControl(this.pagination.prev_page_url)
      })

    });
    //Cualquier cambio que suceda se vea reflejado
    this.form.valueChanges.subscribe(valores => {
      if (!valores) return;
      this.seasons = this.seasonsOriginal;
      //this.searchSeason(valores);
      //console.log(valores);
    })

    this.formControlName();
  }



  // openDialog(): void {
  //   debugger

  //   if (this.isLoginDialogOpen) {
  //     return;
  //   }

  //   this.isLoginDialogOpen = true;
  //   const dialogRef = this.dialog.open(ModalteamsComponent,
  //     {
  //       width: '550px',
  //       height: '600px',
  //       data: '',
  //     });
  //   if(dialogRef.getState() === MatDialogState.OPEN ){


  //   }
  //   dialogRef.afterClosed().subscribe(res => {
  //     //console.log(res);
  //     this.isLoginDialogOpen = false;
  //     this.load();
  //   });
  // }

  //https://api.ligasabatinadefutbol.com.mx/api/seasons
  openDialogEdit(idSeason: number): void {
    debugger

    this.service.detail(idSeason).subscribe((seanson: Season) => {

      if (this.isLoginDialogOpen) {
        return;
      }

      this.isLoginDialogOpen = true;
      const dialogRef = this.dialog.open(ModalseasonComponent,
        {
          width: '600px',
          height: '580px',
          data: seanson,
        });
      if(dialogRef.getState() === MatDialogState.OPEN ){
      }
      dialogRef.afterClosed().subscribe(res => {
        //console.log(res);
        this.isLoginDialogOpen = false;
        this.load();
      });

    });
  }


  obtenerLink() {
    this.pagina.get('link').value;
    this.next(this.pagina.get('link').value)
  }

  obtenerLinkPrev() {
    this.pagina.get('linkprev').value;
    this.previous(this.pagina.get('linkprev').value)
  }


  getLink() {
    this.pagina.get('link').value;
    this.next(this.pagina.get('link').value)
  }

  getLinkPrev() {
    this.pagina.get('linkprev').value;
    this.previous(this.pagina.get('linkprev').value)
  }


  next(LinkPagination: string) {
    const dialogRef = this.dialog.open(ModalSpinnerComponent,
      {
        width: '150px',
        height: '150px',
        //hasBackdrop:false
      })
    if(LinkPagination == null){
      this.snakbar.open('¡Está es la última página!', '', {
        duration: 5000
      });
    }else{
      this.error = true;
    this.service.getPagination(LinkPagination).subscribe(seasons => {
      this.seasons = seasons.data;
      this.pagination = seasons.pagination;
      this.seasonsOriginal = seasons.data;
      this.detailSeason(dialogRef);
      //console.log(this.pagination);
      this.pagina = new FormGroup({
        link: new FormControl(this.pagination.next_page_url),
        linkprev: new FormControl(this.pagination.prev_page_url)
      })
    });
    }
    this.form.valueChanges.subscribe(valores => {
      if (!valores) return;
      this.seasons = this.seasonsOriginal;
      //this.searchSeason(valores);
      // console.log(valores);
    })
  }

  previous(LinkPagination: string) {
    const dialogRef = this.dialog.open(ModalSpinnerComponent,
      {
        width: '150px',
        height: '150px',
        //hasBackdrop:false
      })
    if(LinkPagination == null){
      this.snakbar.open('¡Está es la primera página!', '', {
        duration: 5000
      });
    }else{
      this.error = true;
      this.service.getPaginationPrevious(LinkPagination).subscribe(seasons => {
        this.seasons = seasons.data;
        this.pagination = seasons.pagination;
        this.seasonsOriginal = seasons.data;
        this.detailSeason(dialogRef);
        //console.log(this.seasons);
        this.pagina = new FormGroup({
          link: new FormControl(this.pagination.next_page_url),
          linkprev: new FormControl(this.pagination.prev_page_url)
        })
      });
    }
    this.form.valueChanges.subscribe(valores => {
      if (!valores) return;
      this.seasons = this.seasonsOriginal;
      //this.searchSeason(valores);
      // console.log(valores);
    })
  }

  findSeason() {
    //busqueda para todas las paginas

    const dialogRef = this.dialog.open(ModalSpinnerComponent,
      {
        width: '150px',
        height: '150px',
        //hasBackdrop:false
      })
    const name = this.form.get('s_name').value;
    this.service.getItemsxName(name).subscribe(season => {


      //console.log(season)
      if (season.data.length == 0) {
        this.snakbar.open("No existen registros con ese nombre, ¡Escriba el nombre completo!", "", {
          duration: 5000,
        })
        return
      }

      this.seasons = season.data;
      this.detailSeason(dialogRef);
     // this.seasons.splice(0, this.seasons.length);
     // this.seasons.push(...season.data);
        //this.validationsImageandPosition();
        this.toggleShow();
    })

  }

  isShown: boolean = false; // hidden by default

  toggleShow() {
    const name = this.form.get('s_name').value
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
      s_name: '',
    });
    const name = this.form.get('s_name').value;
    if (name == "") {
      this.toggleShow();
    }
  }

  detailSeason(dialog:any) {
    this.seasons.forEach(element => {
      // this.detailSeason(element.s_id);
      this.service.detail(element.s_id).subscribe((resp: Season) => {
        if(resp.teams && resp.teams.length != 0){
          for (const team of resp.teams) {
            if (team.t_emblem == "" || team.t_emblem == null) {
              team.t_emblem = "/assets/img/teamunknown.png";
            } else {
              team.t_emblem = `https://ligasabatinadefutbol.com.mx/media/bearleague/${team.t_emblem}`;
            }
          }
      }
        element.teams = resp.teams
      })
    });
    dialog.close();
  }


  // searchSeason(valores: any) {
  //   if (valores.s_name) {
  //     this.seasons = this.seasons.filter(t => t.s_name.toLowerCase().includes(valores.s_name.toLowerCase()) );
  //   }
  // }

}
