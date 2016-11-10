var gulp = require('gulp');
var awspublish = require('gulp-awspublish');
const fs = require("fs");


gulp.task('hello', function(){
    console.log("hello world");
})


gulp.task('deploy', function() {

  fs.readFile("./deploy_keys.json", "utf-8", function(err, data){

    console.log("key data", data);
    var key_json = JSON.parse(data);
    var key = {
      accessKeyId: key_json.AWSAccessKeyId,
      secretAccessKey: key_json.AWSSecretKey,
      region: key_json.AWSRegion,
      params: {
        "Bucket": "mixidea.org",
      }
    }
    
    var publisher =awspublish.create(key);
    gulp.src(["./dist/*","./dist/**/**/*","./dist/**/**/**/*" ])
        .pipe(publisher.publish())
        .pipe(publisher.sync())
        .pipe(awspublish.reporter());
  })

});


