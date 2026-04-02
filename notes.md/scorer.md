## scorer system

## scorer goal
- scorer the most revelant results while avoiding spammy and high repetitive docs

## example

Search (“seach engine design.”)

a)	Search.engine.design.txt(“search search search …”)
b)	Searching.design.txt (“design a search engine.”)
c)	Doc3.txt (“search design engine. Seach search engine design.”)
d)	Search.engine.txt (“search engine design tutorial.”)

Best result = [D,B,C,A]

## scorer design

 version 1 will include:

 - title tokens - titleTokens
   - Matching tokens and filenames will be one of the strongest signals. why: a correct filename means a strong change the content is revelant 

 - proximity - tokenpositions
  - terms close together or in sequence are high signal, and far apart - low signal. terms further apart might suggest the content contains a lot of unrelated information

  - term frequency and spam control
   - repeated terms have a higher score but can become spam. If same term is mentioned > 3 times in a row, there will be a penalty

 - coverage
  - how many query terms are matched throughout the documents? the rarer terms will have a higher score (good indication that content might be relevent)

 - document length
  - the shorter documents might have a better change of being focused; longer ones might contain a lot of irrelevant information

 # trade-offs
 - term frequency is a good indication of relevance, but increases change of spam
 - title tokens may be overpowering and score doc with weak body content higher
 - longer docs may have more useful information. More information doesn't mean bad information

