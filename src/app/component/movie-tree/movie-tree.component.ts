import { Component, OnInit, signal, inject } from '@angular/core';
import { TITLES, SEASONS, EPISODES } from '../../domain/movies';
import { NgFor, NgIf } from '@angular/common';
import { MovieTreeNodeComponent } from '../movie-tree-node/movie-tree-node.component';
import { TreeNode } from '../../model/tree-node';
import { DialogData } from '../../model/dialog-data';
import { DialogComponent } from '../dialog/dialog.component'
import { AppStore } from '../../service/app-store'

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
