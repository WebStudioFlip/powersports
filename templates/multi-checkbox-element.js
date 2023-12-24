function multyCheckBox(params) {
  var options = params.options;
  return options
    .map(function (option) {
      return  '<label>  <input type="checkbox" class="checkbox-position" name="position" value="'+option.value +'" />' + option.label + '  </label>';
    })
    .join("");
}
