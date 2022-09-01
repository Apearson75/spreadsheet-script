# SpreadSheet Script

## Demo File:
```
LOG "This program will copy A1 from test.xlsx to B1 of copy.xlsx"

OPEN test.xlsx
SHEET Sheet1
var test = GET A1

OPEN copy.xlsx
SHEET Sheet1
SET B1 test
SAVE

LOG "DONE"

FREE test
```
---
## How to run

1.  Download the source code
```
git clone https://github.com/phoneguytech75/spreadsheet-script/
```

2. Compile and run
```bash
cd spreadsheet-script
npm i
npm run build
npm start
```

3. Run script.s3
```
> run script.s3
```
### Done!