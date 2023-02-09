import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialog, MatDialogState } from "@angular/material/dialog";
import { Season, Pagination, Team, Player, Position, PlayerArray, Moder, Photo, PlayerxTeam } from "src/shared/interfaces";
import { SeasonService } from "src/services/season.service";
import { TeamService } from "src/services/team.service";
import { PlayerService } from "src/services/player.service";
import { PositionService } from "src/services/position.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, FormArray, FormBuilder } from "@angular/forms";
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-cedula',
  templateUrl: './cedula.component.html',
  styleUrls: ['./cedula.component.scss']
})
export class CedulaComponent implements OnInit, AfterViewInit {

  team: Team;
  routeCedula: string;
  player1: PlayerArray;
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  itemsPlayer: [];
  player: Player;
  players: Player[];
  playerPost: Player[];
  playersActive: number[];
  positions: Position[];
  error: boolean;
  playersOriginal: Player[];
  limit: number;
  pagination: Pagination; //--\\
  isLoginDialogOpen: boolean = false;
  playersSelected: Player[];
  teamsId: number[];
  form: FormGroup;
  status: boolean;
  pagina: FormGroup;
  teamsLogin: Team[];
  moderLogin: Moder[];
  prueba: Photo;
  position: Position;
  scrollingSubscription: any
  detailsTeam: string;
  scrollObserver: any;
  @ViewChildren('theLastList', { read: ElementRef })
  theLastList: QueryList<ElementRef>;
  constructor(
    private router: Router,
    private service: SeasonService,
    public dialog: MatDialog,
    public teamService: TeamService,
    public snakbar: MatSnackBar,
    public servicePlayer: PlayerService,
    public servicePosition: PositionService,
    public route: ActivatedRoute,

  ) {

    this.position;
    this.team;
    this.routeCedula="";
    this.moderLogin = [];
    this.teamsLogin = [];
    this.status = true;
    this.player1 = { players: [0] };
    this.itemsPlayer = [];
    this.playersOriginal = [];
    this.error = false;
    this.player;
    this.players = [];
    this.playersActive = [0];
    this.positions;
    this.teamsId = [];
    this.pagination;
    this.limit = 25;
    this.playersSelected = [];
    this.playerPost = []
    this.restore();


    this.form = new FormGroup({
      first_name: new FormControl(""),
    });

    this.prueba;
  }
  ngAfterViewInit(): void {
    this.theLastList.changes.subscribe((d) => {
      //console.log(d);
      if (d.last) this.scrollObserver.observe(d.last.nativeElement);
    });
  }

