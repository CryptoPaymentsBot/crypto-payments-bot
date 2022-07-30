export class MenuNode {
  /**
   *
   * @param {import('./Menu.js').Menu} menu
   * @param {MenuNode[]} [submenus]
   */
  constructor(menu, submenus) {
    this.name = menu.name;
    this.menu = menu;
    /**
     * @type {MenuNode | null}
     */
    this.parent = null;
    this.submenus =
      submenus?.map?.((menuNode) => {
        menuNode.parent = this;
        return menuNode;
      }) ?? [];
  }
}
