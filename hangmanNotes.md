# 1)

- Create array of words and create file in "/data/words.js"
- Create handler in "/handlers/words.js"
- Create endpoint in "server.js" and connect to handler function.

# 2

- Create handler in "handler/guess.js"
- Create endpoint using 2 supplementary variable in the endpoint
- Test the "req.params" to test id we returned the correct information.
- It is best practive to return an error message if request is not successful.
- Inport words and do "find" method using the endpoint's variable to retrieve the word from the array
- Returns a boolean array base on the letter variable from the endpoint

# 3

- Create a structure in the FE (referring to everything from "Public" folder)
- Use fetch from the BE in "script.js", in function "getWord".
- Used "startGame" function to replace the "h2" element with and array of (\_).
- Add event listener to function "startGame".
- Update the "guesses" variable and update tag's inner text.
- Make the function asynchronous
- Add "guesses" to the "guesses" variablers and push to variable, and append to HTML tag
- Take the guess and write control flow to confirm if the guess was right.
- Convert the answer array to a string and append to HTML tag.

# 4

- Write control flow to take only letter "key".
- Removed "," in the answer HTML tag.
- Wrote explanation from "script.js"

```js
answers = answers.map((answer, index) => {
  // If truthy, in the data array
  if (answer) {
    // Will return true as it is already true.
    return answer;
  }
  // If truthy, there is a letter in the word and guessed correcly
  if (data[index]) {
    // Returns the letter to the correct "ID" if correct answer is typed.
    return game.foundWord.word[index];
  }
  //
  return data[index];
});
```
