/**
 * sdSmartNav
 * the multi-tiered navigation system for Rapidweaver with less code
 *
 * Latest version: https://github.com/seyDoggy/sdSmartNav
 *
 * License <https://github.com/seyDoggy/sdSmartNav/blob/master/LICENSE>
 */

// be sure to instantiate sdNav object in <head> of html with sdNAv = {};
(function($) {
    $.sdSmartNav = function(settings) {

        var pluginName = 'sdSmartNav',
        pluginVersion = '1.2.0';

        // instantiate jQuery object
        var jq = $([]),
        tbvP,tbsP;

        // SETTINGS
        sdNav.element = 'nav',
        sdNav.tier1 = '#toolbar_horizontal',
        sdNav.tier2 = '#toolbar_sub',
        sdNav.tier3 = '#toolbar_vertical',
        sdNav.ignore = '#toolbar_responsive',
        sdNav.drop = false;

        // check for options
        if (settings) $.extend(sdNav, settings);

        // GLOBAL VARIABLES
        sdNav.tb1 = $(sdNav.element + sdNav.tier1),
        sdNav.tb2 = $(sdNav.element + sdNav.tier2),
        sdNav.tb3 = $(sdNav.element + sdNav.tier3);

        // test for
        switch (sdNav.type)
        {
            case 1:
                // Navigation type: 2tier_a
                // show tier 1
                sdNav.tb1.css('display','block');

            // PRIVATE VARIABLES
            tbsP = '',
            tbvP = sdNav.tb1.find('> ul > li.currentAncestorListItem > ul');

            // if ancestor children are not found
            if (!tbvP.length) tbvP = sdNav.tb1.find('> ul > li.currentListItem > ul');
            break;

            case 2:
                // Navigation type: 2tier_b
                // PRIVATE VARIABLES
                tbsP = sdNav.tb1.find('> ul'),
            tbvP = sdNav.tb1.find('> ul > li.currentAncestorListItem > ul');

            // if ancestor children are not found
            if (!tbvP.length) tbvP = sdNav.tb1.find('> ul > li.currentListItem > ul');
            break;

            case 3:
                // Navigation type: vertical
                // PRIVATE VARIABLES
                tbsP = '',
            tbvP = sdNav.tb1.find('> ul');
            break;

            case 4:
                // Navigation type: hide
                // PRIVATE VARIABLES
                tbsP = '',
            tbvP = '';
            sdNav.tb1.remove();
            break;

            default:
                // Navigation type: 3tier
                // show tier 1
                sdNav.tb1.css('display','block');

            // PRIVATE VARIABLES (apply if sdNav.type == 0 || typeof sdNav.type == 'undefined')
            tbsP = sdNav.tb1.find('> ul > li.currentAncestorListItem > ul'),
            tbvP = sdNav.tb1.find('> ul > li.currentAncestorListItem > ul > li.currentAncestorListItem > ul');

            // if ancestor children are not found (apply if sdNav.type == 0 || typeof sdNav.type == 'undefined')
            if (!tbsP.length) tbsP = sdNav.tb1.find('> ul > li.currentListItem > ul');
            if (!tbvP.length) tbvP = sdNav.tb1.find('> ul > li.currentAncestorListItem > ul > li.currentListItem > ul');
            break;
        }

        // prepend sub tiers
        if (sdNav.tb1.children().length) {
            if (tbvP.length) {
                sdNav.tb3.not(sdNav.ignore).prepend(tbvP.clone()).css('display','block');
                if (!$(window).width() <= '768') tbvP.css('display','none');
            }
            if (tbsP.length) {
                sdNav.tb2.prepend(tbsP.clone()).css('display','block');
                if (!$(window).width() <= '768') tbsP.css('display','none');
            }
        }

        // add drop down menus
        if (sdNav.drop === true) {

            // dropMenu(nav) function
            var dropMenu = function (nav) {
                //Add 'hasChildren' class to tb2 ul li
                nav.find(' > ul li > ul').parent().addClass('hasChildren');

                // tb2 hover animation
                $(nav).on(
                    {
                    mouseenter: function()
                    {
                        $(this).find("> ul").stop('true','true').animate({
                            opacity: 'toggle',
                            paddingTop: 'toggle'
                        });
                        // position drop menus according to container width
                        // http://stackoverflow.com/a/11525189/1308256
                        var elm = $(this).find("> ul");
                        if (elm.length) {
                            var off = elm.offset(),
                            l = off.left,
                            w = elm.width(),
                            docW = $(window).width(),
                            isEntirelyVisible = ((l + w) <= docW);

                            if ( ! isEntirelyVisible ) {

                                // add class
                                $(this).find("> ul").addClass('outOfView');

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
                        }
                    },
                    mouseleave: function()
                    {
                        // tb2 hover animation
                        $(this).find("> ul").stop('true','true').animate({
                            opacity: 'toggle',
                            paddingTop: 'toggle'
                        });
                        // position drop menus according to container width
                        $(this).find("> ul").removeClass('outOfView');
                    }
                }, 'ul li');
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
