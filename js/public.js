new function (){
    var _self = this;
    _self.width = 640;//设置默认最大宽度
    _self.fontSize = 100;//默认字体大小
    _self.widthProportion = function(){
        var p = (document.body&&document.body.clientWidth||document.getElementsByTagName("html")[0].offsetWidth)/_self.width;return p<0.5?0.5:(p>0.75?0.75:p);
    };
    
    _self.changePage = function(){
        document.getElementsByTagName("html")[0].setAttribute("style","font-size:"+_self.widthProportion()*_self.fontSize+"px !important");
    }
    _self.changePage();
    window.addEventListener("resize",function(){_self.changePage();},false);
};

var Config ={

    //url:'http://a784112865.oicp.net/zhudai_api/service'
    //url:'http://112.74.184.28/zhudai_api/service'
    //url:'http://a784112865.oicp.net/zhudai_api/service',
    //url:'http://www.1handfish.com/fishapi'
    url:'http://a784112865.oicp.net/fishapi/'
    
}
/*提示，弹窗*/
//tips('数据错误','tips_center',1500);
//tips('数据错误','tips_left',1500);
function tips(msg,className,time){
    var tipsDiv = $('<div class="tips '+className+'"></div>');
    $('body').append(tipsDiv);
    tipsDiv.html(msg).addClass('tips_show');
    setTimeout(function(){
        tipsDiv.removeClass('tips_show').remove();
    },time);
}
/*loading*/
var loading = function(param){
    me = {}
    me.param = param?param:{
        'container':document.body,
        'hasBg':true
    };

    me.init = function(){
        me.loader=document.createElement("div"),
        loader_bg=document.createElement("div"),
        span_wrap=document.createElement("div");

        me.loader.className="loader";
        loader_bg.className="loader_bg";
        span_wrap.className="span_wrap";
        for(var i=0;i<5;i++){
            var span=document.createElement("span");
            span_wrap.appendChild(span);   
        }
        if(me.param.hasBg){
           me.loader.appendChild(loader_bg); 
        }
        me.loader.appendChild(span_wrap); 
        me.param.container.appendChild(me.loader);
    }
    me.show = function(){
        me.loader.style.display = 'block';
    }
    me.hide = function(){
        me.loader.style.display = 'none';
    }
    me.destroy = function(){
        document.body.removeChild(me.loader);
    }
    me.init();
    return me;
}
//获取openid,存储cookie
function getOpenId(){
	var index = window.location.href;
	var arr = index.split("&");
	var str1 = '';
	var openId;
	/*if(Cookie.get("xiaoyuerUserMes")){
		openId = JSON.parse(Cookie.get("xiaoyuerUserMes")).openid;
	}*/
	if(!Cookie.get("xiaoyuerUserMes")){
		if(index.indexOf("code=")>=0){
			for(var i = 0 ;i<arr.length;i++){
	    		if(arr[i].indexOf("code")>=0){
	    			if(arr[i].split("=")[1] != ""){
	    				str1=arr[i].split("=")[1];
	    			}
	    		}
	    	}
	    	$.ajax({
		        type:"post",
		        url:Config.url+"/checkCode",
		        async:false,
		        data:{code:str1,},
		        success:function(data, status, xhr){
		        	console.log(data)
		        	if(data){
		        		Cookie.set('xiaoyuerUserMes',JSON.stringify(data));
		        	}
		        },
		        error:function(xhr, errorType, error){
		        	console.log(error)	
		        }
		    })
		}else{
			$.ajax({
		        type:"POST",
		        url:Config.url+"/authorizeUrl",
		        data:{redirectUrl:index},
		        async:false,
		        success:function(data, status, xhr){
		        	URLopenid = data.url;
		        	location.href = URLopenid;	
		        },
		        error:function(xhr, errorType, error){
		        	console.log(000)
		        },
			});
		}
	}
}

