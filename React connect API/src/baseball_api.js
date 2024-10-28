import { useEffect, useState } from "react";
import moment from "moment";
async function GetBaseballResult(date) {
  const options = {
    method: "GET",
    headers: {
      "content-type": "application/octet-stream",
      "X-RapidAPI-Key": "Your key",
      "X-RapidAPI-Host": "api-baseball.p.rapidapi.com",
    },
  };
  let result = await fetch(
    `https://api-baseball.p.rapidapi.com/games?date=${date}`,
    options
  );
  let response = await result.json();
  let data = response.response;
  return data.map((game_info) => ({
    league: game_info.league.name,
    Home: game_info.teams.home.name,
    Away: game_info.teams.away.name,
    Home_score_summary: game_info.scores.home,
    Away_score_summary: game_info.scores.away,
    Home_score: game_info.scores.home.innings,
  Away_score: game_info.scores.away.innings
  }));
}

export function UseBaseballResult(date) {
  const [Loading, setLoading] = useState(true);
  const [Game_Statistics, setGameStatistics] = useState([]);
  const [error, setError] = useState(null);
  const [current_time, setCurrenttime] = useState('');
  useEffect(() => {
    (async () => {
      try {
        setGameStatistics(await GetBaseballResult(date));
        setLoading(false);
        setCurrenttime(moment().utcOffset("-10:00").format("YYYY-MM-DD hh:mm:ss a"));
      } catch (err) {
        setError(error);
        setLoading(false);
      }
    })();
  }, [date]);
  return {baseball: Game_Statistics, current_time: current_time};
}
