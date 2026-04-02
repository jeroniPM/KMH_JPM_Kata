import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-tree-node',
  templateUrl: './movie-tree-node.component.html',
  styleUrls: ['./movie-tree-node.component.css']
})
export class MovieTreeNodeComponent implements OnInit {

  @Input() id!: number;
  @Input() name: string = '';
  @Input() icon: string = '';

  constructor() { }

  ngOnInit() {
  }

}