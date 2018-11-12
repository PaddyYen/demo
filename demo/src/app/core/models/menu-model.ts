export class Menu {
    id?:string;
    url:string;
    name:string;

    constructor(menu:Menu = {} as Menu) {
        this.id = menu.id;
        this.url = menu.url;
        this.name = menu.name;
    }
}