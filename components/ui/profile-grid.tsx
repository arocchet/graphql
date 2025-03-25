"use client"
import {
  Card,
  CardHeader,
  CircularProgress,
  Divider,
  Progress,
} from "@heroui/react";
import GridCard from "./grid-card";
import { FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
  Image,
  Link,
  Tooltip,
  Avatar,
  AvatarGroup,
} from "@heroui/react";

import * as d3 from "d3";

const formatBytes = (bytes: number, divide = false) => {
  const sizes = ["B", "kB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 B";

  const i = Math.floor(Math.log(bytes) / Math.log(1000));
  const factor = Math.pow(1000, i);

  const value = (bytes / factor).toFixed(2).replace(/\.00$/, "");

  if (divide) {
    return [value, sizes[i]];
  }
  return value + " " + sizes[i];
};

const getColor = (ratio: number, text = false) => {
  if (ratio > 1.2) return text ? "text-[var(--green)]" : "bg-[var(--green)]";
  if (ratio <= 1.2 && ratio > 0.8)
    return text ? "text-[var(--yellow)]" : "bg-[var(--yellow)]";
  if (ratio <= 0.8 && ratio >= 0.5)
    return text ? "text-[var(--orange)]" : "bg-[var(--orange)]";
  return text ? "text-[var(--red)]" : "bg-[var(--red)]";
};

const getRankByLevel = (level: number): string => {
  if (level < 10) return "Aspiring developer";
  if (level < 20) return "Beginner developer";
  if (level < 30) return "Apprentice developer";
  if (level < 40) return "Assistant developer";
  if (level < 50) return "Basic developer";
  return "Junior developer";
};

const getNextRankLevel = (level: number): number => {
  if (level < 10) return 10 - level;
  if (level < 20) return 20 - level;
  if (level < 30) return 30 - level;
  if (level < 40) return 40 - level;
  if (level < 50) return 50 - level;
  return 0;
};

interface ProfileGridProps {
  id: number;
}

export const ProfileGrid = ({ id }: ProfileGridProps) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `query {
      user {
        login
        totalUp
        totalDown
        events(where: { event: { object: { type: { _in: ["piscine", "module"] } } } }) {
          event {
            id
            object {
              name
              type
            }
          }
        }
      }
      transaction_aggregate(where: { type: { _eq: "xp" }, eventId: { _eq: ${id} } }) {
        aggregate {
          sum {
            amount
          }
        }
      }
         transaction(
    where: {
      transaction_type: { type: { _eq: "xp" } },
      eventId: { _eq: 303 }
    },
    order_by: { createdAt: desc }
  ) {
    amount
    isBonus
    attrs
    eventId
    createdAt
    object {
      name
      type
    }
  }
    }`;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://zone01normandie.org/api/graphql-engine/v1/graphql`,
          {
            method: "POST",
            headers: {
              Authorization:
                "Bearer " + document.cookie.match(/session=([^;]+)/)?.[1],
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
          }
        );

        const profileData = await response.json();
        setData(profileData.data);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="GridContainer">
        <Card1Skeleton />
        <Card2Skeleton />
        <Card3Skeleton />
        <Card4Skeleton />
        <Card5Skeleton />
        <Card6Skeleton />
      </div>
    );
  }

  return (
    <div className="GridContainer">
      {data && (
        <>
          <Card1 data={data?.user} />
          <Card2 data={data} />
          <Card3 data={data?.user} />
          <Card4 data={data?.user} />
          <Card5 data={{transactions: data?.transaction}} />
          <Card6
            data={{
              xp: {
                total: data?.transaction_aggregate?.aggregate?.sum?.amount,
              },
              transactions: data?.transaction,
            }}
          />
        </>
      )}
    </div>
  );
};

