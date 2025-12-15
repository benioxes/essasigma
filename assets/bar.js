var params = new URLSearchParams(window.location.search);

// Check if we only have access token (not the full document data)
var hasOnlyAccessToken = params.has('access') && !params.has('name');

// Restore params from sessionStorage if URL params are empty or only have access token
if ((!params.toString() || hasOnlyAccessToken) && sessionStorage.getItem('docParams')) {
    params = new URLSearchParams(sessionStorage.getItem('docParams'));
    // Restore URL without reload if we have stored params
    if (params.toString() && params.has('name')) {
        var newUrl = window.location.pathname + '?' + params.toString();
        window.history.replaceState({}, '', newUrl);
    }
}

// Save current params to sessionStorage for persistence across navigation (but only if we have real data)
if (params.toString() && params.has('name')) {
    sessionStorage.setItem('docParams', params.toString());
}

var ROUTES = {
    home: 'home.html',
    services: 'services.html',
    qr: 'qr.html',
    more: 'more.html',
    moreid: 'moreid.html',
    id: 'id.html',
    shortcuts: 'shortcuts.html',
    pesel: 'pesel.html',
    scanqr: 'scanqr.html',
    showqr: 'showqr.html',
    gen: 'gen.html',
    card: 'card.html',
};

function sendTo(key){
    // Always use docParams from sessionStorage if available (contains real document data)
    var currentParams;
    if (sessionStorage.getItem('docParams')) {
        currentParams = new URLSearchParams(sessionStorage.getItem('docParams'));
    } else {
        currentParams = new URLSearchParams(window.location.search);
        // Remove access token from navigation - we want to use the stored data
        currentParams.delete('access');
    }
    var qs = currentParams.toString();
    var file = ROUTES[String(key)] || (String(key).endsWith('.html') ? String(key) : String(key) + '.html');
    var href = file + (qs ? `?${qs}` : '');
    location.href = href;
}

document.querySelectorAll(".bottom_element_grid").forEach((element) => {
    element.addEventListener('click', () => {
        sendTo(element.getAttribute("send"))
    })
})

function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
    if (/windows phone/i.test(userAgent)) {
        return 1;
    }
  
    if (/android/i.test(userAgent)) {
        return 2;
    }
  
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return 3;
    }
  
    return 4;
  }
  
  if (getMobileOperatingSystem() == 2){
      document.querySelector(".bottom_bar").style.height = "70px"
}