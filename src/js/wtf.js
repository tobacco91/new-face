function $(selector) {
    if (document.querySelectorAll(selector).length === 1) {
        return document.querySelector(selector);
    } else {
        return document.querySelectorAll(selector);
    }
};

function ajax(conf) {
    var method = conf.method;
    var url = conf.url;
    var success = conf.success;
    var data = conf.data;
    var xhr = new XMLHttpRequest();

    xhr.open(method, url, true);

    if (method == 'GET' || method == 'get') {
        xhr.send(null);
    } else if (method == 'POST' || method == 'post') {
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.send(JSON.stringify(data));
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            success(JSON.parse(xhr.responseText));
        }
    };
    
};
