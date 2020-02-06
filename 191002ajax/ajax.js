function ajax(url,option){
    var json = option.json==undefined ? false : option.json;
    var cache = option.cache==undefined ? true : option.cache;
    var method = option.method || "get";
    var sucFn = option.sucFn || function (){};
    var faiFn = option.faiFn || function (){};
    var data = option.data || "";
    var xhr = new XMLHttpRequest();
    if(method=="get"){
        xhr.open(method,(cache?url+"?"+data+Date.now():url+"?"+data),true);
        xhr.send();
    }else{
        xhr.open(method,(cache?url+"?"+Date.now():url),true);
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.send(data);
    }
    xhr.onreadystatechange = function (){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                sucFn(json?JSON.parse(xhr.responseText):xhr.responseText);
            }else{
                faiFn();
            }
        }
    }
}