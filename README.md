# small search engine

## Goal
This project is a small search engine built from scratch to understand information retrieval, indexing, and ranking.

It currently focuses on returning the most revelant docs for two Javascript runtime errors: 

-"TypeError: cannot read properties of undefined (reading 'length')"
-"JavaScript error: Cannot read properties of undefined (reading 'map')"
 

## Current Version Scope
- Local .txt documents
- Command-line interface
- Inverted index
- OR queries
- ranking system (scorer breakdown)

## Demo

https://www.youtube.com/watch?v=CEgzZYz3AEo

## Demo queries

Query:
"Cannot read properties of undefined (reading 'map')"

Top Results:
-G
-F
-J

Query:
"why is length undefined js"

Top Results:
-A
-B
-C

Query:
"undefined length or map error"

Top Results:
-J
-A
-F



## Design choice

### tokenizer.js

-- tokens include lowercase letters, numbers, hyphens and pluses.
-- everything else is treated as a separator

why:

 docs in the future may contain technical writing; terms such as:
  
  - "c++"
  -  "c#"
  -  "#devps"
  - "e-mail"
  
   remain intact.

### search queries.js

-- Uses OR retrieval with Set.

why:

 Original started with AND, but this became too strick once I added a ranking/scorer. Some useful documents may still be highly relevant even if they do not contain every query token.

 Results are sorted by descending rank with a scorer breakdown.



   ## Ranking Goal And Current System
   
   The goal of ranking is to:

Return useful, non-spammy results
Penalize repetitive or obviously stuffed documents
Distinguish between very similar error documents
Handle mixed or ambiguous queries reasonably well


   ### indexer.js

   -- stores additional metadata ( which is stored in docMeta object) per document:
    - term positions
    - title positions
    - document length

   
   ### scorer.js

     
The current scorer was developed through multiple rounds of testing and adjustment.

The 10 test documents intentionally contain a mixture of:

repetitive/spammy documents
incomplete documents
highly relevant documents
overlapping error explanations

See:

ranking-tests-and-failures.md

for ranking observations, failures, and scoring trade-offs.

     current scorer breakdown:
     
     - proximity
     - keywords
     - frequency
     - diversity
     - useful_content
     - titleTokens
     - spam
     - rarity
     - error_tags



## Example Of Testing

My expected result is [A,E,B,C,D]

actual result: [C,A,D,E,B]

 ### obversations:

 - spam didn't subtract any score
 - the titleTokens only rewarded 1 as presence, not order or multiply
 - duplicate docs had no tokens in sequence, scored second lowest
