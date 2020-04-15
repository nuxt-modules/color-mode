// Add dark / light detection that runs before loading Nuxt.js.
(function() {
  var getCookie = function (name) {
    var nameEQ = name + '=';
    var cookies = document.cookie.split(';');

    for (var i=0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) == 0) {
          return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
  }
  var addClass = function (value) {
    var className = value + '-mode'
    if (document.documentElement.classList) {
      document.documentElement.classList.add(className);
    } else {
      document.documentElement.className += ' ' + className;
    }
  }
  var removeClass = function (value) {
    var className = value + '-mode'
    if (document.documentElement.classList) {
      document.documentElement.classList.remove(className);
    } else {
      document.documentElement.className = document.documentElement.className.replace(new RegExp(className, 'g'), '')
    }
  }
  var getColorScheme = function () {
    var colorSchemeSupported = window.matchMedia && window.matchMedia('(prefers-color-scheme)').media !== 'not all'
    if (colorSchemeSupported && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    } else if (colorSchemeSupported && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    } else {
      return '<%= options.fallback %>';
    }
  }
  var preference = getCookie('<%= options.cookie.key %>') || '<%= options.preference %>';
  var value = preference;

  if (preference === 'system') {
    value = getColorScheme()
  }
  window.__NUXT_COLOR_MODE__ = {
    preference,
    value,
    getColorScheme,
    addClass,
    removeClass
  };
  addClass(value)
})();
