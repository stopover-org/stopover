import { graphql, useFragment } from "react-relay";
import Typography from "../../../../components/v1/Typography";
import Row from "../../../../components/Layout/Row";
import { Breadcrumbs_Event$key } from "./__generated__/Breadcrumbs_Event.graphql";

export const Breadcrumbs = ({
  eventFragmentRef,
}: {
  eventFragmentRef: Breadcrumbs_Event$key;
}) => {
  const event = useFragment(
    graphql`
      fragment Breadcrumbs_Event on Event {
        interests {
          id
          title
        }
      }
    `,
    eventFragmentRef
  );

  return (
    <Row>
      {event.interests?.map((interest, index) => (
        <Typography key={interest.id} color="textSecondary" size="20px">
          {index > 0 && <>&nbsp;&gt;&nbsp;</>} {interest.title}
        </Typography>
      ))}
    </Row>
  );
};
