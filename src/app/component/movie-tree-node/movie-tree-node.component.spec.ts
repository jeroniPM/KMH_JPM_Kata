import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieStore } from '../../core/store/movie-store';
import { TreeNode } from '../../model/tree-node';
import { MovieTreeNodeComponent } from './movie-tree-node.component';

describe('MovieTreeNodeComponent', () => {

  let component: MovieTreeNodeComponent;
  let fixture: ComponentFixture<MovieTreeNodeComponent>;
  let movieStoreMock: Pick<MovieStore, 'addNode' | 'removeNode'>;
  let node: TreeNode;
  let searchTextSignal = signal('');

  beforeEach(() => tearUp());

  it('should toggle children state', () => {
    expect(component.toggleChildren()).toBeFalse();

    component.updateToggle();

    expect(component.toggleChildren()).toBeTrue();
  });

  it('should match search when search text has at least 3 characters and includes node name', () => {
    searchTextSignal.set('tit');
    fixture.detectChanges();

    expect(component.isMatchingSearch()).toBeTrue();
  });

  it('should call store addNode when adding a node', () => {
    const event = jasmine.createSpyObj<MouseEvent>('MouseEvent', ['stopPropagation']);

    component.addNode(event);

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(movieStoreMock.addNode).toHaveBeenCalledWith(1, 10, 20);
  });

  it('should call store removeNode when removing a node', () => {
    const event = jasmine.createSpyObj<MouseEvent>('MouseEvent', ['stopPropagation']);

    component.removeNode(event);

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(movieStoreMock.removeNode).toHaveBeenCalledWith(1, 10, 20);
  });

  it('should emit dialog data from setDialogData', () => {
    const data = {
      id: node.id,
      name: node.name,
      title_id: node.title_id,
      season_id: node.season_id
    };
    spyOn(component.dialogData, 'emit');

    component.setDialogData(data);

    expect(component.dialogData.emit).toHaveBeenCalledWith(data);
  });

  it('should expand for partial match when search includes node name', () => {
    searchTextSignal.set('title 1 extended');
    fixture.detectChanges();

    expect(component.shouldExpandForPartialMatch()).toBeTrue();
  });

  it('should emit dialog data when opening dialog', () => {
    const event = jasmine.createSpyObj<MouseEvent>('MouseEvent', ['stopPropagation']);
    spyOn(component.dialogData, 'emit');

    component.openDialog(event);

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(component.dialogData.emit).toHaveBeenCalledWith({
      id: node.id,
      name: node.name,
      title_id: node.title_id,
      season_id: node.season_id
    });
  });

  function tearUp(): void {
    createMocks();
    configureTestingModule();
    initPropertiesForTest();

    fixture.detectChanges();
  }

  function createMocks(): void {
    node = {
      id: 1,
      name: 'Title 1',
      icon: 'movie',
      title_id: 10,
      season_id: 20
    };

    searchTextSignal = signal('');

    movieStoreMock = {
      addNode: jasmine.createSpy('addNode'),
      removeNode: jasmine.createSpy('removeNode')
    };
  }

  function configureTestingModule(): void {
    TestBed.configureTestingModule({
      imports: [MovieTreeNodeComponent],
      providers: [{ provide: MovieStore, useValue: movieStoreMock }]
    });
  }

  function initPropertiesForTest(): void {
    fixture = TestBed.createComponent(MovieTreeNodeComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('node', node);
    fixture.componentRef.setInput('searchText', searchTextSignal);
  }
});
