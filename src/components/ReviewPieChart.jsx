import React from 'react';
import { PieChart } from "@mui/x-charts/PieChart";

const ReviewPieChart = ({ reviews_res }) => {
    // Function to calculate total sum of ratings for a single review
    const calculateTotalRating = (review) => {
        const { rating, flexibilityrating, reliabilityrating, interpersonalrating } = review;
        return rating + flexibilityrating + reliabilityrating + interpersonalrating;
    };

    // Prepare data for the PieChart
    const prepareChartData = async () => {
        const seriesData = await Promise.all(reviews_res.map(async (single_review) => {
            const totalRating = calculateTotalRating(single_review);
            return {
                value: (single_review.rating / totalRating) * 100,
                label: `Review ${single_review.id}`,
            };
        }));
        return seriesData;
    };

    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await prepareChartData();
            setData(data);
        };
        fetchData();
    }, [reviews_res]);

    return (
        <PieChart
            data={data}
            label={({ dataEntry }) => `${dataEntry.label}: ${Math.round(dataEntry.value)}%`}
            labelStyle={(index) => ({
                fill: data[index]?.value > 15 ? 'white' : 'black',
                fontSize: '5px',
            })}
            radius={(PieChart.defaultProps && PieChart.defaultProps.radius) || 50}
            labelPosition={65}
            lengthAngle={360}
            animate
            lineWidth={30}
            paddingAngle={5}
            rounded
            startAngle={0}
        />
    );
};

export default ReviewPieChart;
