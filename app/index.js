'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');
var yosay = require('yosay');
var process = require('process');
var fs = require('fs-extra');
var glob = require('glob');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },
  askForProjectName: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('Hedley') + ' generator!'
    ));

    var prompts = [{
      name: 'projectName',
      message: 'What is the project machine name?',
      default: 'headless_drupal7'
    }];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;

      done();
    }.bind(this));
  },

  askForGithubRepo: function () {
    var done = this.async();

    var prompts = [{
      name: 'githubRepo',
      message: 'What is the GitHub repo URL?',
      default: ''
    }];

    this.prompt(prompts, function (props) {
      this.githubRepo = props.githubRepo;

      done();
    }.bind(this));
  },


  writing: {
    appStatic: function() {
      var self = this;
      var source = this.templatePath();
      var destination = this.destinationPath();

      var files = glob.sync(self.templatePath() + '/**/*');

      files.forEach(function(file) {
        if (fs.lstatSync(file).isDirectory()) {
          // Don't try to copy a directory.
          return;
        }

        var fileName = file.replace(self.templatePath('/'), '');
        var newFileName = fileName
          .replace('skeleton', self.projectName)
          .replace(/^_/g, '_');

        self.fs.copy(
          self.templatePath(fileName),
          self.destinationPath(newFileName)
        );
      });
    }
  },

  install: {

    /**
     * Install Behat.
     */
    behat: function() {
      var options = {
        cwd: './behat'
      };

      // this.spawnCommand('composer', ['install'], options);
    },

    /**
     * Install bower/ npm on the "client" directory.
     */
    client: function() {
      var options = {
        cwd: './client'
      };

      this.log('bower install');
      // this.bowerInstall(null, options);

      this.log('npm install');
      // this.npmInstall(null, options);
    },

    drupal: function() {
    }
  }


});
