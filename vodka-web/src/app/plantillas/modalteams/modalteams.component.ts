
import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamService } from 'src/services/team.service';
import { PhotoService } from 'src/services/photo.services';
import { Team, Photo } from 'src/shared/interfaces';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Player } from '../../../shared/interfaces';


@Component({
  selector: 'app-modalteams',
  templateUrl: './modalteams.component.html',
  styleUrls: ['./modalteams.component.scss'],

})

export class ModalteamsComponent implements OnInit {

  formpost: FormGroup;
  formPhoto: FormGroup
  imageSrc: string = '';
  base64: string = '';
  status: string;
  team: Team;
  photo: Photo;
  players: Player[];
  constructor(public dialogRef: MatDialogRef<ModalteamsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Team, private renderer: Renderer2, public service: TeamService,
    public snakbar: MatSnackBar, public servicePhoto: PhotoService) {
    this.restore();
    this.players = data.players;
    this.team = data;
    this.formpost = new FormGroup({
      id: new FormControl(this.team.id),
      t_name: new FormControl(this.team.t_name, [Validators.required]),
      Phone: new FormControl(''),//PENDIENTE VALIDAR EL TELEFONO
      Manager: new FormControl('', [Validators.required]),
      Email: new FormControl(''),//PENDIENTE VALIDAR EL CORREO
      t_city: new FormControl(this.team.t_city , [Validators.required]),
      t_descr: new FormControl(this.team.t_descr),
      t_emblem: new FormControl(this.team.t_emblem),
      file: new FormControl('', [Validators.required]),
      //fileSource: new FormControl('', [Validators.required]),
      t_yteam: new FormControl('0'),
      players: new FormControl(this.team.players),
      def_img: new FormControl(this.team.def_img)
    });



  }

  get f() {
    return this.formpost.controls;
  }

  ngOnInit(): void {

    if (this.formpost.get('t_emblem').value != "" && this.formpost.get('t_emblem').value != null) {
      this.imageSrc = "https://ligasabatinadefutbol.com.mx/media/bearleague/" + this.formpost.get('t_emblem').value;
      return
    }
    this.imageSrc = "https://javierbernabe.com/assets/placeholder.a5d787485902bed4d05c812cf18ecb6d.png";

  }

  onClickNO(): void {
    this.dialogRef.close();
  }

  onFileChange(event: any) {

    debugger
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);



      reader.onload = () => {

        let typeFile = file.type.split("/");
        //console.log(prueba[1]);
        this.imageSrc = reader.result as string;
        reader.readAsBinaryString;

        this.photo.ph_filename = file.name;
        this.photo.extension = typeFile[1];
        this.photo.imageStringBase64 = reader.result.toString();

      };

    }
  }

  // AddPhoto() {

  //   this.servicePhoto.register(this.photo).subscribe((respPhoto: Photo) => {
  //     this.team.def_img = respPhoto.id;
  //     this.team.t_emblem = respPhoto.ph_filename;
  //     console.log(respPhoto);

  //   });
  // }


  AddTeams(form: Team) {
    debugger
    //console.log(form)

    if (form.id) {

      //EDITAR SOLO EQUIPO
      if (this.photo.ph_filename === '') {
        this.service.edit(form.id, form).subscribe((resp: Team) => {
          //Entonces ya edito
          if (resp.id != 0) {
            this.dialogRef.close();
            this.snakbar.open('¡Equipo actualizado con éxito!', '', {
              duration: 5000,
              //panelClass : ['snackcolorchange']
            });
          }
          //console.log(resp);
        });
      }
       if (this.photo.ph_filename != '') {
          //falta una validación si cuando registra un jugador y no tiene imagen, y luego lo quiere subi imagen
        //es null o no existe def_img -> id de la imagen
        //y también en jugadores
        //register de photo, y dentro de edit de jugador (como el registro)


        this.servicePhoto.register(this.photo).subscribe((respPhoto: Photo) => {
          //ESTO YA EDITO ENTONCES respPhoto = respuesta que es un objeto
         // if (respPhoto.id != 0) {
            //id siempre va ser diferente de 0
            //Ese objeto que tu optines te va regresar un objeto y de ese objeto vaz a extraer el nombre del archivo
            // y el id
            form.t_emblem = respPhoto.ph_filename;
            form.def_img = respPhoto.id;
            this.service.edit(form.id, form).subscribe((resp: Team) => {
              //Entonces ya edito
              if (resp.id != 0) {
                this.dialogRef.close();
                this.snakbar.open('¡Equipo actualizado con éxito!', '', {
                  duration: 5000
                });
              }
              //console.log(resp);
            });
         // }

        });


      } else {


        //ESTO SERA UN POSTE EN VEZ DE UN EDIT//////////////////////







        // this.service.edit(form).subscribe((resp: Team) => {

        //   if (resp.id != null) {
        //     this.dialogRef.close();
        //     this.snakbar.open('Equipo actualizado con exito', '', {
        //       duration: 2000
        //     });
        //   }

        //   console.log(resp);
        // });


      }
    }else {
        //REGISTRO
        this.servicePhoto.register(this.photo).subscribe((respPhoto: Photo) => {

          if (respPhoto.id != null) {

            form.t_emblem = respPhoto.ph_filename;
            form.def_img = respPhoto.id;
            this.service.register(form).subscribe((resp: Team) => {

              if (resp.id != null) {
                this.dialogRef.close();
                this.snakbar.open('¡Equipo registrado con éxito!', '', {
                  duration: 5000
                });
              }
              //console.log(resp);
            });
          }

        });

    }
  }
  //Primero se ejecuta esto y no se porque :v

  // }


  restore() {
    this.team = {
      id: 0,
      t_name: '',
      t_descr: '',
      t_yteam: '0',
      def_img: 0,
      t_emblem: '',
      t_city: '',
      players: [],
      isSelected: false,
      numberPlayers: 0,
      idUrl: "",
      route: "",
      selected: false,
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
