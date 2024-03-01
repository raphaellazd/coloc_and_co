import { eventDataMapper } from "../datamappers/index.js";

const eventController = {
  test: (req, res) => {
    res.send('event Controller');
  },

  getEventsByColocation: async (req, res) => {
    const { result, error } = await eventDataMapper.getEvents(req.user.colocId);

    if (error) {
      console.log(error);
    } else {
      res.json(result);
      console.log(result);
    }
  },

  createEvent: async (req, res) => {
    const { result, error } = await eventDataMapper.createEvent(
      req.user.colocId,
      req.user.userId,
      req.body,
    );

    if (error) {
      console.error(error);
    } else {
      res.json({ message: "Successfully created evenement!" });
      console.log(result);
    }
  },

  modifyEvent: async (req, res) => {
    const { result, error } = await eventDataMapper.modifyEvent(
      req.params.event_id,
      req.body,
    );

    if (error) {
      console.log(error);
    } else {
      res.json(result);
      console.log(result);
    }
  },

  deleteEvent: async (req, res) => {
    const { result, error } = await eventDataMapper.deleteEvent(
      req.params.event_id,
    );

    if (error) {
      console.log(error);
    } else {
      res.json(result);
      console.log(result);
    }
  },

  getEventsByTag: async (req, res) => {
    const { result, error } = await eventDataMapper.getEventsByTag(
      req.user.colocId,
      req.params.event_tag,
    );

    if (error) {
      console.log(error);
    } else {
      res.json(result);
      console.log(result);
    }
  },
};

export default eventController;
