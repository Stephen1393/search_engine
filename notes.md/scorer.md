## scorer system

## scorer goal
- score the most revelant results while avoiding spammy and high repetitive docs

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
  - terms in sequence are high signal, and far apart - low signal. terms further apart might suggest the content contains a lot of unrelated information (not specific enough)

  - spam control
   -  If term is mentioned > 2 times in a row, there will be a penalty

 - coverage
  - how many query terms are matched throughout the documents? the rarer terms will have a higher score (good indication that content might be relevent)

 - document length (on hold for now. See what tests return)
  - the shorter documents might have a better change of being focused; longer ones might contain a lot of irrelevant information 

 # trade-offs
 - title tokens may be overpowering and score docs with weak body content higher
 - longer docs may have more useful information. More information doesn't mean bad information

