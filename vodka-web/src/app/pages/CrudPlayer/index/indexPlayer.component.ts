import { Component, OnInit } from '@angular/core';
import { Player,Team, Respuesta, Pagination, Photo } from 'src/shared/interfaces';
import { Router, ActivatedRoute } from '@angular/router';
import { TeamService } from 'src/services/team.service';
import{PlayerService} from 'src/services/player.service';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { MatDialog, MatDialogState } from '@angular/material/dialog';
import{ModalReleasePlayerComponent} from 'src/app/plantillas/modalReleasePlayer/modalReleasePlayer.component';
import{ModalImagePlayerComponent} from 'src/app/plantillas/modalimageplayer/modalImgPlayer.component';
import{ModalPlayerComponent} from 'src/app/plantillas/modalPlayer/modalPlayer.component';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { element } from 'protractor';
import { ModalEditPlayerComponent } from '../../../plantillas/modalEditPlayer/modalEditPlayer.component';
import { flip } from '@popperjs/core';
import { ModalDetailsPlayerComponent } from '../../../plantillas/modalDetailsPlayer/modalDetailsPlayer.component';

@Component({
  selector: 'app-index-player',
  templateUrl: './indexPlayer.component.html',
  styleUrls: ['./indexPlayer.component.scss']
})
export class IndexPlayerComponent implements OnInit {

  form: FormGroup;

  pagina: FormGroup;
  teams: Team[];
  players: Player[];
  playersData: Player[];
  error: boolean;
  events: Event[];
  playersOriginal: Player[];
  CantidadElemento: number;
  pagination: Pagination;
  isLoginDialogOpen: boolean = false;
  photoPlayers: Photo[];
  photoPlayer: Photo[];
  routerlink: string;
  player: Player;


  constructor(private router: Router,
    private service: TeamService,
    public http: HttpClient,
    public dialog: MatDialog,
    public servicePlayer: PlayerService,
    public snakbar: MatSnackBar,
    private route: ActivatedRoute
    ) {
    this.error = false;
    this.teams = [];
    this.players=[];
    this.playersData=[];
    this.events = [];
    this.pagination;
    this.CantidadElemento = 25;
    this.photoPlayer;
    this.routerlink="";
    this.player;
    this.form = new FormGroup({
      first_name: new FormControl('')
    });

  }



  ngOnInit() {

    this.load()
  }
  //Hacer de nuevo la misma petición pero pasar
  //Pintar el Next_page_pagination(URL) en mi boton y con el onclik lanzar la peticion src , href cuando yo le de click al bton me debe realizar
  //la peticion y literal esa URL que pinte la tengo que regresar al evento y mandarla de nuevo


  load() {

    debugger
    //var id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.error = true;
    this.servicePlayer.list().subscribe(players => {
      this.players = players.data;

      //console.log(this.players);
      this.pagination = players.pagination;
    // this.servicePlayer.getItemsxModel(id).subscribe(players => {
    //   this.pagination = players.pagination;
    //   this.players = players.data;

      this.pagina = new FormGroup({
        link: new FormControl(this.pagination.next_page_url),
        linkprev: new FormControl(this.pagination.prev_page_url)
      })
      // console.log(this.teams);
      //
      this.playersOriginal = players.data;
      //console.log(this.teamsOriginal);
      this.validationsImageandPosition();
      //console.log(this.players)
    });

    //nombre del formcontrolname
    this.formControlName();

    //Cualquier cambio que suceda se vea reflejado
    // this.form.valueChanges.subscribe(valores => {
    //   if (!valores) return;
    //   this.players = this.playersOriginal;
    //   //this.searchPlayer(valores);

    //  // console.log(valores);
    // })

  }

  obtenerLink() {
    this.pagina.get('link').value;
    this.next(this.pagina.get('link').value)
  }

  obtenerLinkPrev() {
    this.pagina.get('linkprev').value;
    this.previous(this.pagina.get('linkprev').value)
  }


  next(LinkPagination: string) {
    if(LinkPagination == null) {
      this.snakbar.open('¡Esta es la última página!', '', {
        duration: 5000
      });
    }else{
      this.error = true;
    this.servicePlayer.getPagination(LinkPagination).subscribe(players => {
      this.players = players.data;
      this.pagination = players.pagination;
      this.playersOriginal = players.data;
      //console.log(this.pagination);
      this.validationsImageandPosition()
      this.pagina = new FormGroup({
        link: new FormControl(this.pagination.next_page_url),
        linkprev: new FormControl(this.pagination.prev_page_url)
      })
    });
    }
    this.form.valueChanges.subscribe(valores => {
      if (!valores) return;
      this.players = this.playersOriginal;
      //this.searchPlayer(valores);
     // console.log(valores);
    })
  }



  previous(LinkPagination: string) {
    if(LinkPagination == null){
      this.snakbar.open('¡Esta es la primera página!', '', {
        duration: 5000
      });
    }else{
      this.error = true;
      this.servicePlayer
        .getPaginationPrevious(LinkPagination)
        .subscribe((players) => {
          this.players = players.data;
          this.pagination = players.pagination;
          this.playersOriginal = players.data;
          // console.log(this.players);
          this.validationsImageandPosition();
          this.pagina = new FormGroup({
            link: new FormControl(this.pagination.next_page_url),
            linkprev: new FormControl(this.pagination.prev_page_url),
          });
        });
    }
    this.form.valueChanges.subscribe(valores => {
      if (!valores) return;
      this.players = this.playersOriginal;
      //this.searchPlayer(valores);
     // console.log(valores);
    })
  }

