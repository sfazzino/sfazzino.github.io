
	//Image zoom in/out script
	
	var zoomFlag=false;
	var zoomfactor=0.05; //Enter factor (0.05=5%)
	function zoomhelper(state){
		if (whatcache.style.width == "")
			whatcache.style.width = "512px";

		if (parseInt(whatcache.style.width)>=70){
			whatcache.style.width=(parseInt(whatcache.style.width)+parseInt(whatcache.style.width)*zoomfactor*prefix)+'px';
			//whatcache.style.height=parseInt(whatcache.style.height)+parseInt(whatcache.style.height)*zoomfactor*prefix;
		//	alert(parseInt(whatcache.style.width));

		} 
		if(parseInt(whatcache.style.width)<70 && state=="in") {
			whatcache.style.width='70px';
		//	alert(parseInt(whatcache.style.width));
		}
	}
	
	function handle(delta) {
		var state = '';
		if (delta < 0) {
			state = "out";
		}
		else {
			state = "in";
		}
		prefix=(state=="in")? 1 : -1;
		zoomhelper(state);
	}

	function wheel(event){
		if (!zoomFlag) {
                    // modifiche per scorrimento immagine con scroll del mouse
                    var delta0 = 0;
                    if (!event)
                            event = window.event;
                    if (event.wheelDelta) {
                            delta0 = event.wheelDelta/120;
                            if (window.opera)
                                    delta0 = -delta0;
                    } else if (event.detail) {
                            delta0 = -event.detail/3;
                    }
                    if (delta0 > 0) {
                        prevImage();
                    }
                    else if (delta0 < 0) {
                        nextImage();
                    }
                    // fine modifiche
			return;
                }
		var delta = 0;
		whatcache=document.getElementById('picture');
		if (!whatcache){
		    return;
		}
		if (!event)
			event = window.event;
		if (event.wheelDelta) {
			delta = event.wheelDelta/120;
			if (window.opera)
				delta = -delta;
		} else if (event.detail) {
			delta = -event.detail/3;
		}
		if (delta)
			handle(delta);
	}

	function zoom(originalW, originalH, what, state){
		if(zoomFlag==true){
		if (!document.all&&!document.getElementById)
		return;
		whatcache=eval("document.images."+what);
		if (!whatcache){
		    return;
		}
		prefix=(state=="in")? 1 : -1;
		if (whatcache.style.width==""||state=="restore"){
			whatcache.style.width=originalW+'px';
			//whatcache.style.height=originalH;
			if (state=="restore")
				return;
		}
		else{
			zoomhelper(state);
		}
		beginzoom=setInterval("zoomhelper('state')",300);
		}
	}
	
	function clearzoom(){
		if (window.beginzoom)
		clearInterval(beginzoom);
	}
	
	function zoomOnOff(){
	
	   zoomFlag=true;
	   jQuery("#toolBar").data("mode","zoom");
	   
	   var zoomOff = function(){
	       zoomFlag=false;
       	   document.getElementById('zoomInButton').style.visibility="hidden";
       	   document.getElementById('zoomOutButton').style.visibility="hidden";
       	   //document.getElementById("zoomButton").style.background="transparent url('files/icons/icn_zoom_off.PNG') no-repeat center 0px ";
       	   document.getElementById('zoomText').innerHTML="Zoom on";
       	   //document.getElementById('zoomText').style.color="#616161";
       	   
       	   jQuery("#zoomButton").removeClass("zoomButtonOn").addClass("zoomButton");
           jQuery(".toolBarButton").unbind("click.disableMode.Zoom");
           jQuery("#zoomButton").hover(function(){jQuery(this).addClass("zoomButtonHover");},function(){jQuery(this).removeClass("zoomButtonHover");});
           jQuery("#zoomButton").bind("click.on", zoomOnOff);
           if (jQuery("#toolBar").data("mode")==="zoom"){
               jQuery("#toolBar").data("mode","none");
            }
	   };

       /* Initialization code. */
       if (window.addEventListener)
           window.addEventListener('DOMMouseScroll', wheel, false);
       window.onmousewheel = document.onmousewheel = wheel;

	   document.getElementById('zoomInButton').style.visibility="visible";
	   document.getElementById('zoomOutButton').style.visibility="visible";
	   //document.getElementById("zoomButton").style.background="transparent url('files/icons/icn_zoom_on.PNG') no-repeat center 0px ";
	   document.getElementById('zoomText').innerHTML="Zoom off";
	   //document.getElementById('zoomText').style.color="#FFFFFF";
	   jQuery("#zoomButton").unbind();
       jQuery(".toolBarButton:not(#configButton,#infoButton,#presetButton)").bind("click.disableMode.Zoom", zoomOff);
       jQuery("#zoomButton").removeClass("zoomButton").addClass("zoomButtonOn");
       jQuery("#zoomButton").removeClass("zoomButtonHover");
		
	}