# Search Engine (From Scratch)

## Goal
Build a search engine from first principles to deeply understand
information retrieval, indexing, and ranking, and core backend design/systems.

## version 1 (v1) Scope
- Local .txt documents
- Command-line interface
- Inverted index
- AND queries


## Design choice

tokenizer.js (v1)

-- tokens include lowercase letters, numbers, hyphens and pluses.
-- everything else is treated as a separator
-- why: doc file may contain technical writing; terms like "c++", "c#" "#devps" and "e-mail" remain intact.

search queries.js (v1)

-- Use AND using new Set for intersection.
--why: started with AND to ensure the retrieval logic is correct before adding more complex query types.

   Results (v1)
   Returns up to 10+ results
   Sorted by docId ascending (results are returned in a consistent order; no ranking yet)

   ## version 2

