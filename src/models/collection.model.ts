export interface CollectionQuery {
  search?: string;
  searchFrom?: string[];
  skip?: number;
  top?: number;
  index?: number;
  orderBy?: Order[];
  groupBy?: string[];
  // outer array  'and' inner array 'or'
  filter?: Filter[][];
  select?: string[];
  count?: boolean;
  withArchived?: boolean;
  includes?: string[];
  languages?: string[];
  grades?: string[];
  subjects?: string[];
}

export interface DetailQuery {
  filter?: Filter[][];
  select?: string[];
}
export interface Order {
  field: string;
  direction?: "asc" | "desc";
}

export interface Filter {
  field: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  operator?: string;
  name?: string;
}
export interface Collection<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  count: number;
  data: T[];
}

export interface CollectionResult<T> {
  total: number;
  collectionQuery?: CollectionQuery;
  items: T[];
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}
