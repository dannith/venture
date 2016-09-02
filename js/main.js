$("document").ready(function() {

characters = {

   init : function(){
            characters.getAllCharacters(); // Start off by having the selection view.
   },

   getPage : function (templateFilename, jsonFilename, callback) {

      $.when($.get("templates/"+templateFilename+".handlebars"), $.getJSON("json/"+jsonFilename+".json"))
      .done(function(tData, jData){
         characters.drawPage(tData[0], jData[0], callback);  // When both ajax calls are done, update the view.
      })
   },

   drawPage : function (templateFile, jsonFile, callback) {

      var template = templateFile;
      var renderer = Handlebars.compile(template);
      var result = renderer(jsonFile);
      $('#container').html(result); // Update view.
      callback();
   },

   getAllCharacters : function(){ // See comment for getSingleCharacter() .

      characters.getPage("venturesTemplate", "ventures", function(){

         $(".character").unbind();   
         $(".character").click(function(e){
            console.log(e);
            if (e.target.id) {
               var charID = e.target.id; //get the name for the JSON file for getPage() function.
            } 
            else {
               var charID = $(e.target).parent().attr('id');
            }
            characters.getSingleCharacter(charID); // Switch to single character view.
         });
      })
   },

   getSingleCharacter : function(charID){ // This was just for the .click event listener to work, since it didnt work if there were no divs with the given id.

      characters.getPage("characterTemplate", charID, function(){ // Create the event listener in the callback, so the required id is there to work with.
         $("#click-box").unbind();  // No multiple event listeners (?)
         $("#click-box").click(function(e){  // Click-box is only visible in single character view (therefor non-clickable in multiple characters view).
            characters.getAllCharacters(); 
         });
      })
   }

}

characters.init();

});