// Skeleton components améliorés
const Card1Skeleton = () => {
  return (
    <GridCard area="item-1" className="flex flex-col">
      {/* Top section - centré horizontalement mais en haut */}
      <div className="w-full flex flex-col items-center">
        <div className="pt-5 text-sm sm:text-base md:text-lg">Current Rank</div>
        <div className="pt-1 font-semibold text-base sm:text-lg md:text-xl">
          -
        </div>
        <Divider className="my-3 sm:my-4 w-1/3" />
        <div className="text-xs sm:text-sm">Next rank in - levels</div>
      </div>

      {/* Espace réduit entre les sections */}
      <div className="flex flex-col items-center justify-center flex-grow py-5">
        <div className="text-lg sm:text-xl md:text-2xl font-semibold text-[var(--greyHighlighted)] mb-1 sm:mb-2">
          Level -
        </div>
        <CircularProgress
          classNames={{
            svg: "w-20 h-20 xs:w-24 xs:h-24 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 drop-shadow-md",
            indicator: "stroke-[var(--purpleFill)]",
            track: "stroke-[var(--textMinimal)]",
            value:
              "text-lg sm:text-xl md:text-2xl font-semibold text-[var(--greyHighlighted)]",
          }}
          showValueLabel={true}
          strokeWidth={1}
          value={0}
          className="self-center"
          aria-label="Circular progress indicator showing level progress"
        />
        <div className="pt-3 sm:pt-5 text-xs sm:text-sm">
          Next levels in <span className="text-[var(--blue)]">-</span> kB
        </div>
      </div>
    </GridCard>
  );
};

const Card2Skeleton = () => (
  <GridCard area="item-2">
    <div className="self-start text-sm sm:text-base md:text-lg py-5">
      Progression
    </div>
    {/* Ajouter des éléments de skeleton pour le contenu du progression */}
  </GridCard>
);

const Card3Skeleton = () => (
  <GridCard area="item-3">
    <div className="text-center w-full pt-5 text-sm sm:text-base md:text-lg flex flex-col items-center">
      <div>Audit Ratio</div>
      <div className="mt-[1vmax] w-full px-4">
        <Progress
          classNames={{
            track: "drop-shadow-md border border-default",
            indicator: "bg-[var(--textMinimal)]",
          }}
          maxValue={100}
          value={0}
          label="Done"
          className="w-full"
          showValueLabel={true}
          valueLabel="-"
          aria-label="Progress bar showing audit ratio done"
        />
      </div>
      <div className="mt-2 w-full px-4">
        <Progress
          color="default"
          maxValue={100}
          value={0}
          label="Received"
          className="w-full"
          showValueLabel={true}
          valueLabel="-"
          aria-label="Progress bar showing audit ratio received"
        />
      </div>
      <div className="text-[var(--textMinimal)] font-semibold self-start px-4 mt-[1vmax] text-lg sm:text3-xl md:text-4xl">
        -
      </div>
    </div>
  </GridCard>
);

const Card4Skeleton = () => (
  <GridCard area="item-4">
    <div className="text-center w-full py-5 text-sm sm:text-base md:text-lg flex flex-col items-center px-4">
      <div className="text-[2vmax] sm:text-base md:text-lg">Audit</div>
      <div className="mt-4 flex justify-center">
        <div className="font-semibold text-[0.8vmax] underline flex items-center opacity-50">
          <FaArrowRight className="mr-1" />
          <Button
            color="primary"
            size="sm"
            className="text-[var(--textMinimal)] border-0 bg-transparent"
          >
            view history
          </Button>
        </div>
      </div>
    </div>
  </GridCard>
);

const Card5Skeleton = () => (
  <GridCard area="item-5">
    <div className="self-start py-5 text-sm sm:text-base md:text-lg">
      <div>Distribution of users by XP</div>
      <div className="mt-10 flex items-center justify-center h-32">
        {/* Placeholder pour le radar chart */}
        <div className="w-32 h-32 rounded-full border border-dashed border-[var(--textMinimal)] flex items-center justify-center">
          <div className="text-xs text-[var(--textMinimal)]">
            Loading chart...
          </div>
        </div>
      </div>
    </div>
  </GridCard>
);

