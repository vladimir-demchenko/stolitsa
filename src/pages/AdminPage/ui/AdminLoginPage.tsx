import { Flex, Layout } from 'antd'
import { AdminLogin } from 'features/AdminLogin/ui/AdminLogin'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { api } from 'shared/api/api'

export const AdminLoginPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.clear();
    dispatch(api.util.resetApiState());
  }, [])

  return (
    <Flex style={{ gridColumn: 'content', padding: 40 }} justify='center' align='center'>
      <AdminLogin />
    </Flex>
  )
}