"use strict";
console.log(1);

console.log(2);
var searchParams = {};
var searchResults = [];
var productLine,
  productSubCategory,
  productType,
  position = [],
  subModel;

var selectSection = document.querySelector(".select-section");
var resultSection = document.querySelector(".result-section");

var formByVehicle = document.querySelector(".select-container-vehicle");
var dropDownYear = document.querySelector("#dropdown-vehicle-year");
var dropDownYearLoadingSpiner = document.querySelector(
  ".dropdown-vehicle-year-spiner"
);
var dropDownMake = document.querySelector("#dropdown-vehicle-make");
var dropDownMakeLoadingSpiner = document.querySelector(
  ".dropdown-vehicle-make-spiner"
);
var dropDownModel = document.querySelector("#dropdown-vehicle-model");
var dropDownModelLoadingSpiner = document.querySelector(
  ".dropdown-vehicle-model-spiner"
);
var textSelectVehicleError = document.querySelector(".textSelectVehicleError");

var formByNumber = document.querySelector(".select-container-number");
var inputNumber = document.querySelector("#input-number");
var textSelectNumberError = document.querySelector(".textSelectNumberError");

var formByVin = document.querySelector(".select-container-vin");
var inputVIN = document.querySelector("#input-vin");
var textSelectVINError = document.querySelector(".textSelectVINError");

var loadingImage = document.querySelector(".parts-container-spiner");
var searchEditButton = document.querySelector(".button-result-new-search");
var clearFilterButton = document.querySelector(".button-filter-clear");
var cancelEditButton = document.querySelector(".button-cancel");
var filterContainer = document.querySelector(".filter-container");
var filterContainerFilters = document.querySelector(
  ".filter-container-filters"
);
var filterProductLine = document.querySelector("#product-line");
var filterSubCategory = document.querySelector("#subCategory");
var filterType = document.querySelector("#type");
var filterSubModel = document.querySelector("#sub-model");
var filterPosition = document.querySelector(".filter-position");

var searchParamsText = document.querySelector(
  ".result-top-container-info-text"
);
var resultText = document.querySelector(".result-top-container-parts-info");
var partsGallery = document.querySelector(".gallery");
console.log(3);
var filterDropDownShema = {
  productLine: {
    text: "PRODUCT LINE",
    title: "product-line",
    element: filterProductLine,
    placehold: "Select Product Line",
  },
  productSubCategory: {
    text: "PRODUCT SUBCATEGORY",
    title: "subCategory",
    element: filterSubCategory,
    placehold: "Select SubCategory",
  },
  productType: {
    text: "PRODUCT TYPE",
    title: "type",
    element: filterType,
    placehold: "Select Product Type",
  },
  subModels: {
    text: "SUB MODEL",
    title: "sub-model",
    element: filterSubModel,
    placehold: "Select Sub Model",
  },
};
console.log(4);
addEvents();

function addEvents() {
  formByVehicle.addEventListener("submit", onFormVehicleSubmit);
  formByNumber.addEventListener("submit", onFormNumberSubmit);
  formByVin.addEventListener("submit", onFormVINSubmit);
  dropDownYear.addEventListener("change", onDropDownYearChange);
  dropDownMake.addEventListener("change", onDropDownMakeChange);
  dropDownModel.addEventListener("change", onDropDownModelChange);
  filterProductLine.addEventListener("change", onDropDownProductLineChange);
  filterSubCategory.addEventListener("change", onDropDownSubCategoryChange);
  filterType.addEventListener("change", onDropDownProductTypeChange);
  filterSubModel.addEventListener("change", onDropDownSubModelChange);
  filterPosition.addEventListener("change", onDropDownPositionChange);
  searchEditButton.addEventListener("click", searchEditButtonClick);
  clearFilterButton.addEventListener("click", clearFilter);
  cancelEditButton.addEventListener("click", cancelEditButtonClick);
}
console.log(5);
var wixAPI = new WixAPI();
console.log(6);
checkQuery();

function checkQuery() {
  var params = new URLSearchParams(document.location.search);
  readQueryParams(params);
  showInfo();
}

function readQueryParams(params) {
  console.log(9);
  var type = params.get("type");
  if (type) searchParams.type = type;
  var year = params.get("year");
  if (year) searchParams.year = year;
  var make = params.get("make");
  if (make) searchParams.make = make;
  var model = params.get("model");
  if (model) searchParams.model = model;
  var part_number = params.get("part_number");
  if (part_number) searchParams.part_number = part_number;
  var vin = params.get("vin");
  if (vin) searchParams.vin = vin;
}

function showInfo() {
  if (searchParams.type) {
    return showResults();
  }
  buildDropDownYears();
  showForm();
}

