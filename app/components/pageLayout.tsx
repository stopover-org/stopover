import React, {ReactNode} from 'react'
import styled from "styled-components";

const SWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding-bottom: 100px;
`

const SFooter = styled.footer`
  width: 100%;
  height: 100pox;
  background-color: red;
`

export const PageLayout = ({ children }: { children: ReactNode[] | ReactNode }) => {
  return (
    <SWrapper>
      {children}
      <SFooter />
    </SWrapper>
  )
}