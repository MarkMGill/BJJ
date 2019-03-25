

        // Get the current year for the copyright
        $('#year').text(new Date().getFullYear());
        /*
        window.addEventListener("load", function(){
            var nodes = document.
        querySelectorAll(".overlay");
            for(var i=0; i<nodes.length; i++){
            } 
        });

var words = nodes[i].innerText;
var html = "";
for(var i2=0; i2<words.length; i2++){
	if(words[i2] == " ")html += 
words[i2];
		else html += 
"<span>"+words[i2]+"</span>"
}
nodes[i].innerHTML = html;
*/
/*  Words Fly-In Effect */
$(function() {
    
    setTimeout(function() {
        $('.fly-in-text').removeClass('hidden');
    }, 500);
})();

