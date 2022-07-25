(function ($) {
    var settings;
    var thisTop,thisWidth,thisHeight,thisLeft;
    var data;
    var continerDiv = document.createElement("div");
    var thisInput;

    function createMenuPlan(itemsData)
    {
        var conter = document.createElement("div");
        $.each( itemsData,function(key,value){

            
            var item = document.createElement("div");
            var arrow = document.createElement("i");
            var span = document.createElement("span");
            $(arrow).attr("class",settings.arrowCloseCss);
            $(span).text(value.title);
            $(span).attr("index",value.id);
            $(item).attr("class",settings.menuItemCssClass);
            $(item).append(span);
            if(value.childs.length>0)
            {
                //check only last child selectable or not if not assign click function to him
                if(!settings.onlySelectLastChild)
                    {
                        $(span).click(function(e){
                            $(thisInput).val($(this).text());
                            $(thisInput).attr("selectedIndex",$(this).attr("index"));
                            hideMenu();
                            console.log($(this).text());
                        });
                    }

                    $(arrow).click(function(){
                        //console.log($(this));
                       $(this).closest("."+settings.menuItemCssClass).find("div").first().slideToggle(200);
                       //console.log($(this).closest("."+settings.menuItemCssClass).find("div").first().is(":visible"));
                       if($(this).hasClass(settings.arrowOpenCss))
                       {
                        $(this).removeClass(settings.arrowOpenCss).addClass(settings.arrowCloseCss);
                       }
                       else
                       {
                        $(this).removeClass(settings.arrowCloseCss).addClass(settings.arrowOpenCss);
                       }
                    });



                $(item).append(arrow);
            }
            else
            {
                // do for all last child item
                $(span).click(function(e){
                    $(thisInput).val($(this).text());
                    $(thisInput).attr("selectedIndex",$(this).attr("index"));
                    hideMenu();
                    console.log($(this).text());
                });
            }

            $(conter).append(item);
            if(value.childs.length>0)
            {
                var newItem = createMenuPlan(value.childs);
               // $(newItem).css("display","none");
                  $(newItem).slideUp(10);
                  $(item).append(newItem);
            }


        });
        
        return conter;
    }



    function addParentItemsToContiner(){
        if(data!=null)
        {
            var div = createMenuPlan(data);
            $(continerDiv).append(div);
            console.log(div);
        }
    }

    function hideMenu()
    {
        $(continerDiv).css("display","none");
    }

    $.fn.doSelect = function (options) {
        settings = $.extend({
            onlySelectLastChild: true,
            menuCssClass : "",
            menuItemCssClass:"",
            arrowCloseCss:"",
            arrowOpenCss:"",
            dataString:""
        }, options);
        thisInput=$(this);
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