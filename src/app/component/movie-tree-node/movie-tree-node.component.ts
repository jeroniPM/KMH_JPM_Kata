import { NgClass } from '@angular/common';
import { Component, computed, EventEmitter, inject, Input, Output, signal, Signal } from '@angular/core';
import { MovieStore } from '../../core/store/movie-store';
import { DialogData } from '../../model/dialog-data';
import { TreeNode } from '../../model/tree-node';
import { TooltipWrapperComponent } from '../tooltip/tooltip-wrapper.component';

@Component({
  selector: 'app-movie-tree-node',
  templateUrl: './movie-tree-node.component.html',
  styleUrls: ['./movie-tree-node.component.css'],
  imports: [NgClass, TooltipWrapperComponent],
  standalone: true
})
export class MovieTreeNodeComponent {

  readonly MIN_SEARCH_CHARACTERS = 3;

  @Input() node!: TreeNode;
  @Input() searchText!: Signal<string>;

  @Output() dialogData = new EventEmitter<DialogData>();

  private store = inject(MovieStore);

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

  setDialogData(data: DialogData) {
    this.dialogData.emit(data);
  }

  openDialog(event: MouseEvent) {
    event.stopPropagation();

    const data: DialogData = {
      name: this.node.name,
      id: this.node.id,
      title_id: this.node.title_id,
      season_id: this.node.season_id
    };

    this.dialogData.emit(data);
  }

  private hasMinSearchCharacters(search: string) : boolean {
    return search.length >= this.MIN_SEARCH_CHARACTERS;
  }
}
