import { GetServerSideProps } from 'next';
import { WeatherData, ForecastItem } from '../../../types/types';
import Header from '../../components/header';
import Weathfoot from '../../components/footer';

interface WeatherDetailsProps {
    currentWeather: WeatherData;
    fiveDayForecast: ForecastItem[];
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const location = params?.location as string;
    const apiKey = process.env.WEATHER_API_KEY as string;

    try {
        const [currentWeatherRes, forecastRes] = await Promise.all([
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`),
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`)
        ]);

        if (!currentWeatherRes.ok || !forecastRes.ok) {
            throw new Error('Location not found');
        }

        const [currentWeather, forecastData] = await Promise.all([
            currentWeatherRes.json(),
            forecastRes.json()
        ]);

        const fiveDayForecast = forecastData.list.filter((_: any, index: number) => index % 8 === 0).slice(0, 6);

        return {
            props: {
                currentWeather,
                fiveDayForecast
            }
        };
    } catch (error) {
        return { notFound: true };
    }
};

export default function WeatherDetails({ currentWeather, fiveDayForecast }: WeatherDetailsProps) {
    const formatDate = (dateString: number) => new Date(dateString * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const formatDateTime = (dateTimeString: string) => new Date(dateTimeString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    const getWeatherIcon = (description: string) => {
        switch (description) {
            case "clear sky":
                return "/ClearSkyAsset 4.svg";
            case "few clouds":
                return "/rainAsset 8.svg";
                case "broken clouds":
                return "/rainAsset 8.svg";
            case "overcast clouds":
                return "/rainAsset 9.svg";
            case "light rain":
                return "/rainAsset 6.svg";
            case "snow":
                return "/rainAsset 7.svg";
            default:
                return "/ClearSkyAsset 4.svg";
        }
    };

    return (
        <>
            <Header />

            <main className='flex flex-col justify-center items-center p-40'>
                <div>
                    <div className='flex w-screen justify-around'>
                        <div>
                            <h1 className='font-bold text-2xl mb-3'>{currentWeather.name}, {currentWeather.sys.country}</h1>
                            <p className='font-light text-gray-500'>Last Updated: {formatDate(currentWeather.dt)}</p>
                        </div>
                        <div>
                            <p className='font-bold text-2xl mb-3'>{currentWeather.main.temp.toFixed(1)}°C</p>
                            <img src={getWeatherIcon(currentWeather.weather[0].description)} alt="Weather Icon" />
                            <p className='font-light text-gray-500'>{currentWeather.weather[0].description}</p>
                            <p className='font-light text-gray-500'>Wind Speed: {currentWeather.wind.speed} m/s</p>
                        </div>
                    </div>
                    <div className='flex justify-center flex-col items-center mt-20'>
                        <h2 className='font-bold text-2xl mb-3'>5-Day Forecast</h2>
                        <div className="grid grid-cols-5 gap-4">
                            {fiveDayForecast.map((forecast, index) => (
                                <div key={index} className="p-4 border rounded-lg flex flex-col justify-around">
                                    <p className='font-bold text-1xl mb-3'>{formatDateTime(forecast.dt_txt)}</p>
                                    <p className='mb-1'>{forecast.main.temp.toFixed(1)}°C</p>
                                    <p className='mb-1'>{forecast.weather[0].main}</p>
                                    <img src={getWeatherIcon(forecast.weather[0].description)} alt="Weather Icon" />
                                    <p className='mb-1'>{forecast.weather[0].description}</p>
                                    <p className='mb-1'>{forecast.wind.speed} m/s</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Weathfoot/>
        </>
    );
}
