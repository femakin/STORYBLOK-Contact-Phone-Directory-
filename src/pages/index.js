"use client";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { MdClear } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/router";

function home({ data }) {
  const router = useRouter();

  const [stories, getStories] = useState();
  const [stories2, getStories2] = useState();
  const [searchquery, setSearchqury] = useState("");
  const [loading, setLoading] = useState(false);
  const [afterclear, setafterclear] = useState(false);
  const [refresh, setrefresh] = useState(false);

  const handleNavigate = () => {
    router.push("/");
  };

  const HandleEdit = (data) => {
    router.push(
      {
        pathname: "/edit",
        query: data,
      },
      "/edit"
    );
  };

  const handleSearchForm = (e) => {
    e.preventDefault();
    getStories(
      stories?.filter((x) =>
        x?.content?.first_name?.includes(searchquery.toLocaleLowerCase())
      )
    );
    getStories2(
      stories?.filter((x) =>
        x?.content?.first_name?.includes(searchquery.toLocaleLowerCase())
      )
    );
    setrefresh(!refresh);
  };

  function handleDelete(id) {
    axios
      .post("/api/delete", { id })
      .then((response) => {
        window?.location?.reload();
      })
      .catch((error) => {
        console.error(error, "errorrrr");
      });
  }

  const handleClearSearch = (e) => {
    getStories(stories2);
    setSearchqury("");
    setafterclear(true);
  };


  async function getData() {
    setLoading(true)
    axios.get('/api/getdata').then((response) => {
      if (response.status === 200) {
        getStories(response?.data?.data?.stories)
        getStories2(response?.data?.data?.stories)
        setLoading(false)
      }
    })
      .catch((error) => {
        console.error(error, "errorrrr");
      });
  }


  useEffect(() => {
   getData()
  }, [afterclear]);


  return (
    <div className="App_">
      <div className="main_body">
        {loading ? (
          <div
            style={{
              textAlign: "center",
            }}
          >
            Loading...
          </div>
        ) : (
          <div className="main_">
            <div className="contactandform">
              <div>
                <h1 className="title_text" onClick={() => handleNavigate()}>
                  All Contacts
                </h1>
              </div>

              <div>
                <h1
                  className="title_text"
                  onClick={() => router.push("/addcontact")}
                >
                  Add Contact
                </h1>
              </div>
            </div>

            <div className="search_input_btn">
              <form onSubmit={handleSearchForm}>
                <div className="search_input">
                  <input
                    required
                    className="searchinput"
                    value={searchquery}
                    onChange={(e) => setSearchqury(e.target.value)}
                    type="text"
                    placeholder="Search for contact..."
                  />

                  <input className="btn_" type="submit" value="Search" />

                  <MdClear
                    onClick={() => handleClearSearch()}
                    className="mdclear"
                  />
                </div>
              </form>
            </div>

            <div className="main_conatiner">

              {stories?.map((x, i) => {
                return (
                  <div key={i} className="img_others">
                    {
                      <>
                        <div className="imganddetails">
                          <div className="img_body">
                            {" "}
                            <img
                              src={x?.content?.imagetwo}
                              alt={x?.content?.first_name}
                            />{" "}
                          </div>
                          <div className="other_contents">
                            <div>
                              <div>
                                <p className="firstname">
                                  {x?.content?.first_name?.replace(
                                    /^./,
                                    x?.content?.first_name
                                      ?.charAt(0)
                                      .toUpperCase()
                                  )}
                                </p>
                              </div>
                              <div>
                                <p className="phone_num">
                                  {x?.content?.phone_number}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="edit_delete_container">
                          <div onClick={() => HandleEdit(x)}>
                            <p className="firstname">
                              {" "}
                              <FiEdit />
                            </p>
                          </div>

                          <div
                            onClick={(event) => {
                              return handleDelete(x?.id);
                            }}
                          >
                            <p className="phone_num">
                              {" "}
                              <MdDeleteOutline />
                              Delete
                            </p>
                          </div>
                        </div>
                      </>
                    }
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>


  );
}

export default home;

