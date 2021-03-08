import React from 'react';
import { Grid, Container } from 'semantic-ui-react';
import Head from 'next/head';
import Header from './Header';

export default props => {
  return (
    <Container text>
        <style>
          {`
          html, body {
            background-color: #252839 !important;
          }
          p {
            align-content: center;
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
      <Grid centered>
        
        {/** body */}
        <Grid.Row>
          {/** header */}
          <Header></Header>
          {/** content */}
        </Grid.Row>
        <Grid.Row>
          {props.children}
        </Grid.Row>

      </Grid>
    </Container>
  );
};
