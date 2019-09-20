const request = require('request');

function url(term) {
  return `https://api.yelp.com/v3/businesses/search?term=${term}&latitude=49.281815&longitude=-123.108414`;
}

function get(term = "cafe") {
  return new Promise((resolve, reject) => {
    request.get(url(term), {
      'auth': {
        'bearer': 'MpkOVAHFzB7ZUYbR_SIYGU49ptu36zMBeJ2L0GIrlb33POEGZp1HSubftfiD1m_hBCnks6TjTUuiMHp6JtrmNDvKzXeUvExPXqgtJqwVe4nTF_gcDfejKEeSo2NJWnYx'
      }
    }, function (e, r, data) {
      if (e) {
        reject(e);
        return;
      }
      resolve(data);
    });
  });
}

exports.get = get;