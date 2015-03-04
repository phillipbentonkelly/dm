if (typeof bcom === "undefined") { bcom = {}; }

/*
 * BCOM Omniclick
 * Omniture click tracking prototype
 * by Jesse Marple
 *
 * This module is self init'ing.
 *
 * This handles omniture click tracking for onClick events normally added to
 * anchors directly. There are a few types of omniclicks, each with a different
 * set of omniture requirements.
 *
 * Those types include:
 * omniclick - the one that started it all. omniclick
 * omnibutton - if you guessed this is for buttons, you'd be right
 * omnistack - feature stack is its own animal, so it gets a custom omniclick
 *
 * Don't be afraid to add more types of omniclick. Just make sure your use case
 * isn't already covered in an existing omniclick.
 *
 * Why omniclick? Consider the alternative:
 * <a href="some/path/to/something" onClick="var s=s_gi('nytbglobe');s.tl(this, 'o', 'some text that they are tracking');">
 *
 * No front end developer likes inline javascript. It's ugly and inefficient.
 * What's worse is that Methode has a tough time rendering/cacheing all of
 * those omniture values.
 *
 * To make this easy, we've reduced it down to a series of document bound click
 * event on a particular class - as seen below. We assume that the events *
 * currentTarget has a data attribute - data-omniclick that contains values
 * we'll be passing to Omniture such as the string 'some text that they are
 * tracking' as seen above.
 *
 * I prefer to bind my omniclicks on the document. This is also a necessity if
 * the onmiclick element isn't being rendered by methode.
*/
bcom.omniclick = (function() {

    'use strict';

    var section = '';

    var module = {};

    module.init = function() {
        // Getting the section name for easy reuse
        // The omnitureSectionForTracking is written in a <script> tag
        // by methode in:
        // WORKBENCH:$configurationURI/Framework/frameset/frameset.jpt
        if (omnitureSectionForTracking){
            // we concat' a string for the section name and then add a space
            // and a pipe ' | ' - eg. 'sports | '
            // this is used with the onmiclick data attribute to form what is
            // send to omniture
            section = omnitureSectionForTracking + ' | ';
        }
        // 'omniclick'
        // for all omniture that links to a new page but doesn't clear other
        // vars
        $(document).on('click','.omniclick', function(e){
            // Addresses meta/ctrl-click hijacking (BDC-723). From: <http://stackoverflow.com/a/10808972/214325>
            if ( e.metaKey || e.ctrlKey ) return;
            // stop! prevent the link from going anywhere
            // we do this to be sure that we aren't leaving the page before
            // we send some info to omniture
             e.preventDefault();
            // default omniture var
            var s=s_gi('nytbglobe');
            s.tl(e.currentTarget, 'o', section + e.currentTarget.getAttribute('data-omniclick'));
            // back to the business of going where the user wanted now that we
            // have tracked the click
            
            window.location.href = e.currentTarget.href;
        });
        // 'omnibutton'
        // for buttons, where we don't need to prevent the default action or
        // clear vars. The simplest of the bunch.
        $(document).on('click','.omnibutton', function(e){
            // default omniture var
            var s=s_gi('nytbglobe');
            s.tl(e.currentTarget, 'o', section + e.currentTarget.getAttribute('data-omniclick'));
        });
        // 'omnistack'
        // For the feature stack, where we need to clear some vars and go to a
        // new page
        $(document).on('click','.omnistack', function(e){
            // stop! prevent the link from going anywhere
            e.preventDefault();
            // default omniture var
            var s=s_gi('nytbglobe');
            s.tl(e.currentTarget, 'o', section + e.currentTarget.getAttribute('data-omniclick'));
            // back to the business of going where the user wanted now that we have tracked the click
      
            window.location.href = e.currentTarget.href;
        });
    };

    module.init();

}());
/*
                          ,' \
                        ,'    \...-.
                      ,'           |
                    ,'             |
                 _,'---    -.      `-._
               ,'            `".       )
            ,-'                 \     /
        ,..'-                    `.  (           _
       (     ,--._     ,--._      `\  \        ,' |
      ,-'   _...._\ _,.._   \      `\  )      /   \__
     /    ,'      ;'     `.          \/     ,/       )
    |    |       |         \          `.   ,'.     ,'
    | O  :    O  |      O  |           '"--'  \   (
    `._  |       \         '                  |    \
     . --`.      _`-.___,,'                  ,'     )
   .-      `'--.'  `-.__,,-'                ,'   ,-'
 ,'        '--.-'    .                  _       (
(                   _.`--.-        `-..' `.      `.
 \             _,--'                  )   |   ,.--'
  '-.......---' 'v'""".      _Y      /    `.  |
     -hrr-      (_     ;----' |     (      `.,'
                  \   /_)     '-.   _)
          ___ _ _  `-' _        `..'
         | _ ) (_)_ _ | |___  _
         | _ \ | | ' \| / / || |
         |___/_|_|_||_|_\_\\_, |
                           |__/

*/