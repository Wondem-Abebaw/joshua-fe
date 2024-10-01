  Collection model
        > export interface CollectionQuery {
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
        locale?: string;
        }

        export interface DetailQuery {
        filter?: Filter[][];
        select?: string[];
        locale?: string;
        }
        export interface Order {
        field: string;
        direction?: 'asc' | 'desc';
        }

        export interface Filter {
        field: string;
        value: any;
        operator?: string;
        name?: string;
        }
        export interface Collection<T> {
        [x: string]: any;
        total: number;
        items: T[];
        }

        export interface CollectionResult<T> {
        total: number;
        collectionQuery?: CollectionQuery;
        items: T[];
        isLoading: boolean;
        error?: any;
        }

  Note on how to use collectionQueryBuilder

     export const getService = async (request: CollectionQuery) => {
          const filter = [
      [
        {
          field: 'name',
          value: 'john',
          operator: '='
        },

        {
          field: 'name',
          value: 'nabil',
          operator: '='
        }
      ]
    ];
          const collection = { ...request };
          collection.filter = collection.filter ? [...filter, ...collection.filter]: [...filter];
          collection.orderBy = [{ field: 'name', direction: 'desc' }];
          collection.locale = localStorage.currentLanguage
          collection.search = 'hello'
          collection.searchFrom = ['firstName', 'lastName', 'email', 'status'];
          const params = collectionQueryBuilder(collection);
          const config: AxiosRequestConfig = {
            params: params,
          };
          await axios
            .get('http://196.189.44.47/services/get-services', config)
            .then((response) => console.log(response.data))
            .catch(function (error) {
              if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
              console.log(error.config);
            });
        };
