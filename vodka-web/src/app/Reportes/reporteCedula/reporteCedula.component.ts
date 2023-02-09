import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogState } from "@angular/material/dialog";
import { Season, Pagination, Team, Player, Position, PlayerArray, Photo, PlayerxTeam } from "src/shared/interfaces";
import { SeasonService } from "src/services/season.service";
import { TeamService } from "src/services/team.service";
import { PlayerService } from "src/services/player.service";
import { PlayerxTeamService } from "src/services/playerxteam.service";
import { PositionService } from "src/services/position.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from '@angular/forms';
import { ModalseasonComponent } from "src/app/Plantillas/modalseason/modalseason.component";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { HttpClient } from "@angular/common/http";
// import pdfmake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// pdfmake.vfs = pdfFonts.pdfMake.vfs;

declare var require: any;

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import html2canvas from 'html2canvas';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { auto } from '@popperjs/core';
// const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-reporteCedula',
  templateUrl: './reporteCedula.component.html',
  styleUrls: ['./reporteCedula.component.scss']
})
export class ReporteCedulaComponent implements OnInit {


  position: Position;
  team: Team;
  player1: PlayerArray;
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  itemsPlayer: [];
  player: Player;
  players: PlayerxTeam[];
  playerPost: Player[];
  playersActive: number[];
  positions: Position[];
  error: boolean;
  playersOriginal: Player[];
  limit: number;
  pagination: Pagination;
  isLoginDialogOpen: boolean = false;
  playersSelected: Player[];
  teamsId: number[];
  form: FormGroup;
  status: boolean;
  imageSrc: string = '';
  imageLiga: string = '';
  photosPlayer: Photo[];
  prueba: Photo;
  isImageLoading: boolean;
  formDetail: FormGroup;
  urlImageTeam: string;
  Players1: Player[];
  Players2: Player[];
  data: string;
  data2: string;
  detailsTeam: string;

  constructor(
    private router: Router,
    private service: SeasonService,
    public dialog: MatDialog,
    public teamService: TeamService,
    public snakbar: MatSnackBar,
    public servicePlayer: PlayerService,
    public servicePosition: PositionService,
    public http: HttpClient,
    private route: ActivatedRoute,




  ) {



    this.imageLiga= "";
    this.restore();
    this.position;
    this.urlImageTeam = "";
    this.team;
    this.isImageLoading = false;
    this.prueba;
    this.status = true;
    this.player1 = { players: [0] };
    this.itemsPlayer = [];
    this.playersOriginal = [];
    this.error = false;
    this.player;
    this.players = [];
    this.playersActive = [0];
    this.positions;
    this.teamsId = [];
    this.pagination;
    this.limit = 25;
    this.playersSelected = [];
    this.playerPost = [];
    this.form = new FormGroup({
      first_name: new FormControl(""),
    });

    this.formDetail = new FormGroup({
      id: new FormControl(this.team.id),
      t_name: new FormControl(this.team.t_name),
      Phone: new FormControl(''),//PENDIENTE VALIDAR EL TELEFONO
      Manager: new FormControl(''),
      Email: new FormControl(''),//PENDIENTE VALIDAR EL CORREO
      t_city: new FormControl(this.team.t_city),
      t_descr: new FormControl(this.team.t_descr),
      t_emblem: new FormControl(this.team.t_emblem),
      //file: new FormControl('', [Validators.required]),
      //fileSource: new FormControl('', [Validators.required]),
      t_yteam: new FormControl('0'),
      players: new FormControl(this.team.players),
      def_img: new FormControl(this.team.def_img)

    });


  }

