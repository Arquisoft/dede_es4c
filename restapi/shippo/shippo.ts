var shippo = require('shippo')('shippo_test_6c13bfbe7eb02c86ba55b13f1cce5badbb465cf6');
const NodeGeocoder = require('node-geocoder');
const geocoder = NodeGeocoder({ provider: 'openstreetmap' })

export async function calculaCostes(addressTo: Map<string, string>) {
    var addressFrom = {
        "name": "Sergio Castillo",
        "street1": "95 Wall St",
        "city": "New York",
        "state": "NY",
        "zip": "10005",
        "country": "US"
    };

    var parcel = {
        "length": "5",
        "width": "5",
        "height": "5",
        "distance_unit": "in",
        "weight": "2",
        "mass_unit": "lb"
    };
    var string = addressTo.get('street1') + " " + addressTo.get('city') + " " + addressTo.get('zip') + " " + addressTo.get('country');
    const res = await geocoder.geocode(string);

    return shippo.shipment.create({
        "address_from": addressFrom,
        "address_to": addressTo,
        "parcels": [parcel],
        "async": true
    }).then((shipment: any, err: any) => {
        if (err != null) {
            console.log("Ha ocurrido un error al calcular los gastos de envio: " + err);
            return getCosteEnvio(res[0].latitude, res[0].longitude);
        }
        if (shipment?.rates === undefined) {
            console.log("Ha ocurrido un error al calcular los gastos de envio: Se aplicará una tarifa estandar");
            return getCosteEnvio(res[0].latitude, res[0].longitude);
        }
        var costes = shipment?.rates[0].amount
        console.log("Costes de envio mediante shippo = ", costes);
        return costes;
    });
}

function getCosteEnvio(lat1: number, lon1: number) {
    var direccionBase = {
        latitude: 40.7047056,
        longitude: -74.00756981131559,
        formattedAddress: '95 Wall Street, 95, Wall Street, Manhattan Community Board 1, New York County, New York, 10005, United States',
        country: 'United States',
        city: 'New York',
        state: 'New York',
        zipcode: '10005',
        streetName: 'Wall Street',
        streetNumber: '95',
        countryCode: 'US',
        neighbourhood: 'Manhattan Community Board 1',
        provider: 'openstreetmap'
    }

    // https://www.geeksforgeeks.org/program-distance-two-points-earth/#:~:text=For%20this%20divide%20the%20values,is%20the%20radius%20of%20Earth.
    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 = lon1 * Math.PI / 180;
    direccionBase.longitude = direccionBase.longitude * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    direccionBase.latitude = direccionBase.latitude * Math.PI / 180;

    // Haversine formula
    let dlon = direccionBase.longitude - lon1;
    let dlat = direccionBase.latitude - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
        + Math.cos(lat1) * Math.cos(direccionBase.latitude)
        * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 6371;

    // calculate the result
    var kilometers = c * r;
    var result = kilometers * 0.2; // 0,20€/km precio medio de kilometraje en España
    console.log("Calculado el envío mediante la distancia: " + result + " €");
    return result;
}