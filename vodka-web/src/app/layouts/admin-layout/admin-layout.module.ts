import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HomeAdminComponent} from '../../pages/home-admin/home-admin.component';
import { ClipboardModule } from 'ngx-clipboard';
import{ PruebaComponent } from '../../pages/prueba/prueba.component';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IndexComponent } from '../../pages/CrudTeams/index/index.component';
import {CreateComponent} from '../../pages/CrudTeams/create/create.component'
import { MatDialogModule} from '@angular/material/dialog';
import{MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import{ MatDatepickerModule}  from '@angular/material/datepicker'
import{MatInputModule} from '@angular/material/input';
import{MatCheckboxModule} from '@angular/material/checkbox';
import { ModalteamsComponent } from 'src/app/plantillas/modalteams/modalteams.component';
import { ModalseasonComponent } from 'src/app/Plantillas/modalseason/modalseason.component';
import { ModalImagePlayerComponent } from 'src/app/plantillas/modalimageplayer/modalImgPlayer.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import {IndexSeasonComponent} from 'src/app/pages/CrudSeason/index/indexSeason.component';
import{MatTabsModule} from '@angular/material/tabs';
import{DragDropModule} from '@angular/cdk/drag-drop';
import{CreateSeasonComponent} from 'src/app/pages/CrudSeason/create/createSeason.component';
import {IndexPlayerComponent} from 'src/app/pages/CrudPlayer/index/indexPlayer.component';
import {CreatePlayerComponent} from 'src/app/pages/CrudPlayer/create/createPlayer.component';
import { ModalPlayerComponent } from "src/app/plantillas/modalPlayer/modalPlayer.component";
import{ModalReleasePlayerComponent} from "src/app/plantillas/modalReleasePlayer/modalReleasePlayer.component";
import {CedulaComponent} from "src/app/pages/CrudPlayer/cedula/cedula.component";
import{ReporteCedulaComponent} from "src/app/Reportes/reporteCedula/reporteCedula.component";
import {CreateMatchDaysComponent} from "src/app/pages/CrudMatchDays/createMatchDays/createMatchDays.component";
import {IndexMatchDayComponent} from "src/app/pages/CrudMatchDays/indexMatchDay/indexMatchDay.component";
import{ModalAddMatchesComponent} from "src/app/plantillas/modalAddMatchs/modalAddMatches.component";7
import{DetailsTeamComponent} from "src/app/pages/CrudTeams/detailsTeam/detailsTeam.component";
import { ModalDeletePlayerComponent } from 'src/app/plantillas/modalDeletePlayer/modalDeletePlayer.component'
import{CreateMatchComponent} from "src/app/pages/CrudMatch/create/createMatch.component";
import {ModalEditPlayerComponent} from 'src/app/plantillas/modalEditPlayer/modalEditPlayer.component';
import {ModalDeleteComponent} from 'src/app/plantillas/modalDelete/modalDelete.component';
import {ModalDetailsPlayerComponent} from 'src/app/plantillas/modalDetailsPlayer/modalDetailsPlayer.component';
import{DashboardTeamComponent} from 'src/app/pages/dashboardTeam/dashboardTeam.component';
import { DetailSeasonComponent} from 'src/app/pages/CrudSeason/detailSeason/detailSeason.component';
//import {DetailsMatchDaysComponent} from "src/app/pages/CrudMatchDays/details/detailsMatchDays.component"
//import{DetailsMatchDaysComponent} from "src/app/pages/CrudMatchDays/detailsMatchDays/detailsMatchDays.component";
import{DetailsMatchDaysComponent} from 'src/app/pages/CrudMatchDays/detailsMatchDays/detailsMatchDays.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import{ModalDetailsMatchComponent} from 'src/app/plantillas/modaldetailsmatch/modaldetailsmatch.component'
//import "pdfmake/build/pdfmake"
//import'pdfmake/build/vfs_fonts' ;
//const pdfMake = window["pdfMake"];
//pdfHacer. vfs = pdfFuentes. pdfHacer . vfs ;


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatTabsModule,
    DragDropModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatProgressSpinnerModule
    //BrowserModule,

   // BrowserAnimationsModule,

  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    PruebaComponent,
    HomeAdminComponent,
    IndexComponent,
    CreateComponent,
    ModalteamsComponent,
    ModalseasonComponent,
    IndexSeasonComponent,
    CreateSeasonComponent,
    IndexPlayerComponent,
    CreatePlayerComponent,
    ModalImagePlayerComponent,
    ModalPlayerComponent,
    ModalReleasePlayerComponent,
    CedulaComponent,
    ReporteCedulaComponent,
    CreateMatchDaysComponent,
    IndexMatchDayComponent,
    ModalAddMatchesComponent,
    DetailsTeamComponent,
    ModalDeletePlayerComponent,
    CreateMatchComponent,
    DetailSeasonComponent,
   // DetailsMatchDaysComponent,
   DetailsMatchDaysComponent,
   DashboardComponent,
   DashboardTeamComponent, 
   ModalDetailsMatchComponent,


  ],

   entryComponents : [ModalteamsComponent,
  ModalDeletePlayerComponent,
  ModalImagePlayerComponent,
  ModalReleasePlayerComponent,
  ModalDeleteComponent,
  ModalAddMatchesComponent,
  ModalDeletePlayerComponent,
  ModalDetailsPlayerComponent,
  ModalEditPlayerComponent,
  ModalseasonComponent,
],

})

export class AdminLayoutModule {}
