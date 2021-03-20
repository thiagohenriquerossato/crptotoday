import React, { useState } from  'react'
import Head from 'next/head'
import axios from 'axios'
import ComboBox from 'react-responsive-combo-box'
import 'react-responsive-combo-box/dist/index.css'
import { Container } from '../styles/pages/Home'


const Home = (props) => {
  const cryptos = props.data.data
  let btc = {
    id: 'crypto.id',
    slug: 'crypto.slug',
    symbol: 'crypto.symbol',
    price_usd: 0
  }
  const cryptoNames = cryptos.map(crypto=> {
    if(crypto.slug==='bitcoin'){
      btc={
        id: crypto.id,
        slug: crypto.slug,
        symbol:crypto.symbol,
        price_usd: crypto.metrics.market_data.price_usd.toFixed(2)
     }
    }
    return crypto.slug})

  const [selectedCrypto, setSelectedCrypto] = useState(btc)


  function handleSelectedCrypto(option){
   cryptos.forEach(crypto => {
     if(crypto.slug===option){
       const crpt = {
         id: crypto.id,
         slug: crypto.slug,
         symbol:crypto.symbol,
         price_usd: crypto.metrics.market_data.price_usd.toFixed(2)
      }
      setSelectedCrypto(crpt)
     }
   });
  }
  return (
    <Container>
      <Head>
        <title>Homepage</title>
      </Head>
        <ComboBox
          placeholder={selectedCrypto.slug}
          options={cryptoNames}
          enableAutocomplete
          style={{background:"#121214", color:"#121214"}}
          inputStyles={{background:"#121214", color:"#e1e1e6"}}
          onSelect={(option) => handleSelectedCrypto(option)}
        />
        <p>{selectedCrypto.symbol} 1 = US$ {selectedCrypto.price_usd}</p>
        <h1>Crptotoday</h1>
        <p>Value of all cryptocurrencies</p>
        <h4>Developed by <a href="https://github.com/thiagohenriquerossato/">Thiago Rossato</a></h4>
    </Container>
  )
}
export async function getStaticProps(){
  const {data} = await axios.get("https://data.messari.io/api/v1/assets?limit=500&fields=id,slug,symbol,metrics/market_data/price_usd")
  return {
    props:{
      data
    },
    revalidate: 500
  }
}


export default Home
