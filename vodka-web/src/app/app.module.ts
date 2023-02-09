import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { SeasonsComponent } from './pages/seasons/seasons.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import{MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import{MatInputModule} from '@angular/material/input';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import { ModalDeleteComponent } from './plantillas/modalDelete/modalDelete.component';
import { ModalEditPlayerComponent } from './plantillas/modalEditPlayer/modalEditPlayer.component'
import {MatSelectModule} from '@angular/material/select';
import { ModalDetailsPlayerComponent } from './plantillas/modalDetailsPlayer/modalDetailsPlayer.component';
import { ModalEditMatchComponent } from './plantillas/modalEditMatch/modalEditMatch.component';
import { ModalDeleteMatchComponent } from './plantillas/modalDeleteMatch/modalDeleteMatch.component';
import { ModalSpinnerComponent } from './plantillas/modalSpinner/modalSpinner.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
//import {DetailSeasonComponent} from './pages/CrudSeason/detailSeason/detailSeason.component'


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    SeasonsComponent,
    TeamsComponent,
    ModalDeleteComponent,
    ModalEditPlayerComponent,
    ModalDetailsPlayerComponent,
    ModalEditMatchComponent,
    ModalDeleteMatchComponent,
    ModalSpinnerComponent,
    //DetailSeasonComponent,


    //IndexPlayerComponent,
    //ModalseasonComponent,
    //ModalteamsComponent,
    //PruebaModalComponent


  ],
  // entryComponents: [ModalteamsComponent],

  providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true, disableClose:true,}},
               {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
