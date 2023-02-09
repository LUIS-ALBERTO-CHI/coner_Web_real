import { Component, OnInit } from '@angular/core';
import { MatchDay, Respuesta, Pagination } from 'src/shared/interfaces';
import { Router } from '@angular/router';
import {MatchDayService  } from 'src/services/matchday.service';
import{MatchService} from 'src/services/match.service';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { MatDialog, MatDialogState } from '@angular/material/dialog';
import { ModalteamsComponent } from 'src/app/plantillas/modalteams/modalteams.component';
import{ModalAddMatchesComponent} from 'src/app/plantillas/modalAddMatchs/modalAddMatches.component'
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalEditMatchComponent } from 'src/app/plantillas/modalEditMatch/modalEditMatch.component';
import { ModalDeleteComponent } from 'src/app/plantillas/modalDelete/modalDelete.component';
import { ModalDeleteMatchComponent } from 'src/app/plantillas/modalDeleteMatch/modalDeleteMatch.component';
@Component({
  selector: 'app-indexMatchDay',
  templateUrl: './indexMatchDay.component.html',
  styleUrls: ['./indexMatchDay.component.scss']
})
export class IndexMatchDayComponent implements OnInit {

  form: FormGroup;
  pagina: FormGroup;
  error: boolean;
  matchDays: MatchDay[];
  matchDaysOriginal: MatchDay[];
  CantidadElemento: number;
  pagination: Pagination;
  isLoginDialogOpen: boolean = false;

  constructor(private router: Router, private service: MatchDayService,public matchService: MatchService, public http: HttpClient, public dialog: MatDialog,
    public snakbar: MatSnackBar
    ) {
    this.error = false;

    this.matchDays = [];
    this.pagination;
    this.CantidadElemento = 25;

    this.form = new FormGroup({
      m_name: new FormControl('')
    });

  }



  ngOnInit() {

    this.load()

  }


  //Hacer de nuevo la misma petición pero pasar
  //Pintar el Next_page_pagination(URL) en mi boton y con el onclik lanzar la peticion src , href cuando yo le de click al bton me debe realizar
  //la peticion y literal esa URL que pinte la tengo que regresar al evento y mandarla de nuevo


  load() {
    debugger
    this.error = true;
    this.formControlName();
    this.service.list().subscribe(matchDays => {
      this.matchDays = matchDays.data;
       //this.seasons = mresp.data;
      this.pagination = matchDays.pagination;

      this.matchDaysOriginal = matchDays.data;

      this.pagina = new FormGroup({
        link: new FormControl(this.pagination.next_page_url),
        linkprev: new FormControl(this.pagination.prev_page_url)
      })

      /*


      this.seasons.forEach(element => {

        element.teams.forEach(element2 => {

       element.logo = element2.t_emblem;
       element.name = element2.Name;



          });



      });
        element.TeamName = elemente.team.


      });

      */

      this.vs();



    });

    //Cualquier cambio que suceda se vea reflejado
    // this.form.valueChanges.subscribe(valores => {
    //   if (!valores) return;
    //   this.matchDays = this.matchDaysOriginal;
    //   //this.findMatchDaySearch(valores);
    //   //console.log(valores);
    // })
  }

