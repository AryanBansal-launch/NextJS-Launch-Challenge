//Challenge 1:point 2
import React from 'react';
import { GetServerSideProps } from 'next';

interface Product {
  id: number;
  uid: string;
  brand: string;
  equipment: string;
  randomNum: number; 
}

const ShuffleProducts = ({ product }: { product: Product }) => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Shuffle Product Page</h1> 
      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px', display: 'inline-block' }}>
        <p><strong>ID:</strong> {product.id}</p>
        <p><strong>Brand:</strong> {product.brand}</p>
        <p><strong>Equipment:</strong> {product.equipment}</p>
        <p><strong>Random Number:</strong> {product.randomNum}</p>
      </div>
    </div>
  );
};

export default ShuffleProducts;


export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await fetch('https://random-data-api.com/api/v2/appliances');

    const product = await response.json();

    const randomNum = Math.floor(Math.random() * 1000) + 1;

    return {
      props: {
        product: { ...product, randomNum }, 
      },
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      notFound: true, 
    };
  }
};
