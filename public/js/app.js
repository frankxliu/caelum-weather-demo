// fetch('http://localhost:3000/weather?address=Boston').then((response) =>{
//     response.json().then((data)=>{
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const areaID = document.querySelector('#areaID')
const message = document.querySelector('.message')
const displayLocation = document.querySelector('#location')
const time = document.querySelector('#time')

const temperature = document.querySelector('#temperature')
const messageTwo = document.querySelector('#message-2')
const weatherIcon = document.querySelector('#weatherIcon')

const windSpeed = document.querySelector('#windSpeed')
const messageThree = document.querySelector("#message-3")
const windIcon = document.querySelector("#windIcon")

const rain = document.querySelector('#rain')
const messageFour = document.querySelector('#message-4')
const rainIcon = document.querySelector("#rainIcon")

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    temperature.style.display = 'none'
    windSpeed.style.display = 'none'
    rain.style.display ='none'

    areaID.style.display = 'block'
    time.textContent = ''
    displayLocation.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''
    

    fetch('/weather?address=' + location).then((response) =>{
        response.json().then((data)=>{
            if (data.error) {
                displayLocation.textContent = data.error
            } else {
                console.log(data)
                displayLocation.textContent = data.location
                time.textContent = data.time

                temperature.style.display = 'block'
                messageTwo.textContent = data.forecast
                weatherIcon.src = data.icon


                windSpeed.style.display = 'block'
                windIcon.src = data.windicon
                messageThree.textContent = data.wind

                rain.style.display ='block'
                rainIcon.src = data.rainicon
                messageFour.textContent = data.humidity


            }
        })
    })
})