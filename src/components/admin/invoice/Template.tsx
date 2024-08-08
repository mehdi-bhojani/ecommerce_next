import React from "react";

interface InvoiceItem {
  name: string;
  description: string;
  quantity: number;
  unitCost: number;
  total: number;
} ;

interface InvoiceDetails {
  orderNumber: string; // Allow undefined
  date: string;
  tax: number;
  paymentMethod: string;
  transactionId?: string;
  discount: number;
}

interface CompanyInfo {
    name: string;
    address: string; // Allow undefined
    city: string;    // Allow undefined
    country: string; // Allow undefined
    email: string;   // Allow undefined
    phone: string;   // Allow undefined
}

interface InvoiceProps {
  from: CompanyInfo;
  to: CompanyInfo;
  details: InvoiceDetails;
  items: InvoiceItem[];
  additionalNotes?: string;
}

const Invoice: React.FC<InvoiceProps> = ({
  from,
  to,
  details,
  items,
  additionalNotes,
}) => {
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const discount = subtotal * details.discount/100;
  const tax = (subtotal - discount) * details.tax/100; 
  const total = subtotal - discount + tax;

  return (
    <div className="max-w-4xl mx-auto bg-white page-break">
      <div className="bg-gray-100 p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold">
          Order <strong>#{details.orderNumber}</strong>
        </h2>
      </div>
      <div className="p-6">
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"> */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* <CompanyInfoBlock title="From:" info={from} /> */}
          <CompanyInfoBlock title="To:" info={to} />
          <InvoiceDetailsBlock details={details} />
        </div>
        <table className="w-full mb-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">#</th>
              <th className="p-2 text-left">Item</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-center">Quantity</th>
              <th className="p-2 text-right">Unit Cost</th>
              <th className="p-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index+1} className="border-b">
                <td className="qw a
                2">{index+1}</td>
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.description}</td>
                <td className="p-2 text-center">{item.quantity}</td>
                <td className="p-2 text-right">${item.unitCost.toFixed(2)}</td>
                <td className="p-2 text-right">${item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-row justify-between">
          <div className="w-1/2 mb-4 md:mb-0">
            <p>{additionalNotes}</p>
          </div>
          <div className="w-1/2">
            <table className="w-full">
              <tr>
                <td className="p-2">
                  <strong>Subtotal</strong>
                </td>
                <td className="p-2 text-right">${subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="p-2">
                  <strong>Discount ({details.discount}%)</strong>
                </td>
                <td className="p-2 text-right">${discount.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="p-2">
                  <strong>Tax ({details.tax}%)</strong>
                </td>
                <td className="p-2 text-right">${tax.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="p-2">
                  <strong>Total</strong>
                </td>
                <td className="p-2 text-right">
                  <strong>${total.toFixed(2)}</strong>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const CompanyInfoBlock: React.FC<{ title: string; info: CompanyInfo }> = ({
  title,
  info,
}) => (
  <div>
    <h3 className="font-bold mb-2">{title}</h3>
    <p>
      <strong>{info.name}</strong>
      <br />
      {info.address}
      <br />
      {info.city}, {info.country}
      <br />
      Email: {info.email}
      <br />
      Phone: {info.phone}
    </p>
  </div>
);

const InvoiceDetailsBlock: React.FC<{ details: InvoiceDetails }> = ({
  details,
}) => (
  <div>
    <h3 className="font-bold mb-2">Details:</h3>
    <p>
      Order <strong>#{details.orderNumber}</strong>
      <br />
      {details.date}
      <br />
      Payment Method: {details.paymentMethod}
      <br />
      {
        details.transactionId && // Only show if transactionId is present
          (<span>Transaction Id: {details.transactionId}</span>)
      }
    </p>
  </div>
);

export default Invoice;
