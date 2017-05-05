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
    
    function displayContentIntoTarget (contentSelector, targetSelector) {
        var contentElem = document.querySelector(contentSelector);
        var targetElem = document.querySelector(targetSelector);
        
        targetElem.innerHTML = '';
        targetElem.appendChild(contentElem);
        if (state.expanded) {
            setTimeout(function () {
                contentElem.classList.remove('hidden');
            }, 300);
        } else {
            contentElem.classList.add('hidden');
        }
        
    } 
    
    var linkToProfile = document.querySelector('.linkto-profile');
    var linkToPollsList = document.querySelector('.linkto-polls-list');
    //var linkToCreatePoll = document.querySelector('.btn-create-poll');
    
    linkToProfile.addEventListener('click', function (event) {
        event.preventDefault();
        showContent('.container--user-profile');
    });
    
    linkToPollsList.addEventListener('click', function (event) {
        event.preventDefault();
        showContent('.container--polls-list');
    }); 
    
    /*
    linkToCreatePoll.addEventListener('click', function (event) {
        //event.preventDefault();
        //showContent('.container--user-profile');
        showContent('.container--create-poll', '.add-button.magic-circle')
    });
    */
    
    /**
      * Handle the animation FAB (Floating Acton Button)
      */
    var addButtonElem = document.querySelector('.add-button');
    var backdropElem = document.querySelector('.backdrop');
    var addButtonTextElem = document.querySelector('.add-button--text');
    var state = {
        expanded: false
    };
    addButtonElem.addEventListener('click', function (event) {
        if (event.target !== event.currentTarget) {
            return;
        }
        state.expanded = !state.expanded;
        addButtonElem.classList.toggle('anim');
        addButtonElem.classList.toggle('pulse');
        backdropElem.classList.toggle('backdrop__active');
        addButtonTextElem.classList.toggle('add-button--text__hidden');
        
        displayContentIntoTarget('.container--create-poll', '.add-button.magic-circle');
    });
    
})()