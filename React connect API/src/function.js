import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import all from "./image/all.jpg";
import basketball_left from "./image/shooting.jpg";
import basketball_right from "./image/Basketball.jpg";
import baseball_left from "./image/Pitch.jpg";
import baseball_right from "./image/trout.jpg";
import soccer_left from "./image/soccer_shoot.jpeg";
import soccer_right from "./image/soccer_goal.jpg";
import { Table, Stack } from "react-bootstrap";
import moment from "moment";
import { Link } from "react-router-dom";
function Basketball_result(props) {
  return (
    <div>
      <p style={{ backgroundColor: "White", alignSelf: "flex-start" }}>
        {props.visitor} v.s {props.home}(Home)
      </p>
      <p>
        {props.visitor_score} : {props.home_score}
      </p>
    </div>
  );
}
function Baseball_result(props) {
  let key = Object.keys(props.baseball.Away_score);
  key.splice(9, 1);
  let Column_name = ["Team"];
  key.map((key) => Column_name.push(key));
  Column_name.push("R");
  Column_name.push("H");
  Column_name.push("E");

  let Away_Team = [props.baseball.Away];
  key.map((key) => Away_Team.push(props.baseball.Away_score[key]));
  Away_Team.push(props.baseball.Away_score_summary.total);
  Away_Team.push(props.baseball.Away_score_summary.hits);
  Away_Team.push(props.baseball.Away_score_summary.errors);

  let Home_Team = [props.baseball.Home];
  key.map((key) => Home_Team.push(props.baseball.Home_score[key]));
  Home_Team.push(props.baseball.Home_score_summary.total);
  Home_Team.push(props.baseball.Home_score_summary.hits);
  Home_Team.push(props.baseball.Home_score_summary.errors);
  return (
    <div>
      <Stack direction="horizontal" gap={3}>
        <img src={baseball_left} alt="back" height="300" width="200" />
        <Stack>
          <h2>League: {props.baseball.league}</h2>
          <Table variant="dark">
            <thead>
              <tr>
                {Column_name.map((Column_name) => (
                  <th>{Column_name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {Away_Team.map((stat) => (
                  <th>{stat}</th>
                ))}
              </tr>
              <tr>
                {Home_Team.map((stat) => (
                  <th>{stat}</th>
                ))}
              </tr>
            </tbody>
          </Table>
        </Stack>
        <img src={baseball_right} alt="back" height="300" width="200" />
      </Stack>
    </div>
  );
}
function Soccer_result(props) {
  let Column_name = ["Team", "1H", "2H", "Final", "Shoot Attempt", "Shoot On"];
  let A_shoot_t = 0;
  let A_shoot_on = 0;
  let B_shoot_t = 0;
  let B_shoot_on = 0;
  try {
    A_shoot_t = props.soccer.shootA["shoots"]["t"];
  } catch (e) {
    A_shoot_t = 0;
  }
  try {
    A_shoot_on = props.soccer.shootA["shoots"]["on"];
  } catch (e) {
    A_shoot_on = 0;
  }
  try {
    B_shoot_t = props.soccer.shootB["shoots"]["t"];
  } catch (e) {
    B_shoot_t = 0;
  }
  try {
    B_shoot_on = props.soccer.shootB["shoots"]["on"];
  } catch (e) {
    B_shoot_on = 0;
  }
  let A = [
    props.soccer.teamA,
    props.soccer.scoreA["1h"],
    props.soccer.scoreA["2h"] - props.soccer.scoreA["1h"],
    props.soccer.scoreA.f,
    A_shoot_t,
    A_shoot_on,
  ];
  let B = [
    props.soccer.teamB,
    props.soccer.scoreB["1h"],
    props.soccer.scoreB["2h"] - props.soccer.scoreB["1h"],
    props.soccer.scoreB.f,
    B_shoot_t,
    B_shoot_on,
  ];
  return (
    <div>
      <Stack direction="horizontal" gap={3}>
        <img src={soccer_left} alt="back" height="300" width="400" />
        <Stack>
          <h2>League: {props.soccer.League}</h2>
          <Table variant="dark">
            <thead>
              <tr>
                {Column_name.map((Column_name) => (
                  <th>{Column_name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {A.map((summary) => (
                  <th>{summary}</th>
                ))}
              </tr>
              <tr>
                {B.map((summary) => (
                  <th>{summary}</th>
                ))}
              </tr>
            </tbody>
          </Table>
        </Stack>
        <img src={soccer_right} alt="back" height="300" width="400" />
      </Stack>
    </div>
  );
}
export function BasketballScoreRoute({ basketball }) {
  //style={BasketballStyle}
  return (
    <div>
      <Stack direction="horizontal" gap={3}>
        <img src={basketball_left} alt="back" width="500" />

        <div width="34%" style={{ alignItems: "center" }}>
          <h1>Game Result</h1>
          {basketball.map((basketball) => (
            <Basketball_result
              home={basketball.home}
              home_score={basketball.home_score}
              visitor={basketball.visitor}
              visitor_score={basketball.visitor_score}
            />
          ))}
        </div>

        <img src={basketball_right} alt="back" width="500" />
      </Stack>
      <p>
        Last update{" "}
        {moment().utcOffset("-10:00").format("YYYY-MM-DD hh:mm:ss a")} "UTF-10"
      </p>
    </div>
  );
}
export function BaseballScoreRoute({ baseball }) {
  return (
    <div>
      <Stack direction="horizontal" gap={3}>
        <lu width="40%">
          {baseball.map((baseball) => (
            <>
              <Baseball_result baseball={baseball} />
            </>
          ))}
        </lu>
      </Stack>
      <p>
        Last update{" "}
        {moment().utcOffset("-10:00").format("YYYY-MM-DD hh:mm:ss a")} "UTF-10"
      </p>
    </div>
  );
}
export function SoccerScoreRoute({ soccer }) {
  return (
    <div>
      <Stack direction="horizontal">
        <lu>
          {soccer.map((soccer) => (
            <>
              <Soccer_result soccer={soccer} />
            </>
          ))}
        </lu>
      </Stack>
      <p>
        Last update{" "}
        {moment().utcOffset("-10:00").format("YYYY-MM-DD hh:mm:ss a")} "UTF-10"
      </p>
    </div>
  );
}

export function SearchBar(props) {
  const [innerSearch, setInnerSearch] = useState("YYYY-MM-DD");
  return (
    <div className="Searchbar">
      <label>
        <input
          aria-labelledby="Search-button"
          name="search"
          id="search"
          type="search"
          value={innerSearch}
          onChange={(e) => setInnerSearch(e.target.value)}
        />
      </label>
      <button
        id="search-button"
        type="button"
        variant="primary"
        className="Search"
        onClick={() => props.onSubmit(innerSearch)}
      >
        Search Date
      </button>
    </div>
  );
}
export function Login_page(props) {
  return (
    <div>
      <p>
        Username <input type="text" />
      </p>

      <p>
        Password <input type="password" />
      </p>
      <Link to="Home">
        <button type="submit">Submit</button>
      </Link>
    </div>
  );
}
export function Home(user) {
  return (
    <div>
      <img src={all} alt="Logo" width={500} height={300} />
      <p>
        Welcom to Sport World. We previde daily game result for NBA,
        Baseball and Soccer around the World
      </p>
      <p>
        You can use the search bar on the top right to view the result of
        specific day
      </p>
    </div>
  );
}
