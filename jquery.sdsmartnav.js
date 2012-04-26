// be sure to initiate sdNav object in <head> of html with sdNAv = {};
/* sdSmartNav 1.0.7 */
(function($) {
    $.sdSmartNav = function(settings) {
	
		// initiate jQuery object
		var jq = $([]);
	
		// SETTINGS
        sdNav.element = 'nav',
        sdNav.tier1 = '#toolbar_horizontal',
        sdNav.tier2 = '#toolbar_sub',
        sdNav.tier3 = '#toolbar_vertical'
		sdNav.drop = false;

		// check for options
        if (settings) $.extend(sdNav, settings);

		// GLOBAL VARIABLES
        sdNav.tb1 = jq.add(sdNav.element + sdNav.tier1),
        sdNav.tb2 = jq.add(sdNav.element + sdNav.tier2),
        sdNav.tb3 = jq.add(sdNav.element + sdNav.tier3);

		// test for 
        if (sdNav.type == 1) {
			// show tier 1
	        sdNav.tb1.css('display','block');
    
			// PRIVATE VARIABLES
            var tbsP = '',
				tbvP = sdNav.tb1.find('> ul > li.currentAncestorListItem > ul');

			// if ancestor children are not found
            if (!tbvP.length) tbvP = sdNav.tb1.find('> ul > li.currentListItem > ul');
        } else if (sdNav.type == 2) {
			// show tier 1
	        sdNav.tb1.css('display','block');
    
			// PRIVATE VARIABLES
            var tbsP = sdNav.tb1.find('> ul'),
            	tbvP = sdNav.tb1.find('> ul > li.currentAncestorListItem > ul');

			// if ancestor children are not found
            if (!tbvP.length) tbvP = sdNav.tb1.find('> ul > li.currentListItem > ul');
        } else if (sdNav.type == 3) {
			// PRIVATE VARIABLES
            var tbsP = '',
            	tbvP = sdNav.tb1.find('> ul');
		} else if (sdNav.type == 4) {
			// PRIVATE VARIABLES
			var tbsP = '',
				tbvP = '';
			sdNav.tb1.remove();
        } else {
			// show tier 1
	        sdNav.tb1.css('display','block');
    
			// PRIVATE VARIABLES (apply if sdNav.type == 0 || typeof sdNav.type == 'undefined')
	        var tbsP = sdNav.tb1.find('> ul > li.currentAncestorListItem > ul'),
				tbvP = sdNav.tb1.find('> ul > li.currentAncestorListItem > ul > li.currentAncestorListItem > ul');

			// if ancestor children are not found (apply if sdNav.type == 0 || typeof sdNav.type == 'undefined')
	        if (!tbsP.length) tbsP = sdNav.tb1.find('> ul > li.currentListItem > ul');
	        if (!tbvP.length) tbvP = sdNav.tb1.find('> ul > li.currentAncestorListItem > ul > li.currentListItem > ul');
		};

		// prepend sub tiers
        if (sdNav.tb1.children().length) {
			if (tbvP.length) {
				sdNav.tb3.prepend(tbvP.clone()).css('display','block');
				if (!(jq.add('body').width() <= '600')) tbvP.css('display','none');
			}
			if (tbsP.length) {
				sdNav.tb2.prepend(tbsP.clone()).css('display','block');
				if (!(jq.add('body').width() <= '600')) tbsP.css('display','none');
			}
        };
		
		// add drop down menus
		if (sdNav.drop == true) {
			// tb1 hover
			if (sdNav.tb1.find(' > ul li > ul')) {
				//Add 'hasChildren' class to menu li's
				sdNav.tb1.find(' > ul li > ul').parent().addClass('hasChildren');
			
				//Menu hover animation
				sdNav.tb1.find('ul li').hover(function(){
					$(this).find("> ul").stop('true','true').animate({
						opacity: 'toggle',
						paddingTop: 'toggle'
					});
				});
			};

			// tb2 hover
			if (sdNav.tb2.find(' > ul li > ul')) {
				//Add 'hasChildren' class to menu li's
				sdNav.tb2.find(' > ul li > ul').parent().addClass('hasChildren');
			
				//Menu hover animation
				sdNav.tb2.find('ul li').hover(function(){
					$(this).find("> ul").stop('true','true').animate({
						opacity: 'toggle',
						paddingTop: 'toggle'
					});
				});
			};
		};
		
		// PUBLIC VARIABLES
        if (tbvP.length) sdNav.tbvP = tbvP;
        if (tbsP.length) sdNav.tbsP = tbsP;
    };
})(jQuery);