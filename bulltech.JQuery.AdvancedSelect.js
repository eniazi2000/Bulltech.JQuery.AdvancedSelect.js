(function ($) {
    var settings;
    var thisTop,thisWidth,thisHeight,thisLeft;
    var data;
    var continerDiv = document.createElement("div");

    function addParentItemsToContiner()
    {
        if(data!=null)
        {
        $.each( data, function( key, value ) {
            var 
            var span = document.createElement("span");
            $(span).text(value.title);
            $(span).attr("index",value.id);
            $(span).attr("class",settings.menuItemCssClass);
            $(continerDiv).append(span);
          });
        }
    }



    $.fn.doSelect = function (options) {
        settings = $.extend({
            onlySelectLastChild: true,
            menuCssClass : "",
            menuItemCssClass:"",
            dataString:""
        }, options);

        //convert data string to data as JSON
        try
        {
        data = JSON.parse(settings.dataString);
        console.log(data);
        }
        catch(ex)
        {
            data = null;
            console.log(ex);
        }

        // get element dimenstion
        thisHeight = parseInt($(this).outerHeight(true));
        thisWidth = parseInt($(this).outerWidth(true));
        thisTop= $(this).position().top;
        thisLeft = $(this).position().left;

        // active and diactive select menu
        $(this).focus(function(){
            $(continerDiv).css("display","block");
        });
        $(this).focusout(function(){
            $(continerDiv).css("display","none");
        });

        //set select menu dimention
        $(continerDiv).css("top",thisTop+thisHeight+"px");
        $(continerDiv).css("left",thisLeft+"px");
        $(continerDiv).css("position","absolute");
        $(continerDiv).width(thisWidth);



        //set select continer css class
        $(continerDiv).attr("class",settings.menuCssClass);

        $(continerDiv).css("display","none");

        // add parent items to continer
        addParentItemsToContiner();




        $("body").append(continerDiv);

      //  $(this).val(thisLeft);
 
        return this;
    }
}(jQuery));