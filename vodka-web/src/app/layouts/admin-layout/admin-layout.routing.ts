import { Routes } from '@angular/router';
import{PruebaComponent} from '../../pages/prueba/prueba.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import{HomeAdminComponent} from '../../pages/home-admin/home-admin.component';
import {IndexComponent} from '../../pages/CrudTeams/index/index.component';
import {CreateComponent} from '../../pages/CrudTeams/create/create.component';
import {IndexSeasonComponent} from '../../pages/CrudSeason/index/indexSeason.component';
import{CreateSeasonComponent} from '../../pages/CrudSeason/create/createSeason.component';
import{IndexPlayerComponent} from '../../pages/CrudPlayer/index/indexPlayer.component';
import{CreatePlayerComponent} from '../../pages/CrudPlayer/create/createPlayer.component';
import{CedulaComponent} from '../../pages/CrudPlayer/cedula/cedula.component';
import{ReporteCedulaComponent} from '../../Reportes/reporteCedula/reporteCedula.component';
import{CreateMatchDaysComponent} from '../../pages/CrudMatchDays/createMatchDays/createMatchDays.component';
import{IndexMatchDayComponent} from '../../pages/CrudMatchDays/indexMatchDay/indexMatchDay.component';
import{DetailsTeamComponent} from "src/app/pages/CrudTeams/detailsTeam/detailsTeam.component";
import{CreateMatchComponent} from "src/app/pages/CrudMatch/create/createMatch.component";
import{DetailsMatchDaysComponent} from "src/app/pages/CrudMatchDays/detailsMatchDays/detailsMatchDays.component";
import{DashboardTeamComponent} from "src/app/pages/dashboardTeam/dashboardTeam.component"
import {DetailSeasonComponent} from 'src/app/pages/CrudSeason/detailSeason/detailSeason.component';



export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'prueba',         component: PruebaComponent },
    { path: 'index',         component: IndexComponent },
    { path: 'home-admin',    component: HomeAdminComponent },
    { path: 'create',    component: CreateComponent },
    { path: 'indexSeason',    component: IndexSeasonComponent },
    { path: 'createSeason',    component: CreateSeasonComponent },
    //{ path: 'detailSeason',    component: DetailSeasonComponent },
    { path: 'indexPlayer',    component: IndexPlayerComponent },
    { path: 'createPlayer/:id',    component: CreatePlayerComponent },
    { path: 'cedula/:id',    component: CedulaComponent },
    //{ path: 'reporteCedula/',    component: ReporteCedulaComponent },
    { path: 'reporteCedula/:id',    component: ReporteCedulaComponent },
    {path: 'createMatchDays',    component: CreateMatchDaysComponent },
    {path: 'indexMatchDay',    component: IndexMatchDayComponent },
    {path: 'detailsTeam/:id',    component: DetailsTeamComponent },
    {path: 'createMatch/:id',    component: CreateMatchComponent },
    {path: 'detailsMatchDays/:id',    component: DetailsMatchDaysComponent },
    {path: 'dashboardTeam',    component: DashboardTeamComponent },
    {path: 'detailSeason/:id', component: DetailSeasonComponent}  


];

