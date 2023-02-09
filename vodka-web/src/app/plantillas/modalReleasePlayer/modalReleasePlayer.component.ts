import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogState } from '@angular/material/dialog';
//import { MatDialog, MatDialogState } from '@angular/material/dialog';
import { PlayerService } from 'src/services/player.service';
import { Season, Pagination, Team, Player, Position, PlayerArray } from "src/shared/interfaces";
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { PositionService } from "src/services/position.service";
import { ModalDeletePlayerComponent } from "src/app/plantillas/modalDeletePlayer/modalDeletePlayer.component";

@Component({
  selector: 'app-modalReleasePlayer',
  templateUrl: './modalReleasePlayer.component.html',
  styleUrls: ['./modalReleasePlayer.component.scss']
})
export class ModalReleasePlayerComponent implements OnInit {



  player1: PlayerArray;

  form: FormGroup;
  form2: FormGroup;
  categoriaSelectedArray = [];
  playersRelease: number[];
  isLoginDialogOpen: boolean = false;
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  player: Player;
  playersGet: Player[];
  playersOriginal: Player[];
  players: number[];
  playerPost: Player[];
  positions: Position[];
  error: boolean;
  masterSelected: boolean;
  checklist: any;
  checkedList: any;
  checkSelectedTeam: Team[];
  position: Position;
  team: Team;


  constructor(public dialogRef: MatDialogRef<ModalReleasePlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public playerRelease1: Player[], private renderer: Renderer2, public servicePlayer: PlayerService,
    public snakbar: MatSnackBar, public fb: FormBuilder, public servicePosition: PositionService, public dialog: MatDialog,) {

    this.position;
    this.team;
    this.masterSelected = false;
    this.error = false;
    this.players = [0];
    this.player1 = { players: [0] };
    this.playersGet = playerRelease1;//AQUI LLENO LOS DATOS QUE MUESTRO EN MI MODAL
    //console.log(this.playersGet)
    //VAZ A VALIDAR LA LISTA DE PLAYERS GET Y QUITAR DE ESA LISTA TODOS AQUELLOS QUE ESTEN COMO INACTIVOS Y QUE SI EL
    this.playersRelease = [0];
    this.playerPost = [];
    this.categoriaSelectedArray = [];
    this.restore();

    this.form = new FormGroup({
      masterSelected: new FormControl(false)
    })

    this.form2 = new FormGroup({
      first_name: new FormControl('')
    });

  }


  ngOnInit() {
    //Cualquier cambio que suceda se vea reflejado
    this.playersOriginal = this.playersGet;
    this.getPosition();


    //CUALQUIER CAMBIO QUE DETECTE

    this.form2.valueChanges.subscribe(valores => {
      if (!valores) return;
      this.playersGet = this.playersOriginal;
      this.findteams(valores);
      //console.log(valores);
    });

  }

  findteams(valores: any) {
    if (valores.first_name) {
      this.playersGet = this.playersGet.filter(p => p.first_name.indexOf(valores.first_name) !== -1);
    }
  }

  // CargarRegistros() {

  //   this.error = true;
  //   this.service.get(this.CantidadElemento).subscribe(teams => {
  //     this.teams = teams.data;
  //     this.pagination = teams.pagination;
  //     // console.log(this.teams);
  //     //console.log(this.pagination);
  //     this.teamsOriginal = teams.data;
  //     //console.log(this.teamsOriginal);

  //     this.pagina = new FormGroup({
  //       link: new FormControl(this.pagination.next_page_url),
  //       linkprev: new FormControl(this.pagination.prev_page_url)


  //     })

  //   });

  //   //Cualquier cambio que suceda se vea reflejado
  //   this.form.valueChanges.subscribe(valores => {
  //     if (!valores) return;
  //     this.teams = this.teamsOriginal;
  //     this.findteams(valores);

  //     console.log(valores);
  //   })

  // }

  onCategoriaPressed(categoriaSelected: any) {
    this.masterSelected = this.form.get('masterSelected').value
    if (this.masterSelected) { //Si el elemento fue seleccionado
      //Agregamos la categoría seleccionada al arreglo de categorías seleccionadas
      this.categoriaSelectedArray.push(categoriaSelected);
    } else { //Si el elemento fue deseleccionado
      //Removemos la categoría seleccionada del arreglo de categorías seleccionadas
      this.categoriaSelectedArray.splice(this.categoriaSelectedArray.indexOf(categoriaSelected), 1);
    }

    //console.log(this.categoriaSelectedArray)


  }

  openDialogRelease(): void {
    debugger
    this.categoriaSelectedArray.forEach(element => {
      this.playersRelease.push(element.id);
      console.log(this.playersRelease)
    });
    if (this.isLoginDialogOpen) {
      return;
    }
    if (this.playersRelease.length > 1) {
      this.isLoginDialogOpen = true;
      console.log(this.playersRelease);
      const dialogRef = this.dialog.open(ModalDeletePlayerComponent,
        {
          width: '500px',
          height: '200px',
          data: this.playersRelease,
        });
      if (dialogRef.getState() === MatDialogState.OPEN) {
      }
      dialogRef.afterClosed().subscribe(res => {
        console.log(res);
        this.isLoginDialogOpen = false;
        //this.load();
      });
    } else {
      this.snakbar.open('¡No ha seleccionado a ningún jugador!', '', {
        duration: 2000
      });
    }
  }


  // releasePlayer() {


  //   //CAMBIAR EL MERGEMAP
  //   //PREGUNTAR ANTES SI ESTA SEGURO DE QUERER ELIMINAR LOS JUGADORES
  //  this.categoriaSelectedArray.forEach(element => {

  //     this.playersRelease.push(element.id);
  //     console.log(this.playersRelease)

  //   });

  //   this.player1 =  {
  //     players: this.playersRelease
  //    };

  //     console.log(this.player1);

  //   this.servicePlayer.releasePlayer(this.player1).subscribe(resp => {//debe recibir un arreglo

  //     this.dialogRef.close();
  //     this.snakbar.open('¡Registros liberados!', '', {
  //       duration: 3000
  //     });
  //    console.log(resp)
  //   });

  //   //this.load();


  // }



  getPosition() {
    debugger
    this.error = true;
    this.servicePosition.list().subscribe(positions => {
      this.positions = positions.data;
      //console.log(this.positions)
      this.playersGet.forEach(element => {
        if(element.position_id != 0){
          element.positionName = positions.data.find((p) => p.p_id == element.position_id).p_name;
        }else {
          element.positionName = "Sin posición"
        }
        if(element.nick == ''){
          element.nick = 'Sin nickname'
        }
      });
    });


  }


  onClickNO(): void {
    this.dialogRef.close();
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
      //created_at: date,
      //updated_at: date,
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

    }

    //console.log(this.player)

  }

}






