'use client'
import AccountSide from '@/components/website/AccountPageComponents/AccountSide'
import { useParams } from 'next/navigation';
import React from 'react'
import OrderSide from '@/components/website/AccountPageComponents/OrderSide';
import RefundSide from '@/components/website/AccountPageComponents/RefundSide';
import PasswordSide from '@/components/website/AccountPageComponents/PasswordSide';
import EarningSide from '@/components/website/AccountPageComponents/EarningSide';
import VoucherSide from '@/components/website/AccountPageComponents/VoucherSide';
import DetailSide from '@/components/website/AccountPageComponents/DetailSide';
import Referral from '@/components/website/AccountPageComponents/Referral';
const page = () => {
  const param = useParams<{ AccSelect?: string; }>();
  const { AccSelect } = param;
  return (
  <div>
    {(AccSelect ==='account')?<AccountSide/> :(AccSelect==='orders')?<OrderSide/>:(AccSelect==='Refunds')?<RefundSide/>:(AccSelect==='vouchers')?<VoucherSide/>:(AccSelect==='earnings')?<EarningSide/>:(AccSelect==='details')?<DetailSide/>:(AccSelect==='Change_Password')?<PasswordSide/>:(AccSelect==='referrals')?<Referral/>:'error'}
        
  </div>
  )
}

export default page