  vs(){
    this.matchDays.forEach(element => {

      this.matchService.getItemsxModel(element.id).subscribe(res => {

        element.matches = res.data;

        element.matches.forEach(element1 => {
          if (element1.team1.t_emblem == "" || element1.team1.t_emblem == null) {
            element1.team1.t_emblem = "/assets/img/teamunknown.png";
          } else {
            element1.team1.t_emblem = `https://ligasabatinadefutbol.com.mx/media/bearleague/${element1.team1.t_emblem}`;
          }

          if (element1.team2.t_emblem == "" || element1.team2.t_emblem == null) {
            element1.team2.t_emblem = "/assets/img/teamunknown.png";
          } else {
            element1.team2.t_emblem = `https://ligasabatinadefutbol.com.mx/media/bearleague/${element1.team2.t_emblem}`;
          }

          element1.logoTeam1 = element1.team1.t_emblem;
          element1.logoTeam2 = element1.team2.t_emblem;


        });

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


  next(LinkPagination: string) {
    if (LinkPagination == null) {
      this.snakbar.open('¡Está es la última página!', '', {
        duration: 5000
      });
    }else{
      this.error = true;
    this.service.getPagination(LinkPagination).subscribe(matchDays => {
      this.matchDays = matchDays.data;
      this.matchDaysOriginal = matchDays.data;
      this.pagination = matchDays.pagination;
      this.vs();
      //console.log(this.pagination);

      this.pagina = new FormGroup({
        link: new FormControl(this.pagination.next_page_url),
        linkprev: new FormControl(this.pagination.prev_page_url)
      })
    });
    }
    // this.form.valueChanges.subscribe(valores => {
    //   if (!valores) return;
    //   this.matchDays = this.matchDaysOriginal;
    //   //this.findMatchDaySearch(valores);
    //   //console.log(valores);
    // })
  }



  previous(LinkPagination: string) {
    if (LinkPagination == null) {
      this.snakbar.open('¡Está es la primera página!', '', {
        duration: 5000
      });
    }else{
      this.error = true;
    this.service.getPaginationPrevious(LinkPagination).subscribe(matchDays => {
      this.matchDays = matchDays.data;
      this.pagination = matchDays.pagination;
      this.matchDaysOriginal = matchDays.data;
      this.vs();
      //console.log(this.matchDays);

      this.pagina = new FormGroup({
        link: new FormControl(this.pagination.next_page_url),
        linkprev: new FormControl(this.pagination.prev_page_url)
      })
    });
    }
    // this.form.valueChanges.subscribe(valores => {
    //   if (!valores) return;
    //   this.matchDays = this.matchDaysOriginal;
    //   //this.findMatchDaySearch(valores);
    //   //console.log(valores);
    // })
  }


  // findMatchDaySearch(valores: any) {
  //   //console.log(valores)
  //   if (valores.m_name) {
  //     this.matchDays = this.matchDays.filter(t => t.m_name.toLowerCase().includes(valores.m_name.toLowerCase()));
  //   }
  // }

  openDialogMatch(idMatchDay: number){

    this.service.detail(idMatchDay).subscribe((matchDay: MatchDay) => {

      if (this.isLoginDialogOpen) {
        return;
      }

      this.isLoginDialogOpen = true;

      const dialogRef = this.dialog.open(ModalAddMatchesComponent,
        {
          //disableClose: true,
          width: '1350px',
          height: '700px',
          data: matchDay,
        },
        );
      if(dialogRef.getState() === MatDialogState.OPEN ){
      }
      dialogRef.afterClosed().subscribe(res => {
        //console.log(res);
        this.isLoginDialogOpen = false;
        this.load();
      });

    });

  }

  openDialogUpdate(idMatchDay: number): void{
    debugger
    if(this.isLoginDialogOpen){
      return;
    }
    this.service.detail(idMatchDay).subscribe((matchDay: MatchDay) => {
      if(this.isLoginDialogOpen){
        return;
      }
      this.isLoginDialogOpen = true;
      const dialogRef = this.dialog.open(ModalEditMatchComponent,
        {
          width: '550px',
          height: '292px',
          data: matchDay,
          panelClass: 'snackBarInfo'
        }
      );
      if(dialogRef.getState() === MatDialogState.OPEN){
      }
      dialogRef.afterClosed().subscribe(res => {
        // console.log(res);
        this.isLoginDialogOpen = false;
        this.load();
      })
    })

  }

  openDialogDelete(idMatchDay: number){
    debugger
    if (this.isLoginDialogOpen) {
      return;
    }
    this.service.detail(idMatchDay).subscribe((matchDay: MatchDay) => {
      if (this.isLoginDialogOpen) {
        return;
      }
      this.isLoginDialogOpen = true;
      const dialogRef = this.dialog.open(ModalDeleteMatchComponent,
        {
          width: '500px',
          height: '200px',
          data: matchDay,
          // panelClass: 'snackBarInfo'
        });
      if (dialogRef.getState() === MatDialogState.OPEN) {
      }
      dialogRef.afterClosed().subscribe(res => {
        //console.log(res);
        this.isLoginDialogOpen = false;
        //window.location.reload();
        //this.load();
      });
    })

  }

  findMatchDay() {
    //busqueda para todas las paginas
    var name = this.form.get('m_name').value;
    this.service.getItemsxName(name).subscribe((matchDay) => {
      if (matchDay.data.length == 0) {
        this.snakbar.open("No existen registros con ese nombre, ¡Escriba el nombre completo!", "", {
          duration: 3000,
        })
        return
      }
        this.matchDays.splice(0, this.matchDays.length);
        this.matchDays.push(...matchDay.data);
        //this.validationsImageandPosition();
        this.toggleShow();
        this.vs();
      })
  }

  isShown: boolean = false; // hidden by default

  toggleShow() {
    var name = this.form.get('m_name').value
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
      m_name: '',
    });
    const name = this.form.get('m_name').value;
    if (name == "") {
      this.toggleShow();
    }
  }


  // openDialogCreate(): void {
  //   debugger

  //   if (this.isLoginDialogOpen) {
  //     return;
  //   }

  //   this.isLoginDialogOpen = true;
  //   const dialogRef = this.dialog.open(ModalPlayerComponent,
  //     {
  //       width: '1000px',
  //       height: '600px',
  //       data: '',
  //     });
  //   if(dialogRef.getState() === MatDialogState.OPEN ){


  //   }
  //   dialogRef.afterClosed().subscribe(res => {
  //     console.log(res);
  //     this.isLoginDialogOpen = false;
  //     this.load();
  //   });
  // }

// openDialogRelease(): void {
//     debugger

//     this.servicePlayer.get(this.CantidadElemento).subscribe(players => {
//       this.playersData = players.data;

//       console.log(this.players)

//       if (this.isLoginDialogOpen) {
//         return;
//       }

//       this.isLoginDialogOpen = true;
//       const dialogRef = this.dialog.open(ModalReleasePlayerComponent,
//         {
//           width: '1000px',
//           height: '600px',
//           data: this.playersData,
//         });
//       if(dialogRef.getState() === MatDialogState.OPEN ){


//       }
//       dialogRef.afterClosed().subscribe(res => {
//         console.log(res);
//         this.isLoginDialogOpen = false;
//         this.load();
//       });

//     });


//   }


 }
