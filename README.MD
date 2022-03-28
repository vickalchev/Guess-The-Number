# Guess The Number

## Description

Create a game where the user guesses a number from 1 to 100. The user enters a number in an input field in the DOM and clicks on a button "Check Result". The JS script takes the number and compares it with a randomly generated number using `Math.random`. If the input number matches the random number, then the user wins a prize. If not, they get a message "Try Again".

## Objective

The purpose of this exercise is to practice DOM manipulation:

- Taking an input from a field (input field);
- Assessing the input (whether it matches a random number);
- Writing to the DOM depending on the result of the test.

## The Tricky Parts

### Type Equality

While testing the function I noticed that I always got a "Winner!!!" result. That is, `userNum === appNum` never evaluated to `true` and the expression on line 9 never ran. I thought there must have been two reasons for this:

1.  I was extremely unlucky and my input entries (`userNum`) never got to match the random number generation assigned to `appNum`.
2.  There is an actual error in my code.

I was totally fine with number 1 (i.e. my extreme lack of luck) but not so with number 2. To rule out a bug, I decided to do a crude test.

Instead of assigning a random value to `appNum` through `Math.random()`, I assigned it a fixed value of 20. Then, I entered into the input field also a value of 20, pressed Submit and... I got "Try Again!". `userNum = 20` and `appNum = 20`, yet, `userNum === appNum` evaluated to `false`.

This made no sense in real life but was perfectly reasonable in JavaScript. Here's how: In JavaScript we have several value types - string and number are two of them. The value of 20 can be a string or a number. If we evaluate `'20' == 20`, we get `true`. In the case of loose equality (`==`), JavaScript takes the string and converts it to a number. This is why, we get `true`.

We don't get the same result if we test for strict equality - `'20' === 20` evaluates to `false`. This was the type of equality I was using in my if-statement.

Using strict equality shouldn't have mattered in my code though. I was comparing a number to a number. Or was I?

To confirm this, ran a `typeof` on `document.getElementById('inputNum').value` - the value assigned to `userNum`. It turned out it was a string. It came to a surprise to me, as I intentionally had set the input field to a number (`<input type="number"...>`). Still, the value passed on to `userNum` was a string. I knew that input values are always passed as string types but I thought I could circumvent this by assigning a `type = "number"`. Apparently not. The attribute restricted what I can enter but didn't affect the type of the value.

This was the reason why my if-statement was never going to return `true`. It was applying strict equality (`===`) when comparing a string with a number.

I had two ways to fix this:

1. I could simply evaluate for a truthy in my if-statement (`==`). This way, if the string value of `userNum` was equal to `appNum`, then I'd get a `true` value.
2. I could convert the value of `userNum` to a number. I could do it by wrapping the value with the `Number()` method: `Number(document.getElementById('inputNum').value)`.

I chose the second option out of principle. While truthies have their place in JavaScript, I always found them uncomfortable elusive. In the context of this program, two values shouldn't be sort of equal. They either are or are not. So, I chose to convert the string to a number and compare two numbers.
