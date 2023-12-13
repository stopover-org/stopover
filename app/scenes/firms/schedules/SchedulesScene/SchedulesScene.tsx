import { Grid } from "@mui/joy";
import moment from "moment/moment";
import React from "react";
import { Disposable, graphql, usePaginationFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import { Moment } from "moment";
import Typography from "../../../../components/v2/Typography/Typography";
import Table from "../../../../components/v2/Table/Table";
import { getHumanDateTime } from "../../../../lib/utils/dates";
import { SchedulesScene_FirmFragment$key } from "../../../../artifacts/SchedulesScene_FirmFragment.graphql";
import {
  useBookingsColumns,
  useBookingsHeaders,
} from "../../../../components/shared/tables/columns/bookings";
import {
  useSchedulesColumns,
  useSchedulesHeaders,
} from "../../../../components/shared/tables/columns/schedules";
import useEdges from "../../../../lib/hooks/useEdges";
import { SchedulesSceneFirmFragment } from "../../../../artifacts/SchedulesSceneFirmFragment.graphql";
import DateRangePicker from "../../../../components/v2/DateRangePicker/DateRangePicker";

interface SchedulesSceneProps {
  firmFragmentRef: SchedulesScene_FirmFragment$key;
}

const SchedulesScene = ({ firmFragmentRef }: SchedulesSceneProps) => {
  const { data, hasNext, hasPrevious, loadNext, loadPrevious, refetch } =
    usePaginationFragment<
      SchedulesSceneFirmFragment,
      SchedulesScene_FirmFragment$key
    >(
      graphql`
        fragment SchedulesScene_FirmFragment on Firm
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 30 }
          cursor: { type: "String", defaultValue: "" }
          filters: { type: "SchedulesFilter", defaultValue: {} }
        )
        @refetchable(queryName: "SchedulesSceneFirmFragment") {
          pagedSchedules: schedules(
            first: $count
            after: $cursor
            filters: $filters
          ) @connection(key: "SchedulesScene_pagedSchedules") {
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
                  bookingOptions {
                    id
                    eventOption {
                      title
                      builtIn
                    }
                    status
                    organizerPrice {
                      cents
                      currency {
                        name
                      }
                    }
                    attendeePrice {
                      cents
                      currency {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      firmFragmentRef
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
  const { t } = useTranslation();
  const [range, setRange] = React.useState<[Moment | null, Moment | null]>([
    null,
    null,
  ]);
  const queryRef = React.useRef<Disposable>();

  React.useEffect(() => {
    if (queryRef.current) {
      queryRef.current.dispose();
    }

    queryRef.current = refetch(
      {
        filters: {
          startDate: range[0],
          endDate: range[1],
        },
        cursor: "0",
      },
      {
        onComplete: () => {
          if (currentPage !== 1) {
            setCurrentPage(1);
          }
        },
      }
    );
  }, [range, setCurrentPage]);

  return (
    <Grid xs={12} container>
      <Grid md={4} sm={12}>
        <Typography level="h4">{t("models.schedule.plural")}</Typography>
        <Grid md={6} sm={12} container>
          <DateRangePicker
            value={range}
            onChange={(dates) => setRange(dates)}
            clearStyles={{ paddingTop: "30px" }}
            startInputProps={{
              label: t("scenes.attendees.events.eventsScene.sidebar.startDate"),
              placeholder: t(
                "scenes.attendees.events.eventsScene.sidebar.startDatePlaceholder"
              ),
              size: "sm",
            }}
            endInputProps={{
              label: t("scenes.attendees.events.eventsScene.sidebar.endDate"),
              placeholder: t(
                "scenes.attendees.events.eventsScene.sidebar.endDatePlaceholder"
              ),
              size: "sm",
            }}
          />
        </Grid>
        <Table
          data={schedulesData}
          headers={schedulesHeaders}
          withPagination
          onRowClick={(i: number) => setSelectedSchedule(i)}
          paginationProps={{
            setPage: setCurrentPage,
            page: currentPage,
            rowsPerPageOptions: [30],
            rowsPerPage: 30,
            colSpan: schedulesHeaders.length,
            hasPrevious,
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
      <Grid md={8} sm={12}>
        {schedule ? (
          <>
            <Typography level="h4">
              {t(
                "scenes.firms.events.eventScene.schedulesInformation.chosenScheduleAction",
                { date: getHumanDateTime(moment(schedule.scheduledFor)) }
              )}{" "}
              {schedule.event.title}
            </Typography>
            <Table
              data={bookingsData}
              headers={bookingsHeaders}
              hoverRow={false}
            />
          </>
        ) : (
          <Typography level="h4">
            {t(
              "scenes.firms.events.eventScene.schedulesInformation.chooseScheduleAction"
            )}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default React.memo(SchedulesScene);
