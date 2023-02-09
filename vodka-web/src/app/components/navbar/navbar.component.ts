import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { User,RespLogin  } from '../../../shared/interfaces';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  userName: string;
  user: RespLogin;
  constructor(location: Location,  private element: ElementRef, private router: Router) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.getLogin();
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

  logout(){

    sessionStorage.removeItem("dataLogin");
    sessionStorage.removeItem("dataLoginAll");

    this.router.navigate(['/login']);
    return false;

  }

  getLogin(){
    //Con esto vas a obtener los datos del usuario
   const login = JSON.parse(sessionStorage.getItem('dataLoginALl'))
   const user = login.user
   this.userName = user.name
  }

  RedirectoHome(){

    this.user = JSON.parse(sessionStorage.getItem('dataLoginALl'));
    
    if (this.user.role == "captain") {
      this.router.navigate([`${'dashboardTeam'}`]);
      

    } else if (this.user.role == "admin") {

      
      this.router.navigate([`${'home-admin'}`]);
    }



  }


}