const Card6Skeleton = () => (
  <GridCard area="item-6">
    <div className="text-center w-full my-5 text-sm sm:text-base md:text-lg flex flex-col items-center px-4">
      <div className="text-sm sm:text-base md:text-lg">XP</div>
      <div className="flex flex-row self-start mt-[1vmax] justify-between w-full">
        <div className="text-lg sm:text3-xl md:text-4xl">
          <span className="text-[var(--purpleFill)] font-semibold">-</span>{" "}
          <span>kB</span>
        </div>
        <div className="font-semibold text-[0.8vmax] underline flex items-center opacity-50">
          <FaArrowRight className="mr-1" />
          <Button
            color="primary"
            size="sm"
            className="text-[var(--textMinimal)] border-0 bg-transparent"
          >
            view more
          </Button>{" "}
        </div>
      </div>
      <div className="self-start text-[0.8vmax] mt-3">Last activity</div>
      <Divider className="self-center" />
    </div>
  </GridCard>
);
export const Card1 = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [level, setLevel] = useState<any>(null);

  useEffect(() => {
    let query = `query {
    event_user(where: { userLogin: { _eq: ${props?.data[0]?.login} }, eventId: { _eq: 303 } }) {
    level
  }
}`;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://zone01normandie.org/api/graphql-engine/v1/graphql`,
          {
            method: "POST",
            headers: {
              Authorization:
                "Bearer " + document.cookie.match(/session=([^;]+)/)?.[1],
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
          }
        );

        const data = await response.json();
        setLevel(data);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  });

  if (loading) {
    return <Card1Skeleton />;
  }

  return (
    <GridCard area="item-1" className="flex flex-col">
      {/* Top section - centered horizontally but at the top */}
      <div className="w-full flex flex-col items-center">
        <div className="pt-5 text-sm sm:text-base md:text-lg">Current Rank</div>
        <div className="pt-1 font-semibold text-base sm:text-lg md:text-xl">
          {getRankByLevel(level?.data?.event_user[0]?.level)}
        </div>
        <Divider className="my-3 sm:my-4 w-1/3" />
        <div className="text-xs sm:text-sm">
          Next rank in {getNextRankLevel(level?.data?.event_user[0]?.level)}{" "}
          levels
        </div>
      </div>

      {/* Reduced space between sections with a smaller margin-top */}
      <div className="flex flex-col items-center justify-center flex-grow py-5">
        <div className="text-lg sm:text-xl md:text-2xl font-semibold text-[var(--greyHighlighted)]  mb-1 sm:mb-2">
          Level {level?.data?.event_user[0]?.level}
        </div>
        <CircularProgress
          classNames={{
            svg: "w-20 h-20 xs:w-24 xs:h-24 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 drop-shadow-md",
            indicator: "stroke-[var(--purpleFill)]",
            track: "stroke-[var(--textMinimal)]",
            value:
              "text-lg sm:text-xl md:text-2xl font-semibold text-[var(--greyHighlighted)]",
          }}
          showValueLabel={true}
          strokeWidth={1}
          value={33}
          className="self-center"
          aria-label="Circular progress indicator showing level progress"
        />
        <div className="pt-3 sm:pt-5 text-xs sm:text-sm">
          Next levels in <span className="text-[var(--blue)]">- </span>
          kB
        </div>
      </div>
    </GridCard>
  );
};

