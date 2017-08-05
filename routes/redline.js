var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/:imageName', function(req, res, next) {
    var imageName = '../images/' + req.params.imageName;
    res.render('redline', { image: imageName });
});

router.post('/saveImage', function(req, res, next) {

    var image = req.body.image;

    var imageName = req.body.imageName;

    image = image.replace('data:image/jpeg;base64,', '');

    var buf = new Buffer(image, 'base64');


    fs.writeFile('./public/images/' + imageName, buf, function(err) {
        if (err) {
            console.log(err);
        }
    });

    res.send('Image saved');

});

module.exports = router;