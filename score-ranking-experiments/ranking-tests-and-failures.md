## first query(TypeError: Cannot read properties of undefined (reading 'length')) test 1 = fail

doc A
doc B
doc C
doc D  
doc E

 ## expected results:

 My expected result is [A,E,B,C,D]

 A > E because A has muiltple fixes and causes and is not duplicated.

 E > E because E has all the use of A. B doesn't cover all fixes.

 D last because of spam, no useful information.

 What might fail:
 With my current scorer, B might rank higher than E because of E's repeated tokens and because B has the most title tokens.
 Or repetition might be rewarded too much and will possible rank D higher. Therefore, E might come before A.

 actual result: [C,A,D,E,B]

 ## obversations:

 - `spam` didn't subtract any score.
 - the `titleTokens` only rewarded 1 as presence, not order or multiply.
 - duplicate docs had no tokens in sequence, scored second lowest.

 
 ### Changes going forward

- Improve spam detection to penalise repeated query phrases that do not add new information.

- Keep `title` scoring to reward presence only for now, otherwise it may score higher than more useful ones which have zero title tokens.

- moderately reward similiar, useful words to query terms. (e.g fix, cause, etc)

- include a limit for repetition instead of a constant reward for `frequency`.

## first query - test 2 = fail

  ### expected result

  expected result is [A,B,C,E,D] with updated scorer

  A > B because A has more causes and fixes

  B > C because B has more causes, but might fail because C have exact error match and keywords.

  C > E because E is useful but repeats the same - the scorer will penalise the `repetition`

  D last becasue of spam

  actual result = [C,A,B,E,D]

   ## observations

   A has more useful explanations, but C has more `keywords`, `title match`, and is shorter. (less risk for `repetition`, `spam`, etc.) Both scored very similar on `proximity` and `frequency`

   C scored significantly higher than B, the main difference being `frequency`



  ### Changes going forward / trade-offs

  - Add an explanation-coverage score: reward documents for covering different explanation groups, not just repeating useful keywords.

  - For this query type, groups might include: variable has no value, function returns undefined,  missing object path, and data/async not loaded.

  - This should push Doc A higher because A covers more causes than C. It may also raise B.

  - Trade-off: the scorer becomes more complex and more hand-built, but the ranking should become more accurate rather there pure keyword/token matching.

## first query test 3 = fail

 actual result = [C,A,B,E,D]

 ## observations

 - A is only 1 point from C with increased `keywords`, but `diversity` has no effect on either C or A.
 - B has increased, closer to C.


 ### changes going forward

 - Duplicate score is having no affect. I will adjust the weighting on the duplicate scorer so it rewards/penalises through a range, rather than a binary point or minus point for either end of 0. (<= 0.3 and >= 0.8)


## first query test 4 = fail

 result = [C,A,B,E,D]

## observations

- Duplicate has a higher ratio on doc C than A.
- D has lost more points because of duplicate penalty.

 ## changes going forward / trade-offs

 - duplicate wasn't the answer for pushing A above C, but it has reduced D further, so will keep for repetitiveness.

 - will include a count for useful words, but will cap it; otherwise long docs will always win.

 - trade-off: shorter, more dense docs will be overlooked even if it contains useful information.

## first query test 5 = fail

result = [C,A,B,E,D]

 ## observations

 - C gained 0.5 points while A gained nothing. Will have to review the points/penalites.

 ### changes going forward

 - Will log the result from the `useful-content` function to see the numbers, and then will ensure the score is rewarding the more useful content.



## first query test 6 = success

result = [A,C,B,E,D]

 ## observations 

 - A is now the winner and the overal output is in a good, working order.

 - A has the most useful content followed by C/B which are similar. (B having one extra example)
 - E/D are the the lowest, penalised heavily for `repetition` and `spam`.

### changes going forward

- will test on another query with 5 more docs and will see how the scorer behaves.



  

## second query("cannot read property length")  - test 1 = success

 ## observations

A is the winner, followed by B. `Keywords`, `frequenc`y, and `useful-content` scored similar and match accurately to the docs.





## third query("why is length undefined") - test 1 = fail

## observations

- B in the winner, with A 1 point behind. Main score difference was `keywords`, both having the same `diversity`.


### changes going forward

- have already began to change the search OR logic to continue/skip undefined tokens; the `proximity` also has guards incase neither token exists to stop the programme crashing.

- Will add stop words such as (is, why, what) to ignore so scorer can focus on the important tokens.

- my threshold scores for `divserity` aren't helping; it rewards docs that are close in ratio equally. I will either use a gradual scoring system like that in `useful_content` function or a multiplier.

