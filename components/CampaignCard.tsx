import React, { useState } from 'react';
import api from '../lib/api';
import useToast from '../hooks/useToast';

type Props = {
  campaign: any;
};

export default function CampaignCard({ campaign }: Props) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState<'paystack' | 'crypto' | 'manual'>('paystack');
  const toast = useToast();

  const donate = async () => {
    try {
      const resp = await api.apiPost(`/api/campaigns/${campaign.id}/donate`, { amount: parseFloat(amount), payment_method: method });
      if (resp.checkout_url) {
        window.location.href = resp.checkout_url;
        return;
      }
      if (resp.payment_address) {
        // show payment address
        toast(`Send crypto to: ${resp.payment_address}`);
        setOpen(false);
        return;
      }
      toast('Donation recorded');
      setOpen(false);
    } catch (err: any) {
      console.error(err);
      toast(err?.message || 'Donation failed');
    }
  };

  const pct = campaign.goal_amount && campaign.goal_amount > 0 ? Math.min(100, Math.round((campaign.raised_amount || 0) / campaign.goal_amount * 100)) : 0;

  return (
    <div style={{ border: '1px solid #ddd', padding: 12, marginBottom: 12 }}>
      <h3>{campaign.title}</h3>
      <div>{campaign.description}</div>
      <div style={{ marginTop: 8 }}>Progress: {campaign.raised_amount} / {campaign.goal_amount} ({pct}%)</div>
      <div style={{ marginTop: 8 }}>
        <button onClick={() => setOpen(true)}>Donate</button>
      </div>

      {open && (
        <div style={{ marginTop: 8, borderTop: '1px solid #eee', paddingTop: 8 }}>
          <div>
            <label>Amount</label>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div>
            <label>Method</label>
            <select value={method} onChange={(e) => setMethod(e.target.value as any)}>
              <option value="paystack">Card (Paystack)</option>
              <option value="crypto">Crypto</option>
              <option value="manual">Manual</option>
            </select>
          </div>
          <div style={{ marginTop: 8 }}>
            <button onClick={donate}>Pay</button>
            <button onClick={() => setOpen(false)} style={{ marginLeft: 8 }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
