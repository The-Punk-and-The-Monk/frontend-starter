/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-25 09:22:13
 * @LastEditTime: 2020-07-25 09:28:57
 * @FilePath: /webpack-react-scaffolding/template/style.jsx
 * @Description: 
 */ 
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const HomeWrapper = styled.div`
  overflow: hidden;
  width: 960px;
  margin: 0 auto;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
`
