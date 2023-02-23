export interface IDehydrated {
  mutations: any[];
  queries: [
    {
      state: {
        data: {
          data: [
            {
              id: number;
              attributes: {
                about: string;
                firstname: string;
                lastname: string;
                company: string;
                city: string;
                price: number;
                phone: string;
                facebook: string;
                instagram: string;
                web: string;
                createdAt: string;
                updatedAt: string;
                publishedAt: string;
              };
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
