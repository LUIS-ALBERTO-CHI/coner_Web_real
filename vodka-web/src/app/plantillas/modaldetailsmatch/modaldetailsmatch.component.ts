import { Component, OnInit,Inject } from '@angular/core';
import{MatchEventService} from "src/services/matchevent.service";
import{MatchService} from "src/services/match.service";
import{PlayerService} from "src/services/player.service";
import{Match, MatchDay, MatchEvents, Player} from "src/shared/interfaces";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { matchEvents } from '../../../shared/interfaces';
import { TeamService } from '../../../services/team.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modaldetailsmatch',
  templateUrl: './modaldetailsmatch.component.html',
  styleUrls: ['./modaldetailsmatch.component.scss']
})

export class ModalDetailsMatchComponent implements OnInit {


  form: FormGroup;
  match: Match;
  idMatch: number;
  matcheventsTeam1: MatchEvents[];
  matcheventsTeam2: MatchEvents[];

  matchEvents: MatchEvents[];


  constructor(public matchEventService:MatchEventService,public matchService: MatchService,public playerService: PlayerService,public dialogRef: MatDialogRef<ModalDetailsMatchComponent>, @Inject(MAT_DIALOG_DATA) public id: number,)
  {

    this.match;
    this.idMatch = id;
    this.matcheventsTeam1=[];
    this.matcheventsTeam2=[];
    this.form= new FormGroup({

    });


  }

  ngOnInit(): void {
  }


  load(){


    this.matchService.detail(this.idMatch).subscribe((match: Match) =>{

     this.match=match;
     this.match.logoTeam1 = match.team1.t_emblem;
     this.match.logoTeam2 = match.team2.t_emblem;
     this.match.nameTeam1 = match.team1.t_name;
     this.match.nameTeam2 = match.team2.t_name;

    });

    this.matchEventService.getItemsxModel(this.idMatch).subscribe(resp =>{

      this.matchEvents = resp.data;

      this.matchEvents.forEach(element => {

        if(element.t_id == this.match.team1.id.toString()){

          this.matcheventsTeam1.push(element);

          this.matcheventsTeam1.forEach(element2 => {


            this.playerService.detail(parseInt(element2.player_id)).subscribe((player: Player)=>{

              element2.namePlayer = player.first_name;

            });


          });
        }else{

          this.matcheventsTeam2.push(element);

          this.matcheventsTeam2.forEach(element3 => {


            this.playerService.detail(parseInt(element3.player_id)).subscribe((player: Player)=>{

              element3.namePlayer = player.first_name;

            });


          });

        }

        });




    });



  }

}
