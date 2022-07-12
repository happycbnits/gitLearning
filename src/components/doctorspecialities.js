import React, { useState, useEffect } from "react";
import { Row, Col, Table, message, Button, Popover } from "antd";
import axios from "axios";
import { BASE_URL } from "../../../service/config";
import Cookies from "js-cookie";
import globalStyle from "../../../globals/style.module.css";
import { useRouter } from "next/router";
import { checkIfRoot, tokenValidator } from "../../../helper/authentication";
import styles from "./style.module.css";
import { EllipsisOutlined } from "@ant-design/icons";
import {  isEmpty } from "lodash";
import fetchCount from "../../../helper/fetchCount";

 
 
/**
  * This component using for list of doctor specialities*
     */
const DoctorSpecialities = () => {
  const router = useRouter();
  const [data, _data] = useState([]);
  const [totalCount, _totalCount] = useState(0);
  const [loading, _loading] = useState(false);
  const [pagination, _pagination] = useState({ current: 1, pageSize: 10 });
  const [state, setState] = useState({ searchEmail: "", endIndex: "" }); 
  const [query, _query] = React.useState(null);
  const [sorter, _sorter] = React.useState({});
  const [filter, _filter] = React.useState({}); 
 
  const [queryURL, _queryURL] = useState("");
  useEffect(() => {
    getTotalCount();
  }, []);
 
   /**
    getTotalCount function counting for total number of DoctorSpecialities
  */
  const getTotalCount = async (filter = false, searchVal = false) => {
    _loading(true);
  
 
    try {
      
      fetchSpecialityData(         
        sorter,
        filter
      );
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
      _loading(false);
    }
  };
 
  /**
    fetchSpecialityData function fatching DoctorSpecialities data
  */
  const fetchSpecialityData = async (
    p = 1, searchVal = false,
    sort = "id:DESC",
    f = null,
  ) => {
    const jwt = Cookies.get("jwt");
    _loading(true);
    try {
      let url = `specialities?_sort=${sort}`; 
      

      const countQuery = isEmpty(f)
        ? ""
        : "?" +
          Object.keys(f)
            .map((k) => `${k}=${f[k]}`)
            .join("&");
     
      await fetchCount(countQuery);
     
     
      const contents = (
        await axios.get(`${BASE_URL}/${url}`, {
          headers: {
            authorization: `Bearer ${jwt}`,
          },
        })
      ).data;

      _pagination(p);
      _sorter(sort);

      _data(contents);
    } catch (err) {
      console.log(err);
      if (tokenValidator(err)) {
        message.error("Error fetching data. Please try again");
      }
    } finally {
      _loading(false);
    } 
  };  
  
  const handleTableChange = (pagination, filters, sorter) => {
    _pagination({ ...pagination, total: totalCount });
    const sort= getSortQuery(sorter);
    fetchSpecialityData({...pagination}, false, sort, filter);
     
 
  };  
 
  /**
* This is the function to use sort the data ASC or DESC with Id & SpecialitiesName
*/
const getSortQuery = (sorter) => {
  if (!sorter) return "id:DESC";
  if (isEmpty(sorter)) return "id:DESC";
  const sortKey = sorter.field ? sorter.field : "id";
  const sortOrder = sorter.order
    ? sorter.order === "ascend"
      ? "ASC"
      : "DESC"
    : "DESC";
  return `${sortKey}:${sortOrder}`;
};

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "33%",
      sorter: true,
      fixed: "left",
      render: (text) => (text === null || text === undefined ? "-" : text),
    },
    {
      title: "Speciality Name",
      dataIndex: "specialityName",
      width: "33%",
      sorter: true,
      render: (text) => (text === null || text === undefined ? "-" : text),
    },
   
    {
      title: "Action",
      width: "33%",
      render: (record) => (
        <Popover placement="left" content={
          <>
            <p>
              <Button
                style={{
                  color: 'black'
                }}
                type="link"
                loading={loading}
                
              >
                Update Speciality
              </Button>
              
            </p>
          </>
        } trigger="hover">
          <EllipsisOutlined rotate={90} />
        </Popover>
      ),
      fixed: "right",
    },
  ];
  
 
  return (
    <Row>
      <Col span={24}>
      <Row>
        <Col span={18}>
          <p className={globalStyle.pageHeading}>Doctor Specialities</p>
        </Col>
        <Col span={6} className={styles.filtercontainer}>
           
        </Col>
      </Row>
     
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        className={globalStyle.table}
        dataSource={data}
        pagination={{ ...pagination, showSizeChanger: false }}
        loading={loading}
        onChange={handleTableChange}
        simple
      />
  
   
    </Col>
    </Row>
  );
};
 
DoctorSpecialities.getInitialProps = async (ctx) => {
  checkIfRoot(ctx);
  return { loggedIn: true };
};
 
export default DoctorSpecialities;
 

