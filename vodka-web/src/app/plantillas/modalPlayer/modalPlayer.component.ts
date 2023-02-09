import { Component, OnInit , Inject, Renderer2} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder,FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlayerService } from 'src/services/player.service';
import { Season, Pagination, Team, Player, Position } from "src/shared/interfaces";
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { PositionService } from "src/services/position.service";

export interface DialogData {
  id: number;
  positions: Position[];
}

@Component({
  selector: 'app-modalPlayer',
  templateUrl: './modalPlayer.component.html',
  styleUrls: ['./modalPlayer.component.scss']
})
export class ModalPlayerComponent implements OnInit {

  form = this.fb.group({
    players: this.fb.array([]),
  });

  teamId: number;
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  formpost: FormGroup;
  formPhoto: FormGroup
  imageSrc: string = '';
  base64: string = '';
  status: string;
  player: Player;
  page: FormGroup;
  season: Season;
  itemsPlayer: [];
  team: Team;
  playerPost: Player[];
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
  position: Position;


  constructor(public dialogRef: MatDialogRef<ModalPlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private renderer: Renderer2, public servicePlayer: PlayerService,
    public snakbar: MatSnackBar,public fb: FormBuilder,public servicePosition: PositionService ) {

    this.teamId =data.id ;
    this.position;
    this.itemsPlayer=[];
    this.error = false;
    this.player;
    this.season;
    this.team;
    this.teams = [];
    this.positions = data.positions;
    this.teamsId = [];
    this.pagination;
    this.limit = 25;
    this.ListTeams1 = [];
    this.teamsSelected = [];
    this.playerPost = []

    this.restore();

  }

  get players() {
    return this.form.controls["players"] as FormArray;
  }

  ngOnInit() {
    this.getPositon();
    const lessonForm = this.fb.group({
      first_name: new FormControl(this.player.first_name, [Validators.required]),
      last_name: new FormControl(this.player.last_name, [Validators.required]),
      nick: new FormControl(this.player.nick, [Validators.required]),
      about: new FormControl(this.player.about),
      position_id: new FormControl(this.player.position_id),
      team_id: new FormControl(this.teamId),
      //created_at: new FormControl(this.player.created_at),
      //updated_at: new FormControl(this.player.updated_at),
     // def_img: new FormControl(this.player.def_img),
    });
    this.players.push(lessonForm);
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
      first_name: new FormControl(this.player.first_name),
      last_name: new FormControl(this.player.last_name),
      nick: new FormControl(this.player.nick),
      about: new FormControl("x"),
      player_number: new FormControl(this.player.player_number),
      position_id: new FormControl(this.player.position_id),
      team_id: new FormControl(this.teamId),
      curp: new FormControl(this.player.curp),
      extension: new FormControl(this.player.extension),

      //created_at: new FormControl(this.player.created_at),
     // updated_at: new FormControl(this.player.updated_at),
     // def_img: new FormControl(this.player.def_img),
    });

    this.players.push(lessonForm);
  }



  removeFormInput(i) {
    this.players.removeAt(i);
  }

  onClickNO(): void {

    this.dialogRef.close();


  }


  addPlayer() {

    debugger

      this.itemsPlayer = this.form.getRawValue()
      this.playerPost = this.itemsPlayer['players'];
      console.log(this.playerPost.map(x => x.team_id))

      this.playerPost.forEach(element => {
        element.about = "x";
      });


    this.servicePlayer.registerPlayer(this.playerPost).subscribe((player: Player) => {
       if(player.id != null){
        location.reload();
        this.dialogRef.close();
        this.snakbar.open('Jugadores registrados con éxito', '', {
          duration: 2000
        });
       }

     //console.log(player)
    });

    //this.load();


  }

  

  getPositon() {
    this.servicePosition.list().subscribe((positions) => {
      this.positions = positions.data
    })
  }


  isShown: boolean = false; // hidden by default
  temporal = localStorage.getItem("teamsSelected");
  enableButton() {
    //const temporal = localStorage.getItem("teamsSelected");
    this.isShown = !this.isShown;

  }





  restore() {
    let fecha = this.pipe.transform(Date.now(), 'dd/MM/yyyy');
    const date = new Date(fecha);
    this.player = {
      id: 0,
      first_name: '',
      last_name: '',
      nick: '',
      about: '',
      position_id: 0,
      def_img: 0,
      team_id: 0,
     // created_at: date,
      //updated_at: date,
      isSelected: false,
      player_number: 0,
      image: '',
      status:'',
      curp: '',
      extension:'',
      photoName: '',
      photos: [],
      photo:[],
      position: this.position,
      team: this.team,
      positionName: '',

    }

  }

}






