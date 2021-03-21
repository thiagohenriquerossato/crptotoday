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
        <title>Crypto today</title>
      </Head>
      <h1>Crptotoday</h1>
        <p style={{marginTop:8, fontSize:16}}>Value of all cryptocurrencies</p>
        <ComboBox
          placeholder={selectedCrypto.slug}
          options={cryptoNames}
          enableAutocomplete
          style={{background:"#121214", color:"#121214", marginTop:24}}
          inputStyles={{background:"#121214", color:"#e1e1e6"}}
          onSelect={(option) => handleSelectedCrypto(option)}
        />
        <p>{selectedCrypto.symbol} 1 = US$ {selectedCrypto.price_usd}</p>
        <h4 style={{marginTop:24, fontSize:12}}>Developed by <a href="https://github.com/thiagohenriquerossato/">Thiago Rossato</a></h4>
    </Container>
  )
}
export async function getStaticProps(){
  console.log("buscando na api")
  const {data} = await axios.get("https://data.messari.io/api/v1/assets?limit=500&fields=id,slug,symbol,metrics/market_data/price_usd")
  return {
    props:{
      data
    },
    revalidate: 500
  }
}


export default Home
