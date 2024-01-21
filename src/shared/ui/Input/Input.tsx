import { Input as AInput, ConfigProvider } from 'antd'
import InputMask from 'react-input-mask';


export const Input = (props: any) => {
  const {
    mask,
    ...restProps
  } = props;

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'unbounded',
          borderRadius: 20,
          colorPrimaryHover: '#701487',
          colorPrimaryActive: '#701487',
          colorPrimary: '#701487'
        },
        components: {
          Input: {
            paddingBlock: 10,
            paddingInline: 26,
            activeBorderColor: '#701487',
            hoverBorderColor: '#701487'
          }
        }
      }}
    >
      <AInput {...restProps} />
    </ConfigProvider>
  )
}

Input.Textarea = (props: any) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'unbounded',
          borderRadius: 20,
          colorPrimaryHover: '#701487',
          colorPrimaryActive: '#701487',
          colorPrimary: '#701487'
        },
        components: {
          Input: {
            paddingBlock: 10,
            paddingInline: 26,
            activeBorderColor: '#701487',
            hoverBorderColor: '#701487'
          }
        }
      }}
    >
      <AInput.TextArea {...props} />
    </ConfigProvider>
  )
};