import Vue from 'vue';

const ajaxHandle = () => {
  const buildUrl = (url, params) => {
    let str = '?'
    for (const key in params) {
      url += str + key + '=' + params[key];
      str = '&';
    }
    return url;
  };

  const strGetObjValue = (obj, str) => {
    let curObj = JSON.parse(JSON.stringify(obj));
    str.split('.').map((key, index) => {
      curObj = curObj[key];
    });
    return curObj;
  };

  const ajaxGet = (url, options, fn) => {
    let results = null;

    if (!Vue.Cookie.getCookie('powersessionid')) {
      window.location.href = 'http://xdpower.tongbanjie.com/login';
    } else {
      if (typeof options === 'function' && arguments.length <= 3) {
        fn = options;
        options = {};
      }

      Vue.http.get(url, options).then((response) => {
        if (response.ok) {
          results = response.body;
          fn(1, results);
        } else {
          fn(0, results);
        }
      }, (error) => {
        if (error) {
          fn(0, results);
        }
      });
    }
  };

  const ajaxJsonp = (url, fn) => {
    let results = null;
    Vue.http.jsonp(url).then((response) => {
      if (response.ok) {
        results = response.body;
        fn(1, results);
      } else {
        fn(0, results);
      }
    }, (error) => {
      if (error) {
        fn(0, results);
      }
    });
  };

  const ajaxPost = (url, params, options, fn) => {
    let results = null;

    if (!Vue.Cookie.getCookie('powersessionid')) {
      window.location.href = 'http://xdpower.tongbanjie.com/login';
    } else {
      if (typeof options === 'function' && arguments.length <= 3) {
        fn = options;
        options = {};
      }

      Vue.http.post(url, params, options).then((response) => {
        if (response.ok) {
          results = response.body;
          fn(1, results);
        } else {
          fn(0, results);
        }
      }, (error) => {
        if (error) {
          fn(0, results);
        }
      });
    }
  };

  const normalAjax = (url, fn, originResult) => {
    const ort = originResult ? originResult : [];
    ajaxGet(url, function(state, results) {
      if (state) {
        let back = ort;
        if (results.status === 0) {
          if (results.data) {
            back = results.data;
          }
        }
        fn(state, back);
      } else {
        fn(state, ort);
      }
    });
  };

  const normalAjaxPost = (url, params, fn, originResult) => {
    const ort = originResult ? originResult : [];
    ajaxPost(url, params, function(state, results) {
      if (state) {
        let back = ort;
        if (results.status === 0) {
          if (results.data) {
            back = results.data;
          }
        }
        fn(state, back);
      } else {
        fn(state, ort);
      }
    });
  };

  return {
    buildUrl: buildUrl,
    strGetObjValue: strGetObjValue,
    ajaxJsonp: ajaxJsonp,
    ajaxGet: ajaxGet,
    ajaxPost: ajaxPost,
    normalAjax: normalAjax,
    normalAjaxPost: normalAjaxPost
  }
};

export default ajaxHandle;