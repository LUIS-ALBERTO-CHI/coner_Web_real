import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatchDayService } from 'src/services/matchday.service';
import { MatchDay, Season } from 'src/shared/interfaces';

@Component({
  selector: 'app-modal-edit-match',
  templateUrl: './modalEditMatch.component.html',
  styleUrls: ['./modalEditMatch.component.scss']
})
export class ModalEditMatchComponent implements OnInit {

  formpost: FormGroup;
  matchday: MatchDay;
  season: Season;
  constructor(public dialogRef: MatDialogRef<ModalEditMatchComponent>, public serviceMatchDay: MatchDayService,
    public snakbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: MatchDay, public router: Router) {

    this.matchday = data;
    //this.season = data.s_id;
  }



  ngOnInit(): void {
    this.formpost = new FormGroup ({
      id: new FormControl(this.matchday.id),
      m_name: new FormControl(this.matchday.m_name, [Validators.required]),
      m_descr: new FormControl(this.matchday.m_descr, [Validators.required]),

    })
  }

  onClickNo(): void{
    this.dialogRef.close();
  }

  updateMatchDays(form: MatchDay){
    debugger
    this.serviceMatchDay.edit(form.id, form).subscribe((resp: MatchDay) => {
      console.log(this.serviceMatchDay)
      if(resp.id != 0){
        this.dialogRef.close();
        this.snakbar.open('¡Jornada actualizada con éxito!', '', {
          duration: 5000,
          //panelClass: ['warning']
        });

      }
    })
  }

}
