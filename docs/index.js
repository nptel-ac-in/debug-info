let plugins = [];
for(let i = 0;i<navigator.plugins.length;i++){
    plugins.push(' ' + navigator.plugins[i].name); // finding browser plugins
}

let list = document.getElementById("debug_info-list"); // parent element to display list titems

let listItems = [{
    title: 'IP Address',
    description: ""
},{
    title: 'User Agent',
    description: navigator.userAgent
},{
    title: 'Time, according to browser',
    description:  new Date().toLocaleString()
},{
    title: 'Timezone offset',
    description: Intl.DateTimeFormat().resolvedOptions().timeZone
},{
    title: 'Language',
    description: navigator.language
},{
    title: 'Browser Info',
    description: navigator.language
},{
    title: 'Plugins',
    description: plugins
},{
    title: 'Cookies',
    description: navigator.cookieEnabled ? 'Enabled' : 'Disabled'
},{
    title: 'Screen Resolution',
    description: screen.width + " x " + screen.height
},{
    title: 'Encoding',
    description: ""
},{
    title: 'Keep Alive',
    description: "Keep Alive"
}]

listItems.forEach(obj =>{
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

    list.appendChild(item)
});