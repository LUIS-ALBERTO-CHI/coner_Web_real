import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { TeamService } from "src/services/team.service";
import { PlayerService } from "src/services/player.service";
import { MatchService } from "src/services/match.service";
//import {MatchService} from "src/services/Match.Service";
import { Team, Player, Match, MatchDay, RespLogin, Moder } from "src/shared/interfaces";
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard-team',
  templateUrl: './dashboardTeam.component.html',
  styleUrls: ['./dashboardTeam.component.scss']
})
export class DashboardTeamComponent implements OnInit {


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
  formTeam: FormGroup;
  formMatch: FormGroup;
  imageSrc: string;
  imageSrc1: string;
  imageSrc2: string;
  match: Match;

  constructor(public seriviceTeam: TeamService, private route: ActivatedRoute,public matchService: MatchService) {

    this.respLogin;
    this.moderLogin;
    this.idTeams = [];
    this.teamsLogin = [];
    this.team;
    this.imageSrc= "";
    this.formTeam = new FormGroup({



    });

    this.formMatch = new FormGroup({



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

    //var idTeam = parseInt(this.route.snapshot.paramMap.get('id'));

    this.moderLogin = JSON.parse(sessionStorage.getItem("dataLogin"))

    this.moderLogin.forEach(element => {

      var id = element.team.id;

      this.seriviceTeam.detail(id).subscribe((team: Team) => {
        console.log(team);
        this.team = team;
        this.imageSrc = "https://ligasabatinadefutbol.com.mx/media/bearleague/" + team.t_emblem;

      });

      this.matchService.getMatchesxTeam(id).subscribe(resp => {

        this.match = resp.data[0];
        this.imageSrc1 = "https://ligasabatinadefutbol.com.mx/media/bearleague/" + this.match.team1.t_emblem;
        this.imageSrc2 = "https://ligasabatinadefutbol.com.mx/media/bearleague/" + this.match.team2.t_emblem;

      });

    });



  }






}

