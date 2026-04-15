## progress

26/03/26

-- The index now stores titleTokens from the filename. This will help boost a higher score if it matches with tokens from doc.

   -- Fixed an issue that now stores objects of docMeta[docId] in the parent of DocMeta instead of reassigning it.

   -- added tokenPositioning for each docId to track tokens within the doc; Will help with proximity and term frequency from the scorer.

28/03/26

   -- Stored the length of the docs to ensure the shorter, more focused ones score higher.

02/04/26

   -- Start scorer logic. Compare queryterms to title tokens to track tokens and their positions. Those matching on both will score the highest.

   08/04/26

   -- track token positions in scorer and reward if they follow sequence.

   09/04/26

   -- add spam penalty in scorer for tokens in a sequence > 2

   11/04/26

   -- Add main scorer result in scorer function. Finish version 1 scorer
   -- Update AND retrieval search with OR and store docId's with their score. Finish search version 2

15/04/26

   -- Add doc tests ready for test
   -- Add basic scorer function to compare against main function


   
