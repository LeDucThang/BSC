/**
 * Created by ThangLD5 on 12/29/2014.
 */
    // Area for paging
app.filter('offset', function () {
    return function (input, start) {
        start = parseInt(start, 10);
        return input.slice(start);
    };
});

//Filter
app.filter('count', function () {
    return function (collection, key) {
        var out = "test";
        for (var i = 0; i < collection.length; i++) {
            //console.log(collection[i].pants);
            //var out = myApp.filter('filter')(collection[i].pants, "42", true);
        }
        return out;
    }
});


app.filter('groupBy',
    function () {
        return function (collection, key) {
            if (collection === null) return;
            return uniqueItems(collection, key);
        };
    });