'use client';

import { InvoiceData, LineItem } from '@/types/types';
import { v4 as uuidv4 } from 'uuid';

interface InvoiceFormProps {
  data: InvoiceData;
  onChange: (data: InvoiceData) => void;
}

export default function InvoiceForm({ data, onChange }: InvoiceFormProps) {
  const updateField = <K extends keyof InvoiceData>(
    field: K,
    value: InvoiceData[K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  const updateFromField = (field: keyof InvoiceData['from'], value: string) => {
    onChange({
      ...data,
      from: { ...data.from, [field]: value },
    });
  };

  const updateToField = (field: keyof InvoiceData['to'], value: string) => {
    onChange({
      ...data,
      to: { ...data.to, [field]: value },
    });
  };

  const updatePaymentField = (
    field: keyof InvoiceData['paymentDetails'],
    value: string
  ) => {
    onChange({
      ...data,
      paymentDetails: { ...data.paymentDetails, [field]: value },
    });
  };

  const updateLineItem = (
    id: string,
    field: keyof LineItem,
    value: string | number
  ) => {
    const updatedItems = data.items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange({ ...data, items: updatedItems });
  };

  const addLineItem = () => {
    const newItem: LineItem = {
      id: uuidv4(),
      description: '',
      quantity: 1,
      price: 0,
    };
    onChange({ ...data, items: [...data.items, newItem] });
  };

  const removeLineItem = (id: string) => {
    if (data.items.length > 1) {
      onChange({ ...data, items: data.items.filter((item) => item.id !== id) });
    }
  };

  const inputClass =
    'w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition';
  const labelClass = 'block text-gray-400 text-sm mb-1';
  const sectionClass = 'bg-gray-900/50 rounded-xl p-4 space-y-3';

  return (
    <div className="space-y-6 p-6 overflow-y-auto max-h-screen">
      <h2 className="text-2xl font-bold text-white mb-6">Invoice Details</h2>

      {/* Invoice Info */}
      <div className={sectionClass}>
        <h3 className="text-lg font-semibold text-white mb-3">Invoice Info</h3>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className={labelClass}>Invoice Number</label>
            <input
              type="text"
              value={data.invoiceNumber}
              onChange={(e) => updateField('invoiceNumber', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Issue Date</label>
            <input
              type="date"
              value={data.issueDate}
              onChange={(e) => updateField('issueDate', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Due Date</label>
            <input
              type="date"
              value={data.dueDate}
              onChange={(e) => updateField('dueDate', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* From */}
      <div className={sectionClass}>
        <h3 className="text-lg font-semibold text-white mb-3">From</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Company Name</label>
            <input
              type="text"
              value={data.from.name}
              onChange={(e) => updateFromField('name', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              value={data.from.email}
              onChange={(e) => updateFromField('email', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input
              type="tel"
              value={data.from.phone}
              onChange={(e) => updateFromField('phone', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>VAT ID</label>
            <input
              type="text"
              value={data.from.vatId}
              onChange={(e) => updateFromField('vatId', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Address</label>
            <input
              type="text"
              value={data.from.address}
              onChange={(e) => updateFromField('address', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>City, Country</label>
            <input
              type="text"
              value={data.from.city}
              onChange={(e) => updateFromField('city', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* To */}
      <div className={sectionClass}>
        <h3 className="text-lg font-semibold text-white mb-3">Bill To</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Company Name</label>
            <input
              type="text"
              value={data.to.name}
              onChange={(e) => updateToField('name', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              value={data.to.email}
              onChange={(e) => updateToField('email', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input
              type="tel"
              value={data.to.phone}
              onChange={(e) => updateToField('phone', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>VAT ID</label>
            <input
              type="text"
              value={data.to.vatId}
              onChange={(e) => updateToField('vatId', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Address</label>
            <input
              type="text"
              value={data.to.address}
              onChange={(e) => updateToField('address', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>City, Country</label>
            <input
              type="text"
              value={data.to.city}
              onChange={(e) => updateToField('city', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Line Items */}
      <div className={sectionClass}>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-white">Items</h3>
          <button
            onClick={addLineItem}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1.5 rounded-lg transition flex items-center gap-1"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Item
          </button>
        </div>
        <div className="space-y-3">
          {data.items.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-[1fr_80px_100px_40px] gap-2 items-end"
            >
              <div>
                <label className={labelClass}>Description</label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) =>
                    updateLineItem(item.id, 'description', e.target.value)
                  }
                  placeholder="Item description"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Qty</label>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateLineItem(item.id, 'quantity', parseInt(e.target.value) || 0)
                  }
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Price</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.price}
                  onChange={(e) =>
                    updateLineItem(item.id, 'price', parseFloat(e.target.value) || 0)
                  }
                  className={inputClass}
                />
              </div>
              <button
                onClick={() => removeLineItem(item.id)}
                disabled={data.items.length === 1}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <label className={labelClass}>Tax Rate (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={data.taxRate}
            onChange={(e) =>
              updateField('taxRate', parseFloat(e.target.value) || 0)
            }
            className={`${inputClass} w-24`}
          />
        </div>
      </div>

      {/* Payment Details */}
      <div className={sectionClass}>
        <h3 className="text-lg font-semibold text-white mb-3">Payment Details</h3>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className={labelClass}>Bank</label>
            <input
              type="text"
              value={data.paymentDetails.bank}
              onChange={(e) => updatePaymentField('bank', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Account Number</label>
            <input
              type="text"
              value={data.paymentDetails.accountNumber}
              onChange={(e) => updatePaymentField('accountNumber', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>IBAN</label>
            <input
              type="text"
              value={data.paymentDetails.iban}
              onChange={(e) => updatePaymentField('iban', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Note */}
      <div className={sectionClass}>
        <h3 className="text-lg font-semibold text-white mb-3">Note</h3>
        <textarea
          value={data.note}
          onChange={(e) => updateField('note', e.target.value)}
          placeholder="Thanks for great collaboration"
          rows={3}
          className={inputClass}
        />
      </div>
    </div>
  );
}
