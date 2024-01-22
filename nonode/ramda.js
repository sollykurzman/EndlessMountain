/**
 * This is an integration fix, so that Ramda can be imported in the same way
 * both on server and on browser, and also not trip jslint.
 */

function range(from, to) {
    var result = [];
    var n = from;

    while (n < to) {
        result.push(n);
        n += 1;
    }

    return result;
}