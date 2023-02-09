import { Component, OnInit } from '@angular/core';
import{MatchService} from "src/services/match.service";
import{MatchDayService} from "src/services/matchday.service";
import{Match,MatchDay, Pagination} from "src/shared/interfaces";
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatDialog, MatDialogState } from "@angular/material/dialog";
import {ModalDetailsMatchComponent} from "src/app/plantillas/modaldetailsmatch/modaldetailsmatch.component"


@Component({
  selector: 'app-detailsMatchDays',
  templateUrl: './detailsMatchDays.component.html',
  styleUrls: ['./detailsMatchDays.component.scss']
})
export class DetailsMatchDaysComponent implements OnInit {


  form: FormGroup;
  formMatchDay: FormGroup;
  matchDay: MatchDay;
  match: Match;
  pagina: FormGroup;
  pagination: Pagination;
  matchesxmatchDay: Match[];
  idMatchDay: number;
  routeNewMatch: string;
  routeNewmatchDay: String;
  src1: string;
  src2: string;
  isLoginDialogOpen: boolean = false;
  constructor(

    public serviceMatch: MatchService,
   public  serviceMatchDay: MatchDayService,
    public router: Router,
   public route: ActivatedRoute,
   public snakbar: MatSnackBar,
   public dialog: MatDialog,


  ) {

    this.restore();
    this.idMatchDay= 0;
    this.matchDay;
    this.match;
    this.pagination;
    this.routeNewMatch="";
    this.routeNewmatchDay="0";
    this.src1= "";
    this.src2="";
    this.formMatchDay = new FormGroup ({

      m_name: new FormControl (this.matchDay.m_name),
      m_descr: new FormControl (this.matchDay.m_descr),
      is_playoff: new FormControl(this.matchDay.is_playoff),

    });


    this.form = new FormGroup({
      t_name: new FormControl(''),

    });
  }

  ngOnInit(): void {

   this.load();
  }


  load(){

    //recibir el id del matchDay para consultar los matches
    let idMatchDay = parseInt(this.route.snapshot.paramMap.get('id'));


    this.serviceMatch.getItemsxModel(idMatchDay).subscribe(resp =>{

      this.matchesxmatchDay = resp.data;
      this.matchesxmatchDay.forEach(element => {
        if (element.team1.t_emblem == "" || element.team1.t_emblem == null) {
          element.team1.t_emblem = "/assets/img/teamunknown.png";
        } else {
          element.team1.t_emblem = `https://ligasabatinadefutbol.com.mx/media/bearleague/${element.team1.t_emblem}`;
        }

        if (element.team2.t_emblem == "" || element.team2.t_emblem == null) {
          element.team2.t_emblem = "/assets/img/teamunknown.png";
        } else {
          element.team2.t_emblem = `https://ligasabatinadefutbol.com.mx/media/bearleague/${element.team2.t_emblem}`;
        }

        element.nameTeam1= element.team1.t_name;
        element.nameTeam2= element.team2.t_name;
        element.logoTeam1=element.team1.t_emblem;
        element.logoTeam2=element.team2.t_emblem;

      });


      this.pagination = resp.pagination;



      // this.teamsOriginal = teams.data;
      //console.log(this.teamsOriginal);

      this.pagina = new FormGroup({
        link: new FormControl(this.pagination.next_page_url),
        linkprev: new FormControl(this.pagination.prev_page_url)


      })
      //let id = resp.message;
     // this.idMatchDay = parseInt(resp.message.m_id);

    });

    this.serviceMatchDay.detail(idMatchDay).subscribe((matchDay: MatchDay) =>{

      this.matchDay = matchDay;

      this.routeNewmatchDay = "/createMatchDays/" + this.matchDay.id;
      this.routeNewMatch = "/createMatch/" + this.matchDay.id;
      this.formMatchDay.patchValue({
        //id: this.matchDay.id,
        m_name: this.matchDay.m_name,
        m_descr: this.matchDay.m_descr,
        is_playoff: this.matchDay.is_playoff,

      });
      //console.log(matchDay);

    });

    this.form.patchValue({
      t_name: '',
    });
    var name = this.form.get('t_name').value;
    if (name == "") {
      this.toggleShow();
    }



  }


