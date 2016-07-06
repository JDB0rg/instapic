(!function() {
	angular.module('inApp')

          .factory('S3UploaderSrv', ['$q', '$timeout', function($q, $timeout) {
        			function process(file, $index, scope, ngModel) {
        				var defer = $q.defer();
        				var ext = file.name.split('.').pop().toLowerCase();
        				var key = scope.options.folder || '';
        				if(scope.options.filename) {
        					key += scope.options.filename + '.' + ext;
        				} else {
        					key += file.name.replace(' ', '-');
        				}

        				var fd = new FormData();
        				fd.append('key', key);
        				fd.append('acl', scope.options.acl || 'public-read');
        				fd.append('Content-Type', file.type);
        				fd.append('AWSAccessKeyId', scope.options.policy.key);
        				fd.append('policy', scope.options.policy.policy);
        				fd.append('signature', scope.options.policy.signature);
        				fd.append("file", file);

        				var xhr = new XMLHttpRequest();
        				xhr.upload.addEventListener("progress", uploadProgress, false);
        				xhr.addEventListener("load", uploadComplete, false);
        				xhr.addEventListener("error", uploadFailed, false);
        				xhr.addEventListener("abort", uploadCanceled, false);

        				xhr.open('POST', '//' + scope.options.bucket + '.s3.amazonaws.com/', true);
        				xhr.send(fd);

        				file.upload = true;
        				file.progress = false;
        				file.percent = 0;
        				file.cancel = function() {
        					xhr.abort();
        					delete file;
        				};

        				var last_loaded = 0;
        				var last_time = new Date().getTime();
        				var count = 0;
        				var summ = 0;

        				function uploadComplete(e) {
        					var xhr = e.srcElement || e.target;
        					if(xhr.status === 204) {
        						file.real = window.location.protocol + '//' + scope.options.bucket + '.s3.amazonaws.com/' + key;
        						stop(true);
        					} else {
        						stop(false);
        					}
        				}

        				function uploadFailed(e) {
        					stop(false);
        				}

        				function uploadCanceled(e) {
        					stop(false);
        				}

        				function stop(success) {
        					$timeout(function() {
        						scope.$apply(function() {
        							file.success = success;

        							delete file.progress;
        							delete file.speed;
        							delete file.cancel;
        							delete file.upload;
        							delete file.webkitRelativePath;
        							delete file.lastModifiedDate;
        							delete file.lastModified;

        							scope.start_upload_state = false;

        							if(success) {
        								defer.resolve(file);
        							} else {
        								defer.reject(xhr);
        							}
        							scope.start_upload_state = false;
        						});
        					}, 0);
        				}

        				return defer.promise;
        			}

        			return {
        				process: process
        			}
        		}]).

        		directive('s3Upload', [function() {
        			return {
        				restrict: 'EA',
        				scope:    {
        					's3Upload': '='
        				},
        				link:     function(scope, el) {

        					el.bind('click', function() {
        						scope.$parent.$broadcast('s3uploader:start');
        					});

        					el.css({'visibility': 'hidden'});

        					scope.$watch('s3Upload', function(oldv, newv) {
        						angular.forEach(scope.s3Upload, function(v, k) {
        							if(!v.real) {
        								el.css({'visibility': 'visible'});
        							}
        							return false;
        						})
        					}, true)
        				}
        			}
        		}]).

        		filter('filesize', [function() {
        			return function(bytes, precision) {
        				if(isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
        				if(typeof precision === 'undefined') precision = 1;
        				var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
        					number = Math.floor(Math.log(bytes) / Math.log(1024));
        				return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) + ' ' + units[number];
        			}
        		}]).

        		filter('speedsize', [function() {
        			return function(bytes, precision) {
        				if(isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
        				if(typeof precision === 'undefined') precision = 1;
        				var units = ['Kb/s', 'Kbs/s', 'Mbs/s', 'Gbs/s', 'Tbs/s', 'Pbs/s'],
        					number = Math.floor(Math.log(bytes) / Math.log(1024));
        				return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) + ' ' + units[number];
        			}
        		}]);
      })
