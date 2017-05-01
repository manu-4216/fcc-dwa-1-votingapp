'use strict';

/**
 * Controller for the poll
 */
(function () {
    
    function showContent (newVisibleContent) {
        var newVisibleElem = document.querySelector(newVisibleContent);
        
        // Hides the content that has been visible till now:
        document.querySelector('.root-container>.visible').classList.add('hidden');
        document.querySelector('.root-container>.visible').classList.remove('visible');
        
        // Display the content that needs to become visible:
        newVisibleElem.classList.remove('hidden');
        newVisibleElem.classList.add('visible');
    }
    
    var linkToProfile = document.querySelector('.linkto-profile');
    var linkToPollsList = document.querySelector('.linkto-polls-list');
    
    linkToProfile.addEventListener('click', function (event) {
        event.preventDefault();
        showContent('.container--user-profile');
    });
    
    linkToPollsList.addEventListener('click', function (event) {
        event.preventDefault();
        showContent('.container--polls-list');
    });
    
})()