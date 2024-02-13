export interface WeatherData {
    main: {
      temp: number;
      feels_like: number;
    };
    weather: Array<{
      description: string;
    }>;
    sys: {
      country: string;
    };
    wind: {
      speed: number,
    },
    name: string;
    dt: number;
  }
  
  export interface ForecastItem {
    dt_txt: string;
    main: {
      temp: number;
    };
    weather: Array<{
      main: string;
      description: string;
    }>;
    wind: {
      speed: number;
    };
  }
  