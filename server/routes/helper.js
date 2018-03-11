import exceljs from 'exceljs';
import fastcsv from 'fast-csv';

export const CSV = 'csv';
export const TSV = 'tsv';
export const XLSX = 'xlsx';

export const getMimeType = (fileFormat) => {
  switch (fileFormat) {
    case CSV: return 'text/csv';
    case TSV: return 'text/tab-separated-values';
    case XLSX: return 'application/vnd.ms-excel';
    default: return null;
  }
};

export const convertSqlQueryStreamIntoExportStream = ({
  sqlQueryStream,
  fileFormat,
  formatRow,
  closeStream,
  sheetName,
  res,
  headFields,
}) => {
  if (fileFormat === XLSX) {
    const workbook = new exceljs.stream.xlsx.WorkbookWriter({
      stream: res,
      useStyles: false,
      useSharedStrings: false,
    });

    const sheet = workbook.addWorksheet(sheetName);
    sheet.addRow(headFields).commit();

    sqlQueryStream
      .on('data', (data) => {
        console.log('sqlQueryStream.on(data)', data.id)
        sheet.addRow(formatRow(data)).commit();
      });

    console.log(workbook.stream)
    console.log(workbook.stream.on)

    sqlQueryStream
      .on('end', async () => {
        console.log('sqlQueryStream.on(end)')
        await workbook.commit()
          .then(() => {
            console.log('done1')
          })
          .catch(err => {
            console.log('caught error (1)')
            console.log(err)
          })

          // .then(() => closeStream());
      });

    return workbook.stream;
  }

  const delimiter = fileFormat === CSV ? ',' : '\t';

  const csvStream = fastcsv.createWriteStream({
    headers: true,
    delimiter,
  });
  csvStream.write(headFields);

  csvStream
    .on('finish', () => {
      closeStream();
    });

  sqlQueryStream
    .on('data', (data) => {
      csvStream.write(formatRow(data));
    });

  sqlQueryStream
    .on('end', () => {
      csvStream.end();
    });

  csvStream.on('error', (error) => {
    console.log(error); // eslint-disable-line
  });

  return csvStream;
};
