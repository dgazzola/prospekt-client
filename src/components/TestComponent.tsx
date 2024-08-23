'use client'
import React from 'react'
import { ProfileRequest } from '@/api/api'

const TestComponent = () => {
  const [testCall, setTestCall] = React.useState('')

  const api = React.useMemo(() => new ProfileRequest(), []); // Memoize the API instance

  React.useEffect(() => {
    const fetchData = async () => {
      console.log('making fetch call')
      const response = await api.read();
      console.log('response:', response);
      setTestCall(response?.data);
    }

    fetchData();
  }, [api]); // Include `api` in the dependency array

  return (
    <h1>TestComponent</h1>
  )
}

export default TestComponent;