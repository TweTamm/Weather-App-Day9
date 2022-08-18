const $ = document.querySelector.bind(document)

const search = $('.search')  // ô input
const city = $('.city')
const country = $('.country')
const value = $('.value')
const shortDesc = $('.short-desc')
const visibility = $('.visibility span')
const wind = $('.wind span')
const sun = $('.sun span')
const time = $('.time')
const content = $('.content')
const body = $('body')

async function changeWeatherUI(capitalSearch){
    
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${capitalSearch}&appid=9e9f86133201ea71b9b566cacba73987`
    
    let data = await fetch(apiURL).then(response => response.json())
    if(data.cod == 200){
        content.classList.remove('hide')
        city.innerText = data.name
        country.innerText = data.sys.country
        visibility.innerText = data.visibility + 'm'
        wind.innerText = data.wind.speed + 'm/s'
        sun.innerText = data.main.humidity + '%'
        let temp = Math.round((data.main.temp - 273.15))
        value.innerText = temp
        shortDesc.innerText = data.weather[0] ? data.weather[0].main : ''
        time.innerText = new Date().toLocaleString('vi')
        body.setAttribute('class', 'summer')

        if(temp <= 25){
            body.setAttribute('class', 'fall')
        }
           
        if(temp <= 19){
            body.setAttribute('class', 'winter')

        }
        if(temp <= 22){
            body.setAttribute('class', 'spring')

        }
       
    }else{
        content.classList.add('hide')
    }
}
    
search.addEventListener('keypress', function(e){
    if(e.code == 'Enter'){
        let capitalSearch = search.value.trim()
        changeWeatherUI(capitalSearch)
    }
})

changeWeatherUI('Ha Noi')