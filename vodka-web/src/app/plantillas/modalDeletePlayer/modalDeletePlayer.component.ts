import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Team, Player, PlayerArray } from 'src/shared/interfaces';
import { PlayerService } from '../../../services/player.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import{ModalReleasePlayerComponent} from '../modalReleasePlayer/modalReleasePlayer.component';

@Component({
  selector: 'app-modalDeletePlayer',
  templateUrl: './modalDeletePlayer.component.html',
  styleUrls: ['./modalDeletePlayer.component.scss']
})
export class ModalDeletePlayerComponent implements OnInit {

  formpost: FormGroup;
  player: PlayerArray;
  players: Player[];

  constructor(public dialogRef: MatDialogRef<ModalDeletePlayerComponent>, public dialogRef2: MatDialogRef<ModalReleasePlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number[], public service: PlayerService, public snakbar: MatSnackBar ) {

    this.players=[],
    this.player =  {
      players: data,
     };
  }

  ngOnInit(): void {
  }

  onClickNO(): void {
    this.dialogRef.close();
  }

  removePlayers(){

debugger
    this.service.releasePlayer(this.player).subscribe(resp => {//debe recibir un arreglo

      this.snakbar.open('¡Registros liberados!', '', {
        duration: 3000
      });

      this.dialogRef.close();
     
      this.dialogRef.afterClosed().subscribe(res => {
        this.dialogRef2.close();
      });
     // this.router.navigate([`${'detailsTeam/' + form.team_id}`]);
     console.log(resp)
    });


  }


}