  //para cedula
  // searchPlayer(valores: any) {
  //   //console.log(valores);
  //   if (valores.first_name) {
  //     this.players = this.players.filter(t => t.first_name.toLowerCase().includes(valores.first_name.toLowerCase()) );
  //   }
  // }

  findPlayers() {
    //busqueda para todas las paginas
    const name = this.form.get('first_name').value;
    this.servicePlayer.getItemsxName(name).subscribe((player) => {
      if (player.data == null) {
        this.snakbar.open("No existen registros con ese nombre", "", {
          duration: 3000,
        })
      }
      if (name != null) {
        this.players.splice(0, this.players.length);
        this.players.push(...player.data);
        this.validationsImageandPosition();
        this.toggleShow();
      }
    })

  }

  isShown: boolean = false; // hidden by default

  toggleShow() {
    const name = this.form.get('first_name').value
    if (name != "") {
      this.isShown = true;
    }
    else {
      this.isShown = false;
    }
  }

  deleteSearch() {
    //Cualquier cambio que suceda se vea reflejado
    this.form.valueChanges.subscribe(valores => {
      if (!valores) return;
      //this.players = this.playersOriginal;
      this.toggleShow();
      //console.log(valores);
    })
  }

  formControlName(){
    this.form.patchValue({
      first_name: '',
    });
    const name = this.form.get('first_name').value;
    if (name == "") {
      this.toggleShow();
    }
  }



  openDialogPhoto(idPlayer: number): void {
    debugger
    //PRIMERO CONSULTAMOS LOS DATOS DEL TEAM A EDITAR MEDIANTE DETAIL DEL SERVICIO
    this.servicePlayer.detail(idPlayer).subscribe((player: Player) => {
      if (this.isLoginDialogOpen) {
        return;
      }

      this.isLoginDialogOpen = true;
      const dialogRef = this.dialog.open(ModalImagePlayerComponent,
        {
          width: '550px',
          height: '570px',
          data: player,
        });
      if(dialogRef.getState() === MatDialogState.OPEN ){


      }
      dialogRef.afterClosed().subscribe(res => {
        //console.log(res);
        this.isLoginDialogOpen = false;
        this.load();
      });

    });


  }


  openDialogCreate(): void {
    debugger

    if (this.isLoginDialogOpen) {
      return;
    }

    this.isLoginDialogOpen = true;
    const dialogRef = this.dialog.open(ModalPlayerComponent,
      {
        width: '1100px',
        height: '550px',
        data: '',
      });
    if(dialogRef.getState() === MatDialogState.OPEN ){
    }
    dialogRef.afterClosed().subscribe(res => {
      //console.log(res);
      this.isLoginDialogOpen = false;
      this.load();
    });
  }

openDialogRelease(): void {
    debugger

    this.servicePlayer.get(this.CantidadElemento).subscribe(players => {
      this.playersData = players.data;
      //para que venga inactive
      this.playersData.find(p => p.status.toLowerCase() !== 'inactive')
      // console.log(this.players)

      if (this.isLoginDialogOpen) {
        return;
      }

      this.isLoginDialogOpen = true;
      const dialogRef = this.dialog.open(ModalReleasePlayerComponent,
        {
          width: '1050px',
          height: '1000px',
          data: this.playersData,
        });
      if(dialogRef.getState() === MatDialogState.OPEN ){


      }
      dialogRef.afterClosed().subscribe(res => {
        // console.log(res);
        this.isLoginDialogOpen = false;
        this.load();
      });

    });


  }

  openDialogUpdate(idPlayer: number): void {
    debugger
    if(this.isLoginDialogOpen){
      return;
    }
    this.servicePlayer.detail(idPlayer).subscribe((player: Player) => {
      // console.log(idPlayer);
      if(this.isLoginDialogOpen){
        return;
      }
      this.isLoginDialogOpen = true;
      const dialogRef = this.dialog.open(ModalEditPlayerComponent,
        {
          backdropClass: 'backdropmodal',
          width: '550px',
          height: '390px',
          data: player,
          panelClass: ['snackUpdate']
        }
      );
      // dialogRef.backdropClick().subscribe((event)=>{
      //   if(event){
      //     return
      //   }
      // })
      if(dialogRef.getState() === MatDialogState.OPEN){
      }
      dialogRef.afterClosed().subscribe(res => {
        // console.log(res);
        this.isLoginDialogOpen = false;
        this.load();
      })
    })
  }

  openDialogDetails(idPlayer: number): void{
    debugger
    if(this.isLoginDialogOpen){
      return;
    }
    this.servicePlayer.detail(idPlayer).subscribe((player: Player) => {
      if(this.isLoginDialogOpen){
        return;
      }
      this.isLoginDialogOpen = true;
      const dialogRef = this.dialog.open(ModalDetailsPlayerComponent,
        {
          width: '550px',
          height: '550px',
          data: player,
        }
      );
      if(dialogRef.getState() === MatDialogState.OPEN){
      }
      dialogRef.afterClosed().subscribe(res => {
        // console.log(res);
        this.isLoginDialogOpen = false;
        this.load();
       // window.location.reload();
      })
    })
  }

  validationsImageandPosition(){
    this.players.forEach(element => {
      const prueba = element.photos[0];
      if(!prueba){
       element.photoName = "/assets/img/noimage.png"
      }else{
       element.photoName = `https://ligasabatinadefutbol.com.mx/media/bearleague/${prueba.ph_filename}`
      }

      if(element.position != null){
        element.positionName = element.position.p_name;
       }else{
          element.positionName = 'Sin posición'
       }
      //element.photoName = prueba.ph_filename;
     });
  }
}
