import React from "react";

import { useSelector, useDispatch } from "react-redux";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deletePartner } from "../../redux/actions/partners";

const ListPartners = ({ latestPartners, onEdit, admin }) => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user?.token);
  return (
    <div>
      <ul class="list-group ">
        {latestPartners?.map((partner) => (
          <div
            class="list-group-item list-group-item-action"
            style={{ display: "flex", justifyContent: "space-between" }}
            key={partner._id}
          >
            <span>{partner.name}</span>
            <span>{partner.email}</span>
            <span>{partner.description}</span>
            {token && admin && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span
                  style={{ marginRight: "15px" }}
                  onClick={onEdit.bind(this, partner?._id)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </span>
                <span onClick={() => dispatch(deletePartner(partner._id))}>
                  <FontAwesomeIcon icon={faTrash} />
                </span>
              </div>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ListPartners;
