import { Component, OnInit } from '@angular/core';
import { TITLES, SEASONS, EPISODES } from '../movies';

@Component({
  selector: 'app-movie-tree',
  templateUrl: './movie-tree.component.html',
  styleUrls: ['./movie-tree.component.css']
})
export class MovieTreeComponent implements OnInit {

  public titles = TITLES;
  public seasons = SEASONS;
  public episodes = EPISODES;

  constructor() { }

  ngOnInit() {
  }

}