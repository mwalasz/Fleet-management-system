import { Grid } from '@material-ui/core';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import { CHART_WIDTH, REDUCED_CHART_WIDTH } from './constans';
import ChartTitle from './ChartTitle';

const PieChartGridItem = ({ title, reducedSize, data, label, colors }) => (
    <Grid item>
        <ChartTitle>{`${title}:`}</ChartTitle>
        <PieChart
            width={reducedSize ? REDUCED_CHART_WIDTH : CHART_WIDTH}
            height={250}
        >
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={reducedSize ? 60 : 80}
                label={label}
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    </Grid>
);

export default PieChartGridItem;
