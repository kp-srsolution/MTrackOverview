// Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from "../Group 1.png";
import { Modal, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SettingsIcon from '@mui/icons-material/Settings';
import week from "../7-days.png"
import month from "../30-days.png"
import today from "../calendar.png"
import year from "../calendar year.png"
import DonutChart from "../components/DonutChart";
import target from "../target.png"

// icons
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import DataSaverOffIcon from '@mui/icons-material/DataSaverOff';

export default function Dashboard() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState([{ "time": "19-08", "value": 35 },
    { "time": "20-08", "value": 41 },
    { "time": "21-08", "value": 27 },
    { "time": "22-08", "value": 19 },
    { "time": "23-08", "value": 45 },
    { "time": "24-08", "value": 46 },
    { "time": "25-08", "value": 23 },
    { "time": "26-08", "value": 26 },
    { "time": "27-08", "value": 33 },
    { "time": "28-08", "value": 19 },
    { "time": "29-08", "value": 50 },
    { "time": "30-08", "value": 32 },
    { "time": "31-08", "value": 44 },
    { "time": "01-09", "value": 42 },
    { "time": "02-09", "value": 47 },
    { "time": "03-09", "value": 22 },
    { "time": "04-09", "value": 39 },
    { "time": "05-09", "value": 31 },
    { "time": "06-09", "value": 20 },
    { "time": "07-09", "value": 48 },
    { "time": "08-09", "value": 28 },
    { "time": "09-09", "value": 49 },
    { "time": "10-09", "value": 36 }]);
    const [weekData, setMonthData] = useState([{ "time": "01-06", "value": 200 },
    { "time": "08-06", "value": 226 },
    { "time": "15-06", "value": 201 },
    { "time": "22-06", "value": 178 },
    { "time": "29-06", "value": 200 },
    { "time": "06-07", "value": 200 },
    { "time": "13-07", "value": 230 },
    { "time": "20-07", "value": 204 },
    { "time": "27-07", "value": 185 },
    { "time": "03-08", "value": 209 },
    { "time": "10-08", "value": 204 },
    { "time": "17-08", "value": 211 },
    { "time": "24-08", "value": 200 },
    { "time": "31-08", "value": 189 },
    { "time": "07-09", "value": 217 }]);
    const [monthData, setWeekData] = useState([{ "time": "SEP 24", "value": 889 },
    { "time": "OCT 24", "value": 621 },
    { "time": "NOV 24", "value": 851 },
    { "time": "DEC 24", "value": 773 },
    { "time": "JAN 25", "value": 1104 },
    { "time": "FEB 25", "value": 583 },
    { "time": "MAR 25", "value": 556 },
    { "time": "APR 25", "value": 685 },
    { "time": "MAY 25", "value": 1064 },
    { "time": "JUN 25", "value": 1167 },
    { "time": "JUL 25", "value": 820 },
    { "time": "AUG 25", "value": 1116 }]);
    const [graphOption, setGraphOption] = useState("days");
    const [dataSet, setDataSet] = useState([97, 2158]);
    const [weekDataSet, setWeekDataSet] = useState([1364, 14798]);
    const [monthDataSet, setMonthDataSet] = useState([3969, 60598]);
    const [donutOption, setDonutOption] = useState("days");
    const [windowWidth, setWindowWidth] = useState(useWindowWidth());

    function useWindowWidth() {
        const [width, setWidth] = useState(window.innerWidth);

        useEffect(() => {
            const handleResize = () => setWidth(window.innerWidth);
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);

        return width;
    }

    const navigate = useNavigate();

    if (loading) return <p>Loading dashboard...</p>;

    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="main-container">
            <div className="user-dashboard-container" style={{
                paddingBottom: "50px"
            }}>
                <nav className="admin-nav-bar" style={{ position: "fixed", left: 0, zIndex: "100" }}>
                    <div className="admin-nav-content-container">
                        <div className="admin-nav-logo-container">
                            <img src={logo} alt="Dashboard" style={{
                                width: "auto",
                                height: "35px",
                                borderRadius: "9px"
                            }} />
                        </div>
                        <div className="admin-nav-option-container">
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", color: "red", cursor: "pointer", fontSize: "18px", fontWeight: "600" }} onClick={() => {
                                localStorage.clear();
                                navigate("/login");
                            }}>LOGOUT <LogoutIcon style={{ marginLeft: "5px", fontSize: "17px", fontWeight: "700" }} /></div>
                        </div>
                    </div>
                </nav>
                <div className="greetings-container">
                    Hello! <br /> <b style={{
                        fontSize: "20px",
                        color: "#264D78",
                        paddingLeft: "5px"
                    }}>Operator</b>
                </div>
                <div className="overview-container">
                    <div className="production-overview">
                        <div className="production-overview-title">Overall Production</div>
                        <div className="production-overview-content"  style={{gap: "20px"}}>
                            <div className="production-overview-tile  opt-tile" style={{
                                gap: "15px"
                            }}>
                                <div className="production-overview-tile-title"><img src={today} alt="" className="title-img" />Today's production</div>
                                <div className="production-overview-tile-value">21<div className="type">(Pallets)</div></div>
                                <div className="production-overview-tile-title production-overview-tile-title-small">
                                    <TrendingUpIcon style={{
                                        fontSize: "18px"
                                    }} />
                                    3.6% From last day
                                </div>
                            </div>
                            <div className="production-overview-tile opt-tile" style={{
                                gap: "15px"
                            }}>
                                <div className="production-overview-tile-title">
                                    <img src={week} alt="" className="title-img" />
                                    This week's production</div>
                                <div className="production-overview-tile-value">151<div className="type">(Pallets)</div></div>
                                <div className="production-overview-tile-title production-overview-tile-title-small">
                                    <TrendingUpIcon style={{
                                        fontSize: "18px"
                                    }} />
                                    1.1% From last week
                                </div>
                            </div>
                            <div className="production-overview-tile  opt-tile" style={{
                                gap: "15px"
                            }}>
                                <div className="production-overview-tile-title"><img src={month} alt="" className="title-img" />This month's production</div>
                                <div className="production-overview-tile-value">621 <div className="type">(Pallets)</div></div>
                                <div className="production-overview-tile-title production-overview-tile-title-small" style={{
                                    color: "red"
                                }}>
                                    <TrendingDownIcon style={{
                                        fontSize: "18px"
                                    }} />
                                    2.3% From last month
                                </div>
                            </div>
                            <div className="production-overview-tile  opt-tile" style={{
                                gap: "15px"
                            }}>
                                <div className="production-overview-tile-title"><img src={year} alt="" className="title-img" />This year's production</div>
                                <div className="production-overview-tile-value">7397<div className="type">(Pallets)</div></div>
                                <div className="production-overview-tile-title production-overview-tile-title-small" style={{ color: "red" }}>
                                    <TrendingDownIcon style={{
                                        fontSize: "18px"
                                    }} />
                                    0.2% From last year
                                </div>
                            </div>
                        </div>
                        {/* <div className="production-overview-content">
                            <div className="production-overview-tile graph-tile opt-graph-tile">
                                <div className="production-overview-tile-title" style={{ marginBottom: "20px", justifyContent: "space-between" }}>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "10px"
                                    }}>
                                        <AutoGraphIcon />
                                        {
                                            graphOption === "days" ? "Day " : graphOption === "weeks" ? "Week " : "Month "
                                        } wise production graph
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>
                                        <select
                                            value={graphOption || "days"}
                                            className="report-download-otipn-select"
                                            onChange={(e) =>
                                                setGraphOption(e.target.value)
                                            }
                                        >
                                            <option value="days">Days</option>
                                            <option value="weeks">Weeks</option>
                                            <option value="months">Months</option>
                                        </select>
                                    </div>
                                </div>
                                <LineChart width={windowWidth * 0.80 < 750 ? windowWidth * 0.80 : 750} height={300} data={
                                    graphOption === "days" ? data : graphOption === "weeks" ? weekData : monthData
                                }>
                                    <XAxis dataKey="time" />
                                    <YAxis />
                                    <Tooltip />
                                    <CartesianGrid stroke="#eee" />
                                    <Line type="monotone"
                                        dataKey="value"
                                        stroke="#264D78"
                                        strokeWidth={2}
                                        dot={true}
                                        isAnimationActive={false} />
                                </LineChart>
                            </div>
                        </div> */}
                        {/* <div className="production-overview-title">Defective (ng) overview</div> */}
                        {/* <div style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "89%",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "10px"
                        }}>
                        <div className="production-overview-content opt-overview-content" style={{
                            gap: "20px"
                        }}>

                            <div className="production-overview-tile  opt-tile">
                                <div className="production-overview-tile-title"><img src={today} alt="" className="title-img" />Today's total defective</div>
                                <div className="production-overview-tile-value">97<div className="type">(Items)</div></div>
                                <div className="production-overview-tile-title production-overview-tile-title-small" style={{ color: "green" }}>
                                    <TrendingDownIcon style={{
                                        fontSize: "18px"
                                    }} />
                                    1.9% From Yesterday
                                </div>
                            </div>
                            <div className="production-overview-tile  opt-tile">
                                <div className="production-overview-tile-title"><img src={week} alt="" className="title-img" />This Week's total defective</div>
                                <div className="production-overview-tile-value">1364 <div className="type">(Items)</div></div>
                                <div className="production-overview-tile-title production-overview-tile-title-small" style={{ color: "red" }}>
                                    <TrendingUpIcon style={{
                                        fontSize: "18px"
                                    }} />
                                    1.6% From last week
                                </div>
                            </div>
                            <div className="production-overview-tile  opt-tile">
                                <div className="production-overview-tile-title"><img src={month} alt="" className="title-img" />This month's total defective</div>
                                <div className="production-overview-tile-value">3969 <div className="type">(Items)</div></div>
                                <div className="production-overview-tile-title production-overview-tile-title-small" style={{ color: "green" }}>
                                    <TrendingDownIcon style={{
                                        fontSize: "18px"
                                    }} />
                                    3.9% From last year
                                </div>
                            </div>
                        </div>
                        <div className="production-overview-content opt-overview-content" style={{
                            width: "auto"
                        }}>
                            <div className="production-overview-tile donut-tile donut-opt-tile">
                                <div className="production-overview-tile-title" style={{ marginBottom: "20px", justifyContent: "space-between" }}>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "10px"
                                    }}>
                                        <DataSaverOffIcon />
                                        {
                                            donutOption === "days" ? "Day " : donutOption === "weeks" ? "Week " : "Month "
                                        } wise production graph
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>
                                        <select
                                            value={donutOption || "days"}
                                            className="report-download-otipn-select"
                                            onChange={(e) =>
                                                setDonutOption(e.target.value)
                                            }
                                        >
                                            <option value="days">Days</option>
                                            <option value="weeks">Weeks</option>
                                            <option value="months">Months</option>
                                        </select>
                                    </div>
                                </div>
                                <DonutChart dataSet={
                                    donutOption === "days" ? dataSet : donutOption === "weeks" ? weekDataSet : monthDataSet
                                } option={donutOption} />
                            </div>
                        </div>
                        </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}