'use scrict';

(function calcDimensions() {
    /*
     * Calculate dimensions
     */
    $('.btn-primary').on('click', function(e) {
        e.preventDefault();

        var $width = $('#width'),
            widthVal = $('#width').val(),
            $height = $('#height'),
            heightVal = $('#height').val(),
            $newWidth = $('#new-width'),
            $newHeight = $('#new-height'),
            $ratio = $('.ratio'),
            $oldImageTile = $('.tile--original'),
            $newImageTile = $('.tile--new');

        console.log(widthVal);
        
        console.log(heightVal);

        var newAspectRatio = nearestNormalAspectRatio(widthVal, heightVal, 1);

        console.log(newAspectRatio);

        // Calc new dimensions
        var ratioVals = newAspectRatio.split(':');

        console.log(ratioVals[0]);
        var roundedWidth = Math.round(widthVal / ratioVals[0]),
            newWidthVal = Math.round(roundedWidth * ratioVals[0]),
            newHeightVal = Math.round(roundedWidth * ratioVals[1]);

        // Update fields
        $oldImageTile.attr('src', 'http://placehold.it/' + widthVal + 'x' + heightVal);
        $newWidth.val(newWidthVal);
        $newHeight.val(newHeightVal);
        $ratio.text(newAspectRatio);
        $newImageTile.attr('src', 'http://placehold.it/' + newWidthVal + 'x' + newHeightVal);
    });
})();

function nearestNormalAspectRatio(width, height, side) {
    /*
     * Calculate the nearest normal aspect ratio
     *
     * width: The width of the space.
     * height: The height of the space.
     * side: The nearest ratio to side with. A number higher than zero tells the function to always return the nearest ratio that is equal or higher than the actual ratio, whereas a smaller number returns the nearest ratio higher that is equal or smaller than the actual ratio. Defaults to 0.
     * maxWidth: The maximum width in the nearest normal aspect ratio. Defaults to 16.
     * maxWidth: The maximum height in the nearest normal aspect ratio. Defaults to 16.
     *
     * https://gist.github.com/jonathantneal/d3a259ebeb46de7ab0de
     */
    var ratio = (width * 100) / (height * 100),
        maxW = 3 in arguments ? arguments[2] : 10,
        maxH = 4 in arguments ? arguments[3] : 10,
        ratiosW = new Array(maxW).join(',').split(','),
        ratiosH = new Array(maxH).join(',').split(','),
        ratiosT = {},
        ratios = {},
        match,
        key;

    ratiosW.forEach(function (empty, ratioW) {
        ++ratioW;

        ratiosH.forEach(function (empty, ratioH) {
            ++ratioH;

            ratioX = (ratioW * 100) / (ratioH * 100);

            if (!ratiosT[ratioX]) {
                ratiosT[ratioX] = true;

                ratios[ratioW + ':' + ratioH] = ratioX;
            }
        });
    });

    for (key in ratios) {
        if (!match || (
            !side && Math.abs(ratio - ratios[key]) < Math.abs(ratio - ratios[match])
        ) || (
            side < 0 && ratios[key] <= ratio && Math.abs(ratio - ratios[key]) < Math.abs(ratio - ratios[match])
        ) || (
            side > 0 && ratios[key] >= ratio && Math.abs(ratio - ratios[key]) < Math.abs(ratio - ratios[match])
        )) {
            match = key;
        }
    }

    return match;
}