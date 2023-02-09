import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogState } from "@angular/material/dialog";
import {
  Season,
  Pagination,
  Team,
  Player,
  Position,
} from "src/shared/interfaces";
import { SeasonService } from "src/services/season.service";
import { TeamService } from "src/services/team.service";
import { PlayerService } from "src/services/player.service";
import { PositionService } from "src/services/position.service";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { ModalseasonComponent } from "src/app/Plantillas/modalseason/modalseason.component";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { MatSnackBar, MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-create",
  templateUrl: "./createPlayer.component.html",
  styleUrls: ["./createPlayer.component.scss"],
})
export class CreatePlayerComponent implements OnInit {
  form: FormGroup;

  position: Position;
  today: Date = new Date();
  pipe = new DatePipe("en-US");
  formpost: FormGroup;
  page: FormGroup;
  season: Season;
  //seasons: Season[];
  itemsPlayer: [];
  team: Team;
  player: Player;
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
  backpage: string;
  playersTeam: Player[];

  constructor(
    private router: Router,
    private service: SeasonService,
    public dialog: MatDialog,
    public teamService: TeamService,
    public snakbar: MatSnackBar,
    public servicePlayer: PlayerService,
    public servicePosition: PositionService,
    public fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.position;
    this.itemsPlayer = [];
    this.playersTeam = [];
    this.error = false;
    this.player;
    this.season;
    this.team;
    this.teams = [];
    this.positions;
    this.teamsId = [];
    this.pagination;
    this.limit = 25;
    this.ListTeams1 = [];
    this.teamsSelected = [];
    this.playerPost = [];
    this.restore();
    this.formpost = new FormGroup({
      first_name: new FormControl(this.player.first_name),
      last_name: new FormControl(this.player.last_name),
      nick: new FormControl(this.player.nick),
      about: new FormControl(this.player.about),
      position_id: new FormControl(this.player.position_id),
      team_id: new FormControl(this.player.team_id),
    });
  }

  get players() {
    return this.form.controls.players as FormArray;
  }

  ngOnInit() {
    this.form = this.fb.group({
      players: this.fb.array([]),
    });
    this.getPosition();
    const lessonForm = this.fb.group({
      first_name: new FormControl(this.player.first_name, [
        Validators.required,
      ]),
      last_name: new FormControl(this.player.last_name, [Validators.required]),
      nick: new FormControl(this.player.nick, [Validators.required]),
      about: new FormControl(this.player.about),
      // dorsal:new FormControl(0),
      position_id: new FormControl(this.player.position_id),
      team_id: new FormControl(this.player.team_id),
    });
    this.players.push(lessonForm);

    this.backpage = "detailsTeam/" + this.team.id;
    console.log(this.team.id)
  }

  getPosition() {
    debugger;
    this.error = true;
    this.playersTeam.forEach(element => {
      console.log(this.playersTeam);

      console.log(element)
      if(this.team.id == 0){
        this.team = element.team;
       this.backpage = "detailsTeam/" + this.team.id
       console.log(this.backpage)
       console.log(element.id);

        //this.backpage = "detailsTeam" + this.team.id;
      }
    });

    this.servicePosition.list().subscribe((positions) => {
      this.positions = positions.data;
      //console.log(this.positions)
    });

    //AQUI HAY UN BUG

  }

  addPlayerForm() {
    const lessonForm = this.fb.group({
      first_name: new FormControl(this.player.first_name, [
        Validators.required,
      ]),
      last_name: new FormControl(this.player.last_name, [Validators.required]),
      nick: new FormControl(this.player.nick, [Validators.required]),
      about: new FormControl(this.player.about),
      player_number: new FormControl(this.player.player_number),
      position_id: new FormControl(this.player.position_id),
      team_id: new FormControl(this.player.team_id),
    });

    this.players.push(lessonForm);
    // console.log(this.players.controls[0].get('first_name').hasError('required'))
  }

  removeFormInput(i) {
    this.players.removeAt(i);
  }

  addPlayer() {
    debugger;
    var idTeam = parseInt(this.route.snapshot.paramMap.get("id"));
    this.itemsPlayer = this.form.getRawValue();
    this.playerPost = this.itemsPlayer["players"];
    // console.log(this.playerPost);

    // console.log(this.playerPost);

    this.playerPost.forEach((element) => {
      element.about = "x";
      element.team_id = idTeam;
    });

    if (this.playerPost.length > 1 || this.playerPost.length > 0) {
      this.servicePlayer
        .registerPlayer(this.playerPost)
        .subscribe((player: Player) => {
          if (player.id != null) {
            // location.reload();

            this.snakbar.open("Jugadores registrados con exito", "", {
              duration: 3000,
            });
            this.router.navigate([`${"detailsTeam/" + idTeam}`]);
          }
          //console.log(player)
        });
    } else {
      this.snakbar.open("No ha agregado a ningun jugador", "", {
        duration: 3000,
      });
    }

    //this.load();
  }

  isShown: boolean = false; // hidden by default
  temporal = localStorage.getItem("teamsSelected");
  enableButton() {
    //const temporal = localStorage.getItem("teamsSelected");
    this.isShown = !this.isShown;
  }

  restore() {
    let fecha = this.pipe.transform(Date.now(), "dd/MM/yyyy");
    const date = new Date(fecha);
    this.player = {
      id: 0,
      first_name: "",
      last_name: "",
      nick: "",
      about: "x cosa",
      position_id: 0,
      team_id: 1,
      // created_at: date,
      // updated_at: date,
      def_img: 0,
      isSelected: false,
      player_number: 0,
      image: "",
      status: "",
      curp: "",
      extension: "",
      photoName: "",
      photos: [],
      photo: [],
      position: this.position,
      team: this.team,
      positionName: "",
    };
  }
}
