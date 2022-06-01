import {withRelay} from "relay-nextjs";
import {createServerEnvironment, getClientEnvironment} from "../../lib/environment";
import {graphql} from "relay-runtime";
import {usePreloadedQuery} from "react-relay";

const EventQuery = graphql`
    query Id_Query($id: Int!) {
        events(id: $id) {
            id
        }   
    }
`;

// @ts-ignore
export const Event = ({ preloadedQuery }) => {
  const query = usePreloadedQuery(EventQuery, preloadedQuery);

  return (
    <div>
      EVENT
    </div>
  )
}

const Loading = () => {
  return <div>Loading...</div>;
}

export default withRelay(Event, EventQuery, {
  fallback: <Loading />,
  createClientEnvironment: () => getClientEnvironment()!,
  serverSideProps: async (ctx) => {
    return {}
  },
  createServerEnvironment: async (ctx, props) => {
    return createServerEnvironment()
  }
})