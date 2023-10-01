import { graphql, usePaginationFragment } from "react-relay";
import React from "react";
import moment from "moment";
import { Grid, TabPanel } from "@mui/joy";
import { SchedulesInformation_EventFragment$key } from "../../../../../artifacts/SchedulesInformation_EventFragment.graphql";
import { getHumanDateTime } from "../../../../../lib/utils/dates";
import Table from "../../../../../components/v2/Table";
import Typography from "../../../../../components/v2/Typography";
import {
  useSchedulesColumns,
  useSchedulesHeaders,
} from "../../../../../components/shared/tables/columns/schedules";
import { usePagedEdges } from "../../../../../lib/hooks/usePagedEdges";
import {
  useBookingsColumns,
  useBookingsHeaders,
} from "../../../../../components/shared/tables/columns/bookings";
import useEdges from "../../../../../lib/hooks/useEdges";
import { useTranslation } from "react-i18next";

interface SchedulesInformationProps {
  eventFragmentRef: SchedulesInformation_EventFragment$key;
  index: number;
}

const SchedulesInformation = ({
  eventFragmentRef,
  index,
}: SchedulesInformationProps) => {
  const { data, hasNext, hasPrevious, loadNext, loadPrevious } =
    usePaginationFragment(
      graphql`
        fragment SchedulesInformation_EventFragment on Event
        @refetchable(queryName: "SchedulesSectionEventFragment")
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 30 }
          cursor: { type: "String", defaultValue: "" }
        ) {
          pagedSchedules: schedules(first: $count, after: $cursor)
            @connection(key: "SchedulesInformation_pagedSchedules") {
            edges {
              node {
                id
                scheduledFor
                status
                event {
                  title
                  id
                }
                bookings {
                  id
                  status
                  event {
                    id
                    title
                  }
                  bookingOptions {
                    status
                    eventOption {
                      title
                      builtIn
                    }
                    attendeePrice {
                      cents
                      currency {
                        name
                      }
                    }
                    organizerPrice {
                      cents
                      currency {
                        name
                      }
                    }
                  }
                  attendeeTotalPrice {
                    cents
                    currency {
                      name
                    }
                  }
                  organizerTotalPrice {
                    cents
                    currency {
                      name
                    }
                  }
                  alreadyPaidPrice {
                    cents
                    currency {
                      name
                    }
                  }
                  attendees {
                    id
                    firstName
                    lastName
                    phone
                    email
                  }
                }
              }
            }
          }
        }
      `,
      eventFragmentRef
    );

  const [selectedSchedule, setSelectedSchedule] = React.useState<null | number>(
    null
  );
  const [currentPage, setCurrentPage] = React.useState(1);
  const schedules = useEdges(data.pagedSchedules);
  const schedule = React.useMemo(
    () => schedules[selectedSchedule!],
    [schedules, selectedSchedule]
  );
  const schedulesData = useSchedulesColumns(schedules);
  const schedulesHeaders = useSchedulesHeaders();
  const bookingsData = useBookingsColumns(
    (schedule ? schedule.bookings : []) as any[]
  );
  const bookingsHeaders = useBookingsHeaders();
  const { t } = useTranslation()

  return (
    <TabPanel value={index} size="sm" sx={{ paddingTop: "20px" }}>
      <Grid xs={12} container>
        <Grid md={6} lg={4} sm={12}>
          <Typography level="h4">{t('general.all')} {t('models.schedule.plural')}</Typography>
          <Table
            data={schedulesData}
            headers={schedulesHeaders}
            withPagination
            onRowClick={setSelectedSchedule}
            paginationProps={{
              setPage: setCurrentPage,
              page: currentPage,
              rowsPerPageOptions: [30],
              rowsPerPage: 30,
              colSpan: schedulesHeaders.length,
              hasPrevious: currentPage !== 1 || hasPrevious,
              hasNext,
              onNextPage: () => {
                if (hasNext) {
                  loadNext(30, {
                    onComplete: () => setCurrentPage(currentPage + 1),
                  });
                }
              },
              onPrevPage: () => {
                if (hasPrevious) {
                  loadPrevious(30, {
                    onComplete: () => setCurrentPage(currentPage - 1),
                  });
                }
              },
            }}
          />
        </Grid>
        <Grid md={6} lg={8} sx={{sm: { display: 'none'}}}>
          {schedule ? (
            <>
              <Typography level="h4">
                {t('scenes.firms.events.eventScene.schedulesInformation.chosenScheduleAction', { date: getHumanDateTime(moment(schedule.scheduledFor)) })}
              </Typography>
              <Table
                data={bookingsData}
                headers={bookingsHeaders}
                hoverRow={false}
              />
            </>
          ) : (
            <Typography level="h4">
              Choose schedule to view Bookings for this schedule
            </Typography>
          )}
        </Grid>
      </Grid>
    </TabPanel>
  );
};

export default React.memo(SchedulesInformation);
