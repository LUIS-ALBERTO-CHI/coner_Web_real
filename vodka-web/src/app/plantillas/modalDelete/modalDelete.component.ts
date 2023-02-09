import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatchDay, Player, Team } from 'src/shared/interfaces';
import { PlayerService } from '../../../services/player.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
//import{BaseService} from "src/services/base.service";

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modalDelete.component.html',
  styleUrls: ['./modalDelete.component.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class ModalDeleteComponent implements OnInit {

  formpost: FormGroup;
  player: Player;
  players: Player[];

  constructor(public dialogRef: MatDialogRef<ModalDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Player,
    @Inject(MAT_DIALOG_DATA) public dataMatch: MatchDay,
     public service: PlayerService, public snakbar: MatSnackBar,) {

    this.players=[],
    this.player = data;

    this.formpost = new FormGroup({
      id : new FormControl(this.player.id),
    })
  }

  ngOnInit(): void {
  }

  onClickNO(): void {
    this.dialogRef.close();
  }

  RemoveTeams(form: Player){
    this.service.remove(form.id).subscribe(respuesta => {
      //console.log(respuesta);
      this.dialogRef.close();
      this.snakbar.open('¡El equipo fue dado de baja con éxito!', '', {
        duration: 6000
      });
    });
  }

}
