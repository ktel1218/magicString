function stringFactory(){

    var pastCounts = {};

    function generateMagicString(n){

        if (n in pastCounts){
            // return the solution saved in the object in stringFactory
            return [pastCounts[n][0], pastCounts[n][1]]
        }

        // initialized values

        var magicString = "122";
        var count1 = 1;
        var count2 = 2;
        var currentNumberPointer = 2;

        // the following is to see if we've made progress towards our final
        // number in pastCounts. Get the highest value of n that's still under
        // our value of n, and start counting from there

        var keys = [];
        for (key in pastCounts) {
            keys.push(key)
        }
        var maxKey;

        if (keys.length > 0){
            // find the highest key that's still less than n
            maxKey = keys[0];
            for (var i = 1; i < keys.length; i++) {
                console.log(maxKey);
                if (keys[i] > maxKey && keys[i] < n){
                    maxKey = keys[i]

                }
            }
        }

        if (maxKey && maxKey < n) {
            // I don't like that I check to see if maxKey is less than n again
            var settings = pastCounts[maxKey];
            count1 = settings[0];
            count2 = settings[1];
            magicString = settings[2];
            currentNumberPointer = settings[3];
        }


        stringBuildingLoop: while (true) {
            var currentNumber = parseInt(magicString[currentNumberPointer]);
            var last_number = parseInt(magicString[magicString.length - 1]);
            for (var j = 0; j < currentNumber; j++) { // loops once for 1, twice for two, a little silly
                if (last_number === 1) {
                    magicString += "2";
                    count2 += 1;
                }
                else {
                    magicString += "1";
                    count1 += 1;
                }
                if (magicString.length === n) {
                    break stringBuildingLoop; // breaking out of a named loop
                }
            };

            currentNumberPointer++;

        };
        pastCounts[n] = [count1, count2, magicString, currentNumberPointer]
        // save the results to our object so we don't have to duplicate our work
        return [count1, count2]
    }

    return generateMagicString;

}

var makeString = stringFactory();
console.log(makeString(11)); // creates magic string
console.log(makeString(11)); // returns value from last time
console.log(makeString(12)); // uses value from last time but generates next digit in string
