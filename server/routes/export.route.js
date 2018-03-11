import PgQueryStream from 'pg-query-stream';

import { getMimeType, convertSqlQueryStreamIntoExportStream, CSV, TSV, XLSX } from './helper';
import pgDirectClient from '../db/postgres.plain';

const formatRow = row => {
  return [
    row.id,
    row.first_name,
    row.middle_name,
    row.last_name,
    row.email,
  ];
};

export function* download(fileFormat) {
  const filename = `Users.${fileFormat}`;
  const sqlPlainQuery = "SELECT * FROM users";
  const sqlQueryStream = pgDirectClient.query(new PgQueryStream(sqlPlainQuery));
  const headFields = [
    'id',
    'first_name',
    'middle_name',
    'last_name',
    'email',
  ];
  const contentType = getMimeType(fileFormat);
  const self = this;

  const outputStream = convertSqlQueryStreamIntoExportStream({
    sqlQueryStream,
    fileFormat,
    formatRow,
    filename,
    sheetName: 'Users',
    res: this.body,
    closeStream() {
      self.res.end();
    },
    headFields,
  });

  this.set('Content-Type', `${contentType}; charset=utf8`);
  this.set('Content-Disposition', `attachment; filename=${filename};`);
  this.set('Transfer-Encoding', 'chunked');

  this.statusCode = 200;
  this.body = outputStream;
}

export function* downloadCsv() {
  yield download.call(this, CSV);
}

export function* downloadTsv() {
  yield download.call(this, TSV);
}

export function* downloadXlsx() {
  yield download.call(this, XLSX);
}
