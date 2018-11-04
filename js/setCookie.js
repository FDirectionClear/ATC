function setCookie(name,value,expireDays){
    // "name=value; expires=GMTSting;
    var exdate = new Date();
    if(expireDays == null){
        document.cookie = name + "" + escape(value) + ";"
    } else {
        exdate.setDate(exdate.getDate() + expireDays);
        document.cookie = name + "=" + escape(value) + ";" + " " + "expires=" + exdate.toGMTString() + ";";
    }
};

setCookie("the_user","15",1);