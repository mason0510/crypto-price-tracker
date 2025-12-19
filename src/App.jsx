import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [cryptos, setCryptos] = useState([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(null)

  const fetchCryptoPrices = async () => {
    try {
      setLoading(true)
      // 使用免费的CoinGecko API
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,cardano,solana,polkadot,dogecoin,ripple&vs_currencies=usd,cny&include_24hr_change=true&include_market_cap=true'
      )
      const data = await response.json()

      const cryptoList = [
        { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', icon: '₿' },
        { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', icon: 'Ξ' },
        { id: 'binancecoin', name: 'Binance Coin', symbol: 'BNB', icon: 'B' },
        { id: 'cardano', name: 'Cardano', symbol: 'ADA', icon: 'A' },
        { id: 'solana', name: 'Solana', symbol: 'SOL', icon: 'S' },
        { id: 'polkadot', name: 'Polkadot', symbol: 'DOT', icon: 'D' },
        { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE', icon: 'Ð' },
        { id: 'ripple', name: 'Ripple', symbol: 'XRP', icon: 'X' },
      ]

      const formattedData = cryptoList.map(crypto => ({
        ...crypto,
        price_usd: data[crypto.id].usd,
        price_cny: data[crypto.id].cny,
        change_24h: data[crypto.id].usd_24h_change,
        market_cap: data[crypto.id].usd_market_cap,
      }))

      setCryptos(formattedData)
      setLastUpdate(new Date())
    } catch (error) {
      console.error('Failed to fetch crypto prices:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCryptoPrices()
    // 每30秒自动刷新
    const interval = setInterval(fetchCryptoPrices, 30000)
    return () => clearInterval(interval)
  }, [])

  const formatNumber = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B'
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M'
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K'
    return num.toFixed(2)
  }

  return (
    <div className="App">
      <header className="header">
        <h1>🪙 加密货币价格追踪器</h1>
        <p className="subtitle">实时监控主流加密货币价格 | 数据来源: CoinGecko</p>
        {lastUpdate && (
          <p className="last-update">
            最后更新: {lastUpdate.toLocaleTimeString('zh-CN')}
          </p>
        )}
      </header>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>加载中...</p>
        </div>
      ) : (
        <div className="crypto-grid">
          {cryptos.map(crypto => (
            <div key={crypto.id} className="crypto-card">
              <div className="crypto-header">
                <div className="crypto-icon">{crypto.icon}</div>
                <div className="crypto-info">
                  <h3>{crypto.name}</h3>
                  <span className="crypto-symbol">{crypto.symbol}</span>
                </div>
              </div>

              <div className="crypto-price">
                <div className="price-row">
                  <span className="label">USD:</span>
                  <span className="value">${formatNumber(crypto.price_usd)}</span>
                </div>
                <div className="price-row">
                  <span className="label">CNY:</span>
                  <span className="value">¥{formatNumber(crypto.price_cny)}</span>
                </div>
              </div>

              <div className="crypto-stats">
                <div className={`change ${crypto.change_24h >= 0 ? 'positive' : 'negative'}`}>
                  24h: {crypto.change_24h >= 0 ? '+' : ''}{crypto.change_24h.toFixed(2)}%
                </div>
                <div className="market-cap">
                  市值: ${formatNumber(crypto.market_cap)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <footer className="footer">
        <p>🚀 使用 GitHub Pages 免费托管 | 数据更新间隔: 30秒</p>
        <p className="tech-stack">
          React + Vite + CoinGecko API
        </p>
      </footer>
    </div>
  )
}

export default App
