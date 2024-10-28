import { useEffect, useState } from "react";
import moment from "moment";
async function GetSoccerResult(date) {
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/octet-stream',
        'X-RapidAPI-Key': 'Your key',
        'X-RapidAPI-Host': 'soccer-football-info.p.rapidapi.com'
      }}
    let result = await fetch(
      `https://soccer-football-info.p.rapidapi.com/matches/day/basic/?d=${date}`,
      options
    );
    let response = await result.json();
    let data = await response.result;
    
    return data.map((data) => ({
      League: data.championship.name,
      teamA: data.teamA.name,
      scoreA: data.teamA.score,
      shootA: data.teamA.stats,
      teamB: data.teamB.name,
      scoreB: data.teamB.score,
      shootB: data.teamB.stats,
    }));
  };  

export function UseSoccerResult(date) {
  const [Loading, setLoading] = useState(true);
  const [Game_Statistics, setGameStatistics] = useState([]);
  const [error, setError] = useState(null);
  const [current_time, setCurrenttime] = useState("");
  useEffect(() => {
    (async () => {
      try {
        setGameStatistics(await GetSoccerResult(date));
        setLoading(false);
        setCurrenttime(
          moment().utcOffset("-10:00").format("YYYY-MM-DD hh:mm:ss a")
        );
      } catch (err) {
        setError(error);
        setLoading(false);
      }
    })();
  }, [date]);
  return { Loading: Loading, soccer: Game_Statistics, error: error, current_time: current_time };
}