export const Card2 = (data: any) => {
  const transactions = data.data.transaction;

  // Prepare data for the chart with cumulative XP
  const chartData = transactions.map((transaction: any) => ({
    date: new Date(transaction.createdAt),
    xp: transaction.amount,
  }));

  // Sort data by date
  chartData.sort((a: any, b: any) => a.date.getTime() - b.date.getTime());

  // Calculate cumulative XP
  let cumulativeXP = 0;
  const cumulativeChartData = chartData.map((d: any) => {
    cumulativeXP += d.xp;
    return { ...d, cumulativeXP };
  });

  // Set up dimensions
  const width = 200;
  const height = 150;
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };

  // Scales
  const xScale = d3
    .scaleTime()
    .domain(d3.extent(cumulativeChartData, (d: { date: Date }) => d.date) as [Date, Date])
    .range([margin.left, width - margin.right]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(cumulativeChartData, (d: { cumulativeXP: number }) => d.cumulativeXP) || 0])
    .nice()
    .range([height - margin.bottom, margin.top]);

  // Line generator for cumulative XP
  const line = d3
    .line()
    .x((d: any) => xScale(d.date))
    .y((d: any) => yScale(d.cumulativeXP))
    .curve(d3.curveMonotoneX);

  return (
    <GridCard area="item-2">
      <div className="self-start text-sm sm:text-base md:text-lg py-5">
        <div className="text-center">Progression</div>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMinYMin meet"
          className="w-full h-auto"
        >
          {/* X-axis */}
          <g
            transform={`translate(0, ${height - margin.bottom})`}
            className="text-[0.5rem] text-[var(--textMinimal)]"
          >
            {xScale.ticks(5).map((tick: Date, index: number) => (
              <text
                key={index}
                x={xScale(tick)}
                y={15}
                textAnchor="middle"
                fill="currentColor"
              >
                {d3.timeFormat("%b %d")(tick)}
              </text>
            ))}
          </g>

          {/* Y-axis */}
          <g
            transform={`translate(${margin.left}, 0)`}
            className="text-[0.5rem] text-[var(--textMinimal)]"
          >
            {yScale.ticks(5).map((tick: number, index: number) => (
              <text
                key={index}
                x={-10}
                y={yScale(tick) + 4}
                textAnchor="end"
                fill="currentColor"
              >
                {tick}
              </text>
            ))}
          </g>

          {/* Line path */}
          <path
            d={line(cumulativeChartData) || ""}
            fill="none"
            stroke="var(--purpleFill)"
            strokeWidth="2"
          />

          {/* Data points */}
            {cumulativeChartData.map((d: { date: Date; cumulativeXP: number }, index: number) => (
            <circle
              key={index}
              cx={xScale(d.date)}
              cy={yScale(d.cumulativeXP)}
              r="3"
              fill="var(--purpleFill)"
            />
            ))}
        </svg>
      </div>
    </GridCard>
  );
};

export const Card3 = (data: any) => {
  const totalUp = data?.data[0].totalUp || 0; // Default to 0 if undefined
  const totalDown = data?.data[0].totalDown || 1; // Default to 1 to avoid division by zero
  const ratio = totalUp / totalDown;
  const isRatioGreaterThanOne = ratio > 1;

  return (
    <GridCard area="item-3">
      <div className="text-center w-full pt-5 text-sm sm:text-base md:text-lg flex flex-col items-center">
        <div>Audit Ratio</div>
        <div className="mt-[1vmax] w-full px-4">
          <Progress
            classNames={{
              track: "drop-shadow-md border border-default",
              indicator: `${getColor(ratio)}`,
            }}
            maxValue={isRatioGreaterThanOne ? totalUp : totalDown}
            value={isRatioGreaterThanOne ? totalUp : ratio * totalDown}
            label="Done"
            className="w-full"
            showValueLabel={true}
            valueLabel={formatBytes(totalUp)}
            aria-label="Progress bar showing audit ratio done"
          />
        </div>
        <div className="mt-2 w-full px-4">
          <Progress
            color="default"
            maxValue={isRatioGreaterThanOne ? totalUp : totalDown}
            value={isRatioGreaterThanOne ? (1 / ratio) * totalUp : totalDown}
            label="Received"
            className="w-full"
            showValueLabel={true}
            valueLabel={formatBytes(totalDown)}
            aria-label="Progress bar showing audit ratio received"
          />
        </div>
        <div
          className={`${getColor(ratio, true)} font-semibold self-start px-4 mt-[1vmax] text-lg sm:text3-xl md:text-4xl`}
        >
          {ratio.toFixed(1).replace(/\.00$/, "")}
        </div>
      </div>
    </GridCard>
  );
};

