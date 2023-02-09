import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Player, Photo, Team, Position } from '../../../shared/interfaces';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlayerService } from '../../../services/player.service';
import { PositionService } from 'src/services/position.service';
import { Router, ActivatedRoute } from "@angular/router";
export interface DialogData {
  id: number;
  positions: Position[];
}

@Component({
  selector: 'app-modal-edit-player',
  templateUrl: './modalEditPlayer.component.html',
  styleUrls: ['./modalEditPlayer.component.scss']
})
export class ModalEditPlayerComponent implements OnInit {
  formpost: FormGroup;
  player: Player;
  teams: Team;
  positions: Position[];
  constructor(public dialogRef: MatDialogRef<ModalEditPlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Player,
    @Inject(MAT_DIALOG_DATA) public positionData: DialogData,
    @Inject(MAT_DIALOG_DATA) public position: Position, public snakbar: MatSnackBar,
    public service: PlayerService, public servicePosition: PositionService, public router: Router) {

    this.player = data;
    //console.log(data);
    this.teams = data.team;

  }


  //solicita las posiciones en la primera carga de la pantalla
  ngOnInit(): void {
    this.getPositon();
    this.validationsPlayer();
    this.formpost = new FormGroup({
      id: new FormControl(this.player.id),
      first_name: new FormControl(this.player.first_name, [Validators.required]),
      last_name: new FormControl(this.player.last_name, [Validators.required]),
      nick: new FormControl(this.player.nick, [Validators.required]),
      status: new FormControl(this.player.status),
      curp: new FormControl(this.player.curp, [Validators.required]),
      positionName: new FormControl(this.player.positionName),
      position_id: new FormControl(this.player.position_id),
      team_id: new FormControl(this.player.team_id),
    })
  }

  onClickNo(): void {
    this.dialogRef.close();
  }

  comparePosition(c1:any,c2:any){
    // console.log('c1:',c1)
    // console.log('c2:',c2)
    return c1==c2
  }

  updatePlayer(form: Player) {
    debugger

    // if(form.curp == "Sin curp"){
    //   form.curp = "";
    // }
    this.service.edit(form.id, form).subscribe((resp: Player) => {
      // console.log(resp);
      if (resp.id != 0) {
        this.dialogRef.close();
        this.snakbar.open('¡Jugador actualizado con éxito!', '', {
          duration: 5000,
          //panelClass: ['warning']
        });
        this.router.navigate([`${'detailsTeam/' + form.team_id}`]);
      }
    });
  }

  validationsPlayer() {
    if (this.player.position != null) {
      this.player.positionName = this.player.position.p_name;
    }else{
      this.player.positionName = "Sin posición"
    }
  }
  //   if (this.player.curp == null || this.player.curp == "") {
  //     this.player.curp = "Sin curp"
  //   }
  //   if (this.player.nick == '') {
  //     this.player.nick = "Sin nickname"
  //   }
  // }

  getPositon() {
    this.servicePosition.list().subscribe((positions) => {
      this.positions = positions.data
    })
  }


}
