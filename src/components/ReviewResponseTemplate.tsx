import React, { useState } from 'react';
import { MessageSquare, Copy, CheckCircle } from 'lucide-react';

interface ReviewResponseData {
  customerName: string;
  specificConcern: string;
  actionTaken: string;
}

export function ReviewResponseTemplate() {
  const [formData, setFormData] = useState<ReviewResponseData>({
    customerName: '',
    specificConcern: '',
    actionTaken: ''
  });
  const [copied, setCopied] = useState(false);

  const generateResponse = () => {
    const { customerName, specificConcern, actionTaken } = formData;
    
    return `Dear ${customerName || '[Customer Name]'},

Thank you for taking the time to share your feedback with us - your experience matters greatly to our team at Asset Growth Associates. We sincerely regret that ${specificConcern || '[specific concern/issue]'} fell short of the high standards we strive to maintain for every client. ${actionTaken || '[Specific action being taken]'} to ensure this doesn't happen again and to improve our service delivery. Please don't hesitate to contact our customer service team directly at [phone number] or [email] so we can discuss your experience further and make things right. We would welcome the opportunity to serve you better in the future and restore your confidence in our financial services.

Best regards,
Asset Growth Associates Team`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateResponse());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleInputChange = (field: keyof ReviewResponseData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <MessageSquare className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">
            Professional Review Response Generator
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Customize Your Response
            </h2>
            
            <div>
              <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
                Customer Name
              </label>
              <input
                type="text"
                id="customerName"
                value={formData.customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., John Smith"
              />
            </div>

            <div>
              <label htmlFor="specificConcern" className="block text-sm font-medium text-gray-700 mb-2">
                Specific Concern/Issue
              </label>
              <textarea
                id="specificConcern"
                value={formData.specificConcern}
                onChange={(e) => handleInputChange('specificConcern', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., our response time to your inquiry, the clarity of our fee structure, the scheduling of your appointment"
              />
            </div>

            <div>
              <label htmlFor="actionTaken" className="block text-sm font-medium text-gray-700 mb-2">
                Action Being Taken
              </label>
              <textarea
                id="actionTaken"
                value={formData.actionTaken}
                onChange={(e) => handleInputChange('actionTaken', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., We are implementing additional staff training, We have revised our communication protocols, We are reviewing our fee disclosure process"
              />
            </div>
          </div>

          {/* Generated Response */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                Generated Response
              </h2>
              <button
                onClick={copyToClipboard}
                className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Response
                  </>
                )}
              </button>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300 min-h-[300px]">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
                {generateResponse()}
              </pre>
            </div>
          </div>
        </div>

        {/* Guidelines */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Response Guidelines
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Always thank the customer for their feedback</li>
            <li>• Acknowledge their specific concerns without making excuses</li>
            <li>• Express genuine regret for any disappointment</li>
            <li>• Explain concrete actions being taken to address the issue</li>
            <li>• Provide direct contact information for further assistance</li>
            <li>• Maintain a professional and empathetic tone</li>
            <li>• End with an invitation to return and give you another chance</li>
          </ul>
        </div>
      </div>
    </div>
  );
}