# exceljs-issue-500-demo
Demo App for issue #500 of exceljs 

How to test:

1) Run `bash dev.start.sh seed` and wait until seed finished (seed process takes ~2 minutes, because of 100k rows. You can adjust this count in file `/scripts/bootstrap/createUsers.js` (line 30).)
2) Open browser
3) Open `localhost:3000/download/csv` - file downloaded - OK
4) Open `localhost:3000/download/tsv` - file downloaded - OK
5) Open `localhost:3000/download/xlsx` - file downloaded - FAIL

You can't download files anymore (need to restart)

Error in logs:
```
issue500demo_api_1|  if (!state.objectMode) {
issue500demo_api_1|             ^
issue500demo_api_1|
issue500demo_api_1|TypeError: Cannot read property 'objectMode' of undefined
issue500demo_api_1|    at module.exports.Readable.push (_stream_readable.js:195:14)
issue500demo_api_1|    at module.exports.Duplex._destroy (_stream_duplex.js:104:8)
issue500demo_api_1|    at module.exports.destroy (internal/streams/destroy.js:32:8)
issue500demo_api_1|    at destroy (/usr/src/app/node_modules/destroy/index.js:41:12)
issue500demo_api_1|    at listener (/usr/src/app/node_modules/on-finished/index.js:169:15)
issue500demo_api_1|    at onFinish (/usr/src/app/node_modules/on-finished/index.js:100:5)
issue500demo_api_1|    at callback (/usr/src/app/node_modules/ee-first/index.js:55:10)
issue500demo_api_1|    at ServerResponse.onevent (/usr/src/app/node_modules/ee-first/index.js:93:5)
issue500demo_api_1|    at emitNone (events.js:111:20)
issue500demo_api_1|    at ServerResponse.emit (events.js:208:7)
issue500demo_api_1|[nodemon] app crashed - waiting for file changes before starting...


```

You can also see logs in separate tab using `bash dev.logs.sh`
