var urlsRedirect = [];
var urlsAllowed = [];
var keyWordsHostBlock = [];
var keyWordsSlugBlock = [];
var state = true;

loadPages();

async function loadPages() {
    let dataRedirect = await getBlockedRedirect();
    loadUrlsRedirect(dataRedirect);
    let dataAllow = await getAllowedWebSite();
    loadUrlsAllowed(dataAllow);
    let keyWordsHost = await getBlockedHostKeyWords();
    let keyWordsSlug = await getBlockedSlugKeyWords();
    loadKeyWordsBlocked(keyWordsHost, keyWordsSlug);
    addListenerWebRequest();
}

async function getBlockedRedirect() {
    let response = await fetch("https://api.npoint.io/");
    let data = await response.json();
    return data;
}

async function getAllowedWebSite() {
    let response = await fetch("https://api.npoint.io/");
    let data = await response.json();
    return data;
}

async function getBlockedHostKeyWords() {
    let response = await fetch("https://api.npoint.io/");
    let data = await response.json();
    return data;
}

async function getBlockedSlugKeyWords() {
    let response = await fetch("https://api.npoint.io/");
    let data = await response.json();
    return data;
}

function loadKeyWordsBlocked(_data, _data2) {
    for (var item of _data) {
        keyWordsHostBlock.push(item);
    }
    for (var item of _data2) {
        keyWordsSlugBlock.push(item);
    }
}

function loadUrlsRedirect(_data) {
    for (var item of _data) {
        urlsRedirect.push(item);
    }
}

function loadUrlsAllowed(_data) {
    for (var item of _data) {
        urlsAllowed.push(item);
    }
}

function addListenerWebRequest() {
    browser.webRequest.onBeforeRequest.addListener(
        redirect, {
            urls: ["<all_urls>"],
            types: ["main_frame"],
        },
        ["blocking"]
    );
}

function redirect(requestDetails) {
    let redirection_url = "https://www.google.fr/";
    let type = requestDetails.type;
    let url = requestDetails.url;
    if (type === "main_frame" && url.includes("http://")) {
        return {
            redirectUrl: redirection_url,
        };
    }
    if (!(type === "main_frame") && url.includes("http://")) {
        return {
            cancel: true,
        };
    }
    if (state) {
        redirectPage = "https://www.google.fr/";
        if (!allowedWebPages(requestDetails)) {
            var haveRedirect = redirectPages(requestDetails);
            if (haveRedirect == "") {
                var haveKeywordsRedirect = getBlockKeyWords(requestDetails);
                if (haveKeywordsRedirect != "") {
                    state = false;
                    return {
                        redirectUrl: haveKeywordsRedirect,
                    };
                }
            } else {
                state = false;
                return {
                    redirectUrl: haveRedirect,
                };
            }
        }
    } else {
        state = true;
    }
}

function allowedWebPages(requestDetails) {
    var currentUrl = new URL(requestDetails.url);
    for (let item of urlsAllowed) {
        if (currentUrl.hostname == item.allowed || currentUrl.hostname.endsWith("." + item.allowed)) {
            return true;
        }
    }

    return false;
}

function redirectPages(requestDetails) {
    var currentUrl = new URL(requestDetails.url);
    for (let item of urlsRedirect) {
        if (currentUrl.hostname == item.currently || currentUrl.hostname.endsWith("." + item.currently)) {
            return item.pushing;
        }
    }

    return "";
}

function getBlockKeyWords(requestDetails) {
    var url = requestDetails.url;
    var parsedUrl = new URL(url);
    var hostname = parsedUrl.hostname;
    console.log(hostname);
    for (let item of keyWordsHostBlock) {
        if (hostname.toLowerCase().indexOf(item.read) !== -1) {
            console.log(item.read + " " + hostname.indexOf(item.read));
            return item.recommended;
        }
    }
    var slug = parsedUrl.pathname;
    for (let item of keyWordsSlugBlock) {
        if (slug.toLowerCase().indexOf(item.rslug) !== -1) {
            return item.URL;
        }
    }
    return "";
}

browser.runtime.onInstalled.addListener(function() {
    var title = browser.i18n.getMessage("title");
    browser.contextMenus.create({
            id: "whois",
            enabled: true,
            title: title + "",
            contexts: ["page", "selection", "link"],
        },
        function(e) {
            console.log("called", e);
        }
    );
});

browser.contextMenus.onClicked.addListener(onClickHandler);

function onClickHandler(info) {
    var url = info.pageUrl;
    var whoisUrl = "https://www.whois.com/whois/";
    if (info.selectionText) {
        url = info.selectionText.trim();
        if (/(http?:\/\/).*/.test(url) === false) {
            url = "https://" + url;
        }
    }
    if (info.nkUrl) {
        url = info.nkUrl;
    }
    try {
        url = new URL(url);
        browser.tabs.create({
            url: whoisUrl + url.host,
        });
    } catch (e) {}
}