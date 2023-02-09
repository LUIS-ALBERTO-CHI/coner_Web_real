import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlayerService } from 'src/services/player.service';
import { PhotoService } from 'src/services/photo.services';
import { Player, Photo, Position, Team, Season } from 'src/shared/interfaces';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailPlayer',
  templateUrl: './detailPlayer.component.html',
  styleUrls: ['./detailPlayer.component.scss']
})
export class DetailPlayerComponent implements OnInit {

  today: Date = new Date();
  pipe = new DatePipe('en-US');
  formpost: FormGroup;
  formPhoto: FormGroup
  imageSrc: string = '';
  base64: string = '';
  status: string;
  player: Player;
  playerPost: Player;
  photo: Photo;
  idPlayer: number;
  file: string = '';
  team: Team;
  position: Position;
  posicion: string = "";
  season: Season;
  playersTeam: Player[];


  constructor(public dialogRef: MatDialogRef<DetailPlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Player, private renderer: Renderer2, public service: PlayerService,
    public snakbar: MatSnackBar, public servicePhoto: PhotoService, private route: ActivatedRoute,) {
    this.restore();
    this.player = data;
    this.position;
    this.team;


    this.formpost = new FormGroup({

      first_name: new FormControl(this.player.first_name),
      last_name: new FormControl(this.player.last_name),//PENDIENTE VALIDAR EL TELEFONO
      //def_img: new FormControl(this.player.def_img),
      player_number: new FormControl(this.player.player_number),
      nick: new FormControl(this.player.nick),//PENDIENTE VALIDAR EL CORREO
      //created_at: new FormControl(this.player.created_at),
      position_id: new FormControl(this.player.position_id),
      about: new FormControl(this.player.about),
      //updated_at: new FormControl(this.player.updated_at),
      team_id: new FormControl(this.player.team_id),
      photoName: new FormControl(this.player.photoName),
      extension: new FormControl(this.player.extension),
      curp: new FormControl(this.player.curp),
      positionName: new FormControl(this.player.positionName)


    });



  }

  get f() {
    return this.formpost.controls;
  }

  ngOnInit(): void {

    this.photo = this.player.photos[0];
    this.player.photoName = this.photo.ph_filename;
    this.imageSrc = "https://ligasabatinadefutbol.com.mx/media/bearleague/" + this.player.photoName;
    this.posicion = "" + this.player.positionName;
    // if (this.formpost.get('photoName').value != "" && this.formpost.get('photoName').value != null) {
    //   this.imageSrc = "https://ligasabatinadefutbol.com.mx/media/bearleague/" + this.formpost.get('photoName').value;
    //   console.log(this.imageSrc);
    //   return
    // }
    this.player.first_name;
    this.player.last_name;
    this.player.positionName;
    this.player.nick;
    this.player.status;

  }


  addStorageSeason(form: Player) {
    debugger;

    localStorage.setItem("player", JSON.stringify(form));

    if (localStorage != null) {
      this.dialogRef.close();
      this.snakbar.open("Configuraciones guardadas", "", {
        duration: 2000,
      });
    }
  }

  onClickNO(): void {

    this.dialogRef.close();


  }

  onFileChange(event: any , file : string) {

    debugger
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file1] = event.target.files;
      reader.readAsDataURL(file1);



      reader.onload = () => {

        let typeFile = file1.type.split("/");
        //console.log(prueba[1]);
        this.imageSrc = reader.result as string;
        reader.readAsBinaryString;

        this.formpost.patchValue({
          image: reader.result,
          extension: typeFile[1],

        });

      };

    }
  }

  AddPhoto() {
      this.servicePhoto.register(this.photo).subscribe((respPhoto: Photo) => {
        //this.player.def_img = respPhoto.id;
       //this.team.t_emblem = respPhoto.ph_filename;
        console.log(respPhoto);
      });
  }


  EditPlayer(form: Player) {
    debugger
    var idPlayer = parseInt(this.route.snapshot.paramMap.get('id'));

    this.service.getItemsxModel(idPlayer).subscribe(players => {
      this.playersTeam = players.data;
    })

  }


  restore() {

    let fecha = this.pipe.transform(Date.now(), 'dd/MM/yyyy');
    const date = new Date(fecha);

    console.log(date);

    this.player = {
      id: 0,
      first_name: '',
      last_name: '',
      nick: '',
      about: '',
      position_id: 0,
      def_img: 0,
      team_id: 0,
      //created_at: date,
      //updated_at: date,
      isSelected: false,
      player_number: 0,
      image: '',
      status:'',
      curp:'',
      extension:'',
      photoName: '',
      photos: [],
      photo:[],
      position: this.position,
      team: this.team,
      positionName: '',

    }

    this.photo = {
      id: 0,
      ph_name: '',
      ph_descr: '',
      ph_filename: '',
      imageStringBase64: '',
      extension: '',
    }
  }

}
