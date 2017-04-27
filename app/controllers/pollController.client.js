/* global appUrl  */

'use strict';

(function () {
   
   var axios = require('axios');
   
   var submitPollButton = document.querySelector('.btn-submit-poll');
   var addPollOptionButton = document.querySelector('.btn-add-option');
   
   var pollForm = document.querySelector('poll-form');
   var pollQuestion = document.querySelector('.poll-question');
   var pollOptionList = document.querySelector('.poll-option-list');
   var pollOptionItem = document.querySelectorAll('.poll-option-item');
   
   var pollError = document.querySelector('.poll-error-msg');
   var pollInfo = document.querySelector('.new-poll-info');
   
  
   var apiUrl = appUrl + '/api/:id/polls';

   /**
    * Get the options body
    */
   function getOptions () {
      var optionsText = [];
   
      getPollOptionsBody().forEach(function (option) {
         optionsText.push(option.value)
      })
   
      return optionsText
   }
   
   // Dynamically refetch the options body, since new ones might have been added.
   function getPollOptionsBody () {
       return document.querySelectorAll('.poll-option');
   }
   
   function cleanForm () {
      pollQuestion.value = '';
      getPollOptionsBody().forEach(option => {
         option.value = ''
      })
   }
   
   
   function displayErrors (rawErrors) {
      var errorsObject = getErrorsObject(rawErrors),
          errorsListHTML = '',
          elementsWithError;
      
      if (errorsObject === {}) {
         return
      }
      
      // Reset styling by removing the class indicating error:
      document.querySelectorAll('.poll-form input').forEach(function (element) {
         element.classList.remove('wrong');
      })
      
      // Make the html changes for each input field with error:
      errorsListHTML += '<ul>';
      Object.keys(errorsObject).forEach(errorKey => {
         errorsListHTML += '<li>' + errorsObject[errorKey] + '</li>';
         elementsWithError = document.querySelectorAll('.poll-form input[name="' + errorKey + '"]');
         elementsWithError.forEach(function (element) {
            element.classList.add('wrong');
         })
         
      });
      errorsListHTML += '</ul>';
      
      pollError.classList.remove('hidden');
      pollError.innerHTML = errorsListHTML;
   }
   
   
   function getErrorsObject (err) {
      var errorsObject = {};
      
      switch (err.response.status) {
         // Errors of form validation:
         case 403:
            Object.keys(err.response.data.errors).reverse().forEach(errorName => {
               errorsObject[errorName] = err.response.data.errors[errorName].message
            })
            break;
         
         // Other errors:
         default:
            errorsObject.push(err.message);
            pollError.innerHTML = err.message
      }
      
      return errorsObject
   }
   
   function cleanErrors () {
      pollError.innerHTML = ''
      pollError.classList.add('hidden');
      document.querySelectorAll('.poll-form input').forEach(function (element) {
         element.classList.remove('wrong');
      })
   }
   
   function cleanPollInfo () {
      pollInfo.innerHTML = ''
   }
   
   /**
    * Sumbit poll form
    */
   submitPollButton.addEventListener('click', function (event) {
      event.preventDefault();
      
      axios.post(apiUrl, {
         question: pollQuestion.value,
         options: getOptions()
      })
      .then(function (response) {
         var newPollLink = response.data;
         
         cleanForm();
         cleanErrors();
         pollInfo.innerHTML = 'Congratulations, your new poll has been created. <br> Link: ' + '<a href="' + newPollLink +'" target="_blank">' + newPollLink + '</a>';
      })
      .catch(function (err) {
         displayErrors(err);
         cleanPollInfo()
      });
   }, false);
   
   
   /**
    * Add a new pool option to the list 
    */
   addPollOptionButton.addEventListener('click', function (event) {
      event.preventDefault();
      
      var newOptionItem = pollOptionItem[0].cloneNode(true);
      pollOptionList.appendChild(newOptionItem);
      
      var newOptionBody = newOptionItem.querySelector('.poll-option');
      newOptionBody.value = '';
      
      
   }, false);
   
   
})();
