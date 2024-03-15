import { graphql, useFragment } from "react-relay";
import React from "react";
import { Box, List, ListItem, ListItemContent, Stack } from "@mui/joy";
import { useTranslation } from "react-i18next";
import Typography from "components/v2/Typography";
import { getCurrencyFormat } from "lib/utils/currencyFormatter";
import useStatusColor from "lib/hooks/useStatusColor";
import Tag from "components/v2/Tag";
import useEdges from "lib/hooks/useEdges";
import { Checkout_BookingFragment$key } from "artifacts/Checkout_BookingFragment.graphql";

interface CheckoutProps {
  bookingFragmentRef: Checkout_BookingFragment$key;
}

const StatusTag = ({ status }: { status: string }) => {
  const color = useStatusColor({
    primary: ["processing"],
    success: ["successful"],
    status,
  });

  return (
    <Tag link={false} color={color}>
      {status}
    </Tag>
  );
};

const Checkout = ({ bookingFragmentRef }: CheckoutProps) => {
  const booking = useFragment<Checkout_BookingFragment$key>(
    graphql`
      fragment Checkout_BookingFragment on Booking {
        id
        payments {
          edges {
            node {
              id
              status
              totalPrice {
                cents
                currency {
                  name
                }
              }
            }
          }
        }
        paymentType
      }
    `,
    bookingFragmentRef
  );
  const { t } = useTranslation();
  const payments = useEdges(booking.payments).map((v) => v!);

  return (
    <Box>
      <Typography level="title-lg">
        {t("scenes.attendees.bookings.verifyBookingScene.summary")}
      </Typography>
      <List>
        {payments.map((payment) => (
          <ListItem key={payment.id}>
            <ListItemContent>
              <Stack direction="row" justifyContent="space-between">
                <Typography>
                  {getCurrencyFormat(
                    payment.totalPrice.cents,
                    payment.totalPrice.currency.name
                  )}
                </Typography>
                <Typography>
                  <StatusTag status={t(`statuses.${payment.status}`)} />
                </Typography>
              </Stack>
            </ListItemContent>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default React.memo(Checkout);
