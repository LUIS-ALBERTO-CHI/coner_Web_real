
import { Component, OnInit , Inject, Renderer2} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder,FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlayerService } from 'src/services/player.service';
import { TeamService } from 'src/services/team.service';
import{MatchService} from 'src/services/match.service';
import { Season, Pagination, Team, Player, Position, Match, MatchDay } from "src/shared/interfaces";
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { PositionService } from "src/services/position.service";


@Component({
  selector: 'app-modalAddMatches',
  templateUrl: './modalAddMatches.component.html',
  styleUrls: ['./modalAddMatches.component.scss']
})
export class ModalAddMatchesComponent implements OnInit {

  form = this.fb.group({
    matches: this.fb.array([])
  });


  matchDay: MatchDay;
  match: Match;
  teams: Team[];
  itemsMatches: Match[];
  macthPost: Match[];
  teams1: Team[];
  teams2: Team[]
  team1: Team;
  team2: Team;


  constructor(public dialogRef: MatDialogRef<ModalAddMatchesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatchDay, private renderer: Renderer2, public serviceTeam: TeamService,
    public snakbar: MatSnackBar,public fb: FormBuilder,public servicePosition: PositionService, public serviceMacth: MatchService) {

    dialogRef.disableClose = true;
    this.teams = [];
    this.match;
    this.itemsMatches= [];
    this.matchDay;
    this.teams1= [];
    this.teams2= [];
    this.team1;
    this.team2;


    this.restore();


  }

  get matches() {
    return this.form.controls["matches"] as FormArray;
  }

  ngOnInit() {

    const lessonForm = this.fb.group({
      m_id: new FormControl(this.matchDay.id),
      team1_id: new FormControl(this.match.team1_id),
      team2_id: new FormControl(this.match.team2_id),
      score1: new FormControl(this.match.score1),
      score2: new FormControl(this.match.score2),
      match_descr: new FormControl(this.match.match_descr),
      published: new FormControl(this.match.published),
      is_extra: new FormControl(this.match.is_extra),
      m_played: new FormControl(this.match.m_played),
      m_date: new FormControl(this.match.m_date),
      m_time: new FormControl(this.match.m_time),
      m_location: new FormControl(this.match.m_location),
      bonus1: new FormControl(this.match.bonus1),
      bonus2: new FormControl(this.match.bonus2),
    });
    this.matches.push(lessonForm);
    this.getTeams();
  //  this.getPosition();
  }

  // getPosition() {
  //   debugger
  //   this.error = true;
  //   this.servicePosition.list().subscribe(positions => {
  //     this.positions = positions.data;
  //     console.log(this.positions)

  //   });

  // }


  addPlayerForm() {
    const lessonForm = this.fb.group({
      m_id: new FormControl(this.match.m_id),
      team1_id: new FormControl(this.match.team1_id),
      team2_id: new FormControl(this.match.team2_id),
      score1: new FormControl(this.match.score1),
      score2: new FormControl(this.match.score2),
      match_descr: new FormControl(this.match.match_descr),
      published: new FormControl(this.match.published),
      is_extra: new FormControl(this.match.is_extra),
      m_played: new FormControl(this.match.m_played),
      m_date: new FormControl(this.match.m_date),
      m_time: new FormControl(this.match.m_time),
      m_location: new FormControl(this.match.m_location),
      bonus1: new FormControl(this.match.bonus1),
      bonus2: new FormControl(this.match.bonus2),

    });

    this.matches.push(lessonForm);
  }



  removeFormInput(i) {
    this.matches.removeAt(i);
  }

  onClickNO(): void {

    this.dialogRef.close();


  }

  getTeams() {
    debugger
    //this.error = true;
    this.serviceTeam.list().subscribe(teams => {
      //this.teams = teams.data;
      this.teams1 = teams.data;
      this.teams2 = teams.data;
      console.log(this.teams)

    });

  }


  updateTeams1(id: number){

   this.teams2 = this.teams2.filter((i) => i.id != id);

    console.log(this.teams2)
  }

  updateTeams2(id: number){

   this.teams1 = this.teams1.filter((i) => i.id != id);
  }

  addMatches() {

    debugger

      this.itemsMatches = this.form.getRawValue()
      this.macthPost = this.itemsMatches['matches'];
      console.log(this.macthPost );

      this.macthPost.forEach(element => {
        element.m_date = "2012-05-01"
        element.bonus1= "0";
        element.bonus2="0";
        element.refereeId="0"
      });

       this.serviceMacth.registerMatch(this.macthPost).subscribe((resp: Match) => {

        this.snakbar.open('Partidas registradas con exito', '', {
             duration: 3000
             });

       });



       }


    // this.servicePlayer.registerPlayer(this.macthPost).subscribe((resp: Match[]) => {
    //    if(resp.length){
    //     location.reload();

    //     this.snakbar.open('Partidas registradas con exito', '', {
    //       duration: 2000
    //     });
    //    }

    //  console.log(resp)
    // });

    //this.load();





  // isShown: boolean = false; // hidden by default
  // temporal = localStorage.getItem("teamsSelected");
  // enableButton() {
  //   //const temporal = localStorage.getItem("teamsSelected");
  //   this.isShown = !this.isShown;







  restore() {

    this.match = {

      id: 0,
      m_id: 0,
      team1_id: 0,//ESTE
      team2_id: 0,//
      score1: 0,
      score2: 0,
      match_descr: "",//
      published: "",
      is_extra: "",
      m_played: "",
      m_date: "",//
      m_time: "",//
      m_location: "",//
      bonus1: "",
      bonus2: "",
      refereeId: "",
      nameTeam1: "",
      nameTeam2: "",
      team1: this.team1,
      team2: this.team2,
      logoTeam1: "",
      logoTeam2: "",


    }

    this.matchDay = {
      id: 0,
      m_name: '',
      m_descr: '',
      s_id: 0,
      is_playoff: '',
      matches: [],
    }
  }

}






