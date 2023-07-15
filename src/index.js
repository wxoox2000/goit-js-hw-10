import { fetchBreeds } from "./cat-api";
import { fetchCatByBreed } from "./cat-api";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
const select = document.querySelector(".breed-select");
const card = document.querySelector('.cat-info');
const div = document.querySelector(".cat-info");

div.hidden = true;
fetchBreeds()
.then(data => {
    console.log(data);
    const options = data.map(({name, id}) =>
    `<option value="${id}">${name}</option>`
    ).join('');
    select.insertAdjacentHTML('beforeend', options);
    new SlimSelect({
        select: select
      });
    // const div = document.querySelector('.ss-main');
})
.catch(err => {
    Notify.failure(`Oops! Something went wrong! Try reloading the page! (${err.message})`);
})
.finally(Loading.remove(1000));

const handlerSelect = function(evt){
    div.hidden = false;
    fetchCatByBreed(evt.target.value)
    .then(data => {
        console.log(data);
        const breedInfo = data[0].breeds[0];
        const allData = {
            imgUrls: data.map(({url}) => `
            <li class="gallery__item">
            <img src="${url}" alt="" width="500">
            </li>`).join(''),
            descr: breedInfo.description,
            name: breedInfo.name,
            wiki: breedInfo.wikipedia_url,
            temperament: breedInfo.temperament,
            origin: breedInfo.origin,
            intelligence: [],
            stranger_friendly: [],
            dog_friendly: [],
            child_friendly: [],
            social_needs: [],
            energy_level: [],
            adaptability: [],
            affection_level: [],
        };
        for (let i = 0; i < breedInfo.intelligence; i++) {
            allData.intelligence.push(`<span>⭐</span>`)
        };
        for (let i = 0; i < breedInfo.stranger_friendly; i++) {
            allData.stranger_friendly.push(`<span>⭐</span>`)
        };
        for (let i = 0; i < breedInfo.dog_friendly; i++) {
            allData.dog_friendly.push(`<span>⭐</span>`)
        };
        for (let i = 0; i < breedInfo.child_friendly; i++) {
            allData.child_friendly.push(`<span>⭐</span>`)
        };
        for (let i = 0; i < breedInfo.social_needs; i++) {
            allData.social_needs.push(`<span>⭐</span>`)
        };
        for (let i = 0; i < breedInfo.energy_level; i++) {
            allData.energy_level.push(`<span>⭐</span>`)
        };
        for (let i = 0; i < breedInfo.adaptability; i++) {
            allData.adaptability.push(`<span>⭐</span>`)
        };
        for (let i = 0; i < breedInfo.affection_level; i++) {
            allData.affection_level.push(`<span>⭐</span>`)
        };
        return allData
    })
    .then(allData => {
            card.innerHTML = '';
            const cardInfo = `
            <ul class="gallery-list">${allData.imgUrls}</ul>
            <div class="info-wrap">
            <h2 class="cat cat-breed">${allData.name}</h2>
            <p class="cat cat-descr">Description: ${allData.descr}</p>
            <p class="cat cat-temper">Temperament: ${allData.temperament}</p>
            <p class="cat cat-origin">Origin: ${allData.origin}</p>
            <div class="rating-box">
                <div class="rating">
                    <span class="rating-attr">Intelligence</span>
                    ${allData.intelligence.join('')}
                </div>
                <div class="rating">
                    <span class="rating-attr">Stranger friendly</span>
                    ${allData.stranger_friendly.join('')}
                </div>
                <div class="rating">
                    <span class="rating-attr">Dog friendly</span>
                    ${allData.dog_friendly.join('')}
                </div>
                <div class="rating">
                    <span class="rating-attr">Child friendly</span>
                    ${allData.child_friendly.join('')}
                </div>
                <div class="rating">
                    <span class="rating-attr">Social needs</span>
                    ${allData.social_needs.join('')}
                </div>
                <div class="rating">
                    <span class="rating-attr">Enegry level</span>
                    ${allData.energy_level.join('')}
                </div>
                <div class="rating">
                    <span class="rating-attr">Adaptability</span>
                    ${allData.adaptability.join('')}
                </div>
                <div class="rating">
                    <span class="rating-attr">Affection level</span>
                    ${allData.affection_level.join('')}
                </div>
            </div>
            <div class="cat cat-wiki-box">
            <a class="cat cat-wiki" href="${allData.wiki}" target="blank">Wikipedia</a>
            </div>`;
            card.insertAdjacentHTML('beforeend', cardInfo);
        })
    .catch(err => {
        Notify.failure(`Oops! Something went wrong! Try reloading the page! (${err.message})`);
    })
    .finally(Loading.remove(700));
}
select.addEventListener('change', handlerSelect);
