import { NgFor } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { EPISODES, SEASONS, TITLES } from '../../domain/movies';
import { DialogData } from '../../model/dialog-data';
import { AppStore } from '../../service/app-store';
import { DialogComponent } from '../dialog/dialog.component';
import { MovieTreeNodeComponent } from '../movie-tree-node/movie-tree-node.component';

@Component({
  selector: 'app-movie-tree',
  templateUrl: './movie-tree.component.html',
  styleUrls: ['./movie-tree.component.css'],
  imports: [
    NgFor,
    MovieTreeNodeComponent,
    DialogComponent
  ],
  standalone: true
})
export class MovieTreeComponent implements OnInit {

  titles = TITLES;
  seasons = SEASONS;
  episodes = EPISODES;

  searchText = signal('');
  showDialog = signal(false);
  dialogData: DialogData = {} as DialogData;

  appStore = inject(AppStore)

  ngOnInit() {
    this.appStore.buildNodeTree(TITLES, SEASONS, EPISODES);
  }

  updateSearchText(text: string) {
    this.searchText.set(text);
  }

  updateShowDialog() {
    this.showDialog.update(showDialog => !showDialog);
  }

  setDialogData(data: DialogData) {
    this.dialogData = data;
    this.updateShowDialog();
  }
}
