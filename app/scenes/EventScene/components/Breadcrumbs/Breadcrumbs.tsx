import {graphql, useFragment} from "react-relay";
import Typography from "../../../../components/Typography";
import Row from "../../../../components/Row";
import { Breadcrumbs_Event$key } from "./__generated__/Breadcrumbs_Event.graphql";

export function Breadcrumbs({ eventFragmentRef }: { eventFragmentRef: Breadcrumbs_Event$key }) {
  const event = useFragment(graphql`
    fragment Breadcrumbs_Event on Event {
      interests {
        id
        title
      }
    }
  `, eventFragmentRef)

    return (
      <Row>
        {event.interests?.map((interest, index) => (
          <Typography key={interest.id} color="textSecondary">
            {index > 0 && '>'} {interest.title}
          </Typography>
        ))}
      </Row>
    )
}
