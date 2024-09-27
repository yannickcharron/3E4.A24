import { extractUrlParams } from './urlParams.js';

const urlParams = extractUrlParams();

$(document).ready(() => {
    const linkPlanet = urlParams.planet;
    retrievePlanet(linkPlanet);

});

async function retrievePlanet(linkPlanet) {
    try {
        const response = await axios.get(linkPlanet); //Le paramètre du get doit être une URL
        if(response.status === 200) {
            const planet = response.data;
            $('#lblPlanetName').html(planet.name);
            $('#imgPlanet').attr('src', planet.icon);
            $('#lblDiscoveredBy').html(planet.discoveredBy);
            $('#lblDiscoveryDate').html(planet.discoveryDate);
            $('#lblTemperature').html(planet.temperature);
            $('#lblPosition').html(`(${planet.position.x.toFixed(2)};${planet.position.y.toFixed(2)};${planet.position.z.toFixed(2)})`);

            const satellites = planet.satellites;

            if(satellites.length > 0) {
                satellites.forEach(s => {
                    $("#satellites").append(`<li>${s}</li>`)
                });
            } else {
                $("#satellites").append('<li>Aucune Satellite</li>');
            }


        }
    } catch(err) {
        console.log(err);
    }
}

  /*
    discoveredBy: "Eyonix"
    discoveryDate: "2012-09-18"
    href: "https://api.andromia.science/planets/5f1ef4071d2fd12580bf11ca"
    icon: "https://assets.andromia.science/planets/13.png"
    lightspeed: "-3e2.47ae1d1fda@ef.8213fbfb2d@-383.b7d45bf30cc"
    name: "Soivis"
    portals: []
    position: {x: -994.2800005152476, y: 239.50811743623944, z: -899.7180840938934}
    satellites: (3) ["Antolok Ducan", "Praankor", "Svavin"]
    temperature: 288*/