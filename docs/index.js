
// Fetch Plugins
let plugins = [];
fetchBrowserPlugins();
function fetchBrowserPlugins() {
    for (let i = 0; i < navigator.plugins.length; i++) {
        plugins.push(' ' + navigator.plugins[i].name); // finding browser plugins
    }
}

// Fetch Browser basic info
let browser = fetchBrowserInfo();
function fetchBrowserInfo() {
    let ua = navigator.userAgent;
    let temp;
    let Match = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(Match[1])) {
        temp = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return { name: 'IE', version: (temp[1] || '') };
    }
    if (Match[1] === 'Chrome') {
        temp = ua.match(/\bOPR|Edge\/(\d+)/)
        if (temp != null) { return { name: 'Opera', version: temp[1] }; }
    }
    M = Match[2] ? [Match[1], Match[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((temp = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, temp[1]); }
    return {
        name: Match[0],
        version: Match[1]
    };
}

// Fetch Internet information
fetchInternetInfo().then(data => {
    displayFinalResponse(data)
});
function fetchInternetInfo() {
    return fetch("http://ip-api.com/json").then(resp => {
        return resp.json();
    })
}

// Display final response
function displayFinalResponse(data) {

    let list = document.getElementById("debug_info-list"); // parent element to display list titems
    let listItems = [{
        title: 'IP Address',
        description: data.query ? data.query : '-'
    }, {
        title: 'ISP',
        description: data.isp ? data.isp : '-'
    }, {
        title: 'User Agent',
        description: navigator.userAgent
    }, {
        title: 'Time, according to browser',
        description: new Date().toLocaleString()
    }, {
        title: 'Timezone offset',
        description: Intl.DateTimeFormat().resolvedOptions().timeZone
    }, {
        title: 'Language',
        description: navigator.language
    }, {
        title: 'Browser Info',
        description: browser.name
    }, {
        title: 'Plugins',
        description: plugins
    }, {
        title: 'Cookies',
        description: navigator.cookieEnabled ? 'Enabled' : 'Disabled'
    }, {
        title: 'Screen Resolution',
        description: screen.width + " x " + screen.height
    }, {
        title: 'Encoding',
        description: ""
    }, {
        title: 'Keep Alive',
        description: "Keep Alive"
    }]

    listItems.forEach(obj => {
        let item = document.createElement("li");    // list item 
        item.className = "debug_info-item";

        let itemTitle = document.createElement("div"); // item title
        const titleContent = document.createTextNode(obj.title);
        itemTitle.className = "item-title";
        itemTitle.appendChild(titleContent);
        item.appendChild(itemTitle);

        let itemDesc = document.createElement("div"); // Item Description
        itemDesc.className = "item-desc";
        const descContent = document.createTextNode(obj.description);
        itemDesc.appendChild(descContent);
        item.appendChild(itemDesc);

        item.onclick = function (event) {
            copyClipboard(event.target);
        };

        list.appendChild(item)
    });
}

// Clipboard method to copy clicked data
async function copyClipboard(obj) {
    await navigator.clipboard.writeText(obj.innerText);

    let itemMessage = document.createElement("div"); // Item Message
    itemMessage.innerText = "copied";
    itemMessage.className = "message";

    obj.appendChild(itemMessage);
    setTimeout(() => {
        obj.removeChild(itemMessage)
    }, 2000)
}