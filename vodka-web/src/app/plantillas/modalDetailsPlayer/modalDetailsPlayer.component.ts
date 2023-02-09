import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { Player, Position, Team } from '../../../shared/interfaces';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlayerService } from '../../../services/player.service';
import { from } from 'rxjs';
import { PositionService } from 'src/services/position.service';
import { PhotoService } from 'src/services/photo.services';

export interface DialogData {
  id: number;
  positions: Position[];
}

@Component({
  selector: 'app-modal-details-player',
  templateUrl: './modalDetailsPlayer.component.html',
  styleUrls: ['./modalDetailsPlayer.component.scss']
})
export class ModalDetailsPlayerComponent implements OnInit {
  formpost: FormGroup;
  player: Player;
  teams: Team;
  positions: Position[];
  formPhoto: FormGroup
  imageSrc: string = '';
  base64: string = '';
  players: Player[];
  form: Player;


  constructor(public dialogRef: MatDialogRef<ModalDetailsPlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Player,@Inject(MAT_DIALOG_DATA) public positionData: DialogData, @Inject(MAT_DIALOG_DATA) public position: Position, public snakbar: MatSnackBar, public service: PlayerService, public servicePosition: PositionService, public servicePhoto: PhotoService
    ) {
      this.player = data;
      this.teams = data.team;

      this.formpost = new FormGroup({
        id: new FormControl(this.player.id),
        first_name: new FormControl(this.player.first_name),
        last_name: new FormControl(this.player.last_name),
        nick: new FormControl(this.player.nick),
        status: new FormControl(this.player.status),
        curp: new FormControl(this.player.curp),
        positionName: new FormControl(this.player.positionName),
        position_id: new FormControl(this.player.position_id),
        // p_name: new FormControl(this.position.p_name),
        photoName: new FormControl(this.player.photoName),
        photo: new FormControl(this.player.photo),
        photos: new FormControl(this.player.photos)
      })

  }

  ngOnInit(): void {
    // console.log(this.data);
    this.validationsPlayer();
    this.servicePosition.list().subscribe((positions) => {
      this.positions = positions.data
    })
    var prueba = this.player.photos[0];
    if(!prueba){
     this.player.photoName = "/assets/img/noimage.png"
    }else{
     this.player.photoName = `https://ligasabatinadefutbol.com.mx/media/bearleague/${prueba.ph_filename}`
    }
    // if (this.formpost.get('photoName').value != "" && this.formpost.get('photoName').value != null) {
    //   this.imageSrc = "https://ligasabatinadefutbol.com.mx/media/bearleague/" + this.formpost.get('photoName').value;
    //   return
    // }
    // this.imageSrc = "https://javierbernabe.com/assets/placeholder.a5d787485902bed4d05c812cf18ecb6d.png";

  }

  onClickNo(): void{
    this.dialogRef.close();
  }

  detailPlayer(form: Player){
    debugger
    console.log(this.player.positionName);
    //form.curp = "";
    this.form = form;
    this.service.detail(form.id).subscribe((resp: Player) => {
      if(resp.id != 0){
        this.dialogRef.close();
        this.snakbar.open('¡Jugador actualizado con éxito!', '', {
          duration: 5000
        });
      }
    })
  }

  validationsPlayer(){
    if (this.player.position != null) {
      this.formpost.patchValue({
        positionName:this.player.position.p_name
      })
    } else {
      // this.player.positionName = "Sin posición"
      this.formpost.patchValue({
        positionName:"Sin posición"
      })
    }
    if (this.player.curp != null ) {
      this.formpost.patchValue({
        curp: this.player.curp
      })
      // this.player.curp = "Sin curp"
    }else{
      this.formpost.patchValue({
        curp: "Sin curp"
      })
    }
    if (this.player.nick != '') {
      this.formpost.patchValue({
        nick: this.player.nick
      })
      // this.player.nick = "Sin nickname"
    }else{
      this.formpost.patchValue({
        nick: "Sin alias"
      })
    }
  }

}
