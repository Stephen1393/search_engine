# failures and lessons

# failure - writing the code for AND in search
 - once separating the files into variables (current docs, shared docs), one to hold the postings and the other to hold matching docId's in a seperate variable, i kept misplacing the lines of code within the loop so nothing was getting stored after being added.

 lesson: ensure logic is in order and the shared doc becomes current doc AFTER loop.

 # failure - understanding flow of interacting systems
  - when beginning to write the search function, I couldn't remember how to deconstruct objects and how to use the same index and it's properties without creating brand new variables/objects.

   lesson: Understanding factory functions. Don't use repeated object shapes everywhere - use one source.

   - With the scorer (written in it's own script separate from the search) I did the opposite: I kept pulling objects and variable, like the query and docMeta from the index and search.

   lesson: the scorer is used by the search to check query against index. Thinking about what needs to be stored/doesn't  - how the files interact.

   # failure - match position bug for scorer (title tokens)
   first attempt at code:
   - track positions and tokens of two arrays. If both match and same position, score higher.
   But the position was fixed. i === j. ["hello", "world"] would work but ["x" "helllo" "world"] would fail.
    aim of newer code:
    - detect a match
    - compare it against current match
    - if match is greater, update value
     Correct approach, wrong execution. I kept updating match before any existed. (match = j first line in loop) but it needed to be the last. Couldn't think how to "remember match" without first assigning it - it felt backwards.

     lesson: match = j is not the first step, but the final step. Updating is the final result.Write code in english for clarity. Be confident with the order.

     # failure - writing proximity function in scorer (token positions)

     `aim of code`: reward tokens in sequence. If partial match, result = 1. If full match, result = 2.
     Knew where I wanted to go; struggled to turn the logic into code.

      `thinking comparison = sequence`
       - I kept thinking in pairs rather than a chain. I would have A-B, C-D, but needed A-B-C-D. I needed a variable like "current" to carry forward all valid positions so far (a chain). This needed to be placed outside the outer loop to carry forward across all inner loops and checks.
    
       lesson: Think about the flow, startpoint to endpoint and how this can repeat.

       `Placement of variables`
      - I would place variables (matches, current, partial) where they'd be overwritten.
      lesson: ask: what has to survive all stages/per stage? 

       `checking state logic inside inner loops`
     - I tried to decide if something passed/failed while inside inner loop. I also kept adding 1 to the score every time.
      lesson: decide once all comparisions have been made.

      `loop boundaries`
      I looped too far and relied on undefined checks. tokenB i + 1, so queryTokens.length should be length - 1 to avoid checking undefined.

    Overall the flow looks like:
    - take current positions
    - find next positions that follow valid ones
    - keep the chain
    - dicard anything else
    - repeat

     

