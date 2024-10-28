import "./App.css";
import React, { useState } from "react";
import Select from "react-select";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  SearchBar,
  BasketballScoreRoute,
  BaseballScoreRoute,
  SoccerScoreRoute,
  Home,
  Login_page,
} from "./function";
import { UseBasketballResult } from "./basketball_api";
import { UseBaseballResult } from "./baseball_api";
import { UseSoccerResult } from "./soccer_api";
import moment from "moment";
import { Button, Stack } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./image/Logo.jpg";
import all from "./image/all.jpg";


function App() {
  const [searchdate, setSearchDate] = useState(
    moment().utcOffset("-10:00").format("YYYY-MM-DD")
  );
  const [user, setuser] = useState("");
  const { loading_Result, basketball, error_Result } =
    UseBasketballResult(searchdate);

  const { baseball, Baseball_time } = UseBaseballResult(searchdate);
  // const baseball = baseball_data(baseball_response);
  const { loading_soccer, soccer, soccer_time, error } = UseSoccerResult(searchdate.replaceAll('-','')); //date type 20230425
  // const soccer = soccer_data(soccer_resonse);
  // !!!!!!! add loading_soccer into if condition
  if (loading_Result||loading_soccer) {
    return <p> loading Data </p>;
  }

  if (error_Result) {
    return (
      <p>Something went Wrong when loading result: {error_Result.message}</p>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div className="Subpage">
          <Stack direction="horizontal" gap={3}>
            <div className="NBA">
              <Link to="">
                <img src={logo} alt="Logo" width={150} height={100} />
              </Link>
              <Link to="/Basketball_Result">
                <Button variant="danger" className="Basketball">
                  Basketball
                </Button>
              </Link>
            </div>
            <div className="baseball">
              <Link to="/Baseball_Result">
                <Button variant="secondary" className="Baseball">
                  Baseball
                </Button>
              </Link>
            </div>
            <div className="soccer">
              <Link to="/Soccer_Result">
                <Button variant="success" className="Soccer">
                  Soccer
                </Button>
              </Link>
            </div>
            <div className="SearchBarForDate ms-auto">
              <SearchBar
                class="Search_button"
                placeholder="YYYY-MM-DD"
                onSubmit={setSearchDate}
              />
            </div>
            <div className="Login">
              <Link to="/Login_info">
                <Button variant="dark" className="Login">
                  Login
                </Button>
              </Link>
            </div>
          </Stack>
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/Login_info/Home" element={<Home />} />
            <Route
              path="/Basketball_Result"
              element={<BasketballScoreRoute basketball={basketball} />}
            />
            <Route
              path="/Baseball_Result"
              element={<BaseballScoreRoute baseball={baseball} />}
            />
            <Route
              path="Soccer_Result"
              element={<SoccerScoreRoute soccer={soccer} />}
            />
            <Route path="Login_info" element={<Login_page />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
