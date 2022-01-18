export const SET_PARTNERS = "SET_PARTNERS";
export const CREATE_PARTNERS = "CREATE_PARTNERS";
export const EDIT_PARTNERS = "EDIT_PARTNERS";
export const DELETE_PARTNERS = "DELETE_PARTNERS";

export const fetchPartners = () => {
  return async (dispatch) => {
    const requestBody = {
      query: `
              query { 
                partners{
                  _id
                  name,
                  email,
                  description,
                  partnerImage
                }
              }
            `,
    };
    try {
      const response = await fetch("http://localhost:8000/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();

      const fetchedPartners = resData.data.partners;
      let latestPartners = fetchedPartners.slice(
        Math.max(fetchedPartners.length - 6, 0)
      );

      dispatch({
        type: SET_PARTNERS,
        partners: fetchedPartners,
        latestPartners: latestPartners,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const createPartner = (email, name, description, partnerImage) => {
  console.log(email, name, description, partnerImage);
  return async (dispatch) => {
    const requestBody = {
      query: `
              mutation { 
                createPartner(partnerInput: {
                  name : "${name}",
                  email: "${email}",
                  description: "${description}",
                  partnerImage: "${partnerImage}",
                })
                {
                  _id,
                  name,
                  email,
                  description
                  partnerImage
                }
              }
            `,
    };
    try {
      const response = await fetch("http://localhost:8000/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();
      console.log(resData.data.createPartner);

      dispatch({
        type: CREATE_PARTNERS,
        newPartner: resData.data.createPartner,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const editPartner = (id, name, description, email, partnerImage) => {
  return async (dispatch) => {
    console.log(partnerImage);
    const requestBody = {
      query: `
              mutation { 
                editPartner(partnerId : "${id}" , partnerInput: {
                  name : "${name}",
                  email: "${email}",
                  description: "${description}",
                  partnerImage: "${partnerImage}",
                })
                {
                  _id,
                  name,
                  email,
                  description
                  partnerImage
                }
              }
            `,
    };
    try {
      const response = await fetch("http://localhost:8000/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();

      const editPartner = {
        id: id,
        name: name,
        description: description,
        email: email,
        partnerImage: partnerImage,
      };
      dispatch({
        type: EDIT_PARTNERS,
        partner: editPartner,
        id: id,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const deletePartner = (id) => {
  return async (dispatch) => {
    const requestBody = {
      query: `
              mutation { 
                deletePartner(partnerId : "${id}" )
                {
                  _id,
                  name,
                  email,
                  description
                  partnerImage
                }
              }
            `,
    };
    try {
      const response = await fetch("http://localhost:8000/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();

      dispatch({
        type: DELETE_PARTNERS,
        id: id,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
