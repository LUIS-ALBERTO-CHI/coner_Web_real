import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { RespLogin } from "src/shared/interfaces";
import { animate, keyframes, style, transition, trigger } from "@angular/animations";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}

export const ROUTES: RouteInfo[] = [
  // { path: '/prueba', title: 'Prueba',  icon: 'ni-tv-2 text-primary', class: '' },
  // { path: '/icons', title: 'Jornadas',  icon:'jornada', class: '' },
  // { path: '/maps', title: 'Estadísticas',  icon:'ni-pin-3 text-orange', class: '' },
  // { path: '/user-profile', title: 'Jugadores',  icon:'ni-single-02 text-yellow', class: '' },
  //{ path: '/tables', title: 'Eventos',  icon:'ni-bullet-list-67 text-red', class: '' },
  { path: "/index", title: "Equipos", icon: "teams", class: "" },
  { path: "/indexSeason", title: "Torneos", icon: "tournament", class: "" },
  { path: "/indexPlayer", title: "Jugadores", icon: "players", class: "" },
  //{ path: '/createMatchDays', title: 'Jornadas',  icon:'ni-bullet-list-67 text-red', class: '' },
  { path: "/indexMatchDay", title: "Jornadas", icon: "jornada", class: "" },
];

export const ROUTESCaptain: RouteInfo[] = [
  // { path: '/prueba', title: 'Prueba',  icon: 'ni-tv-2 text-primary', class: '' },
  // { path: '/icons', title: 'Jornadas',  icon:'jornada', class: '' },
  // { path: '/maps', title: 'Estadísticas',  icon:'ni-pin-3 text-orange', class: '' },
  // { path: '/user-profile', title: 'Jugadores',  icon:'ni-single-02 text-yellow', class: '' },
  //{ path: '/tables', title: 'Eventos',  icon:'ni-bullet-list-67 text-red', class: '' },
  { path: "/index", title: "Equipos", icon: "teams", class: "" },
  //{ path: '/indexSeason', title: 'Torneos',  icon:'tournament', class: '' },
  //{ path: '/indexPlayer', title: 'Jugadores',  icon:'players', class: '' },
  //{ path: '/createMatchDays', title: 'Jornadas',  icon:'ni-bullet-list-67 text-red', class: '' },
  //{ path: '/indexMatchDay', title: 'Jornadas',  icon:'jornada', class: '' },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('350ms',
          style({opacity: 1})
        )
      ]),
      transition(':leave', [
        style({opacity: 0}),
        animate('350ms',
          style({opacity: 1})
        )
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
        keyframes([
          style({transform: 'rotate(0deg)', offset: '0'}),
          style({transform: 'rotate(2turn)', offset: '1'})
        ])
        )
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  public menuItems: any[];
  public menuItems2: any[];
  public isCollapsed = true;
  collapsed = false;
  screenWidth = window.innerHeight;
  public respLogin: RespLogin;

  constructor(
    private router: Router,
    router2: Router,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    this.respLogin;
    iconRegistry.addSvgIcon(
      "teams",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/img/icons/sidebar/team.svg"
      )
    ),
      iconRegistry.addSvgIcon(
        "jornada",
        sanitizer.bypassSecurityTrustResourceUrl(
          "assets/img/icons/sidebar/jornada.svg"
        )
      ),
      iconRegistry.addSvgIcon(
        "tournament",
        sanitizer.bypassSecurityTrustResourceUrl(
          "assets/img/icons/sidebar/tournament.svg"
        )
      ),
      iconRegistry.addSvgIcon(
        "players",
        sanitizer.bypassSecurityTrustResourceUrl(
          "assets/img/icons/sidebar/players.svg"
        )
      );
  }

  ngOnInit() {
    this.respLogin = JSON.parse(sessionStorage.getItem("dataLoginALl"));

    if (this.respLogin.role == "captain") {
      this.menuPermissions();
      ///CAPTAIN
      this.menuItems2 = ROUTESCaptain.filter((menuItem) => menuItem);
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
      });
    }
    if (this.respLogin.role == "admin") {
      this.menuPermissions();
      ////ADMIN
      this.menuItems = ROUTES.filter((menuItem) => menuItem);
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
      });
    }
  }

  /////ADMIN
  isShown: boolean = false; // hidden by default
  //CAPITAN
  isShown2: boolean = false;
  menuPermissions() {
    if (this.respLogin.role == "captain") {
      this.isShown2 = true;
      this.isShown = false;
    } else if (this.respLogin.role == "admin") {
      this.isShown = true;
      this.isShown2 = false;
    }
  }

  toggleCollapse(): void{
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void{
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }
}
