import { useState } from "react";
import { useAuthContext } from "../../../../../context/AuthProvider";
import { DepartmentSelect } from "../../../../SelectFields/HoldinStuct/Dep/DepartmentSelect";
import { SubDepartmenSelect } from "../../../../SelectFields/HoldinStuct/SubDep/SubDepartmenSelect";
import { PositionSelect } from "../../../../SelectFields/HoldinStuct/Position/PositionSelect";

const init = {
  departmentId: "",
  subdepartmentId: "",
  positionsId: "",
};

export const SelectUser = (props) => {
  const { getData } = props;
  const currentUser = useAuthContext();

  const [userIsMaster, setUserIsMaster] = useState([currentUser]);
  const [selectData, setSelectData] = useState(init);

  useState(() => {
    setUserIsMaster(
      userIsMaster.filter((data) => data.dep.toString().includes("2"))
    );
  }, [currentUser, selectData]);

  const handleGetDataFormSelect = (e) => {
    const { name, value } = e.target;
    if (name === "departmentId" && value === "") {
      setSelectData((prev) => ({
        ...prev,
        [name]: value,
        subdepartmentId: "",
        positionsId: "",
      }));
    } else if (name === "subdepartmentId" && value === "") {
      setSelectData((prev) => ({
        ...prev,
        [name]: value,
        positionsId: "",
      }));
    } else {
      setSelectData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    getData(e);
  };

  return (
    <>
      {userIsMaster.length ? (
        <>
          <DepartmentSelect onChange={handleGetDataFormSelect} />
          {selectData.departmentId !== "" && (
            <SubDepartmenSelect
              onChange={handleGetDataFormSelect}
              filterBy={selectData.departmentId}
              value={selectData.subdepartmentId}
            />
          )}
          {selectData.subdepartmentId !== "" && (
            <PositionSelect
              onChange={handleGetDataFormSelect}
              filterBy={selectData.subdepartmentId}
              value={selectData.positionsId}
            />
          )}
        </>
      ) : (
        <>
          <SubDepartmenSelect
            onChange={handleGetDataFormSelect}
            filterBy={currentUser.dep}
            value={selectData.subdepartmentId}
          />
          {selectData.subdepartmentId !== "" && (
            <PositionSelect
              onChange={handleGetDataFormSelect}
              // filterBy={currentUser.subDep}
              filterBy={selectData.subdepartmentId}
              value={selectData.positionsId}
            />
          )}
        </>
      )}
    </>
  );
};
