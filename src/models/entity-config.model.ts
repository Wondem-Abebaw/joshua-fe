import { Filter } from "./collection.model";

export type entityViewMode = 'list' | 'detail';

export interface EntityConfig<T = void> {
  key?: string;
  identity: string|string[];
  name?: string;
  rootUrl: string;
  detailUrl?: string;
  filter?: Filter[][];
  primaryColumn: Column<T>;
  showDetail?: boolean;
  visibleColumn: Column<T>[];

  enableAffix?: boolean;
  showFullScreen?: boolean;
  showClose?: boolean;
  hasActions?: boolean;
  hasBackLink?:boolean;
  routing?(data: any): void;
  newAction?(data: any): void;
}


export interface Column<T> {
  name?: string;
  key: string | string[];
  isDate?: boolean;
  hide?:boolean;
  print?:boolean;
  isNumber?: boolean;
  isBoolean?: boolean;
  hideSort?: boolean;
  prefix?: Column<T>;
  suffix?: Column<T>;
  // style
  tdClass?: string;
  render?: (value: T) => any
}

