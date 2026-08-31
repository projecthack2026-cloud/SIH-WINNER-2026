import React from 'react';
import { AppShell } from '../../components/dashboard/AppShell';
import { AccessDenied } from '../../components/dashboard/AccessDenied';

export const AccessDeniedPage: React.FC = () => {
  return (
    <AppShell>
      <AccessDenied />
    </AppShell>
  );
};
