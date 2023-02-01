interface MenuObj {
  parentId: number;
  id: number;
  name: string;
  title: string;
  // hidden: number
  hidden: 0 | 1;
  children?: MenuObj[];
}

interface IState {
  menus: MenuObj[];
}

interface IMewMenus {
  [key: number]: MenuObj;
}

interface IndexDataItf {
  saleMap: {}[];
  salePie: IndexItemItf[];
}

interface IndexItemItf {
  today_money: number;
  name: string;
  [key:string]: string
}
