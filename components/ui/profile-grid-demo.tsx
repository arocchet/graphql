import {
  Card,
  CardHeader,
  CircularProgress,
  Divider,
  Progress,
} from "@heroui/react";
import GridCard from "./grid-card";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { FaArrowRight } from "react-icons/fa";

export const ProfileGrid = () => {
  const userData = {
    rank: {
      current: "Apprentice Developer",
      nextIn: 2,
      level: 28,
      progress: 80,
      nextLevelKB: 18.9,
    },
    event: {
      title: "Hackathon Winner",
      description: "First place in Web Development competition",
    },
    auditRatio: {
      done: 1470000,
      received: 1200000,
    },
    audit: {
      count: 42,
      description: "Total audits completed",
    },
    skills: {
      items: [
        { name: "JavaScript", level: 85 },
        { name: "React", level: 75 },
        { name: "CSS", level: 70 },
        { name: "Node.js", level: 60 },
      ],
    },
    xp: {
      total: 956025,
      growth: 23,
    },
  };

  const chartData = [
    { month: "Golang", desktop: 40 },
    { month: "Prog", desktop: 80 },
    { month: "Git", desktop: 30 },
    { month: "Front-End", desktop: 30 },
    { month: "Back-End", desktop: 30 },
    { month: "Algo", desktop: 20 },
  ];

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

  let XP = formatBytes(userData.xp.total, true);

  const ratio = userData.auditRatio.done / userData.auditRatio.received;
  const isRatioGreaterThanOne = ratio > 1;

  return (
    <div className="GridContainer">
      <GridCard area="item-1" className="flex flex-col">
        {/* Top section - centered horizontally but at the top */}
        <div className="w-full flex flex-col items-center">
          <div className="pt-5 text-sm sm:text-base md:text-lg">
            Current Rank
          </div>
          <div className="pt-1 font-semibold text-base sm:text-lg md:text-xl">
            {userData.rank.current}
          </div>
          <Divider className="my-3 sm:my-4 w-1/3" />
          <div className="text-xs sm:text-sm">
            Next rank in {userData.rank.nextIn} levels
          </div>
        </div>

        {/* Reduced space between sections with a smaller margin-top */}
        <div className="flex flex-col items-center justify-center flex-grow py-5">
          <div className="text-lg sm:text-xl md:text-2xl font-semibold text-[var(--greyHighlighted)]  mb-1 sm:mb-2">
            Level {userData.rank.level}
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
            value={userData.rank.progress}
            className="self-center"
          />
          <div className="pt-3 sm:pt-5 text-xs sm:text-sm">
            Next levels in{" "}
            <span className="text-[var(--blue)]">
              {userData.rank.nextLevelKB}
            </span>
            kB
          </div>
        </div>
      </GridCard>

      <GridCard area="item-2">
        <div className="self-start text-sm sm:text-base md:text-lg py-5">
          Progression 
        </div>
      </GridCard>

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
                  ? userData.auditRatio.done
                  : userData.auditRatio.received
              }
              value={
                isRatioGreaterThanOne
                  ? userData.auditRatio.done
                  : ratio * userData.auditRatio.received
              }
              label="Done"
              className="w-full"
              showValueLabel={true}
              valueLabel={formatBytes(userData.auditRatio.done)}
            />
          </div>
          <div className="mt-2 w-full px-4">
            <Progress
              color="default"
              maxValue={
                isRatioGreaterThanOne
                  ? userData.auditRatio.done
                  : userData.auditRatio.received
              }
              value={
                isRatioGreaterThanOne
                  ? (1 / ratio) * userData.auditRatio.done
                  : userData.auditRatio.received
              }
              label="Received"
              className="w-full"
              showValueLabel={true}
              valueLabel={formatBytes(userData.auditRatio.received)}
            />
          </div>
          <div
            className={`${getColor(ratio, true)} font-semibold self-start px-4 mt-[1vmax] text-lg sm:text3-xl md:text-4xl`}
          >
            {ratio.toFixed(1).replace(/\.00$/, "")}
          </div>
        </div>
      </GridCard>

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
    </div>
  );
};
