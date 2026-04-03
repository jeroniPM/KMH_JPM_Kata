import { Component, Input, OnInit, inject, signal, computed, Signal } from '@angular/core';
import { NgIf, NgFor, NgStyle, NgClass } from '@angular/common';
import { TreeNode } from '../../model/tree-node';
import { AppStore } from '../../service/app-store';
import { TooltipWrapperComponent } from '../tooltip/tooltip-wrapper.component';

@Component({
  selector: 'app-movie-tree-node',
  templateUrl: './movie-tree-node.component.html',
  styleUrls: ['./movie-tree-node.component.css'],
  imports: [NgFor, NgIf, NgStyle, NgClass, TooltipWrapperComponent],
  standalone: true
})
export class MovieTreeNodeComponent {

  readonly MIN_SEARCH_CHARACTERS = 3;

  @Input() node!: TreeNode;
  @Input() searchText!: Signal<string>;

  private store = inject(AppStore);

  toggleChildren = signal(false);

  showChildren = computed(() => this.toggleChildren() || this.shouldExpandForPartialMatch());

  isMatchingSearch = computed(() => {
    const search = this.searchText().toLowerCase();
    return this.hasMinSearchCharacters(search) && this.node.name.toLowerCase().includes(search);
  });

  shouldExpandForPartialMatch = computed(() => {
    const search = this.searchText().toLowerCase();
    return this.hasMinSearchCharacters(search) &&
    (this.node.name.toLowerCase().includes(search) || search.includes(this.node.name.toLowerCase()) );
  })

  updateToggle() {
    this.toggleChildren.update(value => !value);
  }

  removeNode(event: MouseEvent) {
    event.stopPropagation();

    this.store.removeNode(this.node.id, this.node.title_id, this.node.season_id);
  }

  addNode(event: MouseEvent) {
    event.stopPropagation();

    if (!this.showChildren()) {
      this.updateToggle();
    }

    this.store.addNode(this.node.id, this.node.title_id, this.node.season_id);
  }

  private hasMinSearchCharacters(search: string) : boolean {
    return search.length >= this.MIN_SEARCH_CHARACTERS;
  }
}
