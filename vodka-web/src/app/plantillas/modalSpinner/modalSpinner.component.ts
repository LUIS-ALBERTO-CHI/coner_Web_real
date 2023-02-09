import { Component, Inject, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-modal-spinner',
  templateUrl: './modalSpinner.component.html',
  styleUrls: ['./modalSpinner.component.scss']
})
export class ModalSpinnerComponent implements OnInit {

  color: ThemePalette = 'warn'
  constructor(
    public dialogRef: MatDialogRef<ModalSpinnerComponent>
    ) {

  }



  ngOnInit(): void {
  }


}
