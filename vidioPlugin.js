kly_plugin_vidio_float=({container})=>{
    //Load CSS
    $('head').append('<link rel="stylesheet" type="text/css" href="https://raw.githubusercontent.com/iqbalrofikurrahman/vidioPluginKly/master/vidioPlugin.css">');
    // setting slide status
    localStorage.setItem('slideStatus','max');

    if (jQuery(container+' iframe[src*="https://www.vidio.com/embed/"] ').length > 0) {
    /*Wrap (all code inside div) all vedio code inside div*/
    jQuery(container+' iframe[src*="https://www.vidio.com/embed/"] ').wrap("<div class='iframe-parent-class'></div>");
    /*main code of each (particular) vedio*/
    jQuery(".iframe-parent-class").append("<div onclick='slideAction()' id='slideOut' class=''></div>");
    jQuery(container+' iframe[src*="https://www.vidio.com/embed/"]').each(function(index) {
        /*Floating js Start*/
        var windows = jQuery(window);
        var iframeWrap = jQuery(this).parent();
        var iframe = jQuery(this);
        var iframeHeight = iframe.outerHeight();
        var iframeElement = iframe.get(0);
        windows.on('scroll', function() {     
            var windowScrollTop = windows.scrollTop();
            var iframeBottom = iframeHeight + iframeWrap.offset().top;
            var iframeTop = iframeWrap.offset().top - windows.height();
            // initiate FLoat
            if(windowScrollTop >= 500 && localStorage.getItem('slideStatus')!="min"){
                jQuery(".iframe-parent-class div").addClass("slideOutClass");
                iframe.addClass('pluginStuck');
            }   
            
            if ( window.innerHeight > 500 && ((windowScrollTop > iframeBottom) || (windowScrollTop < iframeTop))) {
                iframeWrap.height(iframeHeight);
                jQuery(".scrolldown").css({"display": "none"});
                if(localStorage.getItem('slideStatus')=="max"){
                    jQuery(".iframe-parent-class div").removeClass("slideOutClassOFF");
                    jQuery(".iframe-parent-class div").addClass("slideOutClass");
                    iframe.addClass('pluginStuck');
                }else{
                    jQuery(".iframe-parent-class div").removeClass("slideOutClass");
                    jQuery(".iframe-parent-class div").addClass("slideOutClassOFF");
                    iframe.remove('pluginStuck');
                }
            } else {
                iframeWrap.height('auto');
                jQuery(".iframe-parent-class div").removeClass("slideOutClass");
                jQuery(".iframe-parent-class div").addClass("slideOutClassOFF");
                localStorage.setItem('slideStatus','min');
                jQuery('.iframe-parent-class iframe[src*="https://www.vidio.com/embed/"]').removeClass('pluginStuck');
                
                }
            });
            /*Floating js End*/
        });
    }

    // MAXIMIZE & MINIMIZE

    slideAction=()=>{
        var slideStatus = localStorage.getItem('slideStatus');
        if(slideStatus === "max"){
            jQuery(".iframe-parent-class div").removeClass("slideOutClass");
            jQuery(".iframe-parent-class div").addClass("slideOutClassOFF");
            localStorage.setItem('slideStatus','min');
            jQuery('.iframe-parent-class iframe[src*="https://www.vidio.com/embed/"]').removeClass('pluginStuck');
        }else{
            localStorage.setItem('slideStatus','max');
            jQuery(".iframe-parent-class div").removeClass("slideOutClassOFF");
            jQuery(".iframe-parent-class div").addClass("slideOutClass");
            jQuery('.iframe-parent-class iframe[src*="https://www.vidio.com/embed/"]').addClass('pluginStuck');
        }
    }

    // END MAXIMIZE & MINIMIZE

}
