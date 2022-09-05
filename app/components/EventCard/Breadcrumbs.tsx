import React from "react";
import styled from "styled-components";
import { graphql, useFragment } from "react-relay";
import { Id_Query$data } from "../../pages/events/__generated__/Id_Query.graphql";

const Wrapper = styled.div`
  padding: 0px 0px 15px 0px;
`;
const Path = styled.p`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
`;

type Props = {
  eventReference: Id_Query$data["event"];
};

const Breadcrumbs = ({ eventReference }: Props) => {
  const event = useFragment<any>(
    graphql`
      fragment Breadcrumbs_Fragment on Event {
        interests {
          id
          title
        }
      }
    `,
    eventReference
  );

  return (
    <Wrapper>
      <Path>{`Home > Events > ${event.interests[0].title}`}</Path>
    </Wrapper>
  );
};

export default React.memo(Breadcrumbs);
