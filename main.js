const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=3';

async function reload() {
    const res = await fetch(API_URL);
    const data = await res.json();
    const photoMichi = document.getElementById('michiRamdon');
    michiRamdon.src = data[0].url;
    const photoMichi1 = document.getElementById('michiRamdon1');
    michiRamdon1.src = data[1].url;
    const photoMichi2 = document.getElementById('michiRamdon2');
    michiRamdon2.src = data[2].url;

}
reload();