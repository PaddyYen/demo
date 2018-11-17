export class Tab {
    id?: number;
    parentId?: number
    name?: string;
    url?: string;
    synopsis?: string;
    queues: number;
    tabType: number;
    subTabList: any[];

    constructor(tab: Tab = {} as Tab) {
        this.id = tab.id;
        this.parentId = tab.parentId;
        this.name = tab.name;
        this.url = tab.url;
        this.synopsis = tab.synopsis;
        this.queues = tab.queues;
        this.tabType = tab.tabType;
        this.subTabList = tab.subTabList;
    }
}