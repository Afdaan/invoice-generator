'use client';

import { useState } from 'react';
import InvoiceForm from '@/components/InvoiceForm';
import InvoicePreview from '@/components/InvoicePreview';
import { InvoiceData, defaultInvoiceData } from '@/types/types';
import { generatePDF } from '@/utils/generatePDF';

export default function Home() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(defaultInvoiceData);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      await generatePDF('invoice-preview', invoiceData.invoiceNumber);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Form Side */}
        <div className="lg:w-1/2 lg:border-r border-gray-800 overflow-y-auto">
          <div className="sticky top-0 bg-gray-950/80 backdrop-blur-sm border-b border-gray-800 p-4 z-10">
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <svg
                className="w-6 h-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Invoice Generator
            </h1>
          </div>
          <InvoiceForm data={invoiceData} onChange={setInvoiceData} />
        </div>

        {/* Preview Side */}
        <div className="lg:w-1/2 bg-gray-900/50 flex flex-col">
          <div className="sticky top-0 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 p-4 z-10 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">Preview</h2>
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg shadow-blue-500/25"
            >
              {isGenerating ? (
                <>
                  <svg
                    className="w-5 h-5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Generating...
                </>
              ) : (
                <>
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
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download PDF
                </>
              )}
            </button>
          </div>
          <div className="flex-1 p-6 overflow-auto flex justify-center">
            <div className="shadow-2xl rounded-lg overflow-hidden">
              <InvoicePreview data={invoiceData} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
