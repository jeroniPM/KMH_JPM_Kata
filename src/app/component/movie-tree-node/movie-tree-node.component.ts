import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { TreeNode } from '../../model/tree-node';
import { AppStore } from '../../service/app-store';

@Component({
  selector: 'app-movie-tree-node',
  templateUrl: './movie-tree-node.component.html',
  styleUrls: ['./movie-tree-node.component.css'],
  standalone: true
})
export class MovieTreeNodeComponent {

  @Input() node!: TreeNode;

  private store = inject(AppStore);

  showChildren = signal(false);

  showChildrenToggle() {
    this.showChildren.update(value => !value);
  }

  removeNode() {
    this.store.removeNode(this.node.id, this.node.title_id, this.node.season_id);
  }

  addNode() {
    this.store.addNode(this.node.id, this.node.title_id, this.node.season_id);
  }
}
