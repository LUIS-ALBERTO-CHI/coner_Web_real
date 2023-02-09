import { Component, OnInit } from '@angular/core';
interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isSideNavCollapsed = false;
  screenWidth = window.innerHeight;
  
  onToggleSideNav({collapsed,screenWidth}: SideNavToggle): void{
    this.screenWidth = screenWidth;
    this.isSideNavCollapsed = collapsed
  }

  getBodyClass(): string {
    let margin = 'margin-left: 80px';
    if(this.isSideNavCollapsed && this.screenWidth > 768){
      margin = "margin-left: 265px"
    }else if(this.isSideNavCollapsed && this.screenWidth <= 768 && this.screenWidth > 0){
      margin = "margin-left: 265px"
    }
    return margin + '!important;transition: all .5s ease;';

  }

}
