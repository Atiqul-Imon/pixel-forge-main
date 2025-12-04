import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/lib/models/Lead';
import Deal from '@/lib/models/Deal';
import Activity from '@/lib/models/Activity';
import { verifyToken } from '@/lib/auth';

// GET - Get CRM statistics
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // Get date range (default: last 30 days)
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Lead Statistics
    const totalLeads = await Lead.countDocuments();
    const newLeads = await Lead.countDocuments({ status: 'new' });
    const contactedLeads = await Lead.countDocuments({ status: 'contacted' });
    const qualifiedLeads = await Lead.countDocuments({ status: 'qualified' });
    const wonLeads = await Lead.countDocuments({ status: 'won' });
    const lostLeads = await Lead.countDocuments({ status: 'lost' });

    // Leads by source
    const leadsBySource = await Lead.aggregate([
      {
        $group: {
          _id: '$source',
          count: { $sum: 1 },
        },
      },
    ]);

    // Leads by service
    const leadsByService = await Lead.aggregate([
      {
        $group: {
          _id: '$service',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    // Recent leads (last 30 days)
    const recentLeads = await Lead.countDocuments({
      createdAt: { $gte: startDate },
    });

    // Facebook Pixel leads
    const facebookLeads = await Lead.countDocuments({
      pixelId: { $exists: true, $ne: null },
    });

    // Deal Statistics
    const totalDeals = await Deal.countDocuments();
    const openDeals = await Deal.countDocuments({
      stage: { $nin: ['closed-won', 'closed-lost'] },
    });
    const wonDeals = await Deal.countDocuments({ stage: 'closed-won' });
    const lostDeals = await Deal.countDocuments({ stage: 'closed-lost' });

    // Deal value statistics
    const dealValueStats = await Deal.aggregate([
      {
        $group: {
          _id: null,
          totalValue: { $sum: '$value' },
          avgValue: { $avg: '$value' },
          maxValue: { $max: '$value' },
        },
      },
    ]);

    const totalDealValue = dealValueStats[0]?.totalValue || 0;
    const avgDealValue = dealValueStats[0]?.avgValue || 0;

    // Activity Statistics
    const totalActivities = await Activity.countDocuments();
    const recentActivities = await Activity.countDocuments({
      date: { $gte: startDate },
    });

    const activitiesByType = await Activity.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
        },
      },
    ]);

    // Conversion rates
    const conversionRate = totalLeads > 0 ? (wonLeads / totalLeads) * 100 : 0;
    const dealConversionRate = totalDeals > 0 ? (wonDeals / totalDeals) * 100 : 0;

    // Average lead score
    const avgLeadScore = await Lead.aggregate([
      {
        $group: {
          _id: null,
          avgScore: { $avg: '$leadScore' },
        },
      },
    ]);

    return NextResponse.json({
      leads: {
        total: totalLeads,
        new: newLeads,
        contacted: contactedLeads,
        qualified: qualifiedLeads,
        won: wonLeads,
        lost: lostLeads,
        recent: recentLeads,
        facebookPixel: facebookLeads,
        bySource: leadsBySource,
        byService: leadsByService,
        conversionRate: conversionRate.toFixed(2),
        avgLeadScore: avgLeadScore[0]?.avgScore?.toFixed(1) || '0',
      },
      deals: {
        total: totalDeals,
        open: openDeals,
        won: wonDeals,
        lost: lostDeals,
        totalValue: totalDealValue,
        avgValue: avgDealValue.toFixed(2),
        conversionRate: dealConversionRate.toFixed(2),
      },
      activities: {
        total: totalActivities,
        recent: recentActivities,
        byType: activitiesByType,
      },
      period: {
        days,
        startDate: startDate.toISOString(),
        endDate: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error fetching CRM stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

