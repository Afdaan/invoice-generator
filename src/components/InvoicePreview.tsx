'use client';

import { InvoiceData } from '@/types/types';

interface InvoicePreviewProps {
  data: InvoiceData;
}

export default function InvoicePreview({ data }: InvoicePreviewProps) {
  const subtotal = data.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const tax = subtotal * (data.taxRate / 100);
  const total = subtotal + tax;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Inline styles to avoid Tailwind's lab() colors for PDF generation
  const styles = {
    container: {
      backgroundColor: '#1a1a1a',
      color: '#ffffff',
      padding: '32px',
      minHeight: '800px',
      fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
      width: '595px',
    },

    headerRow: {
      display: 'flex',
      gap: '32px',
      marginBottom: '32px',
      fontSize: '14px',
    },
    label: {
      color: '#9ca3af',
    },
    value: {
      color: '#ffffff',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '32px',
      marginBottom: '32px',
    },
    sectionTitle: {
      color: '#9ca3af',
      fontSize: '14px',
      marginBottom: '8px',
    },
    companyInfo: {
      fontSize: '14px',
    },
    companyName: {
      fontWeight: '600',
      color: '#ffffff',
      marginBottom: '4px',
    },
    companyDetail: {
      color: '#d1d5db',
      marginBottom: '4px',
    },
    tableHeader: {
      display: 'grid',
      gridTemplateColumns: '1fr 100px 100px',
      gap: '16px',
      fontSize: '14px',
      color: '#9ca3af',
      marginBottom: '8px',
      borderBottom: '1px solid #374151',
      paddingBottom: '8px',
    },
    tableRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 100px 100px',
      gap: '16px',
      fontSize: '14px',
      padding: '8px 0',
      color: '#ffffff',
    },
    textCenter: {
      textAlign: 'center' as const,
    },
    textRight: {
      textAlign: 'right' as const,
    },
    totalsSection: {
      borderTop: '1px solid #374151',
      paddingTop: '16px',
      marginBottom: '32px',
    },
    totalRow: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '32px',
      fontSize: '14px',
      marginBottom: '8px',
    },
    totalLabel: {
      color: '#9ca3af',
    },
    totalValue: {
      width: '96px',
      textAlign: 'right' as const,
      color: '#ffffff',
    },
    grandTotal: {
      fontSize: '24px',
      fontWeight: 'bold',
      width: '128px',
      textAlign: 'right' as const,
      color: '#ffffff',
    },
    footer: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '32px',
      marginTop: '48px',
    },
  };

  return (
    <div id="invoice-preview" style={styles.container}>


      {/* Invoice Header */}
      <div style={styles.headerRow}>
        <div>
          <span style={styles.label}>Invoice NO: </span>
          <span style={styles.value}>{data.invoiceNumber}</span>
        </div>
        <div>
          <span style={styles.label}>Issue date: </span>
          <span style={styles.value}>{data.issueDate}</span>
        </div>
        <div>
          <span style={styles.label}>Due date: </span>
          <span style={styles.value}>{data.dueDate}</span>
        </div>
      </div>

      {/* From / To */}
      <div style={styles.grid}>
        <div>
          <p style={styles.sectionTitle}>From</p>
          <div style={styles.companyInfo}>
            <p style={styles.companyName}>{data.from.name}</p>
            <p style={styles.companyDetail}>{data.from.email}</p>
            <p style={styles.companyDetail}>{data.from.phone}</p>
            <p style={styles.companyDetail}>{data.from.address}</p>
            <p style={styles.companyDetail}>{data.from.city}</p>
            <p style={styles.companyDetail}>VAT ID: {data.from.vatId}</p>
          </div>
        </div>
        <div>
          <p style={styles.sectionTitle}>To</p>
          <div style={styles.companyInfo}>
            <p style={styles.companyName}>{data.to.name}</p>
            <p style={styles.companyDetail}>{data.to.email}</p>
            <p style={styles.companyDetail}>{data.to.phone}</p>
            <p style={styles.companyDetail}>{data.to.address}</p>
            <p style={styles.companyDetail}>{data.to.city}</p>
            <p style={styles.companyDetail}>VAT ID: {data.to.vatId}</p>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div style={{ marginBottom: '32px' }}>
        <div style={styles.tableHeader}>
          <span>Item</span>
          <span style={styles.textCenter}>Quantity</span>
          <span style={styles.textRight}>Price</span>
        </div>
        {data.items.map((item) => (
          <div key={item.id} style={styles.tableRow}>
            <span>{item.description}</span>
            <span style={styles.textCenter}>{item.quantity}</span>
            <span style={styles.textRight}>{formatCurrency(item.price)}</span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div style={styles.totalsSection}>
        <div style={styles.totalRow}>
          <span style={styles.totalLabel}>Sales tax</span>
          <span style={styles.totalValue}>{formatCurrency(tax)}</span>
        </div>
        <div style={{ ...styles.totalRow, alignItems: 'center' }}>
          <span style={styles.totalLabel}>Total</span>
          <span style={styles.grandTotal}>{formatCurrency(total)}</span>
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <div>
          <p style={styles.sectionTitle}>Payment details</p>
          <div style={{ fontSize: '14px', color: '#ffffff' }}>
            <p style={{ marginBottom: '4px' }}>Bank: {data.paymentDetails.bank}</p>
            <p style={{ marginBottom: '4px' }}>Account number: {data.paymentDetails.accountNumber},</p>
            <p>Iban: {data.paymentDetails.iban},</p>
          </div>
        </div>
        <div>
          <p style={styles.sectionTitle}>Note</p>
          <p style={{ fontSize: '14px', color: '#ffffff' }}>
            {data.note || 'Thanks for great collaboration'}
          </p>
        </div>
      </div>
    </div>
  );
}
