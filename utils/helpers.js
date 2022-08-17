//function to test
module.exports = {
    format_plural: (word, amount) => {
        if (amount === 0){
            return `has no associated ${word}s`;
        }else if (amount === 1) {
            return `${word}`;
        }
        return `${word}s`;
    },
    pascal_case: (word) => {
        //split the words within the string
        var array = word.toLowerCase().split(" ");
        var result = array.map(function(val) {
            return val.replace(val.charAt(0), val.charAt(0).toUpperCase());
        });
        return result.join(" ");
    }
};