function showResults() {
  var data = { filters: {}, parts: [] };
  try {
    loadingImage.classList.remove("hidden");
    resultText.textContent = "Searching...";
    partsGallery.innerHTML = "";
    selectSection.classList.add("hidden");
    resultSection.classList.remove("hidden");
    if (searchParams.type == "vehicle") {
      wixAPI.search = searchParams;
      var carDescription =
        searchParams.year +
        ", " +
        searchParams.make +
        ", " +
        searchParams.model;
      searchParamsText.textContent = carDescription;
      return wixAPI
        .getSearchByVehicle(searchParams)
        .then(function (data) {
          if (data && data.results) {
            searchResults = data.results.parts;
            loadingImage.classList.add("hidden");
            buildGallery(data.results.parts);
            buildFilters(data.results.filters);
            return;
          }
          showNoResults();
        })
        .catch(function (error) {
          throw error;
        });
    }

    if (searchParams.type == "number") {
      wixAPI.search = searchParams;
      var carDescription = "Part Number: " + searchParams.part_number;
      searchParamsText.textContent = carDescription;
      wixAPI
        .getSearchByNumber(searchParams)
        .then(function (data) {
          if (data && data.results) {
            searchResults = data.results.parts;
            loadingImage.classList.add("hidden");
            buildGallery(data.results.parts);
            buildFilters(data.results.filters);
            return;
          }
          showNoResults();
        })
        .catch(function (error) {
          throw error;
        });
    }

    if (searchParams.type == "vin") {
      return getVehicleByVIN(searchParams.vin).then(function () {
        wixAPI.search = searchParams;
        if (searchParams.year && searchParams.make && searchParams.model) {
          var carDescription =
            searchParams.year +
            ", " +
            searchParams.make +
            ", " +
            searchParams.model;
          searchParamsText.textContent = carDescription;
        } else {
          var carDescription = "VIN: " + searchParams.vin;
          searchParamsText.textContent = carDescription;
        }

        return wixAPI
          .getSearchByVehicle(searchParams)
          .then(function (data) {
            if (data && data.results) {
              searchResults = data.results.parts;
              loadingImage.classList.add("hidden");
              buildGallery(data.results.parts);
              buildFilters(data.results.filters);
              return;
            }
            showNoResults();
          })
          .catch(function (error) {
            throw error;
          });
      });
    }

    showNoResults();
  } catch (error) {
    console.log(error);
    showNoResults();
  }
}

function searchEditButtonClick() {
  cancelEditButton.classList.remove("hidden");
  textSelectVehicleError.classList.add("hidden");
  textSelectNumberError.classList.add("hidden");
  textSelectVINError.classList.add("hidden");
  if (searchParams.type == "vehicle") {
    if (!searchParams.year || !searchParams.make || !searchParams.model) {
      textSelectVehicleError.textContent = "Select year/make/model";
      textSelectVehicleError.classList.remove("hidden");
    }
    wixAPI.search = searchParams;
    buildDropDownYears().then(function () {
      dropDownYear.value = searchParams.year;
    });
    buildDropDownMakes().then(function () {
      dropDownMake.value = searchParams.make;
    });
    buildDropDownModels().then(function () {
      dropDownModel.value = searchParams.model;
    });
  }

  if (searchParams.type == "number") {
    buildDropDownYears();
    inputNumber.value = searchParams.part_number;
    if (searchParams.part_number.length < 5) {
      showForm();
      textSelectNumberError.textContent =
        "Please enter at least 5 characters to search";
      textSelectNumberError.classList.remove("hidden");
      return;
    }
  }

  if (searchParams.type == "vin") {
    buildDropDownYears();
    inputVIN.value = searchParams.vin;
    if (searchParams.vin && searchParams.vin.length != 17) {
      showForm();
      textSelectVINError.textContent = "VIN must be 17 characters";
      textSelectVINError.classList.remove("hidden");
      return;
    }
  }
  showForm();
}

function showNoResults() {
  partsGallery.innerHTML = "";
  resultText.textContent = "Error Search";
  selectSection.classList.add("hidden");
  resultSection.classList.remove("hidden");
  filterContainerFilters.classList.add("hidden");
  loadingImage.classList.add("hidden");
}

function buildGallery(parts) {
  partsGallery.innerHTML = "";
  resultText.textContent = parts.length + " PART NUMBERS";
  partsGallery.insertAdjacentHTML("beforeend", galleryCardsTemplate(parts));
}

