import { graphql, useFragment } from "react-relay";
import {
  Dropdown,
  Grid,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  Stack,
  Tooltip,
} from "@mui/joy";
import { MoreVert } from "@mui/icons-material";
import React from "react";
import Link from "components/v2/Link/Link";
import Button from "components/v2/Button/Button";
import RescheduleEvent from "components/shared/RescheduleEvent/RescheduleEvent";
import PublishEvent from "components/shared/PublishEvent/PublishEvent";
import UnpublishEvent from "components/shared/UnpublishEvent/UnpublishEvent";
import RemoveEvent from "components/shared/RemoveEvent/RemoveEvent";
import VerifyEvent from "components/shared/VerifyEvent/VerifyEvent";
import SyncStripe from "components/shared/SyncStripe/SyncStripe";
import { FirmEventActions_EventFragment$key } from "artifacts/FirmEventActions_EventFragment.graphql";
import { FirmEventActions_UserFragment$key } from "artifacts/FirmEventActions_UserFragment.graphql";
import { useTranslation } from "react-i18next";
import EditSeoMetadata from "components/shared/forms/EditSeoMetadata";

interface FirmEventActionsProps {
  eventFragmentRef: FirmEventActions_EventFragment$key;
  currentUserFragmentRef: FirmEventActions_UserFragment$key;
}

const FirmEventActions = ({
  eventFragmentRef,
  currentUserFragmentRef,
}: FirmEventActionsProps) => {
  const event = useFragment<FirmEventActions_EventFragment$key>(
    graphql`
      fragment FirmEventActions_EventFragment on Event {
        ...VerifyEventInformation_EventFragment
        ...PublishEvent_EventFragment
        ...UnpublishEvent_EventFragment
        ...RemoveEvent_EventFragment
        ...RescheduleEvent_EventFragment
        ...SyncStripe_EventFragment
        status
        id
        firm {
          status
          paymentTypes
        }
        seoMetadatum {
          ...EditSeoMetadata_MetadataFragment
        }
      }
    `,
    eventFragmentRef
  );

  const currentUser = useFragment<FirmEventActions_UserFragment$key>(
    graphql`
      fragment FirmEventActions_UserFragment on User {
        serviceUser
      }
    `,
    currentUserFragmentRef
  );
  const { t } = useTranslation();
  const canEdit = React.useMemo(() => event.status !== "removed", [event]);
  const canReschedule = React.useMemo(
    () =>
      currentUser.serviceUser &&
      event.status === "published" &&
      event.firm.status === "active",
    [event, currentUser]
  );

  const canPublish = React.useMemo(
    () => event.status === "unpublished" && event.firm.status === "active",
    [event]
  );

  const canArchive = React.useMemo(
    () => event.status === "published" && event.firm.status === "active",
    [event]
  );
  const canRemove = React.useMemo(() => event.status !== "removed", [event]);
  const canVerify = React.useMemo(
    () =>
      currentUser.serviceUser &&
      event.status === "draft" &&
      event.firm.status === "active",
    [event, currentUser]
  );

  const canSync = React.useMemo(
    () =>
      currentUser.serviceUser &&
      ["published", "unpublished"].includes(event.status) &&
      event.firm.status === "active" &&
      event.firm.paymentTypes.includes("stripe"),
    [event, currentUser]
  );

  return (
    <Grid lg={4} md={4} sm={12} xs={12}>
      <Stack
        direction="row"
        justifyContent={{
          lg: "flex-end",
          md: "flex-end",
          sm: "flex-start",
          xs: "flex-start",
        }}
        flexWrap="wrap"
        useFlexGap
        spacing={1}
      >
        {canEdit && (
          <Link href={`/my-firm/events/${event.id}/edit`} underline={false}>
            <Button size="sm" variant="plain">
              {t("general.edit")}
            </Button>
          </Link>
        )}
        <Dropdown>
          <Tooltip title={t("general.additional")}>
            <MenuButton
              slots={{ root: IconButton }}
              slotProps={{
                root: { variant: "solid", color: "primary", size: "sm" },
              }}
            >
              <MoreVert />
            </MenuButton>
          </Tooltip>
          <Menu
            variant="plain"
            placement="bottom-end"
            onItemsChange={() => {}}
            disablePortal
            keepMounted
          >
            {canReschedule && (
              <MenuItem>
                <RescheduleEvent
                  variant="plain"
                  color="neutral"
                  eventFragmentRef={event}
                />
              </MenuItem>
            )}
            {canPublish && (
              <MenuItem>
                <PublishEvent
                  variant="plain"
                  color="neutral"
                  eventFragmentRef={event}
                />
              </MenuItem>
            )}
            {canArchive && (
              <MenuItem>
                <UnpublishEvent
                  variant="plain"
                  color="neutral"
                  eventFragmentRef={event}
                />
              </MenuItem>
            )}
            {canRemove && (
              <MenuItem>
                <RemoveEvent
                  variant="plain"
                  color="neutral"
                  eventFragmentRef={event}
                />
              </MenuItem>
            )}
            {canVerify && (
              <MenuItem>
                <VerifyEvent
                  variant="plain"
                  color="neutral"
                  eventFragmentRef={event}
                />
              </MenuItem>
            )}
            {canSync && (
              <MenuItem>
                <SyncStripe
                  variant="plain"
                  color="neutral"
                  eventFragmentRef={event}
                />
              </MenuItem>
            )}
            {currentUser.serviceUser && (
              <MenuItem>
                <EditSeoMetadata
                  seoMetadatumFragmentRef={event.seoMetadatum!}
                  menuItem
                />
              </MenuItem>
            )}
          </Menu>
        </Dropdown>
      </Stack>
    </Grid>
  );
};

export default React.memo(FirmEventActions);
