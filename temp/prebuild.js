var fs = require('fs');
var path = require('path');

var main = function () {
  var teamInfo = JSON.parse(fs.readFileSync(path.join(__dirname, 'teamInfo.json'), 'utf8'))['folders'];

  var teams = [];
  var folders = {};
  var images = {};

  var clean = function (text) {
    return text.toLowerCase().replace(/-/g, '').replace(/ /g, '');
  }

  var parseInfo = function (teamInfo, i, cb) {
    var team = teamInfo[i][0];

    teams.push(team);
    folders[team] = teamInfo[i][1];
    fs.readdir(path.join(__dirname, '../client/public/img/'), (err, files) => {
      images[team] = files.filter((file) => {
        return clean(file).startsWith(clean(team));
      }).map((file) => {
        return '/img/' + file;
      });
      if (i + 1 < teamInfo.length) {
        parseInfo(teamInfo, i+1, cb)
      } else {
        cb(teams, folders, images);
      }
    });
  }
  
  parseInfo(teamInfo, 0, function (teams, folders, images) {
    var data = {}
    data['teams'] = teams;
    data['folders'] = folders;
    data['images'] = images;
    fs.writeFileSync(path.join(__dirname, '/data.json'), JSON.stringify(data));
  })
}

main();