import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { FaSquarePlus } from "react-icons/fa6";
import { BiSearchAlt } from "react-icons/bi";
import { GoPerson } from "react-icons/go";
import team1 from "../imgs/team1.png";
import { HiDotsVertical } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import NavbarFooter from "./NavbarFooter";
import CreateNewTeam from "../components/Modals/CreateNewTeam";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteCompany,
  getAllTeamMembersLength,
  getAllTeams,
  splitString,
} from "../Services";
import bgplhldr from "../imgs/bgplhldr.png";
import AddMemberModal from "../components/Modals/AddMemberModal";
// import SingleTeamModal from "../components/Modals/SingleTeamModal";
import { IoEyeOutline } from "react-icons/io5";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { BsFillTrashFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import DeleteModal from "../components/Modals/DeleteModal";
import { MoonLoader } from "react-spinners";
import SingleTeamModal from "../components/Modals/SingleTeamMoDAL.JSX";
import { useTranslation } from "react-i18next";

const SubTeams = () => {
  var screen = window.innerWidth;
  let [modal, setModal] = useState(false);
  let [teams, setTeams] = useState([]);
  let [singleTeam, setSingleTeam] = useState({});
  let [singleTeamMembers, setSingleTeamMembers] = useState([]);
  let [loading, setloading] = useState(false);

  // console.log(singleTeam);
  let handleModal = () => {
    setModal(!modal);
  };
  let getTeams = (value) => {
    if (value) {
      setTeams(Object.values(value));
    }
  };

  useEffect(() => {
    getAllTeams(getTeams, setloading);
  }, []);

  let [addModal, setAddModal] = useState(false);
  let handleAddModal = () => {
    setAddModal(!addModal);
  };

  let [teamModal, setTeamModal] = useState(false);

  let handleTeamModal = () => {
    setTeamModal(!teamModal);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenue = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenue = () => {
    setAnchorEl(null);
  };

  console.log(teams);
  let [filtered, setfiltered] = useState([]);
  useEffect(() => {
    setfiltered(teams);
  }, [teams]);

  //---------------------------------------------------(search functionality)-----------------------------------------------

  console.log(filtered);

  let [search, setsearch] = useState("");

  useEffect(() => {
    const result = teams?.filter((contact) => {
      return contact?.teamName.toLowerCase().match(search.toLowerCase());
    });

    setfiltered(result);
  }, [search]);
  let [deleteModal, setdeleteModal] = useState(false);
  let [teamId, setteamId] = useState({});

  let [members, setmembers] = useState([]);

  // useEffect(() => {
  //   setmembers([]);
  // }, []);

  // useEffect(() => {
  //   if (singleTeamMembers) {
  //     getAllTeamMembers(singleTeamMembers, setmembers, members);
  //   } else {
  //     setmembers([]);
  //   }
  // }, [singleTeamMembers]);

  let handledeleteModal = () => {
    setdeleteModal(!deleteModal);
  };

  let updateTeams = () => {
    if (teams?.length === 1) {
      setTeams([]);
    }
  };
  console.log(loading);
  const { t } = useTranslation();
  return (
    <div className="w-[100%] flex bg-[#F8F8F8] h-[100vh] max-h-[100vh] relative">
      {screen >= 450 ? <Sidebar /> : null}
      {loading ? (
        <div className="sm:w-[80%] w-[90%] items-center flex justify-center">
          <MoonLoader />
        </div>
      ) : (
        <div className="sm:w-[80%] w-[100%] flex justify-center overflow-y-scroll">
          <CreateNewTeam
            modal={modal}
            handleModal={handleModal}
            singleTeam={singleTeam}
          />
          <AddMemberModal
            addModal={addModal}
            handleAddModal={handleAddModal}
            singleTeam={singleTeam}
          />
          <SingleTeamModal
            teamModal={teamModal}
            handleTeamModal={handleTeamModal}
            singleTeam={singleTeam}
            singleTeamMembers={singleTeamMembers}
            setSingleTeamMembers={setSingleTeamMembers}
          />
          <DeleteModal
            deleteModal={deleteModal}
            handledeleteModal={handledeleteModal}
            text={t("Are you sure to delete this Team?")}
            func={() => deleteCompany(teamId, updateTeams)}
            // id={teamId}
          />
          <div className="w-[97%] ">
            <div className="w-[100%] flex justify-between h-[50px]  mt-[30px]">
              <div className="w-[20%] h-[100%] flex items-center">
                <p
                  className="font-[600] sm:text-[20px] text-[11px]"
                  style={
                    screen <= 450
                      ? {
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          whiteSpace: "nowrap",
                          flexDirection: "column",
                          marginTop: "5px",
                        }
                      : null
                  }
                >
                  {t("Sub Teams")}{" "}
                  <span className="font-[500] sm:text-[10px] text-[12px]  text-[#9B9B9B]">
                    {`(${teams?.length})`}
                  </span>
                </p>
              </div>
              <div
                className="sm:w-[75%] w-[80%] h-[100%] flex justify-between"
                style={screen <= 450 ? { alignItems: "center" } : null}
              >
                {"\u00A0"} {"\u00A0"}{" "}
                <div className="sm:w-[65%] w-[55%] sm:h-[100%] h-[70%] flex items-center rounded-[36px] bg-white shadow-xl">
                  {screen <= 450 ? (
                    <BiSearchAlt className="text-[22px] text-[#fcb6b6] ml-2" />
                  ) : null}
                  <input
                    type="text"
                    className="h-[100%] sm:w-[88%] w-[70px] outline-none rounded-[36px] sm:pl-[10px] pl-[0px] ml-2 sm:text[20px] text[11px]"
                    placeholder={t("Search")}
                    onChange={(e) => setsearch(e.target.value)}
                    value={search}
                  />
                  {screen >= 450 ? (
                    <BiSearchAlt className="text-[22px] text-[#9B9B9B] ml-2" />
                  ) : null}
                </div>
                {"\u00A0"}
                <div
                  className="w-[185px] sm:h-[100%] h-[70%] rounded-[36px] bg-white shadow-xl flex justify-center items-center cursor-pointer"
                  onClick={() => {
                    handleModal(), setSingleTeam({ teamName: "", image: "" });
                  }}
                >
                  <IoMdAdd className="text-[black] mr-1" />{" "}
                  <p className="font-[500] text-[12px] text-black mr-1">
                    {t("Add Sub Team")}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-[100%] flex justify-start gap-x-[30px] flex-wrap mt-[50px] h-[68%] overflow-y-scroll">
              {filtered?.map((team) => {
                return (
                  <div className="w-[47%] sm:h-[153px] h-[100px] shadow-xl sm:rounded-[50px] rounded-[32px] bg-white flex justify-between mt-[12px]">
                    <div
                      className="w-[95%] h-[100%]  rounded-[50px] flex items-center justify-center  cursor-pointer"
                      style={screen <= 450 ? { alignItems: "end" } : null}
                    >
                      <div className="w-[70%] h-[92%] rounded-[45px]  ml-[7px]">
                        <img
                          src={team?.image ? team?.image : bgplhldr}
                          alt="team"
                          className="sm:h-[100%] sm:w-[100%] h-[83px] w-[90px] object-cover sm:rounded-[45px] rounded-[30px]"
                        />
                      </div>
                      <div className="h-[100%] w-[30%] flex  items-center ml-2">
                        <div>
                          <h2
                            className="sm:text-[14px] text-[12px] font-[400]"
                            style={
                              screen <= 450 ? { whiteSpace: "nowrap" } : null
                            }
                          >
                            {splitString(team?.teamName, 20)}
                          </h2>
                          <div className="flex items-center text-[#7F7F7F]">
                            <GoPerson className="text-[15px]" />
                            <p className="ml-[2px] sm:text-[11px] text-[10px] font-[400]">
                              {team?.members
                                ? `${
                                    // getAllTeamMembersLength()
                                    Object.values(team?.members)?.length
                                  } ${t("Members")}`
                                : `0 ${t("Members")}`}
                            </p>
                          </div>
                          <div className="w-[100%] flex justify-between mt-1">
                            <div
                              className="sm:h-[30px] h-[25px] sm:w-[70px] w-[94px] bg-[#F3F3F3] rounded-[21px] cursor-pointer flex justify-center items-center"
                              onClick={() => {
                                handleAddModal(), setSingleTeam(team);
                              }}
                            >
                              <p
                                style={{
                                  fontSize: "12px",
                                  fontFamily: "inter",
                                }}
                              >
                                {t("Add")}
                              </p>
                              <div className="sm:h-[12px] sm:w-[12px] h-[10px] w-[10px] flex justify-center items-center ml-[4px]">
                                <p style={{ marginBottom: "2px" }}>+</p>
                              </div>
                            </div>

                            <div
                              className="sm:h-[30px] h-[25px] sm:w-[70px] w-[94px] bg-[#F3F3F3] rounded-[21px] cursor-pointer flex justify-center items-center ml-[5px]"
                              onClick={() => {
                                handleTeamModal(),
                                  setSingleTeam(team),
                                  setSingleTeamMembers(team?.members);
                              }}
                            >
                              <p
                                style={{
                                  fontSize: "12px",
                                  fontFamily: "inter",
                                }}
                              >
                                {t("View")}
                              </p>
                              <div className="sm:h-[12px] sm:w-[12px] h-[10px] w-[10px] flex justify-center items-center ml-[4px]">
                                <IoEyeOutline />
                              </div>
                            </div>
                          </div>
                          <div className="w-[100%] flex justify-between mt-1">
                            <div
                              className="sm:h-[30px] h-[25px] sm:w-[70px] w-[94px] bg-[#F3F3F3] rounded-[21px] cursor-pointer flex justify-center items-center"
                              onClick={() => {
                                handleModal(), setSingleTeam(team);
                              }}
                            >
                              <p
                                style={{
                                  fontSize: "12px",
                                  fontFamily: "inter",
                                }}
                              >
                                {t("Edit")}
                              </p>
                              <div className="sm:h-[12px] sm:w-[12px] h-[10px] w-[10px] flex justify-center items-center ml-[4px]">
                                <MdEdit />
                              </div>
                            </div>

                            <div
                              className="sm:h-[30px] h-[25px] sm:w-[70px] w-[94px] bg-[#F3F3F3] rounded-[21px] cursor-pointer flex justify-center items-center ml-[5px]"
                              onClick={() => {
                                handledeleteModal(), setteamId(team);
                              }}
                            >
                              <p
                                style={{
                                  fontSize: "12px",
                                  fontFamily: "inter",
                                }}
                              >
                                {t("Delete")}
                              </p>
                              <div className="sm:h-[12px] sm:w-[12px] h-[10px] w-[10px] flex justify-center items-center ml-[4px]">
                                <BsFillTrashFill />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <div className="h-[100%] w-[6%] flex justify-around  items-center">
                    <div
                      className="menu-icon"
                      id="basic-menu"
                    >
                      <IconButton
                        id="basic-button"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                      
                      >
                        <HiDotsVertical className="text-[#BDBBBB] text-4xl cursor-pointer" />
                      </IconButton>
                    </div>

                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={openMenue}
                      onClose={handleCloseMenue}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem
                        onClick={() => {
                 
                        }}
                        sx={{ color: "black" }}
                      >
                        <MdEdit style={{ marginRight: "7px" }} />
                        Edit
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          deleteCompany(team?.teamId);
                        }}
                        sx={{ color: "red" }}
                      >
                        <BsFillTrashFill
                          style={{ marginRight: "7px", color: "red" }}
                        />
                        Delete
                      </MenuItem>
                    </Menu>
                  </div> */}
                  </div>
                );
              })}
            </div>
          </div>
          <ToastContainer
            position="bottom-left"
            autoClose={1000}
            theme="colored"
            hideProgressBar
          />
        </div>
      )}
      <br />
      <br />
      <br />
      {screen <= 450 ? <NavbarFooter /> : null}
    </div>
  );
};

export default SubTeams;
