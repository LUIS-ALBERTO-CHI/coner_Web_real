import { Component, OnInit, Inject, Renderer2 } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PlayerService } from "src/services/player.service";
import { PhotoService } from "src/services/photo.services";
import { Player, Photo, Position, Team } from "src/shared/interfaces";
import { MatSnackBar, MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-modalImgPlayer",
  templateUrl: "./modalImgPlayer.component.html",
  styleUrls: ["./modalImgPlayer.component.scss"],
})
export class ModalImagePlayerComponent implements OnInit {
  today: Date = new Date();
  pipe = new DatePipe("en-US");
  formpost: FormGroup;
  formPhoto: FormGroup;
  imageSrc: string = "";
  base64: string = "";
  status: string;
  player: Player;
  playerPost: Player;
  photo: Photo;
  idPlayer: number;
  file: string = "";
  team: Team;
  position: Position;

  constructor(
    public dialogRef: MatDialogRef<ModalImagePlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Player,
    private renderer: Renderer2,
    public service: PlayerService,
    public snakbar: MatSnackBar,
    public servicePhoto: PhotoService
  ) {
    this.restore();
    this.player = data;
    this.position;
    this.team;

    this.formpost = new FormGroup({
      id: new FormControl(this.player.id),
      first_name: new FormControl(this.player.first_name),
      last_name: new FormControl(this.player.last_name), //PENDIENTE VALIDAR EL TELEFONO
      def_img: new FormControl(this.player.def_img),
      player_number: new FormControl(this.player.player_number),
      nick: new FormControl(this.player.nick), //PENDIENTE VALIDAR EL CORREO
      //created_at: new FormControl(this.player.created_at),
      position_id: new FormControl(this.player.position_id),
      about: new FormControl(this.player.about),
      //updated_at: new FormControl(this.player.updated_at),
      team_id: new FormControl(this.player.team_id),
      photoName: new FormControl(this.player.photoName),
      extension: new FormControl(this.player.extension),
      curp: new FormControl(this.player.curp),
      positionName: new FormControl(this.player.positionName),
      file: new FormControl('', [Validators.required]),
    });
  }

  get f() {
    return this.formpost.controls;
  }

  ngOnInit(): void {
    //this.validationsPlayer();
    if(this.player.photos == undefined){
      this.player.photos = []
    }
    if (this.formpost.get('photoName').value != "" && this.formpost.get('photoName').value != null) {
      this.imageSrc = "https://ligasabatinadefutbol.com.mx/media/bearleague/" + this.formpost.get('photoName').value;
      return
    }
    this.imageSrc = "/assets/img/noimage.png";
    if (this.player.photos.length > 0) {
      //console.log(this.player.photos);
      this.photo = this.player.photos[0];
      this.player.photoName = this.photo.ph_filename;
      this.imageSrc =
        "https://ligasabatinadefutbol.com.mx/media/bearleague/" +
        this.player.photoName;
    }


  }

  onClickNO(): void {
    this.dialogRef.close();
  }

  onFileChange(event: any) {
    console.log(this.formpost.controls);

    debugger;
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
          photoName: file1.name,
        });
        this.photo = {
          id:0,
          ph_filename:file1.name,
          imageStringBase64:reader.result as string,
          extension: typeFile[1],
          ph_descr: '',
          ph_name:''
        }
      };
    }
  }

  AddPhoto(form: Player) {
    if (form.id && form.curp) {
      //editar solo al jugador
      if (!form.photoName) {
        this.service.edit(form.id, form).subscribe((resp: Player) => {
          //editar la información del jugador
          if (resp.id != 0) {
            this.dialogRef.close();
            this.snakbar.open("¡Jugador actualizado con éxito!", "", {
              duration: 5000,
              //panelClass : ['snackcolorchange']
            });
          }
        });
      }
      //ya esta registrado y quiere subir la imagen
      if (
        this.photo &&
        this.photo.ph_filename != "" &&
        this.photo.ph_filename != null
      ) {
        //para editar la foto
        this.servicePhoto.register(this.photo).subscribe((respPhoto: Photo) => {
          console.log(respPhoto);
          const photos = [];
          photos.push(respPhoto)
          form.photos = photos;
          form.def_img = respPhoto.id;
          this.service.edit(form.id, form).subscribe((respPlayer: Player) => {
            console.log(respPlayer);
            if (respPlayer.id != 0) {
              this.dialogRef.close();
              this.snakbar.open("¡Jugador actualizado con éxito!", "", {
                duration: 5000,
              });
            }
          });
        });
      } else {
        //registrar al jugador y la foto
        this.servicePhoto.register(this.photo).subscribe((respPhoto: Photo) => {
          if (respPhoto.id != 0) {
            const photos = [];
            photos.push(respPhoto)
            form.photos = photos;
            console.log(form.photos)
            form.def_img = respPhoto.id;
            this.service.edit(form.id, form).subscribe((respPlayer: Player) => {
              if (respPlayer.id != 0) {
                this.dialogRef.close();
                this.snakbar.open("¡Jugador actualizado con éxito!", "", {
                  duration: 5000,
                });
              }
            });
          }
        });
      }
    }
  }

  // EditPlayer(form: Player) {
  //   debugger
  //   this.service.edit(this.player.id, form).subscribe((resp: Player) => {
  //     //console.log(resp);
  //     if (resp.id != 0) {
  //       this.dialogRef.close();
  //       this.snakbar.open('¡Jugador actualizado con éxito!', '', {
  //         duration: 5000
  //       });
  //     }
  //     //console.log(resp);
  //   });
  // }

  // validationsPlayer() {
  //   if (this.player.curp != null) {
  //     this.player.curp = 'Sin curp'
  //   }
  // }

  restore() {
    let fecha = this.pipe.transform(Date.now(), "dd/MM/yyyy");
    const date = new Date(fecha);

    //console.log(date);

    this.player = {
      id: 0,
      first_name: "",
      last_name: "",
      nick: "",
      about: "",
      position_id: 0,
      def_img: 0,
      team_id: 0,
      //created_at: date,
      //updated_at: date,
      isSelected: false,
      player_number: 0,
      image: "",
      status: "",
      curp: "",
      extension: "",
      photoName: "",
      photos: [],
      photo: [],
      position: this.position,
      team: this.team,
      positionName: "",
      //PhotoNameTeam: '',
    };

    this.photo = {
      id: 0,
      ph_name: "",
      ph_descr: "",
      ph_filename: "",
      imageStringBase64: "",
      extension: "",
    };
  }
}
