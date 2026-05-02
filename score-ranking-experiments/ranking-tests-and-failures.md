## scorer test 1 - fail

query(TypeError: Cannot read properties of undefined (reading 'length'))

A = doc1.txt
B = TypeError.cannot.read.txt
C = TypeError.txt
D = doc4.txt  
E = typeError.undefined

 # expected results:

 My expected result is [A,E,B,C,D]

 A > E because A has muiltple fixes and causes and is not duplicated.

 E > E because E has all the use of A. B doesn't cover all fixes.

 D last because of spam, no useful information.

 What might fail:
 With my current scorer, B might rank higher than E because of E's repeated tokens and because B has the most title tokens.
 Or repetition might be rewarded too much and will possible rank D higher. Therefore, E might come before A.

 actual result: [C,A,D,E,B]

 # obversations:

 - spam didn't subtract any score.
 - the titleTokens only rewarded 1 as presence, not order or multiply.
 - duplicate docs had no tokens in sequence, scored second lowest.

 
 # Changes going forward/trade-offs:

- Improve spam detection to penalise repeated query phrases that do not add new information.

- Keep title scoring to reward presence only for now, otherwise it may score higher than more useful ones which have zero title tokens.

- moderately reward similiar, useful words to query terms. (e.g fix, cause, etc)

- include a limit for repetition instead of a constant reward for frequency.

## test 2 - fail

  # expected result

  expected result is [A,B,C,E,D] with updated scorer

  A > B because A has more causes and fixes

  B > C because B has more causes, but might fail because C have exact error match and keywords.

  C > E because E is useful but repeats the same - the scorer will penalise the repetition

  D last becasue of spam

  actual result = [C,A,B,E,D]

   # observations

   A has more useful explanations, but C has more keywords, title match, and is shorter. (less risk for repetition, spam, etc.) Both scored very similar on proximity and frequency

   C scored significantly higher than B, the main difference being frequency



  # Changes going forward / trade-offs

  - Add an explanation-coverage score: reward documents for covering different explanation groups, not just repeating useful keywords.

  - For this query type, groups might include: variable has no value, function returns undefined,  missing object path, and data/async not loaded.

  - This should push Doc A higher because A covers more causes than C. It may also raise B.

  - Trade-off: the scorer becomes more complex and more hand-built, but the ranking should become more accurate rather there pure keyword/token matching.

## test 3 - fail

 actual result = [C,A,B,E,D]

 # observations

 - A is only 1 point from C with increased keywords, but diversity has no effect on either C or A.
 - B has increased, closer to C.


 # changes going forward

 - Duplicate score is having no affect. I will adjust the weighting on the duplicate scorer so it rewards/penalises through a range, rather than a binary point or minus point for either end of 0. (<= 0.3 and >= 0.8)


## test 4 - fail

 result = [C,A,B,E,D]

# observations

- Duplicate has a higher ratio on doc C than A.
- D has lost more points because of duplicate penalty.

 ## changes going forward / trade-offs

 - duplicate wasn't the answer for pushing A above C, but it has reduced D further, so will keep for repetitiveness.

 - will include a count for useful words, but will cap it; otherwise long docs will always win.

 - trade-off: shorter, more dense docs will be overlooked even if it contains useful information.

## test 5 - fail

result = [C,A,B,E,D]

 ## observations

 - C gained 0.5 points while A gained nothing. Will have to review the points/penalites.

 ## changes going forward

 - Will log the result from the useful-content function to see the numbers, and then will ensure the score is rewarding the more useful content.



## test 6 - success

result = [A,C,B,E,D]

 # observations 

 - A is now the winner and the overal output is in a good, working order.

 - A has the most useful content followed by C/B which are similar. (B having one extra example)
 - E/D are the the lowest, penalised heavily for repetition and spam.

# changes going forward

- will test on another query with 5 more docs and will see how the scorer behaves.



  

## second test 2 - (""cannot read property length") - success

 # observations

A is the winner, followed by B. Keywords, frequency, and useful-content scored similar and match accurately to the docs.





## third test 3 - ("why is length undefined") - fail

# observations

- B in the winner, with A 1 point behind. Main score difference was keywords, both having the same diversity.


# changes going forward

- have already began to change the search OR logic to continue/skip undefined tokens; the proximity also has guards incase neither token exists to stop the programme crashing.

- Will add stop words such as (is, why, what) to ignore so scorer can focus on the important tokens.

- my threshold scores for divserity aren't helping; it rewards docs that are close in ratio equally. I will either use a gradual scoring system like that in useful_content function or a multiplier.

## third test 2 - fail

 # observations

 - B still wins with A just behind. The new diversity method increased score, but only by a margin. 
 - Proximity has no effect with messier query types.

 - frequency scored the same on top two despite the repeated terms mentioned in doc A doesn't feel like spam or heavy repetition.

 - keywords can be overpowering, it seems. Doc A has a variety of keywords while doc B only has a few but scored similary.

 # changes going forward

 - will change frequency scorer to have a gradual scoring system rather than two, rigid fixed numbers.
 - will increase reward for a variety of keywords
 - will test with the first two changes above before inspecting proximity more.




