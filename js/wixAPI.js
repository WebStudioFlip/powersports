"use strict";

function deCodeVIN(vin) {
  var requestOptions = {
    method: "GET",
    dataType: "json",
  };

  return fetch(
    "https://vpic.nhtsa.dot.gov/api//vehicles/DecodeVinValues/" +
      vin +
      "?format=json",
    requestOptions
  )
    .then(function (httpResponse) {
      if (httpResponse.ok) {
        return httpResponse.json();
      } else {
        return Promise.reject("Fetch did not succeed");
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}

function WixAPI() {
  this.BASE_URL = "https://www.gspnorthamerica.com/_functions";
  this.search = {};
  this.filters = {};
}

WixAPI.prototype.getYears = function () {
  return fetch(this.BASE_URL + "/years").then(function (response) {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response
      .json()
      .then(function (result) {
        return result.years;
      })
      .catch(function (err) {
        console.log(err);
      });
  });
};

WixAPI.prototype.getMakes = function () {
  return fetch(this.BASE_URL + "/makes?year=" + this.search.year).then(
    function (response) {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response
        .json()
        .then(function (result) {
          return result.makes;
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  );
};

WixAPI.prototype.getMakesList = function () {
  return fetch(this.BASE_URL + "/makes").then(function (response) {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response
      .json()
      .then(function (result) {
        return result;
      })
      .catch(function (err) {
        console.log(err);
      });
  });
};

WixAPI.prototype.getModels = function () {
  return fetch(
    this.BASE_URL +
      "/models?year=" +
      this.search.year +
      "&make=" +
      this.search.make
  ).then(function (response) {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response
      .json()
      .then(function (result) {
        return result.models;
      })
      .catch(function (err) {
        console.log(err);
      });
  });
};

WixAPI.prototype.getModelsList = function () {
  return fetch(this.BASE_URL + "/models").then(function (response) {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response
      .json()
      .then(function (result) {
        return result.models;
      })
      .catch(function (err) {
        console.log(err);
      });
  });
};

WixAPI.prototype.updateSearch = function (newParams) {
  for (var key in newParams) {
    if (newParams.hasOwnProperty(key)) {
      this.search[key] = newParams[key];
    }
  }
};

WixAPI.prototype.getSearchByVehicle = function () {
  return fetch(
    this.BASE_URL +
      "/search?year=" +
      this.search.year +
      "&make=" +
      this.search.make +
      "&model=" +
      this.search.model +
      "&type=" +
      this.search.type
  ).then(function (response) {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response
      .json()
      .then(function (result) {
        return result;
      })
      .catch(function (err) {
        console.log(err);
      });
  });
};

WixAPI.prototype.getSearchByNumber = function () {
  return fetch(
    this.BASE_URL +
      "/search?part_number=" +
      this.search.part_number +
      "&type=" +
      this.search.type
  ).then(function (response) {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response
      .json()
      .then(function (result) {
        return result;
      })
      .catch(function (err) {
        console.log(err);
      });
  });
};

WixAPI.prototype.getVehicleByVIN = function (vin) {
  return deCodeVIN(vin).then(function (results) {
    if (results.Results.length) {
      vinCode = results.Results[0];      
      this.search = {
        year: vinCode.ModelYear,
        make: vinCode.Make,
        model: vinCode.Model,
      };
    }
  });
};
