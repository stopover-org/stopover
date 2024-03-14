import { graphql, useLazyLoadQuery } from "react-relay";
import { useTranslation } from "react-i18next";
import React from "react";
import { useDocumentTitle } from "lib/hooks/useDocumentTitle";
import Layout from "components/shared/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import { Sheet, Typography } from "@mui/joy";
import Link from "components/v2/Link/Link";
import { scene_RefundTermsQuery } from "artifacts/scene_RefundTermsQuery.graphql";

const RefundTerms = () => {
  const [server, setServer] = React.useState(true);
  const data = useLazyLoadQuery<scene_RefundTermsQuery>(
    graphql`
      query scene_RefundTermsQuery {
        currentUser {
          ...Layout_CurrentUserFragment
        }
      }
    `,
    {}
  );
  const { t } = useTranslation();

  useDocumentTitle(t("general.refundTerms"));

  React.useEffect(() => {
    setServer(false);
  }, []);

  if (server) return null;

  return (
    <Layout currentUserFragment={data.currentUser}>
      <AuthGuard accessible>
        <Sheet sx={{ margin: "0 auto", maxWidth: "1024px" }}>
          <Typography level="h3">Refund terms</Typography>
          <br />
          <Typography>How To Contact Customer Service</Typography>
          <br />
          <Typography>
            Stopover has 24/7 customer support, which is pretty handy when
            you’re traveling and in a pinch. To reach Stopover customer service,
            you can email{" "}
            <Link href="mailto:mikhail@stopoverx.com" primary>
              mikhail@stopoverx.com
            </Link>{" "}
            or sign in to your Stopover account online and chat in the bottom
            right corner.
          </Typography>
          <br />
          <Typography>How To Find Cancellation Policies</Typography>
          <br />
          <Typography>
            Most bookings can be canceled at any time with different
            cancellation terms and penalties before it’s scheduled - but it does
            depend on the booking. Technically, bookings have different
            cancellation policies, so be sure you check your listing before you
            book.
          </Typography>
          <br />
          <Typography>
            Standard: Most bookings fall in this category, meaning you can
            cancel it at any time before the event started (according to the
            local time of the experience) for a full refund. All cancellation
            terms can be found at the every single booking on the trip page
          </Typography>
          <br />
          <Typography>
            To cancel a booking, click the “Trips” button in the top right of
            the home page, then select trip where you can find your booking. ON
            the booking that was not passed yet you can find button “Cancel
            booking“ and follow the prompts. You should receive an email
            confirmation that the cancellation has gone through and a refund is
            being processed.
          </Typography>
          <br />
          <Typography>
            If you have a “non-refundable” booking, you still can cancel the
            booking, but you will not receive any refunds
          </Typography>
          <br />
          <Typography>
            Most events bookings will allow you to save your spot on an
            excursion without having to pay upfront. Stopover will not charge
            any payments automatically. To pay booking you need to press the
            button Pay now for every single booking. Online payments will be
            done via stripe.
          </Typography>
        </Sheet>
      </AuthGuard>
    </Layout>
  );
};

export default React.memo(RefundTerms);
