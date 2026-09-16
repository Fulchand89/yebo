import { useState } from 'react';

const dummyPolicy = {
  id: '1',
  title: 'Standard Policy',
  content: '<p>Standard policy terms and conditions.</p>',
  updatedAt: new Date().toISOString(),
  version: '1.0'
};

export function useTermsConditions() {
  const [data] = useState([dummyPolicy]);
  const [isLoading] = useState(false);
  return { data, isLoading, refetch: () => {} };
}

export function useSupportContact() {
  const [data] = useState({ phone: '+91 9876543210', email: 'support@knowchamp.com' });
  const [isLoading] = useState(false);
  return { data, isLoading, refetch: () => {} };
}

export function useRefundPolicies() {
  const [data] = useState([dummyPolicy]);
  const [isLoading] = useState(false);
  return { data, isLoading, refetch: () => {} };
}

export function usePrivacyPolicies() {
  const [data] = useState([dummyPolicy]);
  const [isLoading] = useState(false);
  return { data, isLoading, refetch: () => {} };
}
