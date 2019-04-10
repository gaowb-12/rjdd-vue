/** 
    option 对象，
    接受text属性，提示的内容，
    接受cancel 跟confirm方法，分别代表取消的回调，确认的回调 
*/
(function(){
    var confirm_=null;
    window.Confirm=function(option){
        if(confirm_) {
            confirm_.option=option
            confirm_.div.style.display="block";
            confirm_.updateText(option.text)
            return confirm_;
        }
        if(!(this instanceof window.Confirm))  return new window.Confirm(option);
        confirm_=this;
        confirm_.option=option
        this.init(option);
        this.addEvent();
    }
    Confirm.prototype={
        constructor:Confirm,
        init:function(option){
            var str=`
            <div style="width:100%;height:100%;position:fixed;left:0;top:0;background:rgba(0,0,0,0.3);">
                <div style="width:60%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);border-radius:10px;background:#fff;opacity:1;">
                    <div id="confirm-text" style="text-align:center;line-height:3.8em;border-bottom:1px solid #eee;white-space: nowrap;">${option.text}</div>
                    <div style="overflow:hidden;">
                        <div class="false" style="width:50%;float:left;border-right:1px solid #eee;text-align:center;line-height:3em;color:#000;box-sizing:border-box;">否</div>
                        <div class="true" style="width:50%;float:left;text-align:center;line-height:3em;color:#000;box-sizing:border-box;">是</div>
                    </div>
                </div>
            </div>`
            this.div=document.createElement("div");
            this.div.innerHTML=str
            this.div.style.zIndex=1000
            this.div.style.position="fixed"
            this.div.style.left="0"
            this.div.style.top="0"
            this.div.style.height="100%"
            this.div.style.width="100%"
            this._false=this.div.querySelector(".false")//否按钮
            this._true=this.div.querySelector(".true")//是按钮
            document.body.appendChild(this.div)
            this.text=document.getElementById("confirm-text")
        },
        updateText:function(text){
            this.text.innerHTML=text
        },
        addEvent:function(){
            var this_=this;
            this._false.onclick=function(){
                this_.div.style.display="none";
                typeof confirm_.option.cancel == "function"?confirm_.option.cancel():"";
                // return false;
            }
            this._true.onclick=function(){
                this_.div.style.display="none";
                typeof confirm_.option.confirm == "function"?confirm_.option.confirm():"";
                // return true;
            }
        }
    }
})()