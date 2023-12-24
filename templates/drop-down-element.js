function dropDown(params) {
  var options = params.options;
  
  var placehold = params.placehold;
  console.log(placehold, "  ",options)
  var optionsHtml = options.map(    function(option) { 
    return '<option value="'+ option.value +'">'+option.label+'</option>'}  ).join("");
  return '<option class="drop-down-placehold" value="" disabled selected>'+placehold+'</option>' + optionsHtml;
}
