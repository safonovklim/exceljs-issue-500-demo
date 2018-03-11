import * as exportRoute from './export.route';

export default (router) => {
  router.get('/download/csv',
    exportRoute.downloadCsv,
  );

  router.get('/download/tsv',
    exportRoute.downloadTsv,
  );

  router.get('/download/xlsx',
    exportRoute.downloadXlsx,
  );
};
