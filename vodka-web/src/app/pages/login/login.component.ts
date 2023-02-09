import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { Event, User } from 'src/shared/interfaces';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';


//import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})
export class LoginComponent implements OnInit {
  events: Event[];
  error: boolean;

  users: FormGroup;
  user: User;
  constructor(public service: UserService, private router: Router) {
    this.restore();
    this.users = new FormGroup({
      email: new FormControl(this.user.email),
      password: new FormControl(this.user.password)
    });


  }

  ngOnInit() {

  }



  login(form: User) {

    debugger
    //console.log(form);
    this.service.login(form).subscribe(resp => {
      //console.log(resp);
      if (resp.role == "captain") {
        this.router.navigate([`${'dashboardTeam'}`]);
        sessionStorage.setItem('dataLogin', JSON.stringify(resp.moder));
        sessionStorage.setItem('dataLoginALl', JSON.stringify(resp));

      } else if (resp.role == "admin") {

        sessionStorage.setItem('dataLoginALl', JSON.stringify(resp));
        this.router.navigate([`${'home-admin'}`]);
      }

      //console.log(resp);
      //La respuesta es la que tengo que guardar en mi sesion storage
    });

  }


  //antiguo borra la correo o contraseña

  login2() {
    if (this.users.invalid) {
      this.error = true;
      return;
    }
    this.user = this.users.value;
    console.log(this.user);
    if (this.user.email == "jl.lira@live.com.mx") {
      this.router.navigate([`${'home-admin'}`]);
    }
    if (this.user.email == "Encargado") {
      this.router.navigate([`${'dashboardTeam'}`]);
    }

  }

  restore() {
    this.user = {
      email: '',
      password: '',
    }
  }
}
