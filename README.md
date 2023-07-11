# SiemNewTemplate

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.0.


## Components

### dataset-tag-pattern
This component contins a table containing following columns:
1. **dataset** contains the name of the dataset.
2. **action** will contains an eye button that will render the dataset-tag-pattern-view component.

### dataset-tag-pattern-view
This component will render when the **eye** button is clicked from a particular dataset in dataset-tag-pattern table. It will contain all the pattern inserted for the dataset.

### log-form
This component contains the following two parts:
1. **form** to enter a pattern and there's a dropdown to choose under which dataset, the entered pattern will stored.
2. **table** will show the placeholders that can be used as the alternatives to regex.

### log-table
This component contains a table containg following columns: 
1. **tag** contains the log fetched from the elastic search.
2. **count** contains the "doc_count" coming with the log from elasticsearch.
3. **dataset** constains the dataset under which the log is categorised.
