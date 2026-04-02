import { Component, OnInit, signal } from '@angular/core';
import { TITLES, SEASONS, EPISODES } from '../movies';
import { NgFor, NgStyle } from '@angular/common';
import { MovieTreeNodeComponent } from '../movie-tree-node/movie-tree-node.component';
import { TreeNode } from '../model/tree-node'

@Component({
  selector: 'app-movie-tree',
  templateUrl: './movie-tree.component.html',
  styleUrls: ['./movie-tree.component.css'],
  imports: [
    NgFor,
    MovieTreeNodeComponent
  ],
  standalone: true
})
export class MovieTreeComponent {

  titles = TITLES;
  seasons = SEASONS;
  episodes = EPISODES;

  movieTree: any[] = [];
  isHidden = true;
  nodeTree = signal(
    this.buildNodeTree(TITLES, SEASONS, EPISODES)
  );

  buildNodeTree(titles: TreeNode[], seasons: TreeNode[], episodes: TreeNode[]): TreeNode[] {
    return titles.map(title => ({
      ...title,
      children: seasons
        .filter(season => season.title_id === title.id)
        .map(season => ({
          ...season,
          children: episodes
            .filter(ep => ep.season_id === season.id)
        }))
    }));
  }

}