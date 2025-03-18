import {
  Card,
  CardHeader,
  CircularProgress,
  Divider,
  Progress,
} from "@heroui/react";
import GridCard from "./grid-card";
import { FaArrowRight } from "react-icons/fa";
import { Suspense, useEffect, useState } from "react";

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

interface ProfileGridProps {
  id: number;
}

export const ProfileGrid = ({ id }: ProfileGridProps) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    let query = `query {
  transaction_aggregate(where: {
    type: { _eq: "xp" },
    eventId: {_eq: ${id}}
  }) {
    aggregate {
      sum {
        amount
      }
    }
  }
}
`;
    const fetchData = async () => {
      try {
        // Récupérer les données de l'API
        const response = await fetch(
          `https://zone01normandie.org/api/graphql-engine/v1/graphql`,
          {
            method: "POST",
            headers: {
              Authorization:
                "Bearer " + document.cookie.match(/session=([^;]+)/)?.[1],
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: query,
            }),
          }
        );

        const profileData = await response.json();

        console.log("data", profileData);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      } finally {
        console.log("data", data);
      }
    };

    fetchData();
  });
  return (
    <div className="GridContainer">
      <Suspense fallback={<Card1Skeleton />}>
        <Card1 data={data} />
      </Suspense>
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
          <span className="text-[var(--textMinimal)]">view history</span>
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
          <span className="text-[var(--textMinimal)]">view more</span>
        </div>
      </div>
      <div className="self-start text-[0.8vmax] mt-3">Last activity</div>
      <Divider className="self-center" />
    </div>
  </GridCard>
);
export const Card1 = (props: any) => {
  useEffect(() => {});

  return (
    <GridCard area="item-1" className="flex flex-col">
      {/* Top section - centered horizontally but at the top */}
      <div className="w-full flex flex-col items-center">
        <div className="pt-5 text-sm sm:text-base md:text-lg">Current Rank</div>
        <div className="pt-1 font-semibold text-base sm:text-lg md:text-xl">
          {2}
        </div>
        <Divider className="my-3 sm:my-4 w-1/3" />
        <div className="text-xs sm:text-sm">Next rank in {1} levels</div>
      </div>

      {/* Reduced space between sections with a smaller margin-top */}
      <div className="flex flex-col items-center justify-center flex-grow py-5">
        <div className="text-lg sm:text-xl md:text-2xl font-semibold text-[var(--greyHighlighted)]  mb-1 sm:mb-2">
          Level {1}
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
          value={3}
          className="self-center"
        />
        <div className="pt-3 sm:pt-5 text-xs sm:text-sm">
          Next levels in <span className="text-[var(--blue)]">{3}</span>
          kB
        </div>
      </div>
    </GridCard>
  );
};

export const Card2 = (data: any) => {
  return (
    <GridCard area="item-2">
      <div className="self-start text-sm sm:text-base md:text-lg py-5">
        Progression
      </div>
    </GridCard>
  );
};

export const Card3 = (data: any) => {
  const ratio = data.auditRatio.done / data.auditRatio.received;
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
            maxValue={
              isRatioGreaterThanOne
                ? data.auditRatio.done
                : data.auditRatio.received
            }
            value={
              isRatioGreaterThanOne
                ? data.auditRatio.done
                : ratio * data.auditRatio.received
            }
            label="Done"
            className="w-full"
            showValueLabel={true}
            valueLabel={formatBytes(data.auditRatio.done)}
          />
        </div>
        <div className="mt-2 w-full px-4">
          <Progress
            color="default"
            maxValue={
              isRatioGreaterThanOne
                ? data.auditRatio.done
                : data.auditRatio.received
            }
            value={
              isRatioGreaterThanOne
                ? (1 / ratio) * data.auditRatio.done
                : data.auditRatio.received
            }
            label="Received"
            className="w-full"
            showValueLabel={true}
            valueLabel={formatBytes(data.auditRatio.received)}
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

export const Card4 = (data: any) => {
  return (
    <GridCard area="item-4">
      <div className="text-center w-full py-5 text-sm sm:text-base md:text-lg flex flex-col items-center px-4">
        <div className="text-[2vmax] sm:text-base md:text-lg">Audit</div>
        <div className="mt-4 flex justify-center">
          <div className="font-semibold text-[0.8vmax] underline flex items-center">
            <FaArrowRight className="mr-1" />
            <a href="" className="text-[var(--textMinimal)]">
              view history
            </a>
          </div>
        </div>
      </div>
    </GridCard>
  );
};

export const Card5 = (data: any) => {
  return (
    <GridCard area="item-5">
      <div className="self-start py-5 text-sm sm:text-base md:text-lg">
        <div>Distribution of users by XP</div>

        <div className="mt-10">
          {/*  <RadarChart data={chartData} width={150} height={150}>
                <PolarGrid gridType="circle" />
                <PolarAngleAxis dataKey="month" />
                <Radar
                  dataKey="desktop"
                  fill="var(--blue)"
                  fillOpacity={0.6}
                  dot={{
                    r: 4,
                    fillOpacity: 1,
                  }}
                />
              </RadarChart> */}
        </div>
      </div>
    </GridCard>
  );
};

export const Card6 = (data: any) => {
  let XP = formatBytes(data.xp.total, true);

  return (
    <GridCard area="item-6">
      <div className="text-center w-full my-5 text-sm sm:text-base md:text-lg flex flex-col items-center px-4">
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
            <a href="" className="text-[var(--textMinimal)]">
              view more
            </a>
          </div>
        </div>
        <div className="self-start text-[0.8vmax] mt-3">Last activity</div>
        <Divider className=" self-center" />
      </div>
    </GridCard>
  );
};
