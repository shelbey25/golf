import { currentUser, SignOutButton, useUser } from "@clerk/nextjs";
import { Report, User } from "@prisma/client";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import JadenScreen from "./components/swoopMain";

//sort archive and active by date
//add archive for reports
export default function Home() {
  const { data, refetch } = api.user.getAll.useQuery();
  const { user } = useUser();
  console.log(user?.primaryEmailAddress?.emailAddress);
  const { data: dataMatches, refetch: refetchMatches } =
    api.matches.getAll.useQuery();
  const { data: dataCommunities, refetch: refetchCommunities } =
    api.community.getAll.useQuery();
  const { data: dataReport, refetch: refetchReport } =
    api.report.getAll.useQuery();
  const { data: dataComplaint, refetch: refetchComplaint } =
    api.complaint.getAll.useQuery();
  const logReport = api.complaint.logReport.useMutation({});
  const flipSwitch = api.community.flipLock.useMutation({});
  const [banSearch, setBanSearch] = useState("");
  const [od, setOD] = useState<null | User>(null);
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("Home");
  const [changeName, setChangeName] = useState<null | string>(
    od?.displayName || null
  );
  const [changeGender, setChangeGender] = useState<null | string>(
    od?.gender || null
  );
  const [changeAttraction, setChangeAttraction] = useState<null | string>(
    od?.attraction || null
  );

  const [changeGrad, setChangeGrad] = useState<null | number>(
    od?.graduationYear || null
  );
  const [changeBan, setChangeBan] = useState<null | boolean>(
    od !== undefined && od !== null ? od.banned : null
  );
  const [changeVer, setChangeVer] = useState<null | boolean>(
    od !== undefined && od !== null ? od.verified : null
  );
  console.log(od?.tokens);
  const [changeHearts, setChangeHearts] = useState<null | number>(
    od?.tokens || null
  );
  const [activeArchive, setActiveArchive] = useState(true);
  const [searchCom, setSearchCom] = useState("");
  useEffect(() => {
    setChangeName(od?.displayName || null);
    setChangeGender(od?.gender || null);
    setChangeAttraction(od?.attraction || null);
    setChangeGrad(od?.graduationYear || null);
    setChangeHearts(od?.tokens || null);
    console.log("*");
    console.log(od);
    setChangeBan(od !== undefined && od !== null ? od.banned : null);
    setChangeVer(od !== undefined && od !== null ? od.verified : null);
  }, [od, setOD]);

  useEffect(() => {
    setOD(
      data?.filter((user3) => {
        return user3.id === od?.id;
      })[0] || null
    );
  }, [data]);
  console.log("*");
  console.log(dataReport);
  const verifyMutation = api.user.verify.useMutation({
    onSuccess: async () => {
      await refetch();
    },
  });
  const banMutation = api.user.ban.useMutation({
    onSuccess: async () => {
      await refetch();
    },
  });
  const unBanMutation = api.user.unban.useMutation({
    onSuccess: async () => {
      await refetch();
    },
  });
  const ignoreReport = api.report.ignore.useMutation({
    onSuccess: async () => {
      await refetchReport();
    },
  });
  const archiveComplaint = api.complaint.archive.useMutation({
    onSuccess: async () => {
      await refetchComplaint();
    },
  });
  const updateUserData = api.user.majorMutation.useMutation({});
  const [bannedSearch, setBannedSearch] = useState(
    data
      ?.filter((person) => {
        return person.banned;
      })
      .filter((person) => {
        return person.email.includes(banSearch);
      })
  );
  const [searchOp, setSearchOp] = useState(
    data?.filter((person) => {
      return person.email.includes(search);
    })
  );
  const { data: dangerous, refetch: refetchDanger } =
    api.user.getAllThatShouldBeReported.useQuery();
  const [reportComplaint, setReportComplaint] = useState(true);
  useEffect(() => {
    setBannedSearch(
      data
        ?.filter((person) => {
          return person.banned;
        })
        .filter((person) => {
          return person.email.includes(banSearch);
        })
    );
  }, [banSearch]);
  const generateReportLog = api.report.fileReport.useMutation({});
  const generateReports = () => {
    console.log("NEW REPORT");
    (async () => {
      await refetchDanger();
      dangerous?.forEach((danger) => {
        generateReportLog.mutate({
          information: "AI Generated Report for Age PLZ CHECK",
          emailReported: danger.email,
        });
      });
    })();
  };

  useEffect(() => {
    setSearchOp(
      data?.filter((person) => {
        return person.email.includes(search);
      })
    );
  }, [search]);
  const pendingVerification = data
    ?.filter((person) => {
      return !person.verified;
    })
    .filter((person) => {
      return !person.banned;
    });
  const banOps = async (id: number, email: string) => {
    await banMutation.mutateAsync({ email: email });
    await ignoreReport.mutateAsync({ id: id });
  };

  const router = useRouter();
  if (
    user?.primaryEmailAddress?.emailAddress !== "shelbe_yousey@asl.org" &&
    user?.primaryEmailAddress?.emailAddress !== "amari_victor@asl.org" &&
    user?.primaryEmailAddress?.emailAddress !== "lauren_holladay@asl.org" &&
    user?.primaryEmailAddress?.emailAddress !== "noah_sadrian@asl.org" &&
    user?.primaryEmailAddress?.emailAddress !== "jaden_gardiola@asl.org"
  ) {
    router.push("/");
  }
  if (!user) {
    return null;
  }

  return (
    <>
      {user?.primaryEmailAddress?.emailAddress === "shelbe_yousey@asl.org" ||
      user?.primaryEmailAddress?.emailAddress === "amari_victor@asl.org" ||
      user?.primaryEmailAddress?.emailAddress === "lauren_holladay@asl.org" ||
      user?.primaryEmailAddress?.emailAddress === "noah_sadrian@asl.org" ||
      user?.primaryEmailAddress?.emailAddress === "jaden_gardiola@asl.org" ? (
        <>
          <div className="flex w-full justify-end absolute p-8 ">
            <div className=" z-10 border border-white bg-sky-300 p-1">
              <SignOutButton />
            </div>
          </div>
          <div className="min-w-screen flex h-full min-h-screen w-full flex-col items-center bg-slate-300 p-8 pb-0">
            <div className="flex w-full flex-row  justify-between">
              {mode === "Home" ? (
                <button
                  className="z-10 h-1/2 border border-white bg-sky-300 p-1"
                  onClick={() => setMode("Search")}
                >
                  Search
                </button>
              ) : (
                <button
                  className="z-10 h-1/2 border border-white bg-sky-300 p-1"
                  onClick={() => setMode("Home")}
                >
                  Home
                </button>
              )}
              <h1 className="pb-4 text-3xl font-bold ">Swoop Management</h1>
              {mode === "Home" ? (
                <div className="p-1 text-slate-300">Search</div>
              ) : (
                <div className="p-1 text-slate-300">Home</div>
              )}
            </div>
            {mode === "Home" ? (
              <div className="flex h-full w-full w-full flex-grow flex-row items-start justify-between bg-[#00224B] ">
                <div className="flex h-full w-full flex-grow flex-col items-center bg-sky-400 p-2">
                  <h1 className="pb-4 text-center text-xl">
                    Pending Applications
                  </h1>
                  <div className="flex w-full flex-col gap-2 ">
                    {pendingVerification?.map((person) => {
                      return (
                        <div
                          className="flex w-full items-center justify-between gap-4 bg-[#FFFFFF] p-2"
                          key={person.email}
                        >
                          <div className="flex flex-col">
                            <h1>{person.email}</h1>
                            <h1>{person.dateOfBirth.toDateString()}</h1>
                            <h1>
                              {"("}
                              {person.emailName}
                              {")"}
                            </h1>
                            <h1>{person.displayName}</h1>
                            <div className="flex w-full">
                              <button
                                className="h-10 w-10 bg-red-400"
                                onClick={() =>
                                  banMutation.mutate({ email: person.email })
                                }
                              ></button>
                              <div className="h-2 w-2"></div>
                              <button
                                className="h-10 w-10 bg-green-400"
                                onClick={() =>
                                  verifyMutation.mutate({ email: person.email })
                                }
                              ></button>
                            </div>
                          </div>
                          <img
                            src={person.uriImage}
                            className="flex-grow"
                            alt="Image"
                            width={30}
                            height={30}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex h-full w-full flex-grow flex-col items-center bg-sky-300 p-2">
                  <div className="pb-4 flex flex-row gap-2">
                    <button
                      className={`bg-slate-100 text-center text-xl border p-0.5 border-black rounded-sm ${
                        reportComplaint ? "bg-opacity-40" : "bg-opacity-0"
                      }`}
                      onClick={() => {
                        setReportComplaint(true);
                      }}
                    >
                      Reports
                    </button>
                    <h1 className="text-center text-xl p-0.5">/</h1>
                    <button
                      className={`bg-slate-100 text-center text-xl border p-0.5 border-black rounded-sm ${
                        !reportComplaint ? "bg-opacity-40" : "bg-opacity-0"
                      }`}
                      onClick={() => {
                        setReportComplaint(false);
                      }}
                    >
                      Complaints
                    </button>
                  </div>
                  <div className="w-full pb-2">
                    <input
                      className="w-full rounded-sm p-1"
                      placeholder="Search for banned user"
                      value={banSearch}
                      onChange={(e) => {
                        setBanSearch(e.target.value);
                      }}
                    ></input>
                    {banSearch === "" ? null : (
                      <div className="h-[12] w-full border-0 border-b border-black">
                        {bannedSearch?.map((bannedUser) => {
                          return (
                            <div
                              className="flex w-full flex-row items-center justify-between border border-b-0 border-black bg-white p-1"
                              key={bannedUser.id}
                            >
                              <h1>{bannedUser.email}</h1>
                              <button
                                className="rounded-md bg-sky-200 p-0.5"
                                onClick={() =>
                                  unBanMutation.mutate({
                                    email: bannedUser.email,
                                  })
                                }
                              >
                                Unban
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  {reportComplaint ? (
                    <div className="flex w-full flex-col gap-2 ">
                      {dataReport?.map((report) => {
                        return (
                          <div
                            className="flex w-full items-center justify-between gap-4 bg-[#FFFFFF] p-2"
                            key={report.id}
                          >
                            <div className="flex w-full flex-col">
                              <h1>{report.information}</h1>
                              <h1>Reporter: {report.reportingUser.email}</h1>
                              <div className="flex w-full gap-2">
                                <h1>
                                  Reported: {report.reportedUser.email},{" "}
                                  {report.reportedUser.displayName},{" "}
                                  {report.reportedUser.dateOfBirth.toDateString()}
                                  ,{" "}
                                </h1>
                                <a
                                  href={report.reportedUser.uriImage}
                                  target="_blank"
                                >
                                  <img
                                    src={report.reportedUser.uriImage}
                                    alt="Image"
                                    width={25}
                                    height={25}
                                  />
                                </a>
                              </div>
                              <div className="flex h-full w-full flex-grow justify-between gap-2 pt-2">
                                <button
                                  className="h-full w-full flex-grow rounded-md bg-sky-200 p-1"
                                  onClick={() => {
                                    ignoreReport.mutate({ id: report.id });
                                    logReport.mutate({
                                      information:
                                        "Cleared: " +
                                        report.id +
                                        ", Reported: " +
                                        report.reportedUser.email +
                                        ", Comment: " +
                                        report.information,
                                      reporter: report.reportingUser.email,
                                    });
                                  }}
                                >
                                  <h1>Ignore</h1>
                                </button>
                                <button
                                  className="h-full w-full flex-grow rounded-md bg-red-200 p-1"
                                  onClick={() => {
                                    void banOps(
                                      report.id,
                                      report.reportedUser.email
                                    );
                                    logReport.mutate({
                                      information:
                                        "Banned: " +
                                        report.id +
                                        ", Reported: " +
                                        report.reportedUser.email +
                                        ", Comment: " +
                                        report.information,
                                      reporter: report.reportingUser.email,
                                    });
                                    //************************** */
                                  }}
                                >
                                  <h1>Ban User</h1>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <>
                      <div className="pb-4 flex flex-row gap-2">
                        <button
                          className={`bg-slate-100 text-center text-md border p-0.5 border-black rounded-sm ${
                            activeArchive ? "bg-opacity-40" : "bg-opacity-0"
                          }`}
                          onClick={() => {
                            setActiveArchive(true);
                          }}
                        >
                          Active
                        </button>
                        <h1 className="text-center text-md p-0.5">/</h1>
                        <button
                          className={`bg-slate-100 text-center text-md border p-0.5 border-black rounded-sm ${
                            !activeArchive ? "bg-opacity-40" : "bg-opacity-0"
                          }`}
                          onClick={() => {
                            setActiveArchive(false);
                          }}
                        >
                          Archived
                        </button>
                      </div>
                      <div className="flex w-full flex-col gap-2 ">
                        {dataComplaint?.map((report) => {
                          if (!report.archived && activeArchive) {
                            return (
                              <div
                                className="flex w-full items-center justify-between gap-4 bg-[#FFFFFF] p-2"
                                key={report.id}
                              >
                                <div className="flex w-full flex-col">
                                  <h1>{report.information}</h1>
                                  <h1>Reporter: {report.complaintUse.email}</h1>

                                  <div className="flex h-full w-full flex-grow justify-between gap-2 pt-2">
                                    <button
                                      className="h-full w-full flex-grow rounded-md bg-green-200 p-1"
                                      onClick={() => {
                                        void (async () => {
                                          archiveComplaint.mutateAsync({
                                            id: report.id,
                                          });
                                        })();
                                      }}
                                    >
                                      <h1>Archive</h1>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          } else if (report.archived && !activeArchive) {
                            return (
                              <div
                                className="flex w-full items-center justify-between gap-4 bg-[#DDDDDD] p-2"
                                key={report.id}
                              >
                                <div className="flex w-full flex-col ">
                                  <h1>{report.information}</h1>
                                  <h1>Reporter: {report.complaintUse.email}</h1>
                                </div>
                              </div>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </div>
                    </>
                  )}
                  <div className="h-4"></div>
                  <button
                    className="bg-white p-1 rounded-md"
                    onClick={() => generateReports()}
                  >
                    <h1>Generate New Reports</h1>
                  </button>
                </div>
                <div className="flex h-full w-full flex-grow flex-col items-center bg-sky-400 p-2">
                  <h1 className="pb-4 text-center text-xl">Stats</h1>
                  <div className="flex w-full items-center justify-between gap-4 bg-[#FFFFFF] p-2">
                    <div className="flex w-full flex-col gap-2">
                      <h1>Active Reports: {dataReport?.length}</h1>
                      <h1>Pending Accounts: {pendingVerification?.length}</h1>
                      <h1>Total Users: {data?.length}</h1>
                      <h1>
                        Active Users:{" "}
                        {
                          data?.filter((user) => {
                            return (
                              new Date().getTime() -
                                user.lastClaimed.getTime() <
                              7 * 24 * 60 * 60 * 1000
                            );
                          }).length
                        }
                      </h1>
                      <h1>Total Matches: {dataMatches?.length}</h1>
                      <h1>Total Communities: {dataCommunities?.length}</h1>
                      <h1>
                        Communities Looking for Users:{" "}
                        {
                          dataCommunities?.filter((community) => {
                            return (
                              community.boyCount < 20 &&
                              community.girlCount < 20
                            );
                          }).length
                        }
                      </h1>
                      <div className="flex flex-row">
                        <h1>Needs Kick Start:</h1>

                        {dataCommunities
                          ?.filter((community) => {
                            return (
                              community.boyCount < 20 &&
                              community.girlCount < 20
                            );
                          })
                          .map((community) => {
                            return (
                              <>
                                <div className="w-1"></div>
                                <h1>{community.domain},</h1>
                              </>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                  <div className="pb-4"></div>
                  <div className="flex flex-col w-full items-center justify-between gap-4 bg-[#FFFFFF] p-2">
                    <input
                      className="w-full rounded-sm p-1 border border-black"
                      placeholder="Search for community"
                      value={searchCom}
                      onChange={(e) => {
                        setSearchCom(e.target.value);
                      }}
                    ></input>
                    <div className="flex flex-col w-full">
                      <h1>
                        {
                          "Domain: " +
                            dataCommunities?.filter((comm) => {
                              return comm.domain.includes(searchCom);
                            })[0]?.domain /***/
                        }
                      </h1>
                      <h1>
                        {
                          "Boys: " +
                            dataCommunities?.filter((comm) => {
                              return comm.domain.includes(searchCom);
                            })[0]?.boyCount /***/
                        }
                      </h1>

                      <h1>
                        {
                          "Girls: " +
                            dataCommunities?.filter((comm) => {
                              return comm.domain.includes(searchCom);
                            })[0]?.girlCount /***/
                        }
                      </h1>
                      <button
                        className={`${
                          dataCommunities?.filter((comm) => {
                            return comm.domain.includes(searchCom);
                          })[0]?.locked
                            ? "bg-red-300"
                            : "bg-green-300"
                        } p-1`}
                        onClick={() => {
                          void (async () => {
                            await flipSwitch.mutateAsync({
                              email:
                                dataCommunities?.filter((comm) => {
                                  return comm.domain.includes(searchCom);
                                })[0]?.domain || "",
                              currentState:
                                dataCommunities?.filter((comm) => {
                                  return comm.domain.includes(searchCom);
                                })[0]?.locked || false,
                            });
                            refetchCommunities();
                          })();
                        }}
                      >
                        <h1>
                          {
                            "Locked: " +
                              dataCommunities?.filter((comm) => {
                                return comm.domain.includes(searchCom);
                              })[0]?.locked /***/
                          }
                        </h1>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full pb-2">
                <input
                  className="w-full rounded-sm p-1"
                  placeholder="Search for user"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                ></input>
                {search === "" ? null : (
                  <div className="h-[12] w-full border-0 border-b border-black">
                    {searchOp?.map((user) => {
                      return (
                        <button
                          className="flex w-full flex-row items-center justify-between border border-b-0 border-black bg-white p-1"
                          key={user.id}
                          onClick={() => {
                            setOD(
                              searchOp?.filter((user2) => {
                                return user.id === user2.id;
                              })[0] || null
                            );
                            setSearch("");
                          }}
                        >
                          <h1>{user.email}</h1>
                        </button>
                      );
                    })}
                  </div>
                )}
                {od !== null ? (
                  <div className="h-full w-full p-4">
                    <div className="flex h-full w-full flex-row justify-between rounded-lg border border-white bg-slate-200 p-2">
                      <div className="flex h-full w-[1/2] flex-col gap-1">
                        <h1>Email: {od.email}</h1>
                        <h1>Email Name: {od.emailName}</h1>
                        <div className="flex flex-row gap-2">
                          <h1>Username:</h1>
                          <input
                            defaultValue={od.displayName}
                            value={changeName || ""}
                            onChange={(e) => setChangeName(e.target.value)}
                            placeholder="Username"
                            className="pl-0.5"
                          ></input>
                        </div>
                        {/*<div className="flex flex-row gap-2">
                          <h1>Date of Birth:</h1>
                          <input
                            type="date"
                            value={new Date(od.dateOfBirth).toString()}
                          />
                        </div>
                        */}
                        <div className="flex flex-row gap-2">
                          <h1>Gender:</h1>
                          <input
                            defaultValue={od.gender}
                            value={changeGender || ""}
                            onChange={(e) => setChangeGender(e.target.value)}
                            placeholder="Male, Female"
                            className="pl-0.5"
                          ></input>
                        </div>
                        <div className="flex flex-row gap-2">
                          <h1>Attraction:</h1>
                          <input
                            defaultValue={od.attraction}
                            value={changeAttraction || ""}
                            onChange={(e) =>
                              setChangeAttraction(e.target.value)
                            }
                            placeholder="Male, Female, All"
                            className="pl-0.5"
                          ></input>
                        </div>
                        <div className="flex flex-row gap-2">
                          <h1>Graduation Year:</h1>
                          <input
                            type="number"
                            defaultValue={od.graduationYear}
                            value={changeGrad || ""}
                            onChange={(e) =>
                              setChangeGrad(parseInt(e.target.value))
                            }
                            placeholder="2024, 2025, 2026, 2027"
                            className="pl-0.5"
                          ></input>
                        </div>
                        <div className="flex flex-row gap-2">
                          <h1>Hearts:</h1>
                          <input
                            type="number"
                            defaultValue={od.tokens}
                            value={changeHearts || ""}
                            onChange={(e) =>
                              setChangeHearts(parseInt(e.target.value))
                            }
                            placeholder=""
                            className="pl-0.5"
                          ></input>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                          <h1>Verified:</h1>
                          <button
                            className={`h-8 w-8 ${
                              changeVer ? "bg-green-400" : "bg-red-400"
                            }`}
                            onClick={() => setChangeVer(!changeVer)}
                          >
                            {changeVer ? "T" : "F"}
                          </button>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                          <h1>Banned:</h1>
                          <button
                            className={`h-8 w-8 ${
                              changeBan ? "bg-green-400" : "bg-red-400"
                            }`}
                            onClick={() => setChangeBan(!changeBan)}
                          >
                            {changeBan ? "T" : "F"}
                          </button>
                        </div>
                        <div className="h-2"></div>
                        <div>
                          <button
                            className={`border border-white ${
                              (changeName === od.displayName &&
                                changeGender === od.gender &&
                                changeAttraction === od.attraction &&
                                changeGrad === od.graduationYear &&
                                changeBan === od.banned &&
                                changeVer === od.verified &&
                                changeHearts === od.tokens) ||
                              !(
                                changeGender === "Male" ||
                                changeGender === "Female"
                              ) ||
                              !(
                                changeAttraction === "Male" ||
                                changeAttraction === "Female" ||
                                changeAttraction === "All"
                              ) ||
                              !(
                                changeGrad === 2024 ||
                                changeGrad === 2025 ||
                                changeGrad === 2026 ||
                                changeGrad === 2027
                              )
                                ? "bg-slate-100"
                                : "bg-green-300 hover:bg-green-400"
                            } p-1 pl-4 pr-4 `}
                            disabled={
                              (changeName === od.displayName &&
                                changeGender === od.gender &&
                                changeAttraction === od.attraction &&
                                changeGrad === od.graduationYear &&
                                changeBan === od.banned &&
                                changeVer === od.verified &&
                                changeHearts === od.tokens) ||
                              !(
                                changeGender === "Male" ||
                                changeGender === "Female"
                              ) ||
                              !(
                                changeAttraction === "Male" ||
                                changeAttraction === "Female" ||
                                changeAttraction === "All"
                              ) ||
                              !(
                                changeGrad === 2024 ||
                                changeGrad === 2025 ||
                                changeGrad === 2026 ||
                                changeGrad === 2027
                              )
                            }
                            onClick={() =>
                              void (async () => {
                                await updateUserData.mutateAsync({
                                  email: od.email,
                                  displayName: changeName || "",
                                  gender: changeGender || "",
                                  attraction: changeAttraction || "",
                                  graduationYear: changeGrad || 0,
                                  verified: changeVer || false,
                                  banned: changeBan || false,
                                  hearts: changeHearts || 0,
                                });
                                await refetch();
                              })()
                            }
                          >
                            <h1>Save Changes</h1>
                          </button>
                        </div>
                      </div>
                      <div className="flex h-full w-[1/2] flex-col">
                        <img
                          src={od.uriImage}
                          className=" flex-grow"
                          alt="Image"
                          width={400}
                          height={400}
                        />
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </>
      ) : null}
    </>
  );
}