## third query - test 2 = fail

 ## observations

 - B still wins with A just behind. The new `diversity` method increased score, but only by a margin. 
 - `Proximity` has no effect with messier query types.

 - `frequency` scored the same on top two despite the repeated terms mentioned in doc A doesn't feel like spam or heavy repetition.

 - keywords can be overpowering, it seems. Doc A has a variety of keywords while doc B only has a few but scored similary.

 ### changes going forward

 - will change `frequency` scorer to have a gradual scoring system rather than two, rigid fixed numbers.
 - will increase reward for a variety of `keywords`
 - will test with the first two changes above before inspecting `proximity` more.


## third query - test 3 = success


 ## observations

 - A is the clear winner by 2.2 points, followed by B. It has an extra point on `frequency` and `useful_content`; these are more realistic deciding factors than overpowered `keywords`.
 - They have the same points for `keywords` now.


## fourth query ("undefined length js") - success
## fifth query ("length undefined error help") - success
## sixth query ("wtf length undefined js") - sucess
## seventh query ("length error help") - success

 ## observations
 - Tested for robustness. doc A wins on all of them.
 - main deciding factors are `diversity`, `useful_content` and `frequency`.


 ## second error query (Cannot read properties of undefined (reading 'map'))

  ### expectations from test 1

  doc F
  doc G
  doc H
  doc I
  doc J


  - doc F is more practical for the user because it offers specific fixes; this should be the winner
  - doc G might win because it has similar structure, offers explanations, and appears just as useful without being specific
  - doc H should finish last (repetetive, spammy)
  - doc I has use, but is limited/not very useful
  - doc J assumes it's a react probably so isn't complete enough and may be unrelated

  - will be including 5 docs from previous error message to challenge scorer with noise

  ## first query test 1 = fail

   ## observations
   - doc G wins, main different being frequency from doc F
   - doc F was rewarded twice for titletokens
   - doc H is near bottom, but some docs written for the `legnth error` query are above it
   
   ### changes going forward
   - fix broken `titleToken` logic so it rewards only 1 point for token match
   - add a reward for error tags. If query contains length, map, etc, the docs containing those tokens will receive a boost
   - add a reward for useful js syntax in `useful_contents` such as Array.isArray(...), ?.map(...), etc.

   ### trade-offs
   - changing `frequency` will help doc F beat doc G, but it may raise other, less useful docs higher.
   - using a small error tag signal will help distinguish between docs, but will need manual adding tags if I add more docs later.
   - overall, this seems the right decision; `frequency` is too broad and previous results have shown it works well as it is (for now).


   ### insights from a for quick tests with new docs
   - have decided to remove scoring token match in filenames (titleTokens). Less useful docs were ranking higher simply because of token match.

   ### first query test 2 = fail/success

    ## observations

    - doc G still wins, but `error_tags` have helped raise more related docs higher up.
    
    ### insights

    - decided to leave out adding a score for useful, error js syntax; it felt too forced. Right now, the search has a good, general ranking order based on the main scorers of `proximity`, `frequency`, `diversity`, and `useful_content`.
    - doc F was my choosen winner, but some users may find doc G just as helpful. These docs are the clear winners for this query.
   




## second query test ("undefined error help")
## third query test ("weird map error")
## fourth query test ("map javascript undefined help")
## fifth query test ("why is programme saying cannot read map")

 ## observations
 - 3/4 tests rank either doc G or F the highest.
 - the third query, doc G and F are neither first or second. If I overtune scorer, other results would suffer.
 - I also tested old queries again against the latest scorer. doc A ranks first on every one, with the other related docs close by.

 ## going forward

 - will test against mixed, ambiguous queries


 ## first mixed query test ("undefined length or map error") - result = doc J,A,F
 ## second mixed query test ("js undefined error map length") - result = doc A,F,L
 ## third mixed query test ("why underfined error length map not working") - result = doc F,A,G
 ## fourth mixed query test ("length undefined filter map error") - result = doc J,A,F
 ## fifth mixed query test ("undefined everything broken js") - result = doc A,F,G

  ### observations
  - doc A is strongest for length error and doc F/G are strongest for map error
  - those docs are consistent across top three results
  - spammy result for both are bottom on all tests

  
  ## insight and changes going forward
  
"Cannot read properties of undefined (reading 'length')" now returns A,G,C.

A is still the strongest document for the `length` error, but G is very strong for `map`. Because the errors share tokens such as `undefined`, `reading`, and `properties`, the overlap affects ranking and will likely continue happening with similar runtime errors.

this is one of the current limitations of the lexical scorer.
