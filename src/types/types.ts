export interface CompanyInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  vatId: string;
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

export interface PaymentDetails {
  bank: string;
  accountNumber: string;
  iban: string;
}

export interface InvoiceData {
  invoiceNumber: string;
  issueDate: string;
  from: CompanyInfo;
  to: CompanyInfo;
  items: LineItem[];
  taxRate: number;
  paymentDetails: PaymentDetails;
  note: string;
  logo?: string;
}

export const defaultInvoiceData: InvoiceData = {
  invoiceNumber: 'INV-01',
  issueDate: new Date().toISOString().split('T')[0],
  from: {
    name: 'Your Company',
    email: 'email@company.com',
    phone: '123-456-7890',
    address: 'Street Address',
    city: 'City, Country',
    vatId: 'VAT ID',
  },
  to: {
    name: 'Client Company',
    email: 'client@company.com',
    phone: '123-456-7890',
    address: 'Client Address',
    city: 'City, Country',
    vatId: 'VAT ID',
  },
  items: [
    {
      id: '1',
      description: 'Product or Service',
      quantity: 1,
      price: 100,
    },
  ],
  taxRate: 10,
  paymentDetails: {
    bank: 'Bank Name',
    accountNumber: '000000000',
    iban: 'IBAN',
  },
  note: '',
};
