import Head from 'next/head';

import { Header } from '../src/components/Header';
import { ProductDisplay } from '../src/components/ProductDisplay';
import { ShoppingCart } from '../src/components/ShoppingCart';

import { ShoppingCartProvider } from '../src/context/ShoppingCartContext';

export default function Home() {
  return (
    <main>
      <Head>
        <title>Consume IT | All Sorted!</title>
        <link rel="icon" href="/favicon.ico" />
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;600&display=swap');
        </style> 
      </Head>
      <Header />
      <ShoppingCartProvider>
          <ProductDisplay/>
          <ShoppingCart/>
      </ShoppingCartProvider>
    </main>
  )
}
