/* 

be sure to initiate sdNav object in <head> of html with sdNAv = {};

sdSmartNav 1.1.0
Adam Merrifield https://github.com/seyDoggy/sdSmartNav
GNU GPL 2.0

*/
(function($) {
    $.sdSmartNav = function(settings) {
	
		// initiate jQuery object
		var jq = $([]),
		tbvP,tbsP;
	
		// SETTINGS
		sdNav.element = 'nav',
		sdNav.tier1 = '#toolbar_horizontal',
		sdNav.tier2 = '#toolbar_sub',
		sdNav.tier3 = '#toolbar_vertical',
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
            tbsP = '',
			tbvP = sdNav.tb1.find('> ul > li.currentAncestorListItem > ul');

			// if ancestor children are not found
            if (!tbvP.length) tbvP = sdNav.tb1.find('> ul > li.currentListItem > ul');
        } else if (sdNav.type == 2) {
			// show tier 1
			sdNav.tb1.css('display','block');
    
			// PRIVATE VARIABLES
            tbsP = sdNav.tb1.find('> ul'),
            tbvP = sdNav.tb1.find('> ul > li.currentAncestorListItem > ul');

			// if ancestor children are not found
            if (!tbvP.length) tbvP = sdNav.tb1.find('> ul > li.currentListItem > ul');
        } else if (sdNav.type == 3) {
			// PRIVATE VARIABLES
            tbsP = '',
            tbvP = sdNav.tb1.find('> ul');
		} else if (sdNav.type == 4) {
			// PRIVATE VARIABLES
			tbsP = '',
			tbvP = '';
			sdNav.tb1.remove();
        } else {
			// show tier 1
			sdNav.tb1.css('display','block');
    
			// PRIVATE VARIABLES (apply if sdNav.type == 0 || typeof sdNav.type == 'undefined')
			tbsP = sdNav.tb1.find('> ul > li.currentAncestorListItem > ul'),
			tbvP = sdNav.tb1.find('> ul > li.currentAncestorListItem > ul > li.currentAncestorListItem > ul');

			// if ancestor children are not found (apply if sdNav.type == 0 || typeof sdNav.type == 'undefined')
			if (!tbsP.length) tbsP = sdNav.tb1.find('> ul > li.currentListItem > ul');
			if (!tbvP.length) tbvP = sdNav.tb1.find('> ul > li.currentAncestorListItem > ul > li.currentListItem > ul');
		}

		// prepend sub tiers
        if (sdNav.tb1.children().length) {
			if (tbvP.length) {
				sdNav.tb3.prepend(tbvP.clone()).css('display','block');
				if (!jq.add('body').width() <= '600') tbvP.css('display','none');
			}
			if (tbsP.length) {
				sdNav.tb2.prepend(tbsP.clone()).css('display','block');
				if (!jq.add('body').width() <= '600') tbsP.css('display','none');
			}
        }
		
		// add drop down menus
		if (sdNav.drop === true) {

			// dropMenu(nav) function
			var dropMenu = function (nav) {
				//Add 'hasChildren' class to tb2 ul li
				nav.find(' > ul li > ul').parent().addClass('hasChildren');
			
				// tb2 hover animation
				nav.find('ul li').hover(function(){
					$(this).find("> ul").stop('true','true').animate({
						opacity: 'toggle',
						paddingTop: 'toggle'
					});
					// position drop menus according to container width
					// http://stackoverflow.com/a/11525189/1308256
					var elm = jq.add(this).find("> ul");
					var off = elm .offset();
					var l = off.left;
					var w = elm.width();
					var docW = jq.add(window).width();

					var isEntirelyVisible = ((l + w) <= docW);

					if ( ! isEntirelyVisible ) {

						// add class
						jq.add(this).find("> ul").addClass('outOfView');

						// style
						nav.find('ul ul ul.outOfView').css({
							'left':'auto',
							'right':'85%',
							'top':'75%'
						});
						nav.find('> ul > li > ul.outOfView').css({
							'left':'auto',
							'right':'0',
							'top':'auto'
						});
						
					}
				},
				function(){
					// tb2 hover animation
					jq.add(this).find("> ul").stop('true','true').animate({
						opacity: 'toggle',
						paddingTop: 'toggle'
					});
					// position drop menus according to container width
					jq.add(this).find("> ul").removeClass('outOfView');
				});
			};
			
			// if tb1 has children
			if (sdNav.tb1.find(' > ul li > ul')) {
				dropMenu(sdNav.tb1);
			}

			// if tb2 has children
			if (sdNav.tb2.find(' > ul li > ul')) {
				dropMenu(sdNav.tb2);
			}

			// if tb3 has children
			if (sdNav.tb3.find(' > ul li > ul')) {
				// show siblings ul and parent ul's of a.current
				// to counter RWAlwaysDisplayFullNavigation : true
				sdNav.tb3.find('a.current')
					.siblings('ul').css('display','block')
						.end().parents('ul').css('display','block');
			}

		}

		// PUBLIC VARIABLES
        if (tbvP.length) sdNav.tbvP = tbvP;
        if (tbsP.length) sdNav.tbsP = tbsP;
    };
})(jQuery);