import { useEffect, useState } from "react";

//NBA dates_type: YYYY-MM-DD
async function GetBasketballResult(date) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "Your key",
      "X-RapidAPI-Host": "free-nba.p.rapidapi.com",
    },
  };
  let result = await fetch(
    `https://free-nba.p.rapidapi.com/games?page=0&per_page=25&dates[]='${date}'`,
    options
  );
  let response = await result.json();
  let data = response.data;
  return data.map((game_result) => ({
    home: game_result.home_team.full_name,
    home_score: game_result.home_team_score,
    visitor: game_result.visitor_team.full_name,
    visitor_score: game_result.visitor_team_score,
  }));
}

export function UseBasketballResult(date) {
  const [loading, setLoading] = useState(true);
  const [basketball, setgameresult] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        setgameresult(await GetBasketballResult(date));
        setLoading(false);
      } catch (err) {
        setError(error);
        setLoading(false);
      }
    })();
  }, [date]);

  return { loading, basketball, error };
}
