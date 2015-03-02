var fs = require('fs');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var through = require('through2');
var template;

const PLUGIN_NAME = 'gulp-header-footer-gen';

module.exports = function (filePath) {
    return through.obj(function (file, encoding, next) {
        loadTemplate(file, filePath, encoding, next);
    });
};

function loadTemplate(file, filePath, encoding, next) {
    if (template) {
        injectContent(file, next);
    } else {
        fs.readFile(filePath, "utf-8", function (err, page) {
            if (err) {
                next(new PluginError(PLUGIN_NAME, 'problem reading template file'));
                return;
            }
            console.log('loaded template file');
            template = page.replace(/<!-- MAIN_CONTENT_START -->[^]+<!-- MAIN_CONTENT_END -->/, ':PLACE:');
            injectContent(file, next);
        });
    }
}

function injectContent(file, next) {
    var fileData = file.contents.toString('utf8');
    var match = fileData.match(/<!-- MAIN_CONTENT_START -->([^]+)<!-- MAIN_CONTENT_END -->/);
    if (match == null){
        next(new PluginError(PLUGIN_NAME, 'did not find the MAIN_CONTENT html tags'));
        return;
    }
    var finalPage = template.replace(/:PLACE:/, '<!-- MAIN_CONTENT_START -->' + match[1] + '<!-- MAIN_CONTENT_END -->\n');
    finalPage = finalPage.replace(/\.\//ig, "../");
    finalPage = finalPage.replace(/images\//ig, "../images/");
    file.contents = new Buffer(finalPage);
    next(null, file);
}
