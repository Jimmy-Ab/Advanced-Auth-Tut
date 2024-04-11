"use client"

import React from 'react'

import { UserInfo } from '@/components/user-info';
import { useCurrenUser } from '@/hooks/use-current-user';

const ClientPage = () => {

  const user = useCurrenUser();
  return (
    <UserInfo label="📱Client Component" user={user} />
  )
}

export default ClientPage