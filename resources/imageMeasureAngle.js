// This file contains the handlers called when the user clicks on the measureAngle icon.
function measureAngleOn(evt){
        var lb = null;
        jQuery("#measureAngleButton").removeClass("measureAngleButton").addClass("measureAngleButtonOn");
        lb = lightBox("picture");
        if (cineloop == 1){
            cineLoop();
        }
        
        lb.measureAngleOn();
        jQuery("#toolBar").data("mode","measureAngle");
        // Change the measureAngle button so it disables measuring the next time it is clicked.
        // Disable measuring whenever the user clicks on the other toolbar buttons (except config or info)
        // Originally I attempted to apply the click.disablemeasureAngle to the measureAngleButton as well, the thought being that
        // the next time anyone clicked on any buttons, it would turn this off (even the measureAngle button), the problem with this was
        // if the user clicked measureAngle, then move, for example, measureAngle would turn off, but move would register its turn off in the same click
        // and then it would immedtately be turned off, because jQuery was allowing a click event that was registered during the event to go off.
        // I think this had to do with mixing on the onClick events, and jQuery events.
       
        var turnOff = function(event) {
             jQuery("#measureAngleButton").removeClass("measureAngleButtonOn").addClass("measureAngleButton");
             jQuery(".toolBarButton").unbind("click.disableMode.measureAngle");
             jQuery("#measureAngleButton").bind("click.on", measureAngleOn);
             lb.measureAngleOff();
             lb.destroy();
             jQuery("#measureAngleButton").hover(function(){jQuery(this).addClass("measureAngleButtonHover");},function(){jQuery(this).removeClass("measureAngleButtonHover");});
             if (jQuery("#toolBar").data("mode") === "measureAngle"){
                 jQuery("#toolBar").data("mode","none");
             }
             setImageAndHeaders(jQuery("#picture").get(0).src);
        };
        
        jQuery("#measureAngleButton").unbind();
        jQuery(".toolBarButton:not(#configButton,#infoButton)").bind("click.disableMode.measureAngle", turnOff);
        jQuery("#measureAngleButton").removeClass("measureAngleButtonHover");

};

