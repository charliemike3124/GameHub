const StringGenerators = {
  generateCode(codeLength) {
      const length         = codeLength;
      const characters     = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var result           = [];
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
      }
      return result.join('');
  },
  generateRandomScoredLetters(arrayLength, minScore, maxScore) {
      const length         = arrayLength;
      const characters     = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var result           = [];
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
          let rnd = Math.floor(Math.random() * (maxScore - minScore) + minScore);
        result.push({
            char: characters.charAt(Math.floor(Math.random() * charactersLength)),
            score: rnd
          });
      }
      return result;
  }
}

export { StringGenerators };