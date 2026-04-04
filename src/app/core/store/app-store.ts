import { Injectable, signal } from '@angular/core';
import { TreeNode } from '../../model/tree-node';

@Injectable({
    providedIn: 'root',
})
export class AppStore {
  private nodeTreeData = signal<TreeNode[]>([]);

  readonly nodeTree = this.nodeTreeData.asReadonly();

  buildNodeTree(titles: TreeNode[], seasons: TreeNode[], episodes: TreeNode[]): void {
    this.nodeTreeData.set(
        titles.map(title => ({
            ...title,
            children: seasons
            .filter(season => season.title_id === title.id)
            .map(season => ({
             ...season,
             children: episodes.filter(ep => ep.season_id === season.id)
        }))
    })));
  }

  removeNode(id: number, title_id?: number, season_id?: number) {
    this.nodeTreeData.update(titles => {
      if (this.isTitle(title_id, season_id)) {
        return titles.filter(title => title.id !== id);
      }

      if (this.isSeason(title_id)) {
        return titles.map(title =>
          title.id !== title_id || !title.children
            ? title
            : {
                ...title,
                children: title.children.filter(season => season.id !== id)
              }
        );
      }
  
      if (this.isEpisode(season_id)) {
        return titles.map(title => ({
          ...title,
          children: title.children?.map(season =>
            season.id !== season_id || !season.children
              ? season
              : {
                  ...season,
                  children: season.children.filter(e => e.id !== id)
                }
          )
        }));
      }
  
      return titles;
    });
  }

  addNode(id: number, title_id?: number, season_id?: number) {
    const nodeId = this.getRandomInt();
  
    this.nodeTreeData.update(titles => {
      if (this.isTitle(title_id, season_id)) {
        return titles.map(title =>
          title.id !== id
            ? title
            : {
                ...title,
                children: [
                  ...(title.children ?? []),
                  {
                    id: nodeId,
                    name: `${title.name} S${nodeId}`,
                    icon: title.icon,
                    title_id: title.id,
                    children: []
                  }
                ]
              }
        );
      }

      if (this.isSeason(title_id)) {
        return titles.map(title =>
          !title.children
            ? title
            : {
                ...title,
                children: title.children.map(season =>
                  season.id !== id
                    ? season
                    : {
                        ...season,
                        children: [
                          ...(season.children ?? []),
                          {
                            id: nodeId,
                            name: `${season.name} Ep ${nodeId}`,
                            icon: season.icon,
                            season_id: season.id
                          }
                        ]
                      }
                )
              }
        );
      }

      return titles;
    });
  }

  private isTitle(title_id: number | undefined, season_id: number | undefined): boolean {
    return title_id === undefined && season_id === undefined;
  }

  private isSeason(title_id: number | undefined): boolean {
    return title_id !== undefined;
  }

  private isEpisode(season_id: number | undefined): boolean {
    return season_id !== undefined;
  }

  private getRandomInt(): number {
    // Random integer between 0 - 100
    return Math.floor(Math.random() * 100);
  }
}
