import { Component, OnInit } from '@angular/core';
import{MatchService} from "src/services/match.service";
import{MatchDayService} from "src/services/matchday.service";
import{Match,MatchDay} from "src/shared/interfaces";

@Component({
  selector: 'app-detailsMatch',
  templateUrl: './detailsMatch.component.html',
  styleUrls: ['./detailsMatch.component.scss']
})
export class DetailsMatchComponent implements OnInit {

  constructor(

    public matchService: MatchDayService, public matchServiceDay: MatchDayService,

  ) { }

  ngOnInit(): void {
  }

}