/*图片转Base64*/
function getBase64Image(src) {
    var img = document.createElement('img');
    img.src = src;
    console.log(img);
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var dataURL = canvas.toDataURL("image/png");
    console.log(dataURL);
    //return dataURL
    return dataURL.replace("data:image/png;base64,", "");
}
/*获取验证码*/
function getCodefun(obj,time,sendCodeFun){
    var me = {};
    me.obj = obj;
    me.wait= time;
    me.time = function(obj) { 
        addClass(obj,'disable');
        if (me.wait == 0) { 
            obj.innerHTML = "获取验证码"; 
            me.wait = time; 
            removeClass(obj,'disable');
        }else { 
            obj.innerHTML = me.wait + "s"; 
            me.wait--;
            setTimeout(function(){ 
                me.time(obj);
            },1000);
        } 
    } 
    if(!hasClass(me.obj,'disable')){
        me.time(me.obj);
        sendCodeFun();
    }
    return me;
}
/*操作Class*/
function hasClass(obj, cls) {  
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
}  
function addClass(obj, cls) {  
    if (!this.hasClass(obj, cls)) obj.className += " " + cls;  
}  
function removeClass(obj, cls) {  
    if (hasClass(obj, cls)) {  
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
        obj.className = obj.className.replace(reg, ' ');  
    }  
}  
function toggleClass(obj,cls){  
    if(hasClass(obj,cls)){  
        removeClass(obj, cls);  
    }else{  
        addClass(obj, cls);  
    }  
} 
//去空格
String.prototype.trim = function(){  
    return this.replace(/(^\s*)|(\s*$)/g, "");  
}  
String.prototype.Ltrim = function(){  
    return this.replace(/(^\s*)/g, "");  
}  
String.prototype.Rtrim = function(){  
    return this.replace(/(\s*$)/g, "");  
} 

//设置localStorage
var setLocalStorage= function(key,data){
    localStorage.setItem(key,JSON.stringify(data));
}
//获取localStorage
var getLocalStorage= function(key){
    return JSON.parse(localStorage.getItem(key));
}
//删除localStorage
var removeLocalStorage = function(key){
    localStorage.removeItem(key);
}

//Cookie 操作
var Cookie = {
    getExpiresDate:function(days, hours, minutes) {
        var ExpiresDate = new Date();
        if (typeof days == "number" && typeof hours == "number" &&
            typeof hours == "number") {
            ExpiresDate.setDate(ExpiresDate.getDate() + parseInt(days));
            ExpiresDate.setHours(ExpiresDate.getHours() + parseInt(hours));
            ExpiresDate.setMinutes(ExpiresDate.getMinutes() + parseInt(minutes));
            return ExpiresDate.toGMTString();
        }
    },
    _getValue:function(offset) {
        var endstr = document.cookie.indexOf (";", offset);
        if (endstr == -1) {
            endstr = document.cookie.length;
        }
        return unescape(document.cookie.substring(offset, endstr));
    },
    get:function(name) {
        var arg = name + "=";
        var alen = arg.length;
        var clen = document.cookie.length;
        var i = 0;
        while (i < clen) {
            var j = i + alen;
            if (document.cookie.substring(i, j) == arg) {
                return this._getValue(j);
            }
            i = document.cookie.indexOf(" ", i) + 1;
            if (i == 0) break;
        }
        return "";
    },
    set:function(name, value, expires, path, domain, secure) {
        document.cookie = name + "=" + escape (value) +
            ((expires) ? ";expires=" + expires : "") +
            ((path) ? ";path=" + path : "") +
            ((domain) ? ";domain=" + domain : "") +
            ((secure) ? ";secure" : "");
    },
    remove:function(name,path,domain) {
        if (this.get(name)) {
            document.cookie = name + "=" +
                ((path) ? ";path=" + path : "") +
                ((domain) ? ";domain=" + domain : "") +
                ";expires=Thu, 01-Jan-70 00:00:01 GMT";
        }
    },
    clear:function(){
        var cookies = document.cookie.split(';');
        for(var i=0; i < cookies.length; i++){
            var cookieName = cookies[i].split('=')[0];
            if(cookieName.trim()){
                this.remove(cookieName.trim());
            }
        }
    }
}
// Cookie.set('kk','45');
// console.log(Cookie.get());

//获取上一页地址
function getReferrer(){
    var referrer = '';
    try {
        referrer = window.top.document.referrer;
    } catch(e) {
        if(window.parent) {
            try {
                referrer = window.parent.document.referrer;
            } catch(e2) {
                referrer = '';
            }
        }
    }
    if(referrer === '') {
        referrer = document.referrer;
    }
    return referrer;
}