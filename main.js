const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=3';
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites';
const API_URL_FAVORITES_DELETED = (id) =>`https://api.thecatapi.com/v1/favourites/${id}`;

const spanError = document.getElementById('error')

async function reload() {
    const res = await fetch(API_URL);
    const data = await res.json();
    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status;
    } else {
        const photoMichi = document.getElementById('michiRamdon');
        const photoMichi1 = document.getElementById('michiRamdon1');
        const photoMichi2 = document.getElementById('michiRamdon2');

        const btn = document.getElementById('btn');        
        const btn1 = document.getElementById('btn1');        
        const btn2 = document.getElementById('btn2');

        michiRamdon.src = data[0].url;
        michiRamdon1.src = data[1].url;
        michiRamdon2.src = data[2].url;

        btn.onclick = () => saveFavorite(data[0].id)
        btn1.onclick = () => saveFavorite(data[1].id)
        btn2.onclick = () => saveFavorite(data[2].id)  
    }

}

async function favoritesMichis() {
    const res = await fetch(API_URL_FAVORITES,{
        method: 'GET',
        headers: {
            'X-API-KEY': 'f3c1a5c8-c281-48bf-a3e1-8aa64524b990',
        },
    });
    
    const data = await res.json();
    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status;
    } else {
        
        const section = document.getElementById('container__favorites');
        section.innerHTML ="";

        data.forEach(michi => {
            const div = document.createElement('div');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Forget...');


            img.src = michi.image.url;
            btn.appendChild(btnText);            
            btn.onclick = () => deleteFavorite(michi.id);
            div.appendChild(img);
            div.appendChild(btn);
            section.appendChild(div);
        });

    }
}

async function saveFavorite(id) {
    const res = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': 'f3c1a5c8-c281-48bf-a3e1-8aa64524b990'
        },
        body: JSON.stringify({
            image_id: id
        })
    })
    const data = res.json();
    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
      } else {
        favoritesMichis();
      }
}

async function deleteFavorite(id){
    const res = await fetch(API_URL_FAVORITES_DELETED(id),{
        method: 'DELETE',
        headers: {
            'X-API-KEY': 'f3c1a5c8-c281-48bf-a3e1-8aa64524b990',
        },
    });
    const data = await res.json();
    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
      } else{        
        favoritesMichis();
      }
}
reload();
favoritesMichis();