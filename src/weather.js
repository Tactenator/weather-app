import { useEffect, useState } from 'react';
import useFetch from "./useFetch";

const Weather = () => {

    const [ city, setCity ] = useState('');
    const [ temp, setTemp ] = useState();
    const [ description, setDescription ] = useState();
    const [ feelsLike, setFeelsLike ] = useState(); 
    const [ wind, setWind ] = useState('');
    const [ isFahr, setFahr ] = useState(true);

    let isOpen = false; // For forecast drawer

    let today = new Date(); 
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');  //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy; 

    const { data, isPending, error } = useFetch('http://api.weatherapi.com/v1/forecast.json?key=d9697fbd91b34df598f45103222004&q=Omaha&days=3&aqi=no&alerts=no');

    useEffect(() => {
        handleCity(); 
        handleTemp();
        handleDescription(); 
        handleFeelsLike(); 
        handleWind();
        snow(); 
     },[temp]);

     const fetchData = async () => {
        const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=d9697fbd91b34df598f45103222004&q=Omaha&days=3&aqi=no&alerts=no');
        const data = await response.json(); 
        return data; 
    }

    const handleCity = () => { 
        fetchData()
       .then(data => {
           setCity(data.location.name);
            console.log(data);
       });
    }
    const handleTemp = () => { 
        fetchData()
       .then(data => {
           setTemp(data.current.temp_f);
       });
    }
    const handleDescription = () => { 
        fetchData()
       .then(data => {
           const desc = data.current.condition.text;
           setDescription(desc);
       });
    }

    const handleFeelsLike = () => { 
        fetchData()
       .then(data => {
           setFeelsLike(data.current.feelslike_f); 
       });
    }

    

    const handleWind = () => {
        fetchData()
        .then(data => {
            setWind(data.current.wind_mph); 
        })
    }

    // const handleDay = () =>
    // {
    //     const newDay = foreOne.date; 
    //     let options = { weekday: 'long' };
    //     setDayOne(new Intl.DateTimeFormat('en-US', options).format(newDay)); 
    // }

    const handleFahr = () => {
        if(isFahr)
        {
            console.log('No change needed'); 
        }
        else
        {
            let tempF = (temp * 5/9) + 32;
            setTemp(tempF); 
            setFahr(true);
        }
        console.log('Button reached');
    }

    const handleCels = () => {
        if(!isFahr)
        {
            console.log('No change needed'); 
        }
        else
        {
            let tempC = (temp - 32) * 5/9;
            setTemp(tempC); 
            setFahr(false);
        }
    }

    const rain = () => 
    {
        let amount = 20; 
        let container = document.querySelector('.container');
        let i = 0; 
        while( i < amount ) {
            let drop = document.createElement('i');

            let size = Math.random() * 2; 
            let posX = Math.floor(Math.random(1000) * 200);
            let delay = Math.random() * 20; 
            let duration = Math.random() * 5; 
            drop.style.width = 0.2 + size + 'px';
            drop.style.left = posX + 'px';
            drop.style.animationDelay = delay + 's';
            drop.style.animationDuration = 1 + duration + 's';
            container.appendChild(drop);
            i++
        }
    }

    const snow = () => 
    {
        let amount = 10; 
        let container = document.querySelector('.weather-container');
        let i = 0; 
        while( i < amount ) {

            let drop = document.createElement('s'); 
            let rect = drop.getBoundingClientRect();
            // if(rect.y === 0)
            // {
            //     drop.style.opacity = 0; 
            // }
            // if(rect.y !== 0)
            // {
            //     drop.style.opacity = 100; 
            // }
            let posX = Math.floor(Math.random(1000) * 300);
            let delay = Math.random() * 20; 
            let duration = (Math.random() * 10) + 2; 

            drop.style.left = posX + 'px';
            drop.style.animationDelay = delay + 's';
            drop.style.animationDuration = 1 + duration + 's';
            container.appendChild(drop);
            i++
        }
    }

    const showDrawer = () =>
    {
        const container = document.querySelector('.weather-info-container'); 
        const forecast = document.querySelector('.forecast-container');
        const toggle = document.querySelector('.toggle-button');  

        if(!isOpen)
        {
            container.style.bottom = "100%"; 
            forecast.style.opacity = "100%";
            toggle.style.transform = 'rotate(0deg)'; 
            console.log(toggle);
            isOpen = true; 
        }
        else 
        {
            isOpen = false; 
            container.style.bottom = "0%"; 
            forecast.style.opacity = "0";
            toggle.style.transform = 'rotate(-90deg)';
        }
        
    }

    return ( 
        <div className="container">
            <div className="weather-container">
                {/* <div className="cloud big"></div> */}
                <div className="city-temp-container">
                    <div className="city-description-temp">
                        <h1 className="city-name">{ city }</h1>
                        <h4 className="date">{today}</h4>
                        <div className="toggle-button" onClick={(() => showDrawer())}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div className="sun">
                        <div className="rays"></div>
                    </div>
                    <div className="cloud one"></div>
                    <div className="cloud two"></div>
                    <div className="cloud three"></div>
                    <div className="cloud four"></div>
                    <div className="description-temp">
                        <h4 className="description">{description}</h4>
                        <div className="temp-f-c">
                            <div className="temp-buttons">
                                <button onClick={(()=> handleFahr()) } className="button farh"> F </button>
                                <br></br>
                                <button onClick={(()=> handleCels()) } className="button cels"> C </button>
                            </div>
                            <h2 className="temp">{Math.floor(temp)}°</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="weather-info-container">
                <h2 className="feels-like"> Feels like { Math.floor(feelsLike) }</h2>
                <h2 className="wind-speed"> Wind speed { Math.floor(wind) } mph</h2>
                <div className="forecast-container">
                    { isPending && <div>Loading...</div> }
                    { error && <div>{ error }</div>}
                    { data && (
                        <div className="forecast">
                            {data.forecast.forecastday[0].date}
                            <img src={data.forecast.forecastday[0].day.condition.icon} alt="forecast"></img>
                            {data.forecast.forecastday[0].day.condition.text}
                        </div>
                    )}
                    { isPending && <div>Loading...</div> }
                    { error && <div>{ error }</div>}
                    { data && (
                        <div className="forecast">
                            {data.forecast.forecastday[1].date}
                            <img src={data.forecast.forecastday[1].day.condition.icon} alt="forecast"></img>
                            {data.forecast.forecastday[1].day.condition.text}
                        </div>
                    )}
                    { isPending && <div>Loading...</div> }
                    { error && <div>{ error }</div>}
                    { data && (
                        <div className="forecast">
                            {data.forecast.forecastday[2].date}
                            <img src={data.forecast.forecastday[2].day.condition.icon} alt="forecast"></img>
                            {data.forecast.forecastday[2].day.condition.text}
                        </div>
                    )}
                </div>
            </div> 
        </div>
     );
}
 
export default Weather;