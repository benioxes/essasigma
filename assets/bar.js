var params = new URLSearchParams(window.location.search);

// Restore params from sessionStorage if URL params are empty but storage has data
if (!params.toString() && sessionStorage.getItem('docParams')) {
    params = new URLSearchParams(sessionStorage.getItem('docParams'));
    // Restore URL without reload if we have stored params
    if (params.toString()) {
        var newUrl = window.location.pathname + '?' + params.toString();
        window.history.replaceState({}, '', newUrl);
    }
}

// Save current params to sessionStorage for persistence across navigation
if (params.toString()) {
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
    // Always use the most current params (either from URL or restored from storage)
    var currentParams = new URLSearchParams(window.location.search);
    if (!currentParams.toString() && sessionStorage.getItem('docParams')) {
        currentParams = new URLSearchParams(sessionStorage.getItem('docParams'));
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