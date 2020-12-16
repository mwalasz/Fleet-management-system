import { Grid } from '@material-ui/core';
import {
    PieChart,
    Pie,
    Tooltip,
    Cell,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from 'recharts';
import { CHART_WIDTH, REDUCED_CHART_WIDTH } from './constans';
import ChartTitle from './ChartTitle';

const PieChartGridItem = ({ children, title, reducedSize }) => (
    <Grid item>
        <ChartTitle>{`${title}:`}</ChartTitle>
        <PieChart
            width={reducedSize ? REDUCED_CHART_WIDTH : CHART_WIDTH}
            height={250}
        >
            {children}
            <Tooltip />
            <Legend />
        </PieChart>
    </Grid>
);

export default PieChartGridItem;
