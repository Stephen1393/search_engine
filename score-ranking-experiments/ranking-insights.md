# scorer test 1

query(TypeError: Cannot read properties of undefined (reading 'length'))

A = doc1.txt
B = TypeError.cannot.read.txt
C = TypeError.txt
D = doc4.txt  
E = typeError.undefined

## expected results:

My expected result is [A,E,B,C,D]

A > E because A has muiltple fixes and causes and is not duplicated

E > E because E has all the use of A. B doesn't cover all fixes

D last because of spam, no useful information

What might fail:
With my current scorer, B might rank higher than E because of E's repeated tokens and because B has the most title tokens.
Or repetition might be rewarded too much and will possible rank D higher. Therefore, E might come before A.

actual result: [C,A,D,E,B]

 ## obversations:

 - spam didn't subtract any score
 - the titleTokens only rewarded 1 as presence, not order or multiply
 - duplicate docs had no tokens in sequence, scored second lowest

 
 ## Changes going forward/trade-offs:

- Improve spam detection to penalise repeated query phrases that do not add new information
- Keep title scoring to reward presence only for now, otherwise it may score higher than more useful ones which have zero title tokens
- moderately reward similiar, useful words to query terms. (e.g fix, cause, etc)
- include a limit for repetition instead of a constant reward for frequency


## test 2

  ## expected result

  expected result is [A,B,C,E,D] with updated scorer

  A > B because A has more causes and fixes

  B > C because B has more causes, but might fail because C have exact error match and keywords.

  C > E because E is useful but repeats the same - the scorer will penalise the repetition

  D last becasue of spam

  actual result = [C,A,B,E,D]

   ## observations

   A has more useful explanations, but C has more keywords, title match, and is shorter. (less risk for repetition, spam, etc.) Both scored very similar on proximity and frequency

   C scored significantly higher than B, the main difference being frequency



## Changes going forward / trade-offs

- Add an explanation-coverage score: reward documents for covering different explanation groups, not just repeating useful keywords.
- For this query type, groups might include: variable has no value, function returns undefined, missing object path, and data/async not loaded.
- This should push Doc A higher because A covers more causes than C. It may also raise B.
- Trade-off: the scorer becomes more complex and more hand-built, but the ranking should become more accurate rather there pure keyword/token matching.

  









