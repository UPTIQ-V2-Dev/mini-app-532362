import { dashboardController } from '../../controllers/index.ts';
import auth from '../../middlewares/auth.ts';
import express from 'express';

const router = express.Router();

router.route('/').get(auth(), dashboardController.getDashboard);

export default router;

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard data and analytics
 */

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Get dashboard data including stats and recent activity
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: Dashboard data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 stats:
 *                   type: object
 *                   properties:
 *                     totalUsers:
 *                       type: integer
 *                       example: 2547
 *                     totalRevenue:
 *                       type: integer
 *                       example: 125430
 *                     activeProjects:
 *                       type: integer
 *                       example: 18
 *                     completionRate:
 *                       type: integer
 *                       example: 87
 *                 recentActivity:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "1"
 *                       type:
 *                         type: string
 *                         example: "user"
 *                       title:
 *                         type: string
 *                         example: "New user registered"
 *                       description:
 *                         type: string
 *                         example: "Sarah Johnson joined the platform"
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-11-12T10:00:00Z"
 *                       user:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "Sarah Johnson"
 *                 quickActions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "1"
 *                       title:
 *                         type: string
 *                         example: "Create Project"
 *                       description:
 *                         type: string
 *                         example: "Start a new project"
 *                       icon:
 *                         type: string
 *                         example: "Plus"
 *                       href:
 *                         type: string
 *                         example: "/projects/new"
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 */