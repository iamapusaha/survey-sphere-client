
import { PieChart, Pie, Cell, } from 'recharts';
// import PropTypes from 'prop-types';

import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import { useEffect } from "react";

const SurveyResponse = () => {
    const { id } = useParams();

    const [survey, setSurvey] = useState([])
    const { title, yes, no, votes, totalVote } = survey;
    console.log(survey);
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        axiosSecure.get(`/survey/${id}`)
            .then(res => {

                setSurvey(res.data)
            })
    }, [axiosSecure, id])
    let totalVotes = totalVote;
    let yesVotes = yes;
    let noVotes = no;
    let yesPercent = (yesVotes / totalVotes) * 100;
    let noPercent = (noVotes / totalVotes) * 100;
    const data = [
        { name: 'Group A', value: yesPercent },
        { name: 'Group B', value: noPercent },
    ];
    const COLORS = ['#00C49F', '#FF444A'];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

        const x = cx + radius * Math.cos(-midAngle * RADIAN);

        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    return (
        <div className="my-6">
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Voter Name</th>
                            <th>Email</th>
                            <th>Time</th>
                            <th>Vote</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            votes?.map((vote, idx) => <tr key={vote.gmail} className="bg-base-200">
                                <th>{idx + 1}</th>
                                <td>{vote.user}</td>
                                <td>{vote.email}</td>
                                <td>{vote.timestamp}</td>
                                <td>{vote.option}</td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
            <div>

                <PieChart width={400} height={400}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
                <div className='container mx-auto flex justify-center'>
                    <div className=' flex gap-14 md:flex-row flex-col'>
                        <div className='flex items-center gap-4'>
                            <h3 className='text-lg font-semibold'>Yes Vote:</h3>
                            <progress className="progress progress-secondary w-24" value={yesPercent} max="100"></progress>
                        </div>
                        <div className='flex items-center gap-4'>
                            <h3 className='text-lg font-semibold'>No Vote:</h3>
                            <progress className="progress progress-primary w-24" value={noPercent} max="100"></progress>
                        </div>
                    </div >
                </div>

            </div>
        </div>
    );
};

SurveyResponse.propTypes = {

};

export default SurveyResponse;