import React from 'react';
import {Layout} from 'antd';
import PropTypes from "prop-types";
import Headers from './Header';
const { Footer,Content } = Layout;
const webLayout = ({children}) => {
  return (
    <Layout className="layout">
        <Headers/>
        <Content>
          {children&&children}
        </Content>
        <Footer style={{ textAlign: 'center',backgroundColor:'#ffd8d8'}}>Ant Design ©2023 Created by DP</Footer>
    </Layout>
  );
};

webLayout.propTypes = {
  children: PropTypes.node,
};
export default webLayout;