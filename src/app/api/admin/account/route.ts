import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import AccountSettings from '@/lib/models/AccountSettings';
import { verifyToken } from '@/lib/auth';

// GET - Get account settings
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    let accountSettings = await AccountSettings.findOne().lean();

    // If no settings exist, return default structure
    if (!accountSettings) {
      accountSettings = {
        companyName: 'Pixel Forge',
        invoiceSettings: {
          prefix: 'PF-INV',
          nextNumber: 1,
          defaultPaymentTerms: 'Net 30',
          defaultCurrency: 'BDT',
        },
        receiptSettings: {
          prefix: 'PF-RCP',
          nextNumber: 1,
        },
      } as any;
    }

    return NextResponse.json({ accountSettings });
  } catch (error) {
    console.error('Error fetching account settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch account settings' },
      { status: 500 }
    );
  }
}

// PUT - Update account settings
export async function PUT(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();

    // Try to find existing settings
    let accountSettings = await AccountSettings.findOne();

    if (!accountSettings) {
      // Create new settings
      accountSettings = new AccountSettings({
        companyName: body.companyName || 'Pixel Forge',
        ...body,
        invoiceSettings: {
          prefix: body.invoiceSettings?.prefix || 'PF-INV',
          nextNumber: body.invoiceSettings?.nextNumber || 1,
          defaultPaymentTerms: body.invoiceSettings?.defaultPaymentTerms || 'Net 30',
          defaultCurrency: body.invoiceSettings?.defaultCurrency || 'BDT',
          ...body.invoiceSettings,
        },
        receiptSettings: {
          prefix: body.receiptSettings?.prefix || 'PF-RCP',
          nextNumber: body.receiptSettings?.nextNumber || 1,
          ...body.receiptSettings,
        },
      });
    } else {
      // Update existing settings
      Object.keys(body).forEach((key) => {
        if (key === 'invoiceSettings' || key === 'receiptSettings' || key === 'taxInfo' || key === 'emailSettings') {
          accountSettings[key] = { ...accountSettings[key], ...body[key] };
        } else if (key === 'bankAccounts') {
          accountSettings.bankAccounts = body[key];
        } else {
          accountSettings[key] = body[key];
        }
      });
    }

    await accountSettings.save();

    return NextResponse.json({
      message: 'Account settings updated successfully',
      accountSettings,
    });
  } catch (error: any) {
    console.error('Error updating account settings:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update account settings' },
      { status: 500 }
    );
  }
}

