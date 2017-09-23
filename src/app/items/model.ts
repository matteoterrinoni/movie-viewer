export const ITEM_TYPES = {
  MOVIES: 'movie',
};

export type ItemType = string;

export interface IItem {
  id: string;
  key: string
  itemType: ItemType;
  name: string;
  popularity: number,
  overview: string,
  release_date: string,
  vote_average: number,
  vote_count: number,
  backdrop_path: string,
  poster_path: string
}

export interface IItemList {
  items: {};
  page: number;
  pages_count: number;
  loading?: boolean;
  error?: any;
}

export const fromServer = (data: any): IItemList => ({
  items: data.results.map(fromServerItem),
  page: data.page,
  pages_count: data.total_pages
}
);

export const fromServerItem = (record: any): IItem => ({
  id: record.id,
  key: ItemApi.getKey(record.id),
  itemType: ITEM_TYPES.MOVIES,
  name: record.title,
  popularity: record.popularity,
  overview: record.overview,
  release_date: record.release_date,
  vote_average: record.vote_average,
  vote_count: record.vote_count,
  backdrop_path: record.backdrop_path,
  poster_path: record.poster_path
});

const keyPrefix = 'id_';
const filePath = 'https://image.tmdb.org/t/p/';

export const ItemApi = {
  getIdFromKey:(key:string)=>key.replace(new RegExp(keyPrefix, 'g'),''),
  getKey:(id:any)=>keyPrefix+''+id,
  getPoster:(item:IItem, width?:number)=>filePath+'w'+(width||'300')+item.poster_path,
  getBackground:(item:IItem, width?:number)=>filePath+'w'+(width||'1000')+item.backdrop_path,
  getThumbnail:(item:IItem, width?:number)=>filePath+'w'+(width||'150')+item.poster_path
}
