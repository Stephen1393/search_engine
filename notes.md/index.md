## index design

## goal
To effectively retrieve documents while supporting score signals

## current design

The index started with token - docId through mapping;

for version 2 it does a combination of:

- inverted index (retrieval)
- ranking docMeta information 

version 2 has docMeta that stores:
  - title tokens (for boosting score if there are matches in filenames)
  - token positions (token proximity score higher)
  - document length (length of doc not to effect score unfairly)


## trade-offs
- title tokens stored separately to boost score, but adds complexity
- token positions - tokens within close proximity score higher, but adds memory
- the information from docMeta adds complexity and risk for more bugs/errors, but needed for ranking