  intersectionObserver() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };
    this.scrollObserver = new IntersectionObserver((entries) => {
      console.log(this.scrollObserver)
      if (entries[0].isIntersecting) {
        if (this.pagination.next_page_url != null) {
          console.log(this.pagina)
          this.obtenerLink()
        }
      }
    }, options);
    //console.log(options)
  }


  ngOnInit(): void {
    this.load();
  }



  load() {
    debugger

    var idTeam = parseInt(this.route.snapshot.paramMap.get('id'));
    this.routeCedula = "/reporteCedula/" + idTeam;
    //PENDIENTE YA QUE DEBE TRAER POR REPORTE CEDULA LOS 25 JUGADORES DEPENDIENDO DE SU EQUIPO
    this.servicePlayer.getItemsxModelLimit(idTeam).subscribe(players => {
      //this.team = team;

      this.players = players.data.filter(p => p.status.toLowerCase() === 'for-validate' && p.curp != null);
      this.playersOriginal = this.players


      this.form.valueChanges.subscribe(valores => {
        if (!valores) return;
        this.players = this.playersOriginal;
        this.findPlayers(valores);
      });
      //VERIFICAR LA MANERA DE QUE ME MUESTRE ACTIVE Y LOS QUE APARECEN SELECCIONADOS
      this.playersSelected = players.data.filter(p => p.status.toLowerCase() === 'active');
      if (this.playersSelected.length == undefined) {

        this.playersSelected = [];
      }
      this.pagination = players.pagination
      this.playersSelected.forEach(element => {

        if (element.position != null) {
          element.positionName = element.position.p_name;
        } else {
          element.positionName = 'Sin posición'
        }

        if (element.photos.length > 0) {
          var prueba = element.photos[0];
          if (!prueba) {
            element.photoName = "assets/img/noimage.png"
          } else {
            element.photoName = `https://ligasabatinadefutbol.com.mx/media/bearleague/${prueba.ph_filename}`;
          }
        } else {

          element.photoName = "assets/img/noimage.png"

        }
        if (!this.team) {
          this.team = element.team;
          //console.log(this.team);
          this.detailsTeam = "/detailsTeam/" + this.team.id;
        }
        if (this.player.curp != null) {
          this.player.curp = this.player.curp;
        } else {
          this.player.curp = "Sin curp"
        }
        if (this.player.nick != '') {
          this.player.nick = this.player.nick;
        } else {
          this.player.nick = "Sin nickname"
        }
      });

      ////////////////////////////////////
      this.players.forEach(element => {


        if (element.position != null) {
          element.positionName = element.position.p_name;
        } else {
          element.positionName = 'Sin posición'
        }

        if (element.photos.length > 0) {
          var prueba = element.photos[0];
          if (!prueba) {
            element.photoName = "assets/img/noimage.png"
          } else {
            element.photoName = `https://ligasabatinadefutbol.com.mx/media/bearleague/${prueba.ph_filename}`;
          }
        } else {

          element.photoName = "assets/img/noimage.png"

        }
        if (!this.team) {
          this.team = element.team;
          //console.log(this.team);
          this.detailsTeam = "/detailsTeam/" + this.team.id;
        }
        if (this.player.curp != null) {
          this.player.curp = this.player.curp;
        } else {
          this.player.curp = "Sin curp"
        }
        if (this.player.nick != '') {
          this.player.nick = this.player.nick;
        } else {
          this.player.nick = "Sin nickname"
        }


      });

      this.pagina = new FormGroup({
        link: new FormControl(players.pagination.next_page_url),
        linkprev: new FormControl(players.pagination.prev_page_url)
      })


    });

    // this.intersectionObserver();


  }

  // findPlayers(valores: any) {
  //   debugger
  //   if (valores.first_name) {
  //     this.players = this.players.filter(
  //       (t) => t.first_name.indexOf(valores.first_name) !== -1
  //     );
  //   }
  // }

  findPlayers(valores: any) {
    if (valores.first_name) {
      this.players = this.players.filter(p => p.first_name.indexOf(valores.first_name) !== -1);
    }
  }


  drop($event: CdkDragDrop<Player[]>) {
    debugger
    if ($event.previousContainer === $event.container) {
      moveItemInArray(
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
      );
    } else

      // $event.item.data.isSelected = true,
      //console.log($event.item.data.selected = true);

      transferArrayItem(
        $event.previousContainer.data, //De donde se recogio
        $event.container.data, //En donde se dejo
        $event.previousIndex,
        $event.currentIndex
      )

    // console.log($event.container.data)
    $event.container.data.forEach(element => {
      element.isSelected = true;
    });




    //console.log(this.playersSelected.length)

  }


  public noReturnPredicate(drag: CdkDrag<any>, drop: CdkDropList<any>) {
    if (
      drop.data && drop.data.length > 24) {

      return false;
    }
    return true;

  }

  AddPlayersActive() {

    debugger
    if (this.playersSelected.length == 11) {

      this.playersSelected.forEach(element => {

        if (element.status == "for-validate") {

          element.status = 'Active';

          this.servicePlayer.edit(element.id, element).subscribe((resp: Player) => {

            //console.log(resp);
            //PENDIENTE LA REDIRECCION
            //this.router.navigate([`${'reporteCedula'}`]);
            var idTeam = parseInt(this.route.snapshot.paramMap.get('id'));
            this.router.navigate([`${'reporteCedula/' + idTeam}`]);
            //console.log(this.router.navigate([`${'reporteCedula/' + idTeam}`]));
            //this.router.navigate(['/reporteCedula'], { queryParams: {idTeam} });
            //window.location.reload();

          });
        }


      });

    } else {

      this.snakbar.open('Necesita agregar 11 jugadores como mínimo', '', {
        duration: 3000
      });
    }
  }


  deleteItem(id: number) {
    debugger


    this.playersSelected.forEach(element => {

      if (element.status == "Active") {

        element.status = "for-validate";
        this.servicePlayer.edit(element.id, element).subscribe((resp: Player) => {


          if (resp.id == id) {
            this.players.unshift(resp);
          }

          //console.log(resp);
          //PENDIENTE LA REDIRECCION
          //this.router.navigate([`${'reporteCedula'}`]);
          //var idTeam = parseInt(this.route.snapshot.paramMap.get('id'));
          //this.router.navigate([`${'reporteCedula/' + idTeam}`]);
          //console.log(this.router.navigate([`${'reporteCedula/' + idTeam}`]));
          //this.router.navigate(['/reporteCedula'], { queryParams: {idTeam} });
          //window.location.reload();

        });

      } else {


        this.playersSelected.forEach(element => {

          if (element.id == id) {
            this.players.unshift(element);
          }


        });



      }

    });



    // this.playersSelected = this.playersSelected.filter((i) => i.id !== id);
    this.playersSelected = this.playersSelected.filter((i) => i.id !== id);







    // this.AddLocalStorage();
    // this.load();

  }

  // search(name: number) {
  //   this.servicePlayer.search(name).subscribe((player: Player) => {
  //     this.player = player;

  //   });

  // }
  obtenerLink() {
    this.pagina.get('link').value;
    this.next(this.pagina.get('link').value)
  }

  next(LinkPagination: string) {

    if (LinkPagination == null) {
      // this.snakbar.open('¡Esta es la última página!', '', {
      //   duration: 2000
      // });
    } else {
      this.error = true;
      this.servicePlayer.getPagination(LinkPagination).subscribe(players => {
        this.players.push(...players.data)
        this.pagination = players.pagination;
        //console.log(this.pagination);

        this.players.forEach(element => {
          var prueba = element.photos[0];
          if (!prueba) {
            element.photoName = "assets/img/noimage.png"
          } else {
            element.photoName = `https://ligasabatinadefutbol.com.mx/media/bearleague/${prueba.ph_filename}`
          }

          if (element.position != null) {
            element.positionName = element.position.p_name;
          } else {
            element.positionName = 'Sin posición'
          }
          //element.photoName = prueba.ph_filename;
        });
        //console.log(this.players)


        this.pagina = new FormGroup({
          link: new FormControl(this.pagination.next_page_url),
          linkprev: new FormControl(this.pagination.prev_page_url)
        })
      });
    }
  }


  search($event: any) {
    this.players = this.playersOriginal
    //console.log($event.target.value.toLowerCase())
    this.players = this.players.filter(p => p.first_name.toLocaleLowerCase().includes($event.target.value.toLowerCase()))
  }

  restore() {

    let fecha = this.pipe.transform(Date.now(), 'dd/MM/yyyy');
    const date = new Date(fecha);
    this.player = {
      id: 0,
      first_name: '',
      last_name: '',
      nick: '',
      about: 'x cosa',
      position_id: 0,
      team_id: 1,
      //created_at: date,
      //updated_at: date,
      def_img: 0,
      isSelected: false,
      player_number: 0,
      image: '',
      status: '',
      curp: '',
      extension: '',
      photoName: '',
      photos: [],
      photo: [],
      position: this.position,
      team: this.team,
      positionName: '',



    }
  }


}