export const Card4 = (props: any) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const [audit, setAudit] = useState<any>(null);

  useEffect(() => {
    const query = `
    query {
      audit(where: {auditorLogin: {_eq: "${props?.data[0]?.login}"}}) {
        grade
        group {
          captainLogin
          createdAt
          object {
            name
            type
          }
        }
        private {
          code
        }
        resultId
      }
    }`;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://zone01normandie.org/api/graphql-engine/v1/graphql`,
          {
            method: "POST",
            headers: {
              Authorization:
                "Bearer " + document.cookie.match(/session=([^;]+)/)?.[1],
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
          }
        );

        const data = await response.json();
        const sortedAudit = (data?.data?.audit || []).sort(
          (a: any, b: any) =>
            new Date(b.group.createdAt).getTime() -
            new Date(a.group.createdAt).getTime()
        );
        setAudit(sortedAudit);
      } catch (error) {
        console.error("Failed to fetch audit data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [props?.data]);

  if (loading) {
    return <Card4Skeleton />;
  }

  return (
    <GridCard area="item-4">
      <div className="text-center w-full py-5 text-sm sm:text-base md:text-lg flex flex-col items-center px-4">
        <div className="text-[2vmax] sm:text-base md:text-lg">Audit</div>
        <div className="mt-4 flex justify-center">
          <div className="font-semibold text-[0.8vmax] underline flex items-center">
            <FaArrowRight className="mr-1" />
            <Button
              color="primary"
              size="sm"
              className="text-[var(--textMinimal)] border-0 bg-transparent"
              onPress={onOpen}
            >
              view history
            </Button>
            <Drawer
              hideCloseButton
              backdrop="blur"
              classNames={{
                base: "data-[placement=right]:sm:m-2 data-[placement=left]:sm:m-2 rounded-medium",
              }}
              isOpen={isOpen}
              onOpenChange={onOpenChange}
            >
              <DrawerContent>
                {(onClose) => (
                  <>
                    <DrawerHeader className="absolute top-0 inset-x-0 z-50 flex flex-row gap-2 px-2 py-2 border-b border-default-200/50 justify-between bg-content1/50 backdrop-saturate-150 backdrop-blur-lg">
                      <Tooltip content="Close">
                        <Button
                          isIconOnly
                          className="text-default-400"
                          size="sm"
                          variant="light"
                          onPress={onClose}
                        >
                          <svg
                            fill="none"
                            height="20"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="m13 17 5-5-5-5M6 17l5-5-5-5" />
                          </svg>
                        </Button>
                      </Tooltip>
                    </DrawerHeader>
                    <DrawerBody className="pt-16">
                      <div className="flex flex-col gap-2 py-4">
                        <h1 className="text-2xl font-bold leading-7">
                          Audit History
                        </h1>
                        <div className="mt-4 flex flex-col gap-3">
                          {audit.map((entry: any, index: number) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 self-start text-[0.8vmax] mb-3"
                            >
                              <div className="flex items-center justify-center border-1 border-default-200/50 rounded-small w-11 h-11">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                >
                                  <g
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    color="currentColor"
                                  >
                                    <path d="M17 2v2m-5-2v2M7 2v2m-3.5 6c0-3.3 0-4.95 1.025-5.975S7.2 3 10.5 3h3c3.3 0 4.95 0 5.975 1.025S20.5 6.7 20.5 10v5c0 3.3 0 4.95-1.025 5.975S16.8 22 13.5 22h-3c-3.3 0-4.95 0-5.975-1.025S3.5 18.3 3.5 15zm10 6H17m-3.5-7H17" />
                                    <path d="M7 10s.5 0 1 1c0 0 1.588-2.5 3-3m-4 9s.5 0 1 1c0 0 1.588-2.5 3-3" />
                                  </g>
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium">
                                  {entry.group.object.type} -{" "}
                                  {entry.group.object.name}
                                </p>
                                <p className="text-default-500">
                                  Captain: {entry.group.captainLogin} | Code:{" "}
                                  {entry.private.code}
                                </p>

                                <p className="text-default-500">
                                  Date:{" "}
                                  {new Date(
                                    entry.group.createdAt
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </DrawerBody>
                  </>
                )}
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </GridCard>
  );
};

export const Card5 = (data: any) => {
  const transactions = data.data.transactions;

  // Prepare data for the chart with transaction counts
  const transactionCounts: { [key: string]: number } = {};
  transactions.forEach((transaction: any) => {
    const date = new Date(transaction.createdAt).toISOString().split("T")[0];
    transactionCounts[date] = (transactionCounts[date] || 0) + 1;
  });

  const chartData = Object.entries(transactionCounts).map(([date, count]) => ({
    date: new Date(date),
    count,
  }));

  // Sort data by date
  chartData.sort((a: any, b: any) => a.date.getTime() - b.date.getTime());

  // Set up dimensions
  const width = 400;
  const height = 200;
  const margin = { top: 20, right: 30, bottom: 30, left: 50 };

  // Scales
  const xScale = d3
    .scaleTime()
    .domain(d3.extent(chartData, (d: { date: Date }) => d.date) as [Date, Date])
    .range([margin.left, width - margin.right]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(chartData, (d: { count: number }) => d.count) || 0])
    .nice()
    .range([height - margin.bottom, margin.top]);

  // Line generator for transaction counts
  const line = d3
    .line()
    .x((d: any) => xScale(d.date))
    .y((d: any) => yScale(d.count))
    .curve(d3.curveMonotoneX);

  return (
    <GridCard area="item-5">
      <div className="self-start py-5 text-sm sm:text-base md:text-lg">
        <div>Number of Audit</div>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMinYMin meet"
          className="w-full h-auto mt-4"
        >
          {/* Grid lines */}
          <g>
            {yScale.ticks(5).map((tick, index) => (
              <line
                key={index}
                x1={margin.left}
                x2={width - margin.right}
                y1={yScale(tick)}
                y2={yScale(tick)}
                stroke="var(--textMinimal)"
                strokeDasharray="4"
              />
            ))}
          </g>

          {/* X-axis */}
          <g
            transform={`translate(0, ${height - margin.bottom})`}
            className="text-[0.7rem] text-[var(--textMinimal)]"
          >
            <line
              x1={margin.left}
              x2={width - margin.right}
              y1={0}
              y2={0}
              stroke="var(--textMinimal)"
            />
            {xScale.ticks(5).map((tick: Date, index: number) => (
              <text
                key={index}
                x={xScale(tick)}
                y={15}
                textAnchor="middle"
                fill="currentColor"
              >
                {d3.timeFormat("%b %d")(tick)}
              </text>
            ))}
          </g>

          {/* Y-axis */}
          <g
            transform={`translate(${margin.left}, 0)`}
            className="text-[0.7rem] text-[var(--textMinimal)]"
          >
            <line
              x1={0}
              x2={0}
              y1={margin.top}
              y2={height - margin.bottom}
              stroke="var(--textMinimal)"
            />
            {yScale.ticks(5).map((tick: number, index: number) => (
              <text
                key={index}
                x={-10}
                y={yScale(tick) + 4}
                textAnchor="end"
                fill="currentColor"
              >
                {tick}
              </text>
            ))}
          </g>

          {/* Line path */}
          <path
            d={line(chartData) || ""}
            fill="none"
            stroke="var(--blue)"
            strokeWidth="2"
          />

          {/* Data points */}
          {chartData.map((d: { date: Date; count: number }, index: number) => (
            <circle
              key={index}
              cx={xScale(d.date)}
              cy={yScale(d.count)}
              r="4"
              fill="var(--blue)"
            />
          ))}
        </svg>
      </div>
    </GridCard>
  );
};

export const Card6 = (data: any) => {
  const xpData =
    typeof data.data.xp.total === "number" ? data.data.xp.total : 0; // Ensure xpData is a number
  const XP = formatBytes(xpData, true);

  const transactions = data.data.transactions.slice(
    0,
    Math.min(data.data.transactions.length, 2)
  ); // Get up to 3 transactions

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <GridCard area="item-6">
      <div className="text-center w-full mt-5 mb-3 text-sm sm:text-base md:text-lg flex flex-col items-center px-4">
        <div className="text-sm sm:text-base md:text-lg">XP</div>
        <div className="flex flex-row self-start mt-[1vmax] justify-between w-full ">
          <div className="text-lg sm:text3-xl md:text-4xl">
            <span className="text-[var(--purpleFill)] font-semibold">
              {XP[0]}
            </span>{" "}
            <span>{XP[1]}</span>
          </div>
          <div className="font-semibold text-[0.8vmax] underline flex items-center">
            <FaArrowRight className="mr-1" />

            <Button
              color="primary"
              size="sm"
              className="text-[var(--textMinimal)] border-0 bg-transparent "
              onPress={onOpen}
            >
              view more
            </Button>

            <Drawer
              hideCloseButton
              backdrop="blur"
              classNames={{
                base: "data-[placement=right]:sm:m-2 data-[placement=left]:sm:m-2  rounded-medium",
              }}
              isOpen={isOpen}
              onOpenChange={onOpenChange}
            >
              <DrawerContent>
                {(onClose) => (
                  <>
                    <DrawerHeader className="absolute top-0 inset-x-0 z-50 flex flex-row gap-2 px-2 py-2 border-b border-default-200/50 justify-between bg-content1/50 backdrop-saturate-150 backdrop-blur-lg">
                      <Tooltip content="Close">
                        <Button
                          isIconOnly
                          className="text-default-400"
                          size="sm"
                          variant="light"
                          onPress={onClose}
                        >
                          <svg
                            fill="none"
                            height="20"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="m13 17 5-5-5-5M6 17l5-5-5-5" />
                          </svg>
                        </Button>
                      </Tooltip>
                    </DrawerHeader>
                    <DrawerBody className="pt-16">
                      <div className="flex flex-col gap-2 py-4">
                        <h1 className="text-2xl font-bold leading-7">
                          XP Board Cursus
                        </h1>

                        <div className="mt-4 flex flex-col gap-3">
                          <div className="flex gap-3 items-center flex-col">
                            {data.data.transactions.map(
                              (transaction: any, index: number) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-3 self-start text-[0.8vmax] mb-3"
                                >
                                  <div className="flex items-center justify-center border-1 border-default-200/50 rounded-small w-11 h-11">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        d="M15.079 3.462a.75.75 0 0 1 1.06.016l3.399 3.5a.75.75 0 0 1 0 1.045l-3.398 3.5a.75.75 0 1 1-1.077-1.045l2.163-2.228H5a.75.75 0 1 1 0-1.5h12.226l-2.163-2.227a.75.75 0 0 1 .016-1.06m-6.158 9a.75.75 0 0 1 .015 1.06L6.773 15.75H19a.75.75 0 0 1 0 1.5H6.774l2.162 2.227a.75.75 0 0 1-1.076 1.045l-3.398-3.5a.75.75 0 0 1 0-1.045l3.398-3.5a.75.75 0 0 1 1.06-.015"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                  <div>
                                    <p className="font-medium">
                                      {transaction.object.type} -{" "}
                                      {transaction.object.name}
                                    </p>
                                    <p className="text-default-500">
                                      {formatBytes(transaction.amount, true)[0]}
                                      {formatBytes(transaction.amount, true)[1]}
                                    </p>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </DrawerBody>
                  </>
                )}
              </DrawerContent>
            </Drawer>
          </div>
        </div>
        <div className="self-start text-[0.8vmax] mt-3">Last activity</div>
        <Divider className=" self-center mb-3" />
        {transactions.map((transaction: any, index: number) => (
          <div key={index} className="self-start text-[0.8vmax]">
            {transaction.object.type} - {transaction.object.name} -{" "}
            {formatBytes(transaction.amount, true)[0]}
            {formatBytes(transaction.amount, true)[1]}
          </div>
        ))}
      </div>
    </GridCard>
  );
};
