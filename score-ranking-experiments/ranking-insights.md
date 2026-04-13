# scorer test 1

query(TypeError: Cannot read properties of undefined (reading 'length'))

## A) doc1.txt:

 "TypeError: cannot read properties of undefined. (reading 'length')"

 common causes and fixes:

   variable has no value
   - e/g. A variable exists but was never assigned anything
   - Fix: variable expected to hold data but is undefined. Make sure a variable is assigned before trying to access .length from it


   function didn't return anything
   - e.g. A function didn't return anything, so the result is undefined
   - Fix: check the result is within the function and returns the value expected

   Missing part of an object path
   - e.g: along an object path, you're accessing something that is undefined
   - Fix: ensure all nested properties along an object path have values

   data hasn't loaded yet
   - e.g: code runs before data arrives
   - fix: wait for the data/async to complete

## B) TypeError.cannot.read.txt:

common causes:
   
    variable has no value
   - e/g. A variable exists but was never assigned anything
   - Fix: variable expected to hold data but is undefined. Make sure a variable is assigned before trying to access .length from it

    function didn't return anything
   - e.g. A function didn't return anything, so the result is undefined
   - Fix: check the result is within the function and returns the value expected

## C) TypeError.txt:

"TypeError: cannot read properties of undefined. (reading 'length')"

most common cause:
-  Missing part of an object path
   - e.g: along an object path, you're accessing something that is undefined
   - Fix: ensure all nested properties along an object path have values

## D) doc4.txt:

"TypeError: cannot read properties of undefined. (reading 'length')"
"TypeError: cannot read properties of undefined. (reading 'length')"
"TypeError: cannot read properties of undefined. (reading 'length')"
"TypeError: cannot read properties of undefined. (reading 'length')"
"TypeError: cannot read properties of undefined. (reading 'length')"
"TypeError: cannot read properties of undefined. (reading 'length')"
"TypeError: cannot read properties of undefined. (reading 'length')"
"TypeError: cannot read properties of undefined. (reading 'length')"
"TypeError: cannot read properties of undefined. (reading 'length')"


## E) typeError.undefined:

 common causes and fixes:

   variable has no value
   - e/g. A variable exists but was never assigned anything
   - Fix: variable expected to hold data but is undefined. Make sure a variable is assigned before trying to access .length from it


   function didn't return anything
   - e.g. A function didn't return anything, so the result is undefined
   - Fix: check the result is within the function and returns the value expected

   Missing part of an object path
   - e.g: along an object path, you're accessing something that is undefined
   - Fix: ensure all nested properties along an object path have values

   data hasn't loaded yet
   - e.g: code runs before data arrives
   - fix: wait for the data/async to complete

 common causes and fixes:

   variable has no value
   - e/g. A variable exists but was never assigned anything
   - Fix: variable expected to hold data but is undefined. Make sure a variable is assigned before trying to access .length from it


   function didn't return anything
   - e.g. A function didn't return anything, so the result is undefined
   - Fix: check the result is within the function and returns the value expected

   Missing part of an object path
   - e.g: along an object path, you're accessing something that is undefined
   - Fix: ensure all nested properties along an object path have values

   data hasn't loaded yet
   - e.g: code runs before data arrives
   - fix: wait for the data/async to complete


expected results:

My expected result is [A,E,B,C,D]

doc A has matching tokens, no spam, multiply causes and fixes. This should clearly rank #1.

doc E, while duplicated, has all the use of A. 

doc B has some good uses, but not all causes and fixes are covered.

doc C is similar to B, but only has one cause and fix.

doc D is clearly spam.

What might fail:
With my current scorer, B might rank higher than E because of E's repeated tokens and because B has the most title tokens.
Or repetition might be rewarded too much and will possible rank D higher. Therefore, E might come before A.