  openDialog(id: number): void {
    debugger

    if (this.isLoginDialogOpen) {
      return;
    }

    this.isLoginDialogOpen = true;

    const dialogRef = this.dialog.open(ModalDetailsMatchComponent,
      {
        width: '600px',
        height: '580px',
         data: id,
      });
    if(dialogRef.getState() === MatDialogState.OPEN ){
    }
    dialogRef.afterClosed().subscribe(res => {
      //console.log(res);
      this.isLoginDialogOpen = false;
      this.load();
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
        duration: 2000
      });
    } else {

      this.serviceMatch.getPagination(LinkPagination).subscribe(matches => {

        this.matchesxmatchDay = matches.data;
        this.pagination = matches.pagination;

        this.pagina = new FormGroup({

          link: new FormControl(this.pagination.next_page_url),
          linkprev: new FormControl(this.pagination.prev_page_url)
        });


        this.matchesxmatchDay = matches.data;
      this.matchesxmatchDay.forEach(element => {

        element.nameTeam1= element.team1.t_name;
        element.nameTeam2= element.team2.t_name;

      });

      });

      let idMatchDay = parseInt(this.route.snapshot.paramMap.get('id'));

      this.serviceMatchDay.detail(idMatchDay).subscribe((matchDay: MatchDay) =>{

        this.matchDay = matchDay;

        this.routeNewMatch = "/createMatchDays/" + this.matchDay.id;
        this.formMatchDay.patchValue({
          //id: this.matchDay.id,
          m_name: this.matchDay.m_name,
          m_descr: this.matchDay.m_descr,
          is_playoff: this.matchDay.is_playoff,

        });
        //console.log(matchDay);
      });


      this.form.patchValue({
        t_name: '',
      });
      var name = this.form.get('t_name').value;
      if (name == "") {
        this.toggleShow();
      }
    }

  }

  previous(LinkPagination: string) {
    if (LinkPagination == null) {
      this.snakbar.open('¡Está es la primera página!', '', {
        duration: 2000
      });
    }else{

      this.serviceMatch.getPaginationPrevious(LinkPagination).subscribe(matches => {

        this.matchesxmatchDay = matches.data;
        this.pagination = matches.pagination;

        this.pagina = new FormGroup({

          link: new FormControl(this.pagination.next_page_url),
          linkprev: new FormControl(this.pagination.prev_page_url)
        });


        this.matchesxmatchDay = matches.data;
      this.matchesxmatchDay.forEach(element => {

        element.nameTeam1= element.team1.t_name;
        element.nameTeam2= element.team2.t_name;

      });

      });

      let idMatchDay = parseInt(this.route.snapshot.paramMap.get('id'));

      this.serviceMatchDay.detail(idMatchDay).subscribe((matchDay: MatchDay) =>{

        this.matchDay = matchDay;

        this.routeNewMatch = "/createMatchDays/" + this.matchDay.id;
        this.routeNewMatch = "/createMatch/" + this.matchDay.id;

        this.formMatchDay.patchValue({
          //id: this.matchDay.id,
          m_name: this.matchDay.m_name,
          m_descr: this.matchDay.m_descr,
          is_playoff: this.matchDay.is_playoff,

        });
        //console.log(matchDay);

      });



      this.form.patchValue({
        t_name: '',
      });
      var name = this.form.get('t_name').value;
      if (name == "") {
        this.toggleShow();
      }
    }
  }



  findMatches() {

    var name = this.form.get('t_name').value


    var idMatchDay= parseInt(this.route.snapshot.paramMap.get('id'));



    this.serviceMatch.getItemsxName(name,idMatchDay).subscribe(match => {

      //console.log(match.data);

      // if (player.data == null) {
      //   this.snakbar.open("No existen registros con ese nombre", "", {
      //     duration: 3000,
      //   });
      // }

      this.match = match.data[0];

      //element.photoName = `https://ligasabatinadefutbol.com.mx/media/bearleague/${prueba.ph_filename}`;
      //this.player.photoName = `https://ligasabatinadefutbol.com.mx/media/bearleague/${this.player.photos[0].ph_filename}`;
     // this.player.positionName = this.player.position.p_name;
      //console.log(this.match);
      if (name != null) {
        this.matchesxmatchDay.splice(0, this.matchesxmatchDay.length);
        this.matchesxmatchDay.push(this.match);
        this.toggleShow();
      }

    });



  }

  isShown: boolean = false; // hidden by default

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


  openDialogUpdate(id: number){

  }

  restore() {
    this.matchDay = {
      id: 0,
      m_name: '',
      m_descr: '',
      s_id: 0,
      is_playoff:'',
      matches: [],
    }

  }

}
