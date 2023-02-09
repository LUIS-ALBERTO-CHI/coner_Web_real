import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatchDayService } from 'src/services/matchday.service';
import { MatchDay } from 'src/shared/interfaces';

@Component({
  selector: 'app-modal-delete-match',
  templateUrl: './modalDeleteMatch.component.html',
  styleUrls: ['./modalDeleteMatch.component.scss']
})
export class ModalDeleteMatchComponent implements OnInit {

  formpost: FormGroup;
 match: MatchDay;

  constructor(public dialogRef: MatDialogRef<ModalDeleteMatchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatchDay,
    public service: MatchDayService,
    public snakbar: MatSnackBar ) {

      this.match = data;

      this.formpost = new FormGroup({
        id: new FormControl(this.match.id)
      })

  }

  ngOnInit(): void {
  }

  onClickNO(): void {
    this.dialogRef.close();
  }

  RemoveMatchDays(form: MatchDay){
    this.service.remove(form.id).subscribe(resp => {
      this.dialogRef.close();
      this.snakbar.open('¡La jornada fue dada de baja con éxito!', '', {
        duration: 5000
      });
    })

  }

}
