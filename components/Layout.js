import React from 'react';
import { Grid, Container } from 'semantic-ui-react';
import Head from 'next/head';
import Header from './Header';

export default (props) => {
  return (
    <div className='layout'>
        <style>
          {`
          html, body {
            background-color: #252839 !important;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            height:100%;
          }
          p {
            align-content: left;
            background-color: #495285;
            color: #fff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            min-height: 6em;
          }
          p > span {
            opacity: 0.4;
            text-align: center;
          }
        }
        `}
      </style>
      <Head>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
        />
      </Head>
      {/** header */}
      <div style={{width: '100%', height: '55px'}}>
        <Header></Header>
      </div>
      
      <div style={{width: '910px', margin: '50px auto'}}>
        {props.children}
      </div>
    </div>
  );
};
