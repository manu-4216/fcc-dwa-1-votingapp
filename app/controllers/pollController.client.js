/* global appUrl  */

'use strict';

(function () {
   
   var axios = require('axios');
   
   var addPollButton = document.querySelector('.btn-add-poll');
   var formQuestion = document.querySelector('.poll-question');
   var formOptions = document.querySelectorAll('.poll-option');
  
   var apiUrl = appUrl + '/api/:id/polls';
   
   // Gets the question value from the form:
   function getQuestion () {
      return formQuestion.value
   }
   
   
   // Gets the list of options from the form
   function getOptions () {
      var optionsText = [];
   
      formOptions.forEach(function (option) {
         optionsText.push(option.value)
      })
   
      return optionsText
   }
   
   
   function cleanForm () {
      formQuestion.value = '';
      formOptions.forEach(option => {
         option.value = ''
      })
   }
   
   
   addPollButton.addEventListener('click', function (event) {
      event.preventDefault();
      
      console.log('btn pressed!');
      
      axios.post(apiUrl, {
         question: getQuestion(),
         options: getOptions()
      })
      .then(function (response) {
         console.log(response.data)
         cleanForm();
      })
      .catch(function (err) {
         console.log(err);
         if (err) throw err
      });
   }, false);

})();
