/* 

DO NOT CHANGE THIS FILE

*/
const axios = require("axios");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SERVER_ADDRESS = "http://localhost:", PORT = 3000 } = process.env;
const API_URL = process.env.API_URL || SERVER_ADDRESS + PORT;
const { JWT_SECRET = "neverTell" } = process.env;

const { rebuildDB } = require("../db/seedData");
const {
  getCustomerById,
  createActivity,
  getTemplateRoutinesByCustomer,
  getTemplateRoutinesByActivity,
  getAllTemplateRoutines,
  getRoutineById,
  createRoutine,
  getRoutineActivityById,
} = require("../db");
const client = require("../db/client");

describe("API", () => {
  let token, registeredCustomer;
  let routineActivityToCreateAndUpdate = {
    routineId: 4,
    activityId: 8,
    count: 20,
    duration: 300,
  };
  beforeAll(async () => {
    await rebuildDB();
  });
  afterAll(async () => {
    await client.end();
  });
  it("responds to a request at /api/health with a message specifying it is healthy", async () => {
    const res = await axios.get(`${API_URL}/api/health`);

    expect(typeof res.data.message).toEqual("string");
  });

  describe("Customers", () => {
    let newCustomer = { username: "robert", password: "bobbylong321" };
    let newCustomerShortPassword = {
      username: "robertShort",
      password: "bobby21",
    };
    describe("POST /users/register", () => {
      let tooShortSuccess, tooShortResponse;
      beforeAll(async () => {
        const successResponse = await axios.post(
          `${API_URL}/api/users/register`,
          newCustomer
        );
        registeredCustomer = successResponse.data.customer;
        try {
          tooShortSuccess = await axios.post(
            `${API_URL}/api/users/register`,
            newCustomerShortPassword
          );
        } catch (err) {
          tooShortResponse = err.response;
        }
      });
      it("Creates a new customer.", () => {
        expect(typeof registeredCustomer).toEqual("object");
        expect(registeredCustomer.username).toEqual(newCustomer.username);
      });
      it("Requires username and password. Requires all passwords to be at least 8 characters long.", () => {
        expect(newCustomer.password.length).toBeGreaterThan(7);
      });
      it("EXTRA CREDIT: Hashes password before saving customer to DB.", async () => {
        const {
          rows: [queriedCustomer],
        } = await client.query(
          `
          SELECT *
          FROM users
          WHERE id = $1;
        `,
          [registeredCustomer.id]
        );
        expect(queriedCustomer.password).not.toBe(newCustomer.password);
        expect(
          await bcrypt.compare(newCustomer.password, queriedCustomer.password)
        ).toBe(true);
      });
      it("Throws errors for duplicate username", async () => {
        let duplicateSuccess, duplicateErrResp;
        try {
          duplicateSuccess = await axios.post(
            `${API_URL}/api/users/register`,
            newCustomer
          );
        } catch (err) {
          duplicateErrResp = err.response;
        }
        expect(duplicateSuccess).toBeFalsy();
        expect(duplicateErrResp.data).toBeTruthy();
      });
      it("Throws errors for password-too-short.", async () => {
        expect(tooShortSuccess).toBeFalsy();
        expect(tooShortResponse.data).toBeTruthy();
      });
    });
    describe("POST /users/login", () => {
      it("Logs in the customer. Requires username and password, and verifies that hashed login password matches the saved hashed password.", async () => {
        const { data } = await axios.post(
          `${API_URL}/api/users/login`,
          newCustomer
        );
        token = data.token;
        expect(data.token).toBeTruthy();
      });
      it("Returns a JSON Web Token. Stores the id and username in the token.", async () => {
        const parsedToken = jwt.verify(token, JWT_SECRET);
        expect(parsedToken.id).toEqual(registeredCustomer.id);
        expect(parsedToken.username).toEqual(registeredCustomer.username);
      });
    });
    describe("GET /users/me", () => {
      it("sends back users data if valid token is supplied in header", async () => {
        const { data } = await axios.get(`${API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        expect(data.username).toBeTruthy();
        expect(data.username).toBe(registeredCustomer.username);
      });
      it("rejects requests with no valid token", async () => {
        let noTokenResp, noTokenErrResp;
        try {
          noTokenResp = await axios.get(`${API_URL}/api/users/me`);
        } catch (err) {
          noTokenErrResp = err.response;
        }
        expect(noTokenResp).toBeFalsy();
        expect(noTokenErrResp.data).toBeTruthy();
      });
    });
    describe("GET /users/:username/routines", () => {
      it("Gets a list of public routines for a particular customer.", async () => {
        const userId = 2;
        const userWithRoutines = await getCustomerById(userId);
        const { data: routines } = await axios.get(
          `${API_URL}/api/users/${userWithRoutines.username}/routines`
        );
        const routinesFromDB = await getTemplateRoutinesByCustomer(
          userWithRoutines
        );
        expect(routines).toBeTruthy();
        expect(routines).toEqual(routinesFromDB);
      });
    });
  });
  describe("Activities", () => {
    let activityToCreateAndUpdate = {
      name: "Bicep Curls",
      description: "They hurt, but you will thank you later",
    };
    describe("GET /activities", () => {
      it("Just returns a list of all activities in the database", async () => {
        const curls = { name: "curls", description: "4 sets of 15." };
        const createdActivity = await createActivity(curls);
        const { data: activities } = await axios.get(
          `${API_URL}/api/activities`
        );
        expect(Array.isArray(activities)).toBe(true);
        expect(activities.length).toBeGreaterThan(0);
        expect(activities[0].name).toBeTruthy();
        expect(activities[0].description).toBeTruthy();
        const [filteredActivity] = activities.filter(
          (activity) => activity.id === createdActivity.id
        );
        expect(filteredActivity.name).toEqual(curls.name);
        expect(filteredActivity.description).toEqual(curls.description);
      });
    });
    describe("POST /activities (*)", () => {
      it("Creates a new activity", async () => {
        const { data: respondedActivity } = await axios.post(
          `${API_URL}/api/activities`,
          activityToCreateAndUpdate,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        expect(respondedActivity.name).toEqual(activityToCreateAndUpdate.name);
        expect(respondedActivity.description).toEqual(
          activityToCreateAndUpdate.description
        );
        activityToCreateAndUpdate = respondedActivity;
      });
    });
    describe("PATCH /activities/:activityId (*)", () => {
      it("Anyone can update an activity (yes, this could lead to long term problems a la wikipedia)", async () => {
        const newActivityData = {
          name: "Double Bicep Curls",
          description: "They hurt EVEN MORE, but you will thank you later",
        };
        const { data: respondedActivity } = await axios.patch(
          `${API_URL}/api/activities/${activityToCreateAndUpdate.id}`,
          newActivityData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        expect(respondedActivity.name).toEqual(newActivityData.name);
        expect(respondedActivity.description).toEqual(
          newActivityData.description
        );
      });
    });
    describe("GET /activities/:activityId/routines", () => {
      it("Get a list of all public routines which feature that activity", async () => {
        const [testRoutine] = await getAllTemplateRoutines();
        const [testActivity] = testRoutine.activities;
        const { data: routines } = await axios.get(
          `${API_URL}/api/activities/${testActivity.id}/routines`
        );
        const routinesFromDB = await getTemplateRoutinesByActivity(
          testActivity
        );
        expect(routines).toEqual(routinesFromDB);
      });
    });
  });
  describe("Routines", () => {
    let routineToCreateAndUpdate = {
      isTemplate: true,
      name: "Elliptical Day",
      goal: "Work on that Elliptical!",
    };
    let routineToFail = {
      isTemplate: false,
      name: "Elliptical Day 2",
      goal: "Work on that Elliptical... again!",
    };
    const newRoutineData = {
      isTemplate: false,
      name: "Elliptical Day Private",
      goal: "Work on that Elliptical, yet again!",
    };
    describe("GET /routines", () => {
      it("Returns a list of public routines, includes the activities with them", async () => {
        const publicRoutinesFromDB = await getAllTemplateRoutines();
        const { data: publicRoutinesFromAPI } = await axios.get(
          `${API_URL}/api/routines`
        );
        expect(publicRoutinesFromAPI).toEqual(publicRoutinesFromDB);
      });
    });

    describe("POST /routines (*)", () => {
      it("Creates a new routine, with the creator_id matching the logged in customer", async () => {
        const { data: respondedRoutine } = await axios.post(
          `${API_URL}/api/routines`,
          routineToCreateAndUpdate,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        expect(respondedRoutine.name).toEqual(routineToCreateAndUpdate.name);
        expect(respondedRoutine.goal).toEqual(routineToCreateAndUpdate.goal);
        expect(respondedRoutine.name).toEqual(routineToCreateAndUpdate.name);
        expect(respondedRoutine.creator_id).toEqual(registeredCustomer.id);
        routineToCreateAndUpdate = respondedRoutine;
      });
      it("Requires logged in customer", async () => {
        let noLoggedInCustomerResp, noLoggedInCustomerErrResp;
        try {
          noLoggedInCustomerResp = await axios.post(
            `${API_URL}/api/routines`,
            routineToFail
          );
        } catch (err) {
          noLoggedInCustomerErrResp = err.response;
        }
        expect(noLoggedInCustomerResp).toBeFalsy();
        expect(noLoggedInCustomerErrResp.data).toBeTruthy();
      });
    });
    describe("PATCH /routines/:routineId (**)", () => {
      it("Updates a routine, notably changing public/private, the name, or the goal", async () => {
        const { data: respondedRoutine } = await axios.patch(
          `${API_URL}/api/routines/${routineToCreateAndUpdate.id}`,
          newRoutineData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        expect(respondedRoutine.name).toEqual(newRoutineData.name);
        expect(respondedRoutine.goal).toEqual(newRoutineData.goal);
        routineToCreateAndUpdate = respondedRoutine;
      });
    });
    describe("DELETE /routines/:routineId (**)", () => {
      it("Hard deletes a routine. Makes sure to delete all the routineActivities whose routine is the one being deleted.", async () => {
        const { data: deletedRoutine } = await axios.delete(
          `${API_URL}/api/routines/${routineToCreateAndUpdate.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const shouldBeDeleted = await getRoutineById(deletedRoutine.id);
        expect(deletedRoutine.id).toBe(routineToCreateAndUpdate.id);
        expect(deletedRoutine.name).toBe(routineToCreateAndUpdate.name);
        expect(deletedRoutine.goal).toBe(routineToCreateAndUpdate.goal);
        expect(shouldBeDeleted).toBeFalsy();
      });
    });
    describe("POST /routines/:routineId/activities", () => {
      let newRoutine;
      it("Attaches a single activity to a routine.", async () => {
        newRoutine = await createRoutine({
          creator_id: registeredCustomer.id,
          name: "Pull Ups",
          goal: "10 pull ups",
        });
        const { data: respondedRoutineActivity } = await axios.post(
          `${API_URL}/api/routines/${newRoutine.id}/activities`,
          { routineId: newRoutine.id, ...routineActivityToCreateAndUpdate },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        expect(respondedRoutineActivity.routineId).toBe(newRoutine.id);
        expect(respondedRoutineActivity.activityId).toBe(
          routineActivityToCreateAndUpdate.activityId
        );
        routineActivityToCreateAndUpdate = respondedRoutineActivity;
      });
      it("Prevents duplication on (routineId, activityId) pair.", async () => {
        let duplicateIds, duplicateIdsResp;
        try {
          duplicateIds = await axios.post(
            `${API_URL}/api/routines/${newRoutine.id}/activities`,
            routineActivityToCreateAndUpdate,
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } catch (err) {
          duplicateIdsResp = err.response;
        }
        expect(duplicateIds).toBeFalsy();
        expect(duplicateIdsResp.data).toBeTruthy();
      });
    });
  });
  describe("routine_activities", () => {
    let newRoutineActivityData = {
      routineId: 3,
      activityId: 8,
      count: 25,
      duration: 200,
    };
    describe("PATCH /routine_activities/:routineActivityId (**)", () => {
      it("Updates the count or duration on the routine activity", async () => {
        const { data: respondedRoutineActivity } = await axios.patch(
          `${API_URL}/api/routine_activities/${routineActivityToCreateAndUpdate.id}`,
          newRoutineActivityData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        expect(respondedRoutineActivity.count).toEqual(
          newRoutineActivityData.count
        );
        expect(respondedRoutineActivity.duration).toEqual(
          newRoutineActivityData.duration
        );
        routineActivityToCreateAndUpdate = respondedRoutineActivity;
      });
      it("Logged in customer should be the owner of the modified object.", async () => {
        let respondedRoutineActivity, errRespondedRoutineActivity;
        try {
          respondedRoutineActivity = await axios.patch(
            `${API_URL}/api/routine_activities/${4}`,
            newRoutineActivityData,
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } catch (err) {
          errRespondedRoutineActivity = err.response;
        }
        expect(respondedRoutineActivity).toBeFalsy();
        expect(errRespondedRoutineActivity.data).toBeTruthy();
      });
    });
    describe("DELETE /routine_activities/:routineActivityId (**)", () => {
      it("Removes an activity from a routine, uses hard delete", async () => {
        const { data: deletedRoutineActivity } = await axios.delete(
          `${API_URL}/api/routine_activities/${routineActivityToCreateAndUpdate.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const shouldBeDeleted = await getRoutineActivityById(
          deletedRoutineActivity.id
        );
        expect(deletedRoutineActivity.id).toBe(
          routineActivityToCreateAndUpdate.id
        );
        expect(deletedRoutineActivity.count).toBe(
          routineActivityToCreateAndUpdate.count
        );
        expect(deletedRoutineActivity.duration).toBe(
          routineActivityToCreateAndUpdate.duration
        );
        expect(shouldBeDeleted).toBeFalsy();
      });
      it("Logged in customer should be the owner of the modified object.", async () => {
        let respondedRoutineActivity, errRespondedRoutineActivity;
        try {
          respondedRoutineActivity = await axios.delete(
            `${API_URL}/api/routine_activities/${4}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } catch (err) {
          errRespondedRoutineActivity = err.response;
        }
        expect(respondedRoutineActivity).toBeFalsy();
        expect(errRespondedRoutineActivity.data).toBeTruthy();
      });
    });
  });
});
