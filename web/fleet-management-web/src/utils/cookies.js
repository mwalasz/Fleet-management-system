export function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

export function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        
        while (c.charAt(0) === ' ') 
            c = c.substring(1, c.length);

        if (c.indexOf(nameEQ) === 0) 
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}

export function removeCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';
}

export const dateNow = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    return `${yyyy}-${mm.toString().length == 1 ? `0${mm}` : mm}-${dd.toString().length == 1 ? `0${dd}` : dd}`
};