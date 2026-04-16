# Search Engine (From Scratch)

## Goal
This project is a search engine built from scratch to understand information retrieval, indexing, and ranking at a deep level.

 The long-term goal is to apply these ideas to a specialised search engine/debugging tool for error codes. I will be researching and learning about the errors as I test them.

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
   Sorted by docId ascending 

   ## version 2 (scope)

- Local .txt documents
- Command-line interface
- Inverted index
- OR queries
- Introduces ranking (scoring system)

   ## ranking goal
   
   the goal of ranking:  to return a non-spammy, close semantic match with title support that should beat a repetitive or obviously stuffed doc, even if they have strong title matching tokens.

   tokenizer.js (same as version 1 -- unchanged)

   tokenTitle.js (version 1)

   -- separated title tokenizer from standard tokenizer for clairty.
   -- tokenize letters, numbers, hypens and periods but replaces anything after the last period with nothing.

   -- why: To focus on the useful names only. If my doc is named "search.engine.design.txt," it will tokenise all words apart from "txt."

   indexer.js(v2)

   -- stores additional metadata ( which is stored in docMeta object) per document:
    - term positions
    - title positions
    - document length
    

## current progress

The ranking system is being built through testing against real queries (starting with JavaScript error messages).

Each change to the scorer comes from:

comparing expected vs actual ranking
spotting where it breaks (spam, repetition, weak signals)

I will keep refining the ranking system until or retrieves what is expected

# example of testing

My expected result is [A,E,B,C,D]

actual result: [C,A,D,E,B]

 ## obversations:

 - spam didn't subtract any score
 - the titleTokens only rewarded 1 as presence, not order or multiply
 - duplicate docs had no tokens in sequence, scored second lowest
