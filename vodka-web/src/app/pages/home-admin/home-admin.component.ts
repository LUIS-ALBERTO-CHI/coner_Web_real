
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { FormGroup, FormControl } from "@angular/forms";
import { TeamService } from "src/services/team.service";
import { PlayerService } from "src/services/player.service";
import { MatchService } from "src/services/match.service";
import { MatchDayService } from "src/services/matchday.service";
import {SeasonService} from "src/services/season.service";

import { Team, Player, Match, MatchDay, RespLogin, Moder, Season } from "src/shared/interfaces";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public respLogin: RespLogin;
  moderLogin: Moder[];
  idTeams: number[];
  teamsLogin: Team[];
  team: Team;
  formpost: FormGroup;
  matchDay: MatchDay;
  matchDays: MatchDay[];
  season: Season;

  constructor(public seriviceTeam: TeamService, public serviceMatchDay: MatchDayService,
     public serviceSeason: SeasonService, public matchService: MatchService) {

    this.restore();
    this.respLogin;
    this.moderLogin;
    this.idTeams = [];
    this.teamsLogin = [];
    this.team;
    this.season;
    this.formpost = new FormGroup({
      s_id: new FormControl(this.season.s_id),
      s_name: new FormControl(this.season.s_name),
      s_descr: new FormControl(this.season.s_descr), //PENDIENTE VALIDAR EL TELEFONO
      // is_playoff: new FormControl(this.matchDay.is_playoff),
      // s_id: new FormControl(this.matchDay.s_id), //PENDIENTE VALIDAR EL CORREO
      // matches: new FormControl(this.matchDay.matches),

    });

  }

  ngOnInit() {

    this.load();
  }


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }


  load() {


    let s_id = 1;

    this.serviceSeason.list().subscribe(resp => {

      this.season = resp.data[0];


      this.formpost.patchValue({
        s_id: this.season.s_id,
        s_name: this.season.s_name,
        // m_descr: this.matchDay.m_descr,
        // is_playoff: this.matchDay.is_playoff,

      });

      this.serviceMatchDay.getMatchDayxSeason(this.season.s_id).subscribe(resp => {


        this.matchDays = resp.data;
        //this.matchDay= this.matchDays[0];

        this.matchDays.forEach(element => {

          this.matchService.getItemsxModel(element.id).subscribe(res => {

            element.matches = res.data;

            element.matches.forEach(element1 => {
              element1.logoTeam1 = element1.team1.t_emblem;
              element1.logoTeam2 = element1.team2.t_emblem;

            });

          });

        });


      });


    });




    // this.respLogin = JSON.parse(sessionStorage.getItem("dataLoginALl"))

    // if (this.respLogin.role == "captain") {

    //   this.moderLogin = JSON.parse(sessionStorage.getItem("dataLogin"))

    //   this.moderLogin.forEach(element => {

    //     //this.teamsLogin.push(element.team);
    //     this.idTeams.push(element.team.id);


    //   });

    //   //this.teamsOriginal =  this.teamsLogin;

    //   this.idTeams.forEach(element => {
    //     this.seriviceTeam.detail(element).subscribe((team: Team) => {
    //       console.log(team);
    //       this.team = team;
    //        //this.routeNewPlayer = "/createPlayer/" + this.team.id;
    //       this.teamsLogin.push(this.team);

    //       this.teamsLogin.forEach(element => {
    //         element.route = "/dashboardTeam/" + element.id;
    //       });

    //       // this.teamsLogin.forEach(element => {
    //       //   this.servicePlayer.getItemsxModel(element.id).subscribe(teams => {
    //       //     if (teams != null) {
    //       //       element.numberPlayers = teams.data.length;
    //       //       //console.log(teams.data.length)
    //       //     } else {
    //       //       'Sin Jugadores'
    //       //     }
    //       //   });
    //       // });

    //     });



    //   });


    // }





  }

  restore() {

    this.matchDay = {
      id: 0,
      m_name: "",
      m_descr: "",
      s_id: 0,
      is_playoff: "",
      matches: [],
    };

    this.season = {
      s_id: 0,
      s_name: "",
      s_descr: "",
      published: "",
    };
  }
}
