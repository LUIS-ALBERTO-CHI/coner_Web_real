import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { TeamService } from "src/services/team.service";
import { PlayerService } from "src/services/player.service";
import { MatchService } from "src/services/match.service";
import { Team, Player, Match, MatchDay, RespLogin, Moder } from "src/shared/interfaces";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

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

  constructor(public seriviceTeam: TeamService) {

    this.respLogin;
    this.moderLogin;
    this.idTeams = [];
    this.teamsLogin = [];
    this.team;

  }

  ngOnInit() {

    this.load();
  }


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }


  load() {

    this.respLogin = JSON.parse(sessionStorage.getItem("dataLoginALl"))

    if (this.respLogin.role == "captain") {

      this.moderLogin = JSON.parse(sessionStorage.getItem("dataLogin"))

      this.moderLogin.forEach(element => {

        //this.teamsLogin.push(element.team);
        this.idTeams.push(element.team.id);


      });

      //this.teamsOriginal =  this.teamsLogin;

      this.idTeams.forEach(element => {
        this.seriviceTeam.detail(element).subscribe((team: Team) => {
          console.log(team);
          this.team = team;
           //this.routeNewPlayer = "/createPlayer/" + this.team.id;
          this.teamsLogin.push(this.team);

          this.teamsLogin.forEach(element => {
            element.route = "/dashboardTeam/" + element.id;
          });

          // this.teamsLogin.forEach(element => {
          //   this.servicePlayer.getItemsxModel(element.id).subscribe(teams => {
          //     if (teams != null) {
          //       element.numberPlayers = teams.data.length;
          //       //console.log(teams.data.length)
          //     } else {
          //       'Sin Jugadores'
          //     }
          //   });
          // });

        });



      });


    }





  }
}