function buildFilters(filters) {
  console.log(filters);
  var keys = Object.keys(filters);
  if (!keys.length) {
    filterContainerFilters.classList.add("hidden");
  }
  filterContainerFilters.classList.remove("hidden");
  for (var index = 0; index < keys.length; index++) {
    if (keys[index] == "positions") {
      filterPosition.innerHTML =
        " <legend>POSITION</legend>" +
        multyCheckBox({ options: filters.positions });
      filterPosition.classList.remove("hidden");
    } else {
      if (filterDropDownShema[keys[index]]) {
        filterDropDownShema[keys[index]].element.innerHTML = dropDown({
          options: filters[keys[index]],
          title: filterDropDownShema[keys[index]].title,
          placehold: filterDropDownShema[keys[index]].placehold,
        });

        filterDropDownShema[keys[index]].element.parentNode.classList.remove(
          "hidden"
        );
      }
    }
  }
}

function showForm() {
  selectSection.classList.remove("hidden");
  resultSection.classList.add("hidden");
}

function buildDropDownYears() {
  try {
    dropDownYearLoadingSpiner.classList.remove("hidden");
    dropDownYear.disabled = true;
    return wixAPI
      .getYears()
      .then(function (yearsOptions) {
        dropDownYear.innerHTML = "";
        dropDownYear.insertAdjacentHTML(
          "beforeend",
          dropDown({
            options: yearsOptions,
            title: "dropdown-vehicle-year",
            placehold: "Select Year",
          })
        );
        dropDownYearLoadingSpiner.classList.add("hidden");
        dropDownYear.disabled = false;
      })
      .catch(function (error) {
        dropDownYearLoadingSpiner.classList.add("hidden");
        console.log(error);
      });
  } catch (error) {
    dropDownYearLoadingSpiner.classList.add("hidden");
    console.log(error);
  }
  console.log(11);
}

function onDropDownYearChange(event) {
  wixAPI.updateSearch({ year: event.target.value });
  buildDropDownMakes();
  dropDownModel.disabled = true;
  dropDownModel.selectedIndex = 0;
}

function onDropDownMakeChange(event) {
  wixAPI.updateSearch({ make: event.target.value });
  buildDropDownModels();
}

function onDropDownModelChange(event) {
  console.log(event);
  wixAPI.updateSearch({ model: event.target.value });
}

function buildDropDownMakes() {
  dropDownMakeLoadingSpiner.classList.remove("hidden");
  dropDownMake.disabled = true;
  return wixAPI
    .getMakes()
    .then(function (makesOptions) {
      dropDownMake.innerHTML = dropDown({
        options: makesOptions,
        title: "dropdown-vehicle-make",
        placehold: "Select Make",
      });
      dropDownMake.disabled = false;
      dropDownMakeLoadingSpiner.classList.add("hidden");
    })
    .catch(function (error) {
      console.log(error);
      dropDownMakeLoadingSpiner.classList.add("hidden");
    })
   
}

function buildDropDownModels() {
  dropDownModelLoadingSpiner.classList.remove("hidden");
  dropDownModel.disabled = true;
  return wixAPI
    .getModels()
    .then(function (modelsOptions) {
      dropDownModel.innerHTML = dropDown({
        options: modelsOptions,
        title: "dropdown-vehicle-model",
        placehold: "Select Model",
      });
      dropDownModel.disabled = false;
      dropDownModelLoadingSpiner.classList.add("hidden");
    })
    .catch(function (error) {
      console.log(error);
      dropDownModelLoadingSpiner.classList.add("hidden");
    })    
}

function onDropDownProductLineChange(event) {
  console.log(event.target.value);
  productLine = event.target.value;
  filterResults();
}

function onDropDownSubCategoryChange(event) {
  productSubCategory = event.target.value;
  filterResults();
}

function onDropDownProductTypeChange(event) {
  productType = event.target.value;
  filterResults();
}

function onDropDownSubModelChange(event) {
  subModel = event.target.value;
  filterResults();
}

function onDropDownPositionChange(event) {
  var positionCheckBoxes = document.getElementsByClassName("checkbox-position");
  position = [];
  for (var index = 0; index < positionCheckBoxes.length; index++) {
    var element = positionCheckBoxes[index];
    if (element.checked == true) {
      position.push(element.value);
    }
  }
  filterResults();
}

function onFormVehicleSubmit(event) {
  event.preventDefault();
  var formData = new FormData(formByVehicle);
  searchParams = {
    type: "vehicle",
    year: formData.get("dropdown-vehicle-year"),
    make: formData.get("dropdown-vehicle-make"),
    model: formData.get("dropdown-vehicle-model"),
  };
  addQueryParams(searchParams);
  showResults();
  inputNumber.value = "";
  inputVIN.value = "";
}

