import { useState, useEffect } from 'react'
import './App.css'
import { InputBox } from './assets/components/index.js'
import useCurrencyInfo from './hooks/useCurrencyInfo.js'

function App() {
  const [amount, setAmount] = useState(1)
  const [from, setFrom] = useState('gbp')
  const [to, setTo] = useState('jpy')
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }

  useEffect(() => {
    if (currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to]);
    }
  }, [amount, to, currencyInfo]);

  return (
    <>
      <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{backgroundImage: `url("https://images.unsplash.com/photo-1631631480669-535cc43f2327?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`}}>
        <div className='w-full'>
          <div className='w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30'>
            <form onSubmit={(e) => {
              e.preventDefault()
              convert()
            }}>
              <div className='w-full mb-l'>
                <InputBox
                label='from'
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                onAmountChange={(amount) => setAmount(amount)}
                selectedCurrency={from}
                />
              </div>
              <div className='rleative w-full h-0.5'>
                <button className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5'
                  onClick={swap}
                >SWAP</button>
              </div>
              <div className='w-full mb-l'>
                <InputBox
                label='to'
                currencyOptions={options}
                amount={convertedAmount}
                amountDisabled
                onCurrencyChange={(currency) => setTo(currency)}
                selectedCurrency={to}
                />
              </div>
              <button
                type='submit'
                className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5'
              >CONVERT</button>
            </form>
          </div>
        </div>



      </div>
    </>
  )
}

export default App
