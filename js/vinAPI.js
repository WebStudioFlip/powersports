'use strict';

export function deCodeVIN(vin) {
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
        .then((httpResponse) => {
            if (httpResponse.ok) {
                return httpResponse.json();
            } else {
                return Promise.reject("Fetch did not succeed");
            }
        })
        .catch((err) => console.log(err));
}