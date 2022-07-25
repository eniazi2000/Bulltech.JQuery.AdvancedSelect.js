(function ($) {
    var settings;
    var thisTop,thisWidth,thisHeight,thisLeft;
    var data;
    var continerDiv = document.createElement("div");
    var thisInput;
    function createBackItem(backData,backTitle,parentIsMainList)
    {
        var backitem = document.createElement("div");
        var arrow = document.createElement("i");
        var span = document.createElement("span"); 

        $(backData).attr("class",settings.menuItemCssClass);
        $(arrow).attr("class",settings.arrowLeftCss);
        $(span).text(backTitle);
        $(span).attr("back-data",JSON.stringify(backData));



        $(backitem).append(span);
        $(backitem).append(arrow);
        return backitem;
    }




    function addChildsItemsToContiner(itemsData,parentIsMainList){
        var backitem;
        if(parentIsMainList)
        {
            backitem = createBackItem(data,"بازگشت",parentIsMainList);
        }
        else
        {
            backitem = createBackItem(itemsData,"بازگشت",parentIsMainList)
        }

        $(continerDiv).empty();


        $(continerDiv).append(backitem);
    }


    function addParentItemsToContiner(){
        if(data!=null)
        {
        $.each( data, function( key, value ) {
            var item = document.createElement("div");
            var arrow = document.createElement("i");
            var span = document.createElement("span");
            $(arrow).attr("class",settings.arrowRightCss);
            $(span).text(value.title);
            $(span).attr("index",value.id);
            $(item).attr("class",settings.menuItemCssClass);
            $(item).append(span);

            //chack item has child if true add arrow
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
                    else
                    {
                        $(arrow).click(function(){
                            addChildsItemsToContiner(data,true);
                        });
                    }


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
            $(continerDiv).append(item);
          });
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
            arrowLeftCss:"",
            arrowRightCss:"",
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