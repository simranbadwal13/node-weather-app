const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const firstPara = document.querySelector('#message-1');
const secondPara = document.querySelector('#forecast');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    firstPara.textContent = 'Loading...';
    secondPara.textContent = '';
    const searchValue = search.value;
    fetch(`/weather?address=${searchValue}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                firstPara.textContent = data.error;
            } else {
                firstPara.textContent = data.location;
                secondPara.textContent = data.forecast;
            }
        });
    });
});
