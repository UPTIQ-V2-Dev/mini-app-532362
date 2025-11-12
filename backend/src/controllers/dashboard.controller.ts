import { dashboardService } from '../services/index.ts';
import catchAsyncWithAuth from '../utils/catchAsyncWithAuth.ts';

const getDashboard = catchAsyncWithAuth(async (req, res) => {
    const dashboardData = await dashboardService.getDashboardData();
    res.send(dashboardData);
});

export default {
    getDashboard
};