function onFormNumberSubmit(event) {
  event.preventDefault();
  textSelectNumberError.classList.add("hidden");
  var formData = new FormData(formByNumber);
  var part_number = formData.get("input-nember");

  if (part_number && part_number.length < 4) {
    textSelectNumberError.textContent =
      "Please enter at least 4 characters to search";
    textSelectNumberError.classList.remove("hidden");
    return;
  }

  searchParams = {
    type: "number",
    part_number: formData.get("input-number"),
  };
  addQueryParams(searchParams);
  showResults();
  inputVIN.value = "";
  dropDownYear.selectedIndex = 0;
  dropDownMake.selectedIndex = 0;
  dropDownMake.disabled = true;
  dropDownModel.selectedIndex = 0;
  dropDownModel.disabled = true;
}

function onFormVINSubmit(event) {
  event.preventDefault();
  textSelectVINError.classList.add("hidden");
  var formData = new FormData(formByVin);
  var vinNumber = formData.get("input-vin");

  if (vinNumber.length !== 17) {
    textSelectVINError.textContent = "VIN must be 17 characters";
    textSelectVINError.classList.remove("hidden");
    return;
  } else {
    searchParams = {
      type: "vin",
      vin: vinNumber,
    };
    addQueryParams(searchParams);
    showResults();
    inputNumber.value = "";
    dropDownYear.selectedIndex = 0;
    dropDownMake.selectedIndex = 0;
    dropDownMake.disabled = true;
    dropDownModel.selectedIndex = 0;
    dropDownModel.disabled = true;
  }
}

function addQueryParams(addParams) {
  var url = new URL(window.location.href);

  var urlParams = new URLSearchParams([]);

  var keys = Object.keys(addParams);
  for (var index = 0; index < keys.length; index++) {
    urlParams.set(keys[index], addParams[keys[index]]);
  }
  var newParams = urlParams.toString();
  console.log(newParams);
  var newUrl = new URL(url.origin + url.pathname + "?" + newParams);
  window.history.replaceState(null, null, newUrl);
}

function getVehicleByVIN(vin) {
  return deCodeVIN(vin)
    .then(function (res) {
      var ModelYear = res.Results[0].ModelYear;
      var Make = res.Results[0].Make;
      var Model = res.Results[0].Model;

      if (
        ModelYear &&
        ModelYear.length &&
        Make &&
        Make.length &&
        Model &&
        Model.length
      ) {
        return (searchParams = {
          vin: vin,
          type: "vin",
          year: ModelYear,
          make: Make,
          model: Model,
        });
      }
      throw "Error VIN Decode";
    })
    .catch(function (error) {
      console.log(error);
    });
}

function filterResults() {
  var searchResultsFiltered = searchResults.slice(0);
  console.log(searchResultsFiltered);
  if (position.length) {
    searchResultsFiltered = searchResultsFiltered.filter(function (el) {
      if ("position" in el) {
        for (var index = 0; index < position.length; index++) {
          var elementPosition = position[index];
          if (el.position.indexOf(elementPosition) !== -1) {
            return true;
          }
        }
        return false;
      } else return true;
    });
  }

  if (subModel) {
    searchResultsFiltered = searchResultsFiltered.filter(function (el) {
      if ("subModel" in el) {
        return el.subModel.indexOf(subModel) !== -1;
      } else return true;
    });
  }

  if (productLine) {
    console.log(productLine);
    searchResultsFiltered = searchResultsFiltered.filter(function (el) {
      if ("category" in el) {
        console.log(el.category.indexOf(productLine));
        return el.category.indexOf(productLine) !== -1;
      } else return true;
    });
  }

  if (productType) {
    searchResultsFiltered = searchResultsFiltered.filter(function (el) {
      if ("partType" in el) {
        return el.partType.indexOf(productType) !== -1;
      }
      return true;
    });
  }

  if (productSubCategory) {
    searchResultsFiltered = searchResultsFiltered.filter(function (el) {
      if ("subCategory" in el) {
        return el.subCategory.indexOf(productSubCategory) !== -1;
      } else return true;
    });
  }

  resultText.textContent = searchResultsFiltered.length + " PART NUMBERS";
  buildGallery(searchResultsFiltered);
}

function clearFilter() {
  filterProductLine.selectedIndex = 0;
  productLine = undefined;
  filterSubCategory.selectedIndex = 0;
  productSubCategory = undefined;
  filterType.selectedIndex = undefined;
  productType = undefined;
  filterSubModel.selectedIndex = undefined;
  subModel = undefined;
  clearFilterPasition();
  position = [];
  resultText.textContent = searchResults.length + " PART NUMBERS";
  filterResults();
}

function clearFilterPasition() {
  var positionCheckBoxes = document.getElementsByClassName("checkbox-position");
  for (var index = 0; index < positionCheckBoxes.length; index++) {
    var element = positionCheckBoxes[index];
    element.checked = false;
  }
}

function cancelEditButtonClick() {
  selectSection.classList.add("hidden");
  resultSection.classList.remove("hidden");
}
