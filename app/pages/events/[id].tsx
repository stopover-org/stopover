import {withRelay} from "relay-nextjs";
import {createServerEnvironment, getClientEnvironment} from "../../lib/environment";
import {graphql} from "relay-runtime";

const ProfileQuery = graphql``;

export const Event = () => {
  return (
    <div>
      EVENT
    </div>
  )
}

const Loading = () => {
  return <div>Loading...</div>;
}

export default withRelay(Event, ProfileQuery, {
  fallback: <Loading />,
  createClientEnvironment: () => getClientEnvironment()!,
  serverSideProps: async (ctx) => {
    return {}
  },
  createServerEnvironment: async (ctx, props) => {
    return createServerEnvironment()
  }
})