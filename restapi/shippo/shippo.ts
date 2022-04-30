var shippo = require('shippo')('shippo_test_6c13bfbe7eb02c86ba55b13f1cce5badbb465cf6');

export async function calculaCostes(addressTo: object) {
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

    return shippo.shipment.create({
        "address_from": addressFrom,
        "address_to": addressTo,
        "parcels": [parcel],
        "async": true
    }).then((shipment: any, err: any) => {
        if (err != null) {
            console.log("Ha ocurrido un error al calcular los gastos de envio: " + err);
            return 5;//Si hay algun error, se aplica una tarifa estandar de 5€
        }
        if (shipment?.rates === undefined) {
            console.log("Ha ocurrido un error al calcular los gastos de envio: Se aplicará una tarifa estandar");
            return 5;//Si hay algun error, se aplica una tarifa estandar de 5€
        }
        var costes = shipment?.rates[0].amount
        console.log("Costes de envio = ", costes);
        return costes;
    });
}