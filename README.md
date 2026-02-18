# Search Engine (From Scratch)

## Goal
Build a search engine from first principles to deeply understand
information retrieval, indexing, and ranking, and core backend design/systems.

## Current Scope
- Local .txt documents
- Command-line interface
- Inverted index
- AND queries


## Design choice

tokenizer.js (v1)

-- tokens include lowercase letters, numbers, hyphens and pluses.
-- everything else is treated as a separator
-- why: doc file may contain technical writing; terms like "c++", "c#" "#devps" and "e-mail" reamin intact.

search queries.js (v1)

-- Use AND using new Set for intersection.
--why: started with AND to ensure the retrieval logic is correct before adding more complex query types.

## version 1 Spec

   ## Goal: 
   Return documents whose titles contain all query tokens (AND search).

   ## Documents:
  { id, filename } (v1 searches filenames/titles only; body is empty for now).

   ## Tokenization:
   
   Lowercase input
   match on /[^a-z0-9#+-]+/g
   filter to include numbers/letters
   Numbers, hastags, pluses and hyphens are kept as tokens

   ## Query semantics (v1):
   Multi-word queries are AND (must match every token)
   If any token isn’t in the index → return []
   Empty query → return []

   ## Results:
   Returns up to 10 results
   Sorted by docId ascending (results are returned in a consistent order; no ranking yet)

