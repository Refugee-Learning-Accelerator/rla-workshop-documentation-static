var fs = require('fs');
var path = require('path');

var baseInfo = JSON.parse(fs.readFileSync(path.join(__dirname, '/baseInfo.json'), 'utf8'));

var teams = baseInfo['teams'];
var folders = baseInfo['folders'];
var images = {};

var files = fs.readdirSync(path.join(__dirname, '../../assets/img'));
var clean = (text) => { return text.toLowerCase().replace(/-/g, '').replace(/ /g, ''); }

for (var i = 0; i < teams.length; i++) {
  images[teams[i]] = files.filter((file) => {
    return clean(file).startsWith(clean(teams[i]));
  }).map((file) => {
    return 'assets/img/' + file;
  });  
}
  
var data = {}
data['teams'] = teams;
data['folders'] = folders;
data['images'] = images;
fs.writeFileSync(path.join(__dirname, '/../../dist/data.json'), JSON.stringify(data, null, 4));
