import { Component, OnInit, signal, inject } from '@angular/core';
import { TITLES, SEASONS, EPISODES } from '../../domain/movies';
import { NgFor } from '@angular/common';
import { MovieTreeNodeComponent } from '../movie-tree-node/movie-tree-node.component';
import { TreeNode } from '../../model/tree-node'
import { AppStore } from '../../service/app-store'

@Component({
  selector: 'app-movie-tree',
  templateUrl: './movie-tree.component.html',
  styleUrls: ['./movie-tree.component.css'],
  imports: [
    NgFor,
    MovieTreeNodeComponent,
  ],
  standalone: true
})
export class MovieTreeComponent implements OnInit {

  titles = TITLES;
  seasons = SEASONS;
  episodes = EPISODES;
  
  appStore = inject(AppStore)

  searchText = signal('');

  ngOnInit() {
    this.appStore.buildNodeTree(TITLES, SEASONS, EPISODES);
  }

  updateSearchText(text: string) {
    this.searchText.set(text);
  }
}
