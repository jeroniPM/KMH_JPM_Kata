import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNode } from '../model/tree-node';

@Component({
  selector: 'app-movie-tree-node',
  templateUrl: './movie-tree-node.component.html',
  styleUrls: ['./movie-tree-node.component.css'],
  standalone: true
})
export class MovieTreeNodeComponent {

  @Input() node!: TreeNode;
}