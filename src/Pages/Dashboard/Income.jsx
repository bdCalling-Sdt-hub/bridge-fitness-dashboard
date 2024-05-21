import React from 'react'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6'
import { BsArrowUp } from "react-icons/bs";
// import { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const chartData = [
    {
        name: 'Jan',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Feb',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Mar',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Apr',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'May',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Jun',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Jul',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'Aug',
        uv: 3190,
        pv: 4600,
        amt: 2150,
    },
    {
        name: 'Sep',
        uv: 2190,
        pv: 5100,
        amt: 2050,
    },
    {
        name: 'Oct',
        uv: 3240,
        pv: 3940,
        amt: 2247,
    },
    {
        name: 'Oct',
        uv: 3240,
        pv: 3940,
        amt: 2247,
    },
    {
        name: 'Nov',
        uv: 3704,
        pv: 4454,
        amt: 2248,
    },
    {
        name: 'Dec',
        uv: 4353,
        pv: 4675,
        amt: 2134,
    },
];
const data = [
    {
        name: "All Income",
        count: "18.6K",
        icon: <FaArrowUp size={16} />,
        btn: false,
        Percent: '18%',
        Color: "#10B981"
    },
    {
        name: "Subscription Income",
        count: "18.6K",
        icon: <FaArrowUp size={16} />,
        btn: 'View details',
        btnicon: <BsArrowUp style={{
            transform: 'rotate(45deg)'
        }} />,
        Percent: '25%',
        Color: "#10B981"
    },
    {
        name: "Ecommerce Income ",
        count: "20.9k",
        icon: <FaArrowDown size={16} />,
        btn: 'View details',
        btnicon: <BsArrowUp style={{
            transform: 'rotate(45deg)'
        }} />,
        Percent: '7%',
        Color: "#D70000"
    },

]
const Income = () => {
    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'white',
                padding: '0 30px',
                flexWrap: 'wrap'
            }}>
                {
                    data.map((item, index) =>
                        <div className={`${index === (data.length - 1) ? '' : "borderLeft"} income-card`} style={{
                            background: 'transparent',
                            borderRadius: '0px',
                            padding: '70px 0',
                            minWidth: '400px',
                            position: 'relative'
                        }}>

                            <div>
                                <p
                                    style={{
                                        fontSize: "32px",
                                        fontWeight: "600",
                                        color: "#50525D",
                                        textAlign: 'left'
                                    }}
                                >{item.count} </p>
                                <div
                                    style={{
                                        color: `${item?.Color}`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "end",
                                        marginTop: '-15px',
                                        marginRight: '-60px',
                                    }}
                                >
                                    {item?.icon} <p>{item?.Percent}</p>
                                </div>
                                <p
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "400",
                                        color: "#B47000",
                                        textAlign: 'left',
                                        marginTop: '10px'
                                    }}
                                >
                                    {item.name}
                                </p>
                                {
                                    item?.btn && <button style={{
                                        display: 'flex',
                                        justifyContent: 'start',
                                        alignItems: 'center',
                                        gap: '5px',
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#0044B4',
                                        position: 'absolute',
                                        bottom: '27px',
                                        right: '80px'
                                    }}>
                                        {item?.btn}  {item?.btnicon}
                                    </button>
                                }
                            </div>
                        </div>
                    )
                }
            </div>
            <div style={{
                width:'100%',
                height:'600px',
                padding:'20px 0px',
                background:'white',
                marginTop:'20px'
            }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#B47000" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                        <Bar dataKey="uv" fill="#0044B4" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default Income
