import React from "react";

class Test extends React.Component {
  state = {
    welcome: "Hello",
    word1: "A",
    word2: "ABZJ",
    word3: "AAA",
    word4: "ADZDC"
  };

  /**
   * Dictionary: O(N) time, O(1) space
   * In Place: O(N^2) time, O(1) space
   *
   * Arguments:
   * The dictionary method is technically O(1) time and space, because the string can't be longer than the alphabet.
   * The alphabet is constant size.
   *
   *
   * Additional methods:
   * You can check if the word is longer than the alphabet.
   */
  isUniqueDict = word => {
    const dict = {};

    let i;
    for (i = 0; i < word.length; i += 1) {
      const letter = word[i];

      // If the letter exists, return false
      if (letter in dict) {
        return false;
      }

      dict[letter] = 1;
    }

    return true;
  };

  isUniqueInPlace = word => {
    let i;
    for (i = 0; i < word.length; i += 1) {
      const letter = word[i];
      let j;
      for (j = i + 1; j < word.length; j += 1) {
        console.log(word[j]);
        console.log(letter);
        if (word[j] === letter) {
          return false;
        }
      }
    }

    return true;
  };

  render() {
    const { welcome, word1, word2, word3, word4 } = this.state;

    console.log(this.isUniqueDict(word1));
    console.log(this.isUniqueDict(word2));
    console.log(this.isUniqueDict(word3));
    console.log(this.isUniqueDict(word4));
    console.log(this.isUniqueInPlace(word1));
    console.log(this.isUniqueInPlace(word2));
    console.log(this.isUniqueInPlace(word3));
    console.log(this.isUniqueInPlace(word4));
    return <div>{welcome}</div>;
  }
}

export default Test;
