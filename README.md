# budget4home UI [![action](https://github.com/lfmachadodasilva/budget4home/actions/workflows/main.yml/badge.svg)](https://github.com/lfmachadodasilva/budget4home/actions/workflows/main.yml) [![codecov](https://codecov.io/gh/lfmachadodasilva/budget4home/branch/main/graph/badge.svg?token=QCV54N8Y85)](https://codecov.io/gh/lfmachadodasilva/budget4home)

Welcome to my personal project to control budget for home.

### How to run:

> npm start

### How to run tests:

> npm test

or

> npm test:coverage

### How to use the app:

- Creation order: Group > Label > Expenses
  - _Group_: group of user to add, edit and view labels and expenses. Data:
  - _Label_: way to group expenses and indentify their type
    - `future` [#34](https://github.com/lfmachadodasilva/budget4home/issues/34) Icon: icon of the label
  - _Expense_: core of the application where you can setup name, value and dates and more.
    - Schedule: create expenses to the future (for each month) with the same parameters
- Bulk import & export:
  - _Import_: import in a csv format multiple expenses per group
    - If the import label does not exist (check by the label and not id), create new one.
    - Format order per line: Type (0 - incoming, 1 - outcoming), name, value, date (dd/mm/yyyy), label name and comment
  - _Export_: export in a csv format multiple expenses per group
    - `future` [#35](https://github.com/lfmachadodasilva/budget4home/issues/35) Select export date range
