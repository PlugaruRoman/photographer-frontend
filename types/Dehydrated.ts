import { IPhotographerCard } from "./Photographer";

export interface IDehydrated {
  mutations: any[];
  queries: [
    {
      state: {
        data: {
          data: [
            {
              id: number;
              attributes: IPhotographerCard;
            },
          ];
          meta: {
            pagination: {
              page: number;
              pageSize: number;
              pageCount: number;
              total: number;
            };
          };
        };
        dataUpdateCount: number;
        dataUpdatedAt: number;
        error: null | any;
        errorUpdateCount: number;
        errorUpdatedAt: number;
        fetchFailureCount: number;
        fetchMeta: null | any;
        isFetching: boolean;
        isInvalidated: boolean;
        isPaused: boolean;
        status: string;
      };
      queryKey: string;
      queryHash: string;
    },
  ];
}

export interface IDehydratedSingle {
  mutations: any[];
  queries: [
    {
      state: {
        data: {
          data: {
            id: number;
            attributes: IPhotographerCard;
          };

          meta: {
            pagination: {
              page: number;
              pageSize: number;
              pageCount: number;
              total: number;
            };
          };
        };
        dataUpdateCount: number;
        dataUpdatedAt: number;
        error: null | any;
        errorUpdateCount: number;
        errorUpdatedAt: number;
        fetchFailureCount: number;
        fetchMeta: null | any;
        isFetching: boolean;
        isInvalidated: boolean;
        isPaused: boolean;
        status: string;
      };
      queryKey: string;
      queryHash: string;
    },
  ];
}
