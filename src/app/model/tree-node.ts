export interface TreeNode {
    name: string,
    id: number,
    icon: string,
    title_id?: number,
    season_id?: number,
    children?: TreeNode[]
}