  ngOnInit(): void {
    this.load();

    var idTeam = parseInt(this.route.snapshot.paramMap.get('id'));


    this.servicePlayer.getItemsxModel(idTeam).subscribe(Players => {
      this.players = Players.data;
      //console.log(this.players);
      var mitad = Math.floor(this.players.length / 2);

      this.Players1 = this.players.slice(0, mitad);
      this.Players2 = this.players.slice(mitad); // si no se indica el índice final, se usa la longitud del array como referencia


      this.Players1.forEach(element => {

        if (this.team.id == 0) {
          this.team = element.team;
          console.log(this.team);

          this.formDetail.patchValue({
            id: this.team.id,
            t_name: this.team.t_name,
            Manager: "N/A",

          });

          this.imageSrc = "https://ligasabatinadefutbol.com.mx/media/bearleague/" + this.team.t_emblem;


        }

        if (element.position != null) {
          element.positionName = element.position.p_name;
        }

        if (this.team) {
          this.team = element.team;
          //console.log(this.team);
          this.detailsTeam = "/detailsTeam/" + this.team.id;
        }


        if (element.photos.length > 0) {

          element.photoName = "assets/img/not-found.jpeg"
        }

        this.prueba = element.photos[0];


        if (!this.prueba) {

          element.photoName = "assets/img/not-found.jpeg"

        } else {


          var url = "https://api.ligasabatinadefutbol.com.mx/api/players/image/" + this.prueba.ph_filename;

          this.servicePlayer.getImageBase64(url).subscribe((data: Player) => {

            console.log(data);
            element.image = data.image;

          });


          var url = "https://api.ligasabatinadefutbol.com.mx/api/players/image/" + element.team.t_emblem;
          this.servicePlayer.getImageBase64(url).subscribe((data: Player) => {

            console.log(data);
            this.imageSrc = data.image;

          });


          var url = "https://api.ligasabatinadefutbol.com.mx/api/players/image/" + "sello_peque.png";
          this.servicePlayer.getImageBase64(url).subscribe((data: Player) => {

            console.log(data);
            this.imageLiga = data.image;

          });

        }

      });




      this.Players2.forEach(element => {

        if (this.team.id == 0) {
          this.team = element.team;
          //console.log(this.team);

          this.formDetail.patchValue({
            id: this.team.id,
            t_name: this.team.t_name,
            Manager: "N/A",

          });

          this.imageSrc = "https://ligasabatinadefutbol.com.mx/media/bearleague/" + this.team.t_emblem;


        }

        if (element.position != null) {
          element.positionName = element.position.p_name;
        }


        if (element.photos.length > 0) {

          element.photoName = "assets/img/not-found.jpeg"
        }

        this.prueba = element.photos[0];


        if (!this.prueba) {

          element.image = "assets/img/not-found.jpeg"

        } else {


          var url = "https://api.ligasabatinadefutbol.com.mx/api/players/image/" + this.prueba.ph_filename;

          this.servicePlayer.getImageBase64(url).subscribe((data: Player) => {

            //console.log(data);
            element.image = data.image;

          });


          var url = "https://api.ligasabatinadefutbol.com.mx/api/players/image/" + element.team.t_emblem;
          this.servicePlayer.getImageBase64(url).subscribe((data: Player) => {

            //console.log(data);
            this.imageSrc = data.image;

          });

        }

      });


    });









  }


  generatePdf() {
    html2canvas(document.querySelector("#content")).then(canvas => {
      console.log(canvas)

      const ImgWidth = 500;
      const ImgHeigth = canvas.height * ImgWidth / canvas.width;
      canvas.style.visibility="hidden";
      document.body.appendChild(canvas)
      this.data = canvas.toDataURL();

        html2canvas(document.querySelector("#content2")).then(canvas => {
          const ImgWidth = 500;
          canvas.style.visibility="hidden";
          document.body.appendChild(canvas)
          this.data2 = canvas.toDataURL();


          var docDefinition = {
            content: [{
              image: this.data,
              width: ImgWidth,

            },

            {
              image: this.data2,
              width: ImgWidth,

            }]
          };

          pdfMake.createPdf(docDefinition).download("cedula.pdf");


        });
    });

  }


  load() {

    var idTeam = parseInt(this.route.snapshot.paramMap.get('id'));
    //PENDIENTE YA QUE DEBE TRAER POR REPORTE CEDULA LOS 25 JUGADORES DEPENDIENDO DE SU EQUIPO
    this.servicePlayer.getItemsxModel(idTeam).subscribe(players => {
      //this.team = team;
      this.players = players.data;

      this.players.forEach(element => {


        if (element.position != null) {
          element.positionName = element.position.p_name;
        }

        if (element.photos.length > 0) {
          var prueba = element.photos[0];
          if (!prueba) {
            element.photoName = "assets/img/not-found.jpeg"
          } else {
            element.photoName = `https://ligasabatinadefutbol.com.mx/media/bearleague/${prueba.ph_filename}`;
          }
        } else {

          element.photoName = "assets/img/not-found.jpeg"

        }



      });

    });



  }




  restore() {

    let fecha = this.pipe.transform(Date.now(), 'dd/MM/yyyy');
    const date = new Date(fecha);
    this.player = {
      id: 0,
      first_name: '',
      last_name: '',
      nick: '',
      about: 'x cosa',
      position_id: 0,
      team_id: 1,
      isSelected: false,
      player_number: 0,
      image: '',
      status: '',
      curp: '',
      extension: '',
      photoName: '',
      photos: [],
      photo: [],
      position: this.position,
      team: this.team,
      positionName: '',
      //PhotoNameTeam: '',
      def_img:0
    },

      this.team = {
        id: 0,
        t_name: '',
        t_descr: '',
        t_yteam: '0',
        def_img: 0,
        t_emblem: '',
        t_city: '',
        players: [],
        isSelected: false,
        numberPlayers: 0,
        idUrl: "",
        route:"",
        selected: false,
      }



  }


}
