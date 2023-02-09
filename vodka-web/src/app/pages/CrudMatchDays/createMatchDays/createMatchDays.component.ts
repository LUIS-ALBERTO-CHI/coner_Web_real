import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogState } from "@angular/material/dialog";
import { Season, Pagination, Team, Player, Position, MatchDay } from "src/shared/interfaces";
import {MatchDayService} from "src/services/matchday.service"
import { Router } from "@angular/router";
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from "@angular/forms";
import { ModalseasonComponent } from "src/app/Plantillas/modalseason/modalseason.component";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { of, mergeMap, interval, map } from 'rxjs';


@Component({
  selector: 'app-createMatchDays',
  templateUrl: './createMatchDays.component.html',
  styleUrls: ['./createMatchDays.component.scss']
})
export class CreateMatchDaysComponent implements OnInit {


  form = this.fb.group({
    MatchDays: this.fb.array([])
  });


  matchDayPost: FormGroup
  matchDayForm: FormGroup;
  season: Season;
  //seasons: Season[];
  itemsMatchDays: [];
  team: Team;
  matchDay: MatchDay;
  matchPost: MatchDay[];
  teams: Team[];
  positions: Position[];
  error: boolean;
  teamsOriginal: Team[];
  limit: number;
  pagination: Pagination;
  isLoginDialogOpen: boolean = false;
  ListTeams1: Team[];
  teamsSelected: Team[];
  teamsId: number[];
  constructor(
    private router: Router,
    public dialog: MatDialog,
    public matchDayService: MatchDayService,
    public snakbar: MatSnackBar,

    public fb: FormBuilder
  ) {
    this.itemsMatchDays=[];
    this.error = false;
    this.season;
    this.team;
    this.teams = [];
    this.positions
    this.teamsId = [];
    this.pagination;
    this.limit = 25;
    this.ListTeams1 = [];
    this.teamsSelected = [];
    this.matchPost = []
    this.restore();

    this.matchDayForm = new FormGroup({
      numberMathDays : new FormControl(0),
    })



  }

  get MatchDays() {
    return this.form.controls["MatchDays"] as FormArray;
  }

  ngOnInit() {

    // const lessonForm = this.fb.group({
    //   first_name: new FormControl(this.player.first_name),
    //   last_name: new FormControl(this.player.last_name),
    //   nick: new FormControl(this.player.nick),
    //   about: new FormControl(this.player.about),
    //   player_number: new FormControl(this.player.player_number),
    //   position_id: new FormControl(this.player.position_id),
    //   team_id: new FormControl(this.player.team_id),
    //   //created_at: new FormControl(this.player.created_at),
    //  // updated_at: new FormControl(this.player.updated_at),
    //   //def_img: new FormControl(this.player.def_img),
    // });
    // this.players.push(lessonForm);
    // this.getPosition();
  }

  // foreachMatch(){

  //   const number = this.matchDayForm.get('numberMathDays').value

  //   for (let index = 0; index < array.length; index++) {
  //     const element = array[index];
  //     this.addPlayer();
  //   }

  // }


  addPlayerForm() {

    debugger
    const number = this.matchDayForm.get('numberMathDays').value

    //QUIERO HACER UN FOR DONDE LE DE VUELTA N VECES A UN NUMERO Y CREAR CONST LESSONFORM
    for (let index = 0; index < number; index++) {
      const lessonForm = this.fb.group({
        m_name: new FormControl(this.matchDay.m_name, [Validators.required]),
        m_descr: new FormControl(this.matchDay.m_descr, [Validators.required]),
        s_id:new FormControl(0),
      });

      this.MatchDays.push(lessonForm);
    }

  }



  removeFormInput(i) {
    this.MatchDays.removeAt(i);
  }





  addMatchDay() {

    debugger

      this.itemsMatchDays = this.form.getRawValue()
      this.matchPost = this.itemsMatchDays['MatchDays'];

    this.matchDayService.registerMatchDay(this.matchPost).subscribe((resp: MatchDay) => {
       if(resp.id != null){

        console.log(resp)
        this.snakbar.open('Jornadas registradas con exito', '', {
          duration: 2000
        });
       }

     location.reload();

    });

  }

  isShown: boolean = false; // hidden by default
  temporal = localStorage.getItem("teamsSelected");
  enableButton() {
    //const temporal = localStorage.getItem("teamsSelected");
    this.isShown = !this.isShown;
  }



  restore() {